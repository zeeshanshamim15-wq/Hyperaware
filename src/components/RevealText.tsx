import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  Fragment,
  useMemo,
  useState,
  type ComponentType,
  type ElementType,
} from "react";
import { cn } from "@/lib/utils";
import { shouldUseLiteMotion } from "@/lib/performance";

/**
 * RevealText — global premium word-by-word reveal.
 *
 * Each word fades in with a slight upward drift, staggered for an elegant
 * Apple / Awwwards feel. Animation is driven entirely by Framer Motion
 * variants so the whole block uses a SINGLE IntersectionObserver (the
 * container) and the words inherit their state — no per-word observers,
 * no re-render loops, GPU-only transform/opacity for 60fps under Lenis.
 *
 * Plays once when scrolled into view and never replays on scroll-back.
 */

type RevealMode = "heading" | "paragraph" | "text";

export type RevealSegment = {
  text: string;
  /** Optional class applied to every word in this segment (e.g. font-semibold). */
  className?: string;
};

type RevealTextProps = {
  /** Plain string content (the common case). */
  children?: string;
  /** Styled segments for mixed-weight headings; words stay one continuous stagger. */
  segments?: RevealSegment[];
  /** Element to render as the animated container. Defaults to a paragraph. */
  as?: ElementType;
  /** Tuning preset. Headings reveal slower + lift more; paragraphs reveal faster. */
  mode?: RevealMode;
  className?: string;
  /** Delay (s) before the first word begins. */
  delay?: number;
  /** Viewport intersection ratio that triggers the reveal. */
  amount?: number;
  /** Replay every time it enters view. Defaults to false (premium one-shot). */
  repeat?: boolean;
};

type Preset = {
  /** Per-word stagger in seconds (spec: 60–90ms). */
  stagger: number;
  /** Per-word duration in seconds (spec: 0.4–0.5s). */
  duration: number;
  /** Upward travel as % of the word's own height — scales with font size. */
  y: string;
  /** Hard cap on total stagger spread so long copy never lags ("chunk" fallback). */
  maxSpread: number;
};

const PRESETS: Record<RevealMode, Preset> = {
  // Large headings: slower reveal, slightly bigger movement.
  heading: { stagger: 0.085, duration: 0.5, y: "60%", maxSpread: 1.2 },
  // Paragraphs: faster reveal for readability.
  paragraph: { stagger: 0.06, duration: 0.42, y: "30%", maxSpread: 0.9 },
  // Labels, nav, contact lines, small copy.
  text: { stagger: 0.065, duration: 0.42, y: "42%", maxSpread: 0.8 },
};

const EASE = [0.22, 1, 0.36, 1] as const;

// Cache the motion-wrapped element factory per tag so the container component
// identity is stable across renders (recreating it would remount + replay).
const motionCache = new Map<ElementType, ComponentType<Record<string, unknown>>>();
const getMotionComponent = (as: ElementType) => {
  let component = motionCache.get(as);
  if (!component) {
    component = motion.create(as as ComponentType) as ComponentType<
      Record<string, unknown>
    >;
    motionCache.set(as, component);
  }
  return component;
};

const splitWords = (text: string) => text.trim().split(/\s+/).filter(Boolean);

const RevealText = ({
  children,
  segments,
  as = "p",
  mode = "text",
  className,
  delay = 0,
  amount = 0.3,
  repeat = false,
}: RevealTextProps) => {
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const liteMotion = shouldUseLiteMotion();
  const preset = PRESETS[mode];

  // Flatten content into a single word list, each tagged with its segment class.
  const words = useMemo(() => {
    if (segments?.length) {
      return segments.flatMap((segment) =>
        splitWords(segment.text).map((word) => ({
          word,
          className: segment.className,
        })),
      );
    }
    return splitWords(children ?? "").map((word) => ({ word, className: undefined }));
  }, [children, segments]);

  const fullText = useMemo(() => words.map((item) => item.word).join(" "), [words]);

  const Tag = as;
  const shouldRenderStatic =
    prefersReducedMotion ||
    liteMotion ||
    words.length === 0 ||
    (mode !== "heading" && words.length > 16);

  // Reduced motion (or empty) → render the text statically, styles preserved.
  if (shouldRenderStatic) {
    return (
      <Tag className={cn(className, "reveal-completed")}>
        {words.map((item, index) => (
          <Fragment key={`${item.word}-${index}`}>
            <span className={item.className}>{item.word}</span>
            {index < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </Tag>
    );
  }

  // Clamp the stagger so very long paragraphs cascade as quick chunks, not a crawl.
  const effectiveStagger = Math.min(preset.stagger, preset.maxSpread / words.length);

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: preset.y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: preset.duration, ease: EASE },
    },
  };

  const MotionTag = getMotionComponent(as);

  return (
    <MotionTag
      className={cn(className, animationCompleted && "reveal-completed")}
      aria-label={fullText}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, amount }}
      transition={{ staggerChildren: effectiveStagger, delayChildren: delay }}
      onAnimationComplete={(definition) => {
        if (definition === "visible") {
          setAnimationCompleted(true);
        }
      }}
      onAnimationStart={(definition) => {
        if (definition === "visible") {
          setAnimationCompleted(false);
        }
      }}
    >
      {words.map((item, index) => (
        <Fragment key={`${item.word}-${index}`}>
          <motion.span
            aria-hidden
            variants={wordVariants}
            className={cn("inline-block", item.className)}
            style={{ willChange: "transform, opacity" }}
          >
            {item.word}
          </motion.span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </MotionTag>
  );
};

export default RevealText;
