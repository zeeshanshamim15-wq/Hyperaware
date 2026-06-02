import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import RevealText from "@/components/RevealText";
import { journeyMilestones } from "@/content/hyperaware";
import { shouldUseLiteMotion } from "@/lib/performance";
import { cn } from "@/lib/utils";

/**
 * Premium vertical timeline used as the About page hero.
 * - Center spine draws itself as the section scrolls into view
 *   (scaleY mapped from scrollYProgress, smoothed by a spring).
 * - Phase markers fade + scale in once each card crosses the viewport.
 * - Cards slide in from alternating sides on desktop, stack with a
 *   left-rail on mobile.
 */
const JourneyTimeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const liteMotion = shouldUseLiteMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4,
  });
  const lineScale = useTransform(lineProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      aria-label="Our journey"
      className="journey relative w-full"
    >
      <div className="journey__intro mx-auto max-w-3xl text-center">
        <p className="hyper-eyebrow">Our Journey</p>
        <h1 className="hyper-display mt-5 text-balance">
          <RevealText as="span" mode="heading" className="block hyper-shine-text">
            From An Agency To A Connected Growth System
          </RevealText>
        </h1>
        <p className="journey__subtitle mt-6">
          Every phase shaped how Hyperaware operates today — a connected
          digital system built around clarity, content, and measurable
          brand growth.
        </p>
      </div>

      <div className="journey__rail">
        {/* Static track */}
        <div className="journey__track" aria-hidden>
          {/* Animated fill — scaleY driven by scroll progress */}
          <motion.div
            className="journey__track-fill"
            style={liteMotion ? { scaleY: 1 } : { scaleY: lineScale }}
          />
        </div>

        <ul className="journey__list" role="list">
          {journeyMilestones.map((milestone, index) => {
            const side = index % 2 === 0 ? "left" : "right";
            return (
              <li
                key={milestone.title}
                className={cn(
                  "journey__milestone",
                  side === "left"
                    ? "journey__milestone--left"
                    : "journey__milestone--right",
                )}
              >
                <motion.span
                  className="journey__marker"
                  initial={liteMotion ? false : { opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "80px 0px" }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.05,
                  }}
                  aria-hidden
                >
                  <span className="journey__marker-core" />
                </motion.span>

                <motion.article
                  className="journey__card"
                  initial={
                    liteMotion
                      ? false
                      : {
                          opacity: 0,
                          x: side === "left" ? -42 : 42,
                        }
                  }
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "80px 0px" }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.1,
                  }}
                >
                  <p className="journey__phase hyper-eyebrow">
                    {milestone.phase}
                  </p>
                  <h2 className="journey__card-title">{milestone.title}</h2>
                  <p className="journey__card-body">{milestone.body}</p>
                </motion.article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default JourneyTimeline;
