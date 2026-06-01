import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { BarChart3, Camera, Palette, Rocket, Route, Search, Scissors, ArrowRight } from "lucide-react";
import SectionFrame from "@/components/SectionFrame";
import { allServices, faqItems, processSteps } from "@/content/hyperaware";
import {
  onImageError,
  serviceVisualFallback,
  serviceVisuals,
} from "@/content/placeholderVisuals";
import { getOptimizedImageUrl } from "@/lib/performance";
import { cn } from "@/lib/utils";

const processIcons = [Search, Route, Palette, Camera, Scissors, Rocket, BarChart3];

const Services = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMobileScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft } = scrollRef.current;
    const cardElement = scrollRef.current.firstElementChild as HTMLElement;
    if (cardElement) {
      const cardWidth = cardElement.offsetWidth + 16; // card width + gap (gap-4 = 16px)
      const index = Math.round(scrollLeft / cardWidth);
      setMobileIndex(Math.min(allServices.length - 1, Math.max(0, index)));
    }
  };

  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return;
    const cardElement = scrollRef.current.firstElementChild as HTMLElement;
    if (cardElement) {
      const cardWidth = cardElement.offsetWidth + 16;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
      setMobileIndex(index);
    }
  };

  return (
    <>
      <SectionFrame title="Services" contentClassName="mt-8">
        {isMobile ? (
          <div className="flex flex-col gap-4">
            <div
              ref={scrollRef}
              onScroll={handleMobileScroll}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-4 px-1 w-full"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {allServices.map((service) => {
                const Icon = service.icon;
                const media = serviceVisuals[service.slug] ?? serviceVisualFallback;
                return (
                  <Link
                    key={service.title}
                    to={`/services/${service.slug}`}
                    className="hyper-panel service-detail-card shrink-0 snap-center flex flex-col overflow-hidden p-0 w-[80vw] max-w-[290px] border border-[hsl(266_35%_24%)]/10 bg-white/40 active:scale-[0.98] transition-transform duration-200"
                    style={{ contentVisibility: 'auto' }}
                  >
                    {/* Visual Image - Reduced height significantly */}
                    <div className="relative w-full h-24 overflow-hidden border-b border-[hsl(266_35%_24%)]/10">
                      <img
                        src={getOptimizedImageUrl(media.hero, 400)}
                        alt={`${service.title}`}
                        className="w-full h-full object-cover opacity-70"
                        loading="lazy"
                        decoding="async"
                        onError={onImageError}
                      />
                    </div>
                    {/* Body */}
                    <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                      <div>
                        {/* Icon & Title */}
                        <div className="flex items-center gap-2.5">
                          <span className="hyper-icon h-7 w-7 text-xs shrink-0 bg-[hsl(266_70%_18%)] text-white rounded-full flex items-center justify-center">
                            <Icon className="h-4 w-4" />
                          </span>
                          <h2 className="text-base font-black uppercase tracking-tight text-[hsl(266_70%_18%)] line-clamp-1">
                            {service.title}
                          </h2>
                        </div>
                        {/* Short Description */}
                        <p className="mt-2 text-xs leading-snug text-[hsl(266_35%_24%)]/80 line-clamp-2">
                          {service.intro}
                        </p>
                      </div>
                      
                      {/* Footer / Info */}
                      <div className="flex items-center justify-between mt-1 pt-2 border-t border-[hsl(266_35%_24%)]/5">
                        {/* Deliverables pill / text count */}
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[hsl(266_45%_25%)]/60 bg-[hsl(266_35%_24%)]/5 px-2 py-0.5 rounded-full">
                          +{service.deliverables.length} Deliverables
                        </span>
                        {/* CTA */}
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[hsl(266_70%_18%)] flex items-center gap-1">
                          View Details <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            {/* Dots indicator */}
            <div className="flex justify-center gap-1.5 mt-2">
              {allServices.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToCard(idx)}
                  aria-label={`Go to service card ${idx + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    mobileIndex === idx ? "w-5 bg-[hsl(266_70%_18%)]" : "w-1.5 bg-[hsl(266_35%_24%)]/20"
                  )}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="mobile-rail services-grid grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {allServices.map((service) => {
              const Icon = service.icon;
              const media = serviceVisuals[service.slug] ?? serviceVisualFallback;
              return (
                <Link key={service.title} to={`/services/${service.slug}`} className="hyper-panel service-detail-card block overflow-hidden p-0">
                  <div className="service-detail-card__visual">
                    <img src={media.hero} alt={`${service.title} placeholder`} loading="lazy" decoding="async" onError={onImageError} />
                  </div>
                  <div className="p-7 service-detail-card__body">
                  <div className="flex items-start gap-4">
                    <span className="hyper-icon">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-2xl font-black uppercase tracking-tight">
                        {service.title}
                      </h2>
                      <p className="mt-4 text-xl leading-snug">
                        {service.intro}
                      </p>
                      <p className="mt-3 hidden text-lg leading-relaxed text-[hsl(266_45%_25%)]/75 lg:block">
                        {service.detail}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.deliverables.map((item) => (
                      <span key={item} className="hyper-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </SectionFrame>

      <SectionFrame eyebrow="Process" title="How the service system moves from idea to scale." contentClassName="mt-12">
        <div className="mobile-rail grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <div key={step} className="hyper-panel p-6">
              <span className="hyper-icon mb-5">
                {(() => {
                  const Icon = processIcons[index] ?? Search;
                  return <Icon className="h-5 w-5" />;
                })()}
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[hsl(266_45%_25%)]/55">
                {`Step ${index + 1}`}
              </p>
              <h2 className="mt-4 text-2xl font-semibold">
                {step}
              </h2>
            </div>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="FAQ" title="Service questions brands ask before starting." contentClassName="mt-12">
        <div className="mobile-rail grid gap-4 md:grid-cols-2">
          {faqItems.map((item) => (
            <article key={item.question} className="hyper-panel p-6">
              <h2 className="text-xl font-black">
                {item.question}
              </h2>
              <p className="mt-4 leading-relaxed text-[hsl(266_35%_24%)]/72">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
        <Link to="/contact" className="hyper-button mt-10">
          Get a Rate Card
        </Link>
      </SectionFrame>
    </>
  );
};

export default Services;
