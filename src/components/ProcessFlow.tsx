import { useRef, type ComponentType } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  BarChart3,
  Camera,
  Palette,
  Rocket,
  Route,
  Scissors,
  Search,
  type LucideIcon,
} from "lucide-react";
import RevealText from "@/components/RevealText";
import { processSteps } from "@/content/hyperaware";
import { shouldUseLiteMotion } from "@/lib/performance";
import { cn } from "@/lib/utils";

export type ProcessFlowItem = {
  title: string;
  icon: LucideIcon;
};

const DEFAULT_ICONS: LucideIcon[] = [
  Search, // Discover
  Route, // Strategy
  Palette, // Create
  Camera, // Shoot
  Scissors, // Edit
  Rocket, // Launch
  BarChart3, // Scale
];

const DEFAULT_ITEMS: ProcessFlowItem[] = processSteps.map((title, i) => ({
  title,
  icon: DEFAULT_ICONS[i] ?? Search,
}));

const formatStepNumber = (i: number) => (i + 1).toString().padStart(2, "0");

interface ProcessFlowProps {
  items?: ProcessFlowItem[];
}

/**
 * Connected Process Line — replaces the static 7-card grid for processSteps
 * on both the Services and About pages.
 *
 * Desktop: horizontal connected flow. A single track runs through the
 * row, and a gradient fill scales from 0 → 1 as the section moves
 * through the viewport (driven by Framer useScroll + useSpring). Each
 * step has an icon disc, step number, and title; hover lifts the disc
 * and brightens its glow.
 *
 * Mobile: vertical connected timeline (left rail + icon disc + title).
 * Same line-draw mechanism, sequential reveal.
 */
const ProcessFlow = ({ items = DEFAULT_ITEMS }: ProcessFlowProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const liteMotion = shouldUseLiteMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 30%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    mass: 0.4,
  });
  const fillScale = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div ref={sectionRef} className="process-flow">
      {/* Desktop horizontal flow */}
      <div className="process-flow__desktop">
        <div className="process-flow__rail" aria-hidden>
          <div className="process-flow__track">
            <motion.div
              className="process-flow__track-fill process-flow__track-fill--horizontal"
              style={liteMotion ? { scaleX: 1 } : { scaleX: fillScale }}
            />
          </div>
        </div>

        <ol
          className="process-flow__steps"
          style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
        >
          {items.map((item, i) => {
            const Icon = item.icon as ComponentType<{ className?: string }>;
            return (
              <motion.li
                key={`${item.title}-${i}`}
                className="process-flow__step"
                initial={liteMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "80px 0px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="process-flow__disc" aria-hidden>
                  <Icon className="h-4 w-4" />
                </span>
                <span className="process-flow__num">{formatStepNumber(i)}</span>
                <h3 className="process-flow__title">
                  <RevealText as="span" mode="text">
                    {item.title}
                  </RevealText>
                </h3>
              </motion.li>
            );
          })}
        </ol>
      </div>

      {/* Mobile vertical flow */}
      <div className="process-flow__mobile">
        <div className="process-flow__track process-flow__track--vertical" aria-hidden>
          <motion.div
            className="process-flow__track-fill process-flow__track-fill--vertical"
            style={liteMotion ? { scaleY: 1 } : { scaleY: fillScale }}
          />
        </div>

        <ol className="process-flow__mobile-steps">
          {items.map((item, i) => {
            const Icon = item.icon as ComponentType<{ className?: string }>;
            return (
              <motion.li
                key={`${item.title}-${i}`}
                className="process-flow__mobile-step"
                initial={liteMotion ? false : { opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "80px 0px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="process-flow__disc process-flow__disc--mobile" aria-hidden>
                  <Icon className="h-4 w-4" />
                </span>
                <div className="process-flow__mobile-body">
                  <span className="process-flow__num">{formatStepNumber(i)}</span>
                  <h3 className={cn("process-flow__title", "process-flow__title--mobile")}>
                    {item.title}
                  </h3>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default ProcessFlow;
