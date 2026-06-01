import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageShell from "./components/PageShell";
import SmoothScroll from "./components/SmoothScroll";
import { shouldUseLiteMotion } from "@/lib/performance";

const About = lazy(() => import("./pages/About"));
const ClientDetail = lazy(() => import("./pages/ClientDetail"));
const Clients = lazy(() => import("./pages/Clients"));
const Contact = lazy(() => import("./pages/Contact"));
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Services = lazy(() => import("./pages/Services"));

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  const liteMotion = shouldUseLiteMotion();

  // Reset scroll to top on every route change so each page enters from its start.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={liteMotion ? false : { opacity: 0, y: 14 }}
        animate={liteMotion ? undefined : { opacity: 1, y: 0 }}
        exit={liteMotion ? undefined : { opacity: 0, y: -10 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/work" element={<Portfolio />} />
            <Route path="/brands" element={<Navigate to="/clients" replace />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/:slug" element={<ClientDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SmoothScroll />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PageShell>
          <AnimatedRoutes />
        </PageShell>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
