"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { ConsultationScrollProvider } from "@/components/providers/ConsultationScrollProvider";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.12,         // Smoothness interpolation (higher = faster and more responsive, lower = slower/floatier)
        duration: 1.0,      // Scroll duration in seconds
        smoothWheel: true,  // Smooth scroll for mouse wheels
        syncTouch: false,   // Keeps native kinetic touch scrolling on mobile devices for peak performance
      }}
    >
      <ConsultationScrollProvider>{children}</ConsultationScrollProvider>
    </ReactLenis>
  );
}
