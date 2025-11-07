import { useState, useEffect, Suspense, lazy, memo } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "./hooks/useLenis";
import { MotionConfig } from "framer-motion";

// Eager load critical components
import Navbar from "./Components/Navbar";
import NRoutes from "./Routes/NRoutes";
import LoadingScreen from "./Components/LoadingScreen";
import PageTransitionLoader from "./Components/PageTransitionLoader";

// Lazy load non-critical components
const Footer = lazy(() => import("./Components/Footer"));
const GreenDustBackground = lazy(() => import("./Components/GreenDustBackground"));

const App = () => {
  const location = useLocation();
  const [initialLoading, setInitialLoading] = useState(true);
  const [routeLoading, setRouteLoading] = useState(false);
  useLenis();

  // Optimized scroll to top with smooth behavior
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Initial loading with optimized timing
  useEffect(() => {
    const t = setTimeout(() => {
      setInitialLoading(false);
      // Preload footer after initial load
      import("./Components/Footer");
    }, 2200);
    return () => clearTimeout(t);
  }, []);

  // Route transition with reduced timing for smoother feel
  useEffect(() => {
    setRouteLoading(true);
    const t = setTimeout(() => setRouteLoading(false), 800);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.3, ease: "easeInOut" }}>
      <Suspense fallback={null}>
        <GreenDustBackground />
      </Suspense>
      <LoadingScreen visible={initialLoading} />
      <PageTransitionLoader visible={routeLoading && !initialLoading} />
      <div className="relative bg-black min-h-screen">
        <div className="select-none">
          <Navbar />
          <main className="pt-20 contain-layout">
            <Suspense fallback={<PageTransitionLoader visible={true} />}>
              <NRoutes />
            </Suspense>
          </main>
          <Suspense fallback={<div className="h-20" />}>
            <Footer />
          </Suspense>
        </div>
      </div>
    </MotionConfig>
  );
};

export default memo(App);
