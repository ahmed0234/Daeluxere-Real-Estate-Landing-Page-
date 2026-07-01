"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLenis } from "lenis/react";
import { RiPhoneLine, RiCalendarLine } from "react-icons/ri";

/* ─────────────────────────────────────────────
   Floating CTA
   Appears once the hero section leaves the viewport.
   Primary: "Get Free Consultation" — scrolls to the hero form.
   Secondary: "Call Us Now" — initiates a phone call.
───────────────────────────────────────────── */

const PHONE = "tel:+17209168926";
const PHONE_DISPLAY = "(720) 916-8926";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lenis = useLenis();

  /* ── Track hero section visibility ── */
  useEffect(() => {
    heroRef.current =
      document.querySelector(
        "main > section.relative.flex-1.rounded-\\[32px\\]"
      ) ?? document.querySelector("main > section");

    if (!heroRef.current) {
      heroRef.current = document.querySelector("section");
    }

    if (!heroRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px" }
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

    const highlightForm = () => {
      form.classList.add("cta-highlight-active");
      setTimeout(() => {
        form.classList.remove("cta-highlight-active");
      }, 1600);
    };

    if (lenis) {
      lenis.scrollTo(form, {
        offset: -40,
        duration: 1.0,
        immediate: false,
        onComplete: highlightForm,
      });
    } else {
      form.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(highlightForm, 700);
    }
  }, [lenis]);

  return (
    <>
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
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-4 right-4 z-50 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6"
            aria-label="Floating contact options"
          >
            {/* Compact glass pill */}
            <div
              className="relative flex items-stretch overflow-hidden rounded-full"
              style={{
                background:
                  "linear-gradient(145deg, rgba(22,18,14,0.92) 0%, rgba(14,11,8,0.96) 100%)",
                backdropFilter: "blur(24px) saturate(1.6)",
                WebkitBackdropFilter: "blur(24px) saturate(1.6)",
                border: "1px solid rgba(221,199,161,0.22)",
                boxShadow: [
                  "0 12px 36px rgba(0,0,0,0.32)",
                  "0 4px 10px rgba(0,0,0,0.18)",
                  "inset 0 1px 0 rgba(255,255,255,0.10)",
                  "0 0 0 1px rgba(221,199,161,0.08)",
                ].join(", "),
              }}
            >
              {/* Top shimmer */}
              <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(221,199,161,0.45)] to-transparent" />
              {/* Warm corner glow */}
              <div className="pointer-events-none absolute left-0 top-0 h-full w-1/2 rounded-l-full bg-gradient-to-r from-[rgba(221,199,161,0.06)] to-transparent" />

              {/* Primary — Consultation */}
              <motion.button
                type="button"
                onClick={handleConsultation}
                whileTap={{ scale: 0.98 }}
                className="group relative flex cursor-pointer items-center gap-2 px-3 py-2.5 transition-colors duration-300 hover:bg-[rgba(221,199,161,0.08)] sm:gap-2.5 sm:px-4 sm:py-2.5"
                aria-label="Get a free consultation"
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300 group-hover:bg-[rgba(221,199,161,0.22)] sm:h-8 sm:w-8"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(221,199,161,0.22) 0%, rgba(221,199,161,0.10) 100%)",
                    border: "1px solid rgba(221,199,161,0.38)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
                  }}
                >
                  <RiCalendarLine className="text-[13px] text-[#E8D4B0] sm:text-sm" />
                </span>
                <span className="flex flex-col items-start gap-0 pr-0.5">
                  <span className="hidden font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#C9A573] sm:block">
                    Free
                  </span>
                  <span className="whitespace-nowrap font-sans text-[12px] font-semibold leading-none text-white transition-colors duration-300 group-hover:text-[#F5EDE0] sm:text-[13px]">
                    Consultation
                  </span>
                </span>
              </motion.button>

              {/* Divider */}
              <div className="my-2 w-px shrink-0 bg-gradient-to-b from-transparent via-[rgba(221,199,161,0.22)] to-transparent" />

              {/* Secondary — Call */}
              <motion.a
                href={PHONE}
                whileTap={{ scale: 0.98 }}
                className="group relative flex items-center gap-2 px-3 py-2.5 transition-colors duration-300 hover:bg-white/[0.06] sm:gap-2.5 sm:px-4 sm:py-2.5"
                aria-label={`Call us at ${PHONE_DISPLAY}`}
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300 group-hover:bg-white/[0.14] sm:h-8 sm:w-8"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.14)",
                  }}
                >
                  <RiPhoneLine className="text-[13px] text-white/90 transition-colors duration-300 group-hover:text-white sm:text-sm" />
                </span>
                <span className="flex flex-col items-start gap-0 pr-0.5">
                  <span className="hidden font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-white/55 transition-colors duration-300 group-hover:text-white/75 sm:block">
                    Call
                  </span>
                  <span className="whitespace-nowrap font-sans text-[12px] font-semibold leading-none text-white/90 transition-colors duration-300 group-hover:text-white sm:text-[13px]">
                    <span className="sm:hidden">Call Now</span>
                    <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
                  </span>
                </span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
