"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

interface ConsultationFormHighlightProps {
  active: boolean;
}

/** Premium arrival overlay — shimmer sweep + glow ring (CTA-triggered only) */
export default function ConsultationFormHighlight({
  active,
}: ConsultationFormHighlightProps) {
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {active && (
        <>
          {/* Outer glow ring */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute -inset-[3px] rounded-[31px] border border-champagne-gold/40"
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.98 }}
            animate={{
              opacity: [0, 0.85, 0.45, 0],
              scale: reducedMotion ? 1 : [0.98, 1.012, 1.006, 1],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reducedMotion ? 0.35 : 2.2,
              ease: [0.22, 1, 0.36, 1],
              times: reducedMotion ? undefined : [0, 0.25, 0.55, 1],
            }}
            style={{
              boxShadow:
                "0 0 0 1px rgba(221,199,161,0.12), 0 0 40px rgba(221,199,161,0.22), 0 0 80px rgba(221,199,161,0.08)",
            }}
          />

          {/* Glass shimmer sweep */}
          {!reducedMotion && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[28px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <motion.span
                className="absolute inset-y-0 w-[55%] bg-gradient-to-r from-transparent via-white/[0.14] to-transparent"
                style={{ skewX: -12 }}
                initial={{ x: "-120%" }}
                animate={{ x: "220%" }}
                transition={{
                  duration: 0.95,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.12,
                }}
              />
            </motion.span>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
