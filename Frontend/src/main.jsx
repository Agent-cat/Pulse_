import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// Performance optimization: Defer non-critical tasks
const enablePerformanceOptimizations = () => {
  // Request idle callback for non-critical operations
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Preload critical resources
      const criticalImages = ['/img/pulse-logo.png'];
      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    });
  }
};

// Start performance optimizations
enablePerformanceOptimizations();

// Create root and render
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </BrowserRouter>
  </StrictMode>
);
