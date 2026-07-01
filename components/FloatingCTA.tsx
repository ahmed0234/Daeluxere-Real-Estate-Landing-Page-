"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { useLenis } from "lenis/react";
import { RiPhoneLine, RiCalendarLine, RiArrowRightLine } from "react-icons/ri";

/* ─────────────────────────────────────────────
   Floating CTA
   Appears once the hero section leaves the viewport.
   Primary: "Get Free Consultation" — scrolls to the hero form.
   Secondary: "Call Us Now" — initiates a phone call.
───────────────────────────────────────────── */

const PHONE = "tel:+17209168926";
const PHONE_DISPLAY = "(720) 916-8926";

/* Gentle spring for magnetic hover effect on the primary button */
function useMagnetic(strength = 0.28) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.12 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.12 });
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }, [x, y, strength]);

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, springX, springY, onMove, onLeave };
}

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const heroRef = useRef<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const magnetic = useMagnetic(0.3);
  const lenis = useLenis();

  /* ── Track hero section visibility ── */
  useEffect(() => {
    // The hero `<main>` has the class "flex-1 flex flex-col"
    // Use the bento `<section>` inside it as sentinel
    heroRef.current = document.querySelector(
      "main > section.relative.flex-1.rounded-\\[32px\\]"
    ) ?? document.querySelector("main > section");

    if (!heroRef.current) {
      // Fallback: use the very first section on the page
      heroRef.current = document.querySelector("section");
    }

    if (!heroRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        // Show CTA when hero is NOT intersecting (scrolled past it)
        setVisible(!entry.isIntersecting);
      },
      {
        // Trigger when the hero is fully out of viewport
        threshold: 0,
        rootMargin: "0px 0px 0px 0px",
      }
    );

    observerRef.current.observe(heroRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  /* ── Scroll to consultation form with highlight ── */
  const handleConsultation = useCallback(() => {
    const form = document.getElementById("consultation");
    if (!form) return;

    if (lenis) {
      // Use Lenis scroll engine for flawless custom scroll
      lenis.scrollTo(form, {
        offset: -40,
        duration: 1.0,
        immediate: false,
        onComplete: () => {
          setIsHighlighting(true);
          form.classList.add("cta-highlight-active");
          setTimeout(() => {
            setIsHighlighting(false);
            form.classList.remove("cta-highlight-active");
          }, 1600);
        }
      });
    } else {
      // Fallback
      form.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        setIsHighlighting(true);
        form.classList.add("cta-highlight-active");
        setTimeout(() => {
          setIsHighlighting(false);
          form.classList.remove("cta-highlight-active");
        }, 1600);
      }, 700);
    }
  }, [lenis]);

  return (
    <>
      {/* ── Form highlight injection (keyframe via style tag) ── */}
      <style>{`
        @keyframes ctaFormPulse {
          0%   { box-shadow: 0 0 0 0 rgba(221,199,161,0), transform: scale(1); }
          30%  { box-shadow: 0 0 0 16px rgba(221,199,161,0.22), transform: scale(1.012); }
          65%  { box-shadow: 0 0 0 8px rgba(221,199,161,0.10); }
          100% { box-shadow: 0 0 0 0 rgba(221,199,161,0); transform: scale(1); }
        }
        .cta-highlight-active {
          animation: ctaFormPulse 1.6s cubic-bezier(0.22,1,0.36,1) forwards;
          outline: 1.5px solid rgba(221,199,161,0.55);
          outline-offset: 4px;
          border-radius: 20px;
          transition: outline 0.2s ease;
        }
      `}</style>

      <AnimatePresence>
        {visible && (
          <motion.div
            key="floating-cta"
            initial={{ opacity: 0, y: 24, scale: 0.94, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.94, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-4 z-50 flex flex-col gap-2.5 sm:right-6 md:bottom-8 md:right-8 w-[calc(100%-2rem)] max-w-[315px] sm:w-[315px]"
            aria-label="Floating contact options"
          >
            {/* ── Glass card wrapper ── */}
            <div
              className="relative overflow-hidden rounded-[22px] p-3 sm:p-3.5"
              style={{
                background:
                  "linear-gradient(145deg, rgba(20,15,10,0.82) 0%, rgba(12,9,6,0.90) 100%)",
                backdropFilter: "blur(28px) saturate(1.5)",
                WebkitBackdropFilter: "blur(28px) saturate(1.5)",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: [
                  "0 24px 64px rgba(0,0,0,0.38)",
                  "0 4px 12px rgba(0,0,0,0.22)",
                  "inset 0 1px 0 rgba(255,255,255,0.08)",
                  "0 0 0 1px rgba(221,199,161,0.06)",
                ].join(", "),
              }}
            >
              {/* Top shimmer */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(221,199,161,0.35)] to-transparent" />
              {/* Warm corner glow */}
              <div className="pointer-events-none absolute left-0 top-0 h-20 w-28 rounded-tl-[22px] bg-gradient-to-br from-[rgba(221,199,161,0.06)] to-transparent" />

              {/* ── Label ── */}
              {/* <div className="mb-2.5 flex items-center gap-2 px-1">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[#C9A573]"
                  style={{ boxShadow: "0 0 6px 2px rgba(201,165,115,0.55)" }}
                />
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">
                  Daeluxe
                </span>
              </div> */}

              {/* ── Primary CTA ── */}
              <motion.button
                ref={magnetic.ref}
                onClick={handleConsultation}
                onMouseMove={magnetic.onMove}
                onMouseLeave={magnetic.onLeave}
                style={{ x: magnetic.springX, y: magnetic.springY }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group cursor-pointer relative w-full overflow-hidden rounded-[14px] px-4 py-3 text-left sm:px-5 sm:py-3.5"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(221,199,161,0.18) 0%, rgba(221,199,161,0.07) 100%)",
                  border: "1px solid rgba(221,199,161,0.28)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)",
                } as React.CSSProperties}
              >
                {/* Button shimmer on hover */}
                <motion.span
                  className="pointer-events-none absolute inset-0 rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 0%, rgba(221,199,161,0.12) 0%, transparent 70%)",
                  }}
                />
                <span className="relative flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2.5">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(221,199,161,0.22) 0%, rgba(221,199,161,0.08) 100%)",
                        border: "1px solid rgba(221,199,161,0.30)",
                      }}
                    >
                      <RiCalendarLine className="text-[#DDC7A1] text-sm" />
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C9A573]">
                        Free
                      </span>
                      <span className="font-sans text-[14px] font-bold leading-none text-white">
                        Consultation
                      </span>
                    </span>
                  </span>
                  <motion.span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 group-hover:border-[rgba(221,199,161,0.5)] group-hover:text-[#DDC7A1]"
                    style={{ transition: "all 0.3s ease" }}
                    whileHover={{ rotate: -45 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <RiArrowRightLine className="text-xs" />
                  </motion.span>
                </span>
              </motion.button>

              {/* ── Divider ── */}
              <div className="my-2.5 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

              {/* ── Secondary CTA: Call Now ── */}
              <motion.a
                href={PHONE}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="group flex w-full items-center gap-3 rounded-[14px] px-4 py-2.5 sm:px-5 sm:py-3"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "border-color 0.3s ease, background 0.3s ease",
                }}
                aria-label={`Call us at ${PHONE_DISPLAY}`}
              >
                {/* Pulsing phone icon container */}
                <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.07] transition-colors duration-300 group-hover:bg-white/[0.12]">
                  {/* Pulse ring */}
                  <motion.span
                    className="absolute inset-0 rounded-full border border-white/15"
                    animate={{ scale: [1, 1.55], opacity: [0.6, 0] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeOut",
                      repeatDelay: 0.6,
                    }}
                  />
                  <RiPhoneLine className="relative text-white/75 text-sm group-hover:text-white transition-colors duration-300" />
                </span>

                <span className="flex flex-col gap-px">
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40 group-hover:text-white/60 transition-colors duration-300">
                    Call Us Now
                  </span>
                  <span className="font-sans text-[13px] font-bold leading-none text-white/80 group-hover:text-white transition-colors duration-300">
                    {PHONE_DISPLAY}
                  </span>
                </span>
              </motion.a>
            </div>

            {/* ── Dismiss hint (tiny) ── */}
            <motion.p
              className="text-center font-sans text-[10px] text-black/25 dark:text-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Scroll up to dismiss
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
