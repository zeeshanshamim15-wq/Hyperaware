import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import hyperawareLogo from "@/assets/hyperaware-logo.png";
import { allServices } from "@/content/hyperaware";
import {
  onImageError,
  serviceVisualFallback,
  serviceVisuals,
} from "@/content/placeholderVisuals";
import { getOptimizedImageUrl, shouldUseLiteMotion } from "@/lib/performance";
import { cn } from "@/lib/utils";

/**
 * Single primary orbit. Each service sits on the same ring at an
 * evenly-distributed angular interval — angle = i * (360 / count).
 */
const ORBIT_SLUGS = [
  "branding",
  "social-media",
  "content-creation",
  "performance-marketing",
  "seo-organic-growth",
  "website-design-development",
  "ecommerce-platform-management",
] as const;

const ORBIT_RADIUS = 0.34; // fraction of stage width (~20% tighter)
const ORBIT_PERIOD_SEC = 90;
const HOVER_SPEED_FACTOR = 0.18;
const SPEED_LERP = 4;
const AUTO_ROTATE_MS = 4500;

// Compact on-orbit labels — keep visual hierarchy where the icon disc is the
// "planet" and the text is secondary. Full names are shown in the preview card.
const ORBIT_LABELS: Record<string, string> = {
  "branding": "Branding",
  "social-media": "Social Media",
  "content-creation": "Content",
  "performance-marketing": "Performance",
  "seo-organic-growth": "SEO",
  "website-design-development": "Web Design",
  "ecommerce-platform-management": "E-Commerce",
};

const SECTION_DESCRIPTION =
  "Strategy, creative, content, performance and ecommerce — every service plugged into the same operating system. Hover the logo to expand the orbit, then hover any service to focus.";

type OrbitNode = (typeof allServices)[number] & {
  baseAngle: number;
  label: string;
};

const ServiceOrbit = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const liteMotion = shouldUseLiteMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const mobileRailRef = useRef<HTMLDivElement>(null);

  const rotationRef = useRef(0);
  const currentSpeedRef = useRef(1);
  const targetSpeedRef = useRef(1);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const nodes = useMemo<OrbitNode[]>(() => {
    const step = 360 / ORBIT_SLUGS.length;
    return ORBIT_SLUGS.map((slug, i) => {
      const service = allServices.find((item) => item.slug === slug);
      if (!service) return null;
      return {
        ...service,
        baseAngle: i * step,
        label: ORBIT_LABELS[slug] ?? service.title,
      };
    }).filter(Boolean) as OrbitNode[];
  }, []);

  useEffect(() => {
    if (liteMotion) setExpanded(true);
  }, [liteMotion]);

  useEffect(() => {
    if (isMobile) return;
    if (liteMotion) return;
    if (!expanded) return;

    let raf = 0;
    let last = performance.now();
    const stage = stageRef.current;

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const cur = currentSpeedRef.current;
      const tgt = targetSpeedRef.current;
      currentSpeedRef.current = cur + (tgt - cur) * Math.min(1, dt * SPEED_LERP);

      rotationRef.current += currentSpeedRef.current * dt * (360 / ORBIT_PERIOD_SEC);

      if (stage) {
        stage.style.setProperty("--rotation", `${rotationRef.current.toFixed(3)}deg`);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [expanded, isMobile, liteMotion]);

  useEffect(() => {
    targetSpeedRef.current = hoverIndex !== null ? HOVER_SPEED_FACTOR : 1;
  }, [hoverIndex]);

  useEffect(() => {
    if (!expanded) return;
    if (hoverIndex !== null) return;
    if (nodes.length === 0) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % nodes.length);
    }, AUTO_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [expanded, hoverIndex, nodes.length]);

  const focusedIndex = hoverIndex ?? activeIndex;
  const activeNode = nodes[focusedIndex] ?? nodes[0];
  const ActiveIcon = activeNode?.icon;
  const media = activeNode
    ? serviceVisuals[activeNode.slug] ?? serviceVisualFallback
    : serviceVisualFallback;

  if (!activeNode) return null;

  // ===== Mobile (untouched per spec) =====
  if (isMobile) {
    const onMobileScroll = () => {
      if (!mobileRailRef.current) return;
      const first = mobileRailRef.current.firstElementChild as HTMLElement | null;
      if (!first) return;
      const cardWidth = first.offsetWidth + 10;
      const idx = Math.round(mobileRailRef.current.scrollLeft / cardWidth);
      setActiveIndex(Math.min(nodes.length - 1, Math.max(0, idx)));
    };

    return (
      <div className="service-orbit service-orbit--mobile">
        <p className="service-orbit__description mt-2">{SECTION_DESCRIPTION}</p>

        <div className="service-orbit__mobile-stage" aria-hidden>
          <span className="service-orbit__mobile-ring service-orbit__mobile-ring--outer" />
          <span className="service-orbit__mobile-ring" />
          <span className="service-orbit__mobile-ring service-orbit__mobile-ring--inner" />
          <div className="service-orbit__logo service-orbit__logo--mobile">
            <img src={hyperawareLogo} alt="Hyperaware" draggable={false} />
          </div>
          {nodes.map((node, i) => (
            <span
              key={node.slug}
              className={cn(
                "service-orbit__mobile-dot",
                i === activeIndex && "is-active",
              )}
              style={
                {
                  ["--angle" as string]: `${node.baseAngle}deg`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <div
          ref={mobileRailRef}
          onScroll={onMobileScroll}
          className="service-orbit__mobile-rail scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {nodes.map((node, i) => {
            const Icon = node.icon;
            return (
              <button
                key={node.slug}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "service-orbit__mobile-card",
                  i === activeIndex && "is-active",
                )}
              >
                <span className="service-orbit__mobile-card-icon">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="service-orbit__mobile-card-title">
                  {node.title}
                </span>
              </button>
            );
          })}
        </div>

        <div className="service-orbit__mobile-dots">
          {nodes.map((node, i) => (
            <span
              key={node.slug}
              className={cn(
                "service-orbit__mobile-pip",
                i === activeIndex && "is-active",
              )}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="service-orbit__preview"
          >
            <div className="service-orbit__preview-media">
              <img
                src={getOptimizedImageUrl(media.hero, 600)}
                alt={`${activeNode.title} preview`}
                onError={onImageError}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="service-orbit__preview-body">
              <div className="service-orbit__preview-head">
                <span className="hyper-icon">
                  {ActiveIcon ? <ActiveIcon className="h-5 w-5" /> : null}
                </span>
                <h3 className="service-orbit__preview-title">
                  {activeNode.title}
                </h3>
              </div>
              <p className="service-orbit__preview-copy">{activeNode.intro}</p>
              <div className="service-orbit__preview-pills">
                {activeNode.deliverables.slice(0, 4).map((item) => (
                  <span key={item} className="hyper-pill">
                    {item}
                  </span>
                ))}
              </div>
              <Link
                to={`/services/${activeNode.slug}`}
                className="hyper-button service-orbit__preview-cta"
              >
                Explore Service <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // ===== Desktop =====
  return (
    <div className="service-orbit">
      <p className="service-orbit__description">{SECTION_DESCRIPTION}</p>

      <div className="service-orbit__grid">
        <div
          ref={stageRef}
          className={cn(
            "service-orbit__stage",
            expanded && "service-orbit__stage--expanded",
            liteMotion && "service-orbit__stage--lite",
          )}
          onMouseEnter={() => setExpanded(true)}
          style={
            { ["--orbit-diameter" as string]: `${ORBIT_RADIUS * 200}%` } as React.CSSProperties
          }
        >
          {/* Main orbit path + one subtle inner ring */}
          <div className="service-orbit__rings" aria-hidden>
            <span className="service-orbit__orbit-ring" />
            <span className="service-orbit__orbit-ring service-orbit__orbit-ring--inner" />
          </div>

          {/* Connection line from logo to the focused node */}
          <div
            className={cn(
              "service-orbit__connector",
              hoverIndex !== null && "is-visible",
            )}
            style={
              {
                ["--connector-angle" as string]: `${activeNode.baseAngle}deg`,
              } as React.CSSProperties
            }
            aria-hidden
          />

          {/* Central glowing logo */}
          <button
            type="button"
            className="service-orbit__logo service-orbit__logo--button"
            onMouseEnter={() => setExpanded(true)}
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? "Collapse services orbit" : "Expand services orbit"}
          >
            <span className="service-orbit__logo-halo" aria-hidden />
            <span className="service-orbit__logo-ring" aria-hidden />
            <img src={hyperawareLogo} alt="Hyperaware" draggable={false} />
          </button>

          {/* Service nodes on a single orbit */}
          {nodes.map((node, i) => {
            const Icon = node.icon;
            const isFocused = i === focusedIndex;
            const isHovered = i === hoverIndex;
            return (
              <div
                key={node.slug}
                className="service-orbit__node-wrap"
                style={
                  {
                    ["--angle" as string]: `${node.baseAngle}deg`,
                  } as React.CSSProperties
                }
                aria-hidden={!expanded}
              >
                <div className="service-orbit__node-inner">
                  <button
                    type="button"
                    className={cn(
                      "service-orbit__node",
                      isFocused && "is-focused",
                      isHovered && "is-hovered",
                    )}
                    onMouseEnter={() => {
                      setHoverIndex(i);
                      setActiveIndex(i);
                    }}
                    onMouseLeave={() => setHoverIndex(null)}
                    onFocus={() => {
                      setHoverIndex(i);
                      setActiveIndex(i);
                    }}
                    onBlur={() => setHoverIndex(null)}
                    tabIndex={expanded ? 0 : -1}
                  >
                    <span className="service-orbit__node-disc">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="service-orbit__node-label">
                      {node.label}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="service-orbit__preview">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.slug}
              initial={liteMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={liteMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="service-orbit__preview-media">
                <img
                  src={getOptimizedImageUrl(media.hero, 720)}
                  alt={`${activeNode.title} preview`}
                  onError={onImageError}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="service-orbit__preview-body">
                <div className="service-orbit__preview-head">
                  <span className="hyper-icon">
                    {ActiveIcon ? <ActiveIcon className="h-5 w-5" /> : null}
                  </span>
                  <h3 className="service-orbit__preview-title">
                    {activeNode.title}
                  </h3>
                </div>
                <p className="service-orbit__preview-copy">{activeNode.intro}</p>
                <div className="service-orbit__preview-pills">
                  {activeNode.deliverables.slice(0, 4).map((item) => (
                    <span key={item} className="hyper-pill">
                      {item}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/services/${activeNode.slug}`}
                  className="hyper-button service-orbit__preview-cta"
                >
                  Explore Service <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ServiceOrbit;
