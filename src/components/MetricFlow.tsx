import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { resultsDashboard } from "@/content/hyperaware";
import { shouldUseLiteMotion } from "@/lib/performance";

/**
 * Parse a metric value like "25+", "12M+", "2.8K+" into the leading
 * numeric portion (number) and the rest (suffix). The count-up animates
 * the number; the suffix is appended verbatim.
 */
const parseMetric = (value: string) => {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return { number: 0, decimals: 0, suffix: value };
  const raw = match[1];
  const number = parseFloat(raw);
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  return { number, decimals, suffix: match[2] };
};

const formatCount = (current: number, decimals: number) =>
  decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString();

type CountUpProps = {
  target: number;
  decimals: number;
  suffix: string;
  start: boolean;
  duration?: number;
  delay?: number;
};

const CountUp = ({ target, decimals, suffix, start, duration = 1.4, delay = 0 }: CountUpProps) => {
  const [value, setValue] = useState(start ? target : 0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const startTime = performance.now() + delay * 1000;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // cubic-out

    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, elapsed / duration);
      setValue(target * ease(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration, delay]);

  return (
    <>
      <span className="metric-flow__value-number">{formatCount(value, decimals)}</span>
      <span className="metric-flow__value-suffix">{suffix}</span>
    </>
  );
};

const MetricFlow = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const liteMotion = shouldUseLiteMotion();
  const inView = useInView(sectionRef, { once: true, margin: "100px 0px" });

  // Scroll-driven progress for the connecting line draw.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 30%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    mass: 0.4,
  });
  const lineScale = useTransform(progress, [0, 1], [0, 1]);

  const metrics = resultsDashboard.slice(0, 4).map((m) => ({
    label: m.label,
    ...parseMetric(m.value),
    raw: m.value,
  }));

  return (
    <div ref={sectionRef} className="metric-flow">
      {/* Desktop horizontal connected metrics */}
      <div className="metric-flow__desktop">
        <div className="metric-flow__rail" aria-hidden>
          <div className="metric-flow__track">
            <motion.div
              className="metric-flow__track-fill"
              style={liteMotion ? { scaleX: 1 } : { scaleX: lineScale }}
            />
          </div>
        </div>

        <ol className="metric-flow__items">
          {metrics.map((metric, i) => (
            <motion.li
              key={metric.label}
              className="metric-flow__item"
              initial={liteMotion ? false : { opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{
                duration: 0.6,
                delay: 0.06 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="metric-flow__node" aria-hidden />
              <h3 className="metric-flow__value">
                {liteMotion ? (
                  <>
                    <span className="metric-flow__value-number">
                      {formatCount(metric.number, metric.decimals)}
                    </span>
                    <span className="metric-flow__value-suffix">{metric.suffix}</span>
                  </>
                ) : (
                  <CountUp
                    target={metric.number}
                    decimals={metric.decimals}
                    suffix={metric.suffix}
                    start={inView}
                    delay={i * 0.08}
                  />
                )}
              </h3>
              <p className="metric-flow__label">{metric.label}</p>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Mobile compact 2x2 grid */}
      <div className="metric-flow__mobile">
        <ol className="metric-flow__mobile-grid">
          {metrics.map((metric, i) => (
            <motion.li
              key={metric.label}
              className="metric-flow__mobile-item"
              initial={liteMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
              transition={{
                duration: 0.5,
                delay: 0.05 + i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h3 className="metric-flow__value metric-flow__value--mobile">
                {liteMotion ? (
                  <>
                    <span className="metric-flow__value-number">
                      {formatCount(metric.number, metric.decimals)}
                    </span>
                    <span className="metric-flow__value-suffix">{metric.suffix}</span>
                  </>
                ) : (
                  <CountUp
                    target={metric.number}
                    decimals={metric.decimals}
                    suffix={metric.suffix}
                    start={inView}
                    delay={i * 0.08}
                  />
                )}
              </h3>
              <p className="metric-flow__label">{metric.label}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default MetricFlow;
