import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import FadeContent from "@/components/FadeContent";
import RevealText from "@/components/RevealText";
import { shouldUseLiteMotion } from "@/lib/performance";

type SectionFrameProps = {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

const SectionFrame = ({
  eyebrow,
  title,
  children,
  className,
  contentClassName,
}: SectionFrameProps) => {
  const liteMotion = shouldUseLiteMotion();

  return (
    <motion.section
      className={cn(
        "perf-section relative flex min-h-0 scroll-mt-28 items-start justify-center px-5 pb-14 pt-24 text-[hsl(266_70%_18%)] sm:px-6 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-28",
        className,
      )}
      initial={liteMotion ? false : { opacity: 0, y: 28 }}
      whileInView={liteMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto w-full max-w-6xl">
        {(eyebrow || title) && (
          <div className="max-w-4xl">
            {eyebrow && (
              <RevealText as="p" mode="text" className="hyper-eyebrow">
                {eyebrow}
              </RevealText>
            )}
            {title && (
              <h1 className="hyper-display mt-5 text-balance">
                <RevealText as="span" mode="heading" className="block hyper-shine-text">
                  {title}
                </RevealText>
              </h1>
            )}
          </div>
        )}
        <FadeContent
          blur={false}
          duration={900}
          delay={90}
          threshold={0.18}
          initialOpacity={liteMotion ? 1 : 0}
          className={cn("relative z-10", contentClassName)}
        >
          <motion.div
            initial={liteMotion ? false : { opacity: 0, y: 16 }}
            whileInView={liteMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </FadeContent>
      </div>
    </motion.section>
  );
};

export default SectionFrame;
