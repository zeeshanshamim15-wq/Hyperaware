import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FadeContent from "@/components/FadeContent";
import { cn } from "@/lib/utils";
import { services } from "@/content/hyperaware";
import { placeholderVisuals } from "@/content/placeholderVisuals";
import { shouldUseLiteMotion, getOptimizedImageUrl } from "@/lib/performance";

const storySlides = [
  {
    slug: "social-media",
    eyebrow: "Slide 01",
    visual: placeholderVisuals.socialMedia.instagramGrids[0],
    mockups: ["Grid systems", "Reels", "Carousels"],
    accent: "from-[hsl(191_78%_48%/0.24)]",
  },
  {
    slug: "content-creation",
    eyebrow: "Slide 02",
    visual: placeholderVisuals.contentCreation.fashionShoots[0],
    mockups: ["Campaign shoots", "Product assets", "Launch content"],
    accent: "from-[hsl(302_83%_68%/0.22)]",
  },
  {
    slug: "performance-marketing",
    eyebrow: "Slide 03",
    visual: placeholderVisuals.performanceMarketing.analyticsDashboards[0],
    mockups: ["Meta ads", "Google ads", "Reporting"],
    accent: "from-[hsl(266_80%_52%/0.22)]",
  },
  {
    slug: "branding",
    eyebrow: "Slide 04",
    visual: placeholderVisuals.branding.moodboards[0],
    mockups: ["Identity", "Visual system", "Brand rules"],
    accent: "from-[hsl(218_86%_58%/0.18)]",
  },
  {
    slug: "photo-videography",
    eyebrow: "Slide 05",
    visual: placeholderVisuals.videography.cameraSetups[0],
    mockups: ["Photography", "Videography", "Edits"],
    accent: "from-[hsl(153_72%_48%/0.18)]",
  },
] as const;

const slides = storySlides
  .map((slide) => {
    const service = services.find((item) => item.slug === slide.slug);
    return service ? { ...slide, service } : null;
  })
  .filter(Boolean);

const copyGroupVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.075,
      staggerDirection: -1,
    },
  },
};

const copyItemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.6, ease: [0.55, 0.08, 0.28, 0.98] },
  },
};

const wordGroupVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.032,
      staggerDirection: -1,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -18,
    transition: { duration: 0.42, ease: [0.55, 0.08, 0.28, 0.98] },
  },
};

const visualVariants = {
  hidden: { opacity: 0, y: 46, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -52,
    scale: 0.985,
    transition: { duration: 0.78, ease: [0.55, 0.08, 0.28, 0.98] },
  },
};

const AnimatedTitle = ({ text }: { text: string }) => (
  <motion.h3
    variants={wordGroupVariants}
    className="mt-4 text-4xl font-black leading-none tracking-tight sm:text-5xl"
  >
    {text.split(/\s+/).map((word, index) => (
      <motion.span key={`${word}-${index}`} variants={wordVariants} className="mr-[0.22em] inline-block">
        {word}
      </motion.span>
    ))}
  </motion.h3>
);

const AnimatedParagraph = ({ text }: { text: string }) => (
  <motion.p
    variants={wordGroupVariants}
    className="mt-6 max-w-xl text-lg leading-relaxed text-[hsl(266_35%_24%)]/72"
  >
    {text.split(/\s+/).map((word, index) => (
      <motion.span key={`${word}-${index}`} variants={wordVariants} className="mr-[0.22em] inline-block">
        {word}
      </motion.span>
    ))}
  </motion.p>
);

const PinnedServicesStory = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const liteMotion = shouldUseLiteMotion();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.35,
  });
  const progressScale = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.min(slides.length - 1, Math.max(0, Math.floor(latest * slides.length)));
    setActiveIndex(next);
  });

  // Desktop-only: lock scroll to one-slide-per-wheel so aggressive scrolling
  // can never skip slides. Mobile carousel is unaffected (early return).
  useEffect(() => {
    if (isMobile) return;
    if (typeof window === "undefined") return;

    const slideCount = slides.length;
    const lockedRef = { current: false };
    const gestureFiredRef = { current: false };
    let lastWheelTime = 0;
    let gestureResetTimer = 0;
    const GESTURE_GAP_MS = 180;
    let rafId = 0;

    const computeFrame = () => {
      const section = sectionRef.current;
      if (!section) return null;
      const rect = section.getBoundingClientRect();
      const sectionTopDoc = rect.top + window.scrollY;
      const runway = section.offsetHeight - window.innerHeight;
      if (runway <= 0) return null;
      // Mid-range scroll position of each slide, so activeIndex
      // (= Math.floor(progress * N)) is stably the slide we landed on.
      const positions: number[] = [];
      for (let i = 0; i < slideCount; i++) {
        positions.push(sectionTopDoc + ((i + 0.5) / slideCount) * runway);
      }
      return { sectionTopDoc, runway, positions, rectTop: rect.top, rectBottom: rect.bottom };
    };

    const isPinned = (frame: { rectTop: number; rectBottom: number }) =>
      frame.rectTop <= 0 && frame.rectBottom >= window.innerHeight;

    const animateScrollTo = (target: number, onDone: () => void) => {
      const start = window.scrollY;
      const dist = target - start;
      if (Math.abs(dist) < 1) {
        onDone();
        return;
      }
      const duration = 520;
      const startTime = performance.now();
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const step = (now: number) => {
        const t = Math.min(1, (now - startTime) / duration);
        window.scrollTo(0, start + dist * ease(t));
        if (t < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          onDone();
        }
      };
      rafId = requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      const frame = computeFrame();
      if (!frame) return;
      if (!isPinned(frame)) return;

      const now = performance.now();
      const sincePrev = now - lastWheelTime;
      lastWheelTime = now;

      // Continuous wheel/trackpad bursts keep firing events with small gaps;
      // we treat them as one gesture and reset only after a quiet GESTURE_GAP_MS.
      if (gestureResetTimer) window.clearTimeout(gestureResetTimer);
      gestureResetTimer = window.setTimeout(() => {
        gestureFiredRef.current = false;
      }, GESTURE_GAP_MS);

      // Inside the pinned region: always intercept native scroll.
      // Decision below is whether THIS event triggers a slide advance.
      const dir = e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0;
      if (dir === 0) return;

      const currentY = window.scrollY;
      const progress = Math.max(0, Math.min(0.9999, (currentY - frame.sectionTopDoc) / frame.runway));
      const currentSlide = Math.floor(progress * slideCount);
      const targetIdx = currentSlide + dir;

      // Boundary release: at first/last slide, scrolling outward exits the section.
      // Only release when this is a *fresh* gesture (gap > GESTURE_GAP_MS), so
      // momentum tail-events from a mid-section swipe don't accidentally exit.
      if (targetIdx < 0 || targetIdx >= slideCount) {
        if (sincePrev > GESTURE_GAP_MS && !lockedRef.current) return;
        e.preventDefault();
        return;
      }

      e.preventDefault();

      // One advance per gesture: swallow follow-up events until the quiet gap.
      if (lockedRef.current || gestureFiredRef.current) return;

      gestureFiredRef.current = true;
      lockedRef.current = true;
      animateScrollTo(frame.positions[targetIdx], () => {
        lockedRef.current = false;
      });
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      if (rafId) cancelAnimationFrame(rafId);
      if (gestureResetTimer) window.clearTimeout(gestureResetTimer);
    };
  }, [isMobile]);

  const activeSlide = slides[activeIndex] ?? slides[0];
  const Icon = activeSlide.service.icon;

  const slideTags = useMemo(
    () => activeSlide.service.deliverables.slice(0, 4),
    [activeSlide.service.deliverables],
  );

  const handleMobileScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    if (clientWidth > 0) {
      const index = Math.round(scrollLeft / clientWidth);
      setMobileIndex(index);
    }
  };

  if (isMobile) {
    return (
      <section className="py-10 px-4 md:px-6 w-full flex flex-col gap-6" aria-label="Hyperaware services storytelling">
        <div className="w-full">
          <p className="hyper-eyebrow text-xs uppercase tracking-widest text-[hsl(266_70%_25%)] opacity-70">Services</p>
          <h2 className="text-2xl font-black mt-2 text-balance leading-tight text-[hsl(266_70%_18%)]">
            What Hyperaware can build for your brand.
          </h2>
        </div>

        {/* Snap Carousel */}
        <div 
          ref={scrollRef}
          onScroll={handleMobileScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-4 w-full"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {slides.map((slide, index) => {
            if (!slide) return null;
            const IconComponent = slide.service.icon;
            const tags = slide.service.deliverables.slice(0, 3);
            return (
              <div 
                key={slide.slug} 
                className="w-[82vw] max-w-sm shrink-0 snap-center flex flex-col gap-4 bg-white/40 backdrop-blur-md border border-[hsl(266_65%_25%)]/10 rounded-2xl p-5 shadow-xs active:scale-[0.98] transition-transform duration-200"
              >
                {/* Visual Image with Badge & Mockups */}
                <Link to={`/services/${slide.service.slug}`} className="relative block w-full aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-[hsl(266_65%_25%)]/10">
                  <img 
                    src={getOptimizedImageUrl(slide.visual, 500)} 
                    alt={`${slide.service.title} showcase`} 
                    className="w-full h-full object-cover opacity-90"
                    loading="lazy"
                  />
                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1.5 rounded-full flex items-center gap-1.5 font-bold">
                    <span className="w-4 h-4 flex items-center justify-center">
                      <IconComponent className="h-3.5 w-3.5" />
                    </span>
                    <span>{slide.service.title}</span>
                  </div>
                  {/* Mockups overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                    {slide.mockups.map((mockup) => (
                      <span key={mockup} className="bg-white/85 text-black text-[10px] px-2 py-0.5 rounded-md font-semibold shadow-xs">
                        {mockup}
                      </span>
                    ))}
                  </div>
                </Link>

                {/* Details */}
                <div className="flex flex-col gap-2">
                  <p className="hyper-eyebrow text-xs opacity-75">{slide.eyebrow}</p>
                  <h3 className="text-xl font-bold leading-tight text-[hsl(266_70%_18%)]">
                    {slide.service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[hsl(266_35%_24%)]/85">
                    {slide.service.detail}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {tags.map((tag) => (
                    <span key={tag} className="hyper-pill text-[10px] px-2.5 py-1 bg-purple-50/60 text-purple-900/80 border border-purple-100/40 rounded-full">
                      {tag}
                    </span>
                  ))}
                  {slide.service.deliverables.length > 3 && (
                    <span className="text-[10px] text-muted-foreground self-center ml-1">
                      +{slide.service.deliverables.length - 3} more
                    </span>
                  )}
                </div>

                {/* CTA */}
                <div className="mt-2">
                  <Link to={`/services/${slide.service.slug}`} className="hyper-button text-xs py-2 w-full justify-center">
                    Explore Service <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center items-center gap-2 mt-1">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (scrollRef.current) {
                  const width = scrollRef.current.clientWidth;
                  scrollRef.current.scrollTo({ left: width * index, behavior: 'smooth' });
                }
              }}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === mobileIndex ? "w-6 bg-purple-700" : "w-2 bg-purple-200"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="services-story" aria-label="Hyperaware services storytelling">
      <div className="services-story__sticky">
        <div className="services-story__bg" aria-hidden />
        <div className="services-story__inner">
          <div className="services-story__intro">
            <p className="hyper-eyebrow">Services</p>
            <h2 className="hyper-display mt-5 max-w-4xl text-balance">
              What Hyperaware can build for your brand.
            </h2>
          </div>

          <FadeContent
            blur={false}
            duration={800}
            threshold={0.16}
            initialOpacity={liteMotion ? 1 : 0}
            className="services-story__grid"
          >
            <div className="services-story__copy">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.slug}
                  variants={copyGroupVariants}
                  initial={liteMotion ? false : "hidden"}
                  animate="visible"
                  exit={liteMotion ? undefined : "exit"}
                >
                  <motion.p variants={copyItemVariants} className="hyper-eyebrow">{activeSlide.eyebrow}</motion.p>
                  <AnimatedTitle text={activeSlide.service.title} />
                  <AnimatedParagraph text={activeSlide.service.detail} />
                  <motion.div variants={copyItemVariants} className="mt-7 flex flex-wrap gap-2">
                    {slideTags.map((tag) => (
                      <span key={tag} className="hyper-pill">
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                  <motion.div variants={copyItemVariants}>
                  <Link to={`/services/${activeSlide.service.slug}`} className="hyper-button mt-8 w-fit">
                    Explore Service <ArrowRight className="h-4 w-4" />
                  </Link>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            <Link to={`/services/${activeSlide.service.slug}`} className="services-story__showcase" aria-label={`Open ${activeSlide.service.title}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.slug}
                  className={cn("services-story__visual", activeSlide.accent)}
                  variants={visualVariants}
                  initial={liteMotion ? false : "hidden"}
                  animate="visible"
                  exit={liteMotion ? undefined : "exit"}
                >
                  <div className="services-story__media">
                    <img src={activeSlide.visual} alt={`${activeSlide.service.title} showcase`} loading="eager" />
                  </div>
                  <div className="services-story__badge">
                    <span className="hyper-icon">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>{activeSlide.service.title}</span>
                  </div>
                  <div className="services-story__mockups">
                    {activeSlide.mockups.map((mockup, index) => (
                      <motion.span
                        key={mockup}
                        initial={liteMotion ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.34, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {mockup}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </Link>
          </FadeContent>

          <div className="services-story__footer" aria-hidden>
            <div className="services-story__track">
              <motion.span style={{ width: progressScale }} />
            </div>
            <div className="services-story__steps">
              {slides.map((slide, index) => (
                <span key={slide.slug} className={cn(index === activeIndex && "is-active")} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PinnedServicesStory;
