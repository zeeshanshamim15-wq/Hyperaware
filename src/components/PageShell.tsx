import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { shouldUseLiteMotion } from "@/lib/performance";

const ColorBends = lazy(() => import("@/components/ColorBends"));

type PageShellProps = {
  children: ReactNode;
};

const PageShell = ({ children }: PageShellProps) => {
  // Defer mounting the heavy WebGL background until after first paint and
  // skip it entirely on lite-motion (low-end, save-data, reduced-motion).
  const [showBends, setShowBends] = useState(false);

  useEffect(() => {
    if (shouldUseLiteMotion()) return;

    const idle =
      (window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      }).requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 600));

    const id = idle(() => setShowBends(true), { timeout: 1500 });

    return () => {
      const cancel =
        (window as Window & { cancelIdleCallback?: (id: number) => void })
          .cancelIdleCallback ?? window.clearTimeout;
      cancel(id as number);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-[hsl(266_70%_18%)]">
      <div
        aria-hidden
        className="fixed inset-0 z-0 bg-white"
        style={{
          backgroundImage:
            "radial-gradient(1200px 600px at 50% -10%, hsl(270 100% 99%) 0%, hsl(0 0% 100%) 58%, hsl(270 70% 98%) 100%)",
        }}
      />
      {showBends ? (
        <div aria-hidden className="fixed inset-0 z-0">
          <Suspense fallback={null}>
            <ColorBends
              colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
              rotation={90}
              speed={0.2}
              scale={1}
              frequency={1}
              warpStrength={1}
              mouseInfluence={1}
              noise={0.15}
              parallax={0.5}
              iterations={1}
              intensity={1.5}
              bandWidth={6}
              transparent
            />
          </Suspense>
        </div>
      ) : null}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(1120px 540px at 50% 45%, hsl(0 0% 100% / 0.64), hsl(0 0% 100% / 0.34) 62%, transparent 86%), linear-gradient(180deg, hsl(0 0% 100% / 0.18), hsl(0 0% 100% / 0.28))",
        }}
      />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
};

export default PageShell;
