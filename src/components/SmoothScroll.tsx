import Lenis from "lenis";
import { useEffect } from "react";
import { isTouchDevice, shouldUseLiteMotion } from "@/lib/performance";

const SmoothScroll = () => {
  useEffect(() => {
    if (shouldUseLiteMotion()) return;

    const lenis = new Lenis({
      duration: 0.72,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      autoResize: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
