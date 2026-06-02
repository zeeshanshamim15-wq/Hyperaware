import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
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

  // Coordinated animations using variant propagation.
  // There is only a single intersection observer on the parent section frame
  // with a safe trigger margin (120px) to prevent empty section spaces on tall screens.
  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.section
      className={cn(
        "perf-section relative flex min-h-0 scroll-mt-28 items-start justify-center px-5 pb-14 pt-24 text-[hsl(266_70%_18%)] sm:px-6 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-28",
        className,
      )}
      variants={containerVariants}
      initial={liteMotion ? false : "hidden"}
      whileInView={liteMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "120px 0px" }}
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
        <motion.div
          className={cn("relative z-10", contentClassName)}
          variants={contentVariants}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SectionFrame;
