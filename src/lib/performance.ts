export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isTouchDevice = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0);

export const isLowEndDevice = () => {
  if (typeof window === "undefined") return false;

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    hardwareConcurrency?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };

  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  const lowCpu = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4;
  const saveData = nav.connection?.saveData === true;
  const slowNetwork = ["slow-2g", "2g", "3g"].includes(nav.connection?.effectiveType ?? "");
  const smallViewport = window.innerWidth <= 900;

  return prefersReducedMotion() || saveData || slowNetwork || ((smallViewport || isTouchDevice()) && (lowMemory || lowCpu));
};

export const shouldUseLiteMotion = () => prefersReducedMotion() || isLowEndDevice();

export const getOptimizedImageUrl = (url: string, width = 600): string => {
  if (!url) return url;
  if (url.includes("images.unsplash.com")) {
    const height = Math.round((width * 875) / 1400);
    return url
      .replace(/w=\d+/, `w=${width}`)
      .replace(/h=\d+/, `h=${height}`);
  }
  return url;
};
