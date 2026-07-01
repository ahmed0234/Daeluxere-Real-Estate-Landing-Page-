"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { RiPhoneLine } from "react-icons/ri";

const PHONE = "tel:+17209168926";
const PHONE_DISPLAY = "(720) 916-8926";

/* ── Motion variants ─────────────────────────────────── */

const navbarVariant = {
  initial: { opacity: 0, y: -18, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.82,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.05,
    },
  },
};

const logoVariant = {
  initial: { opacity: 0, x: -8 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.18 },
  },
};

const buttonVariant = {
  initial: { opacity: 0, x: 8 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.28 },
  },
};

/* ── Component ─────────────────────────────────────────── */

export default function Navbar() {
  return (
    <div className="w-full px-4 pt-4 md:px-5 md:pt-5">
      <motion.nav
        variants={navbarVariant}
        initial="initial"
        animate="animate"
        aria-label="Main navigation"
        style={{
          background: "rgba(249, 249, 249, 0.97)",
          border: "1px solid rgba(34, 34, 34, 0.07)",
          boxShadow:
            "0 2px 12px rgba(34, 34, 34, 0.055), 0 8px 32px rgba(34, 34, 34, 0.045), inset 0 1px 0 rgba(255,255,255,0.9)",
          borderRadius: "28px",
        }}
        className="flex h-[76px] items-center justify-between px-6 md:h-[84px] md:px-9"
      >
        {/* ── Logo ─────────────────────────────── */}
        <motion.div variants={logoVariant} initial="initial" animate="animate">
          <Link
            href="/"
            aria-label="Daeluxe — Luxury Real Estate Home"
            className="group inline-flex flex-col select-none"
          >
            <span className="flex items-baseline gap-[5px]">
              <span
                className="font-playfair font-semibold leading-none text-[#1A1714] transition-colors duration-300 group-hover:text-[#141210]"
                style={{
                  fontSize: "clamp(1.35rem, 2.2vw, 1.75rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                Dae
                <span className="italic font-medium text-[#8B7355]">luxe</span>
              </span>
              <span
                aria-hidden="true"
                className="mb-[3px] h-[5px] w-[5px] shrink-0 rounded-full bg-gradient-to-br from-[#DDC7A1] to-[#A17C5F] transition-transform duration-500 group-hover:scale-110"
                style={{ boxShadow: "0 0 8px rgba(221,199,161,0.45)" }}
              />
            </span>
            <span
              className="mt-1 font-sans text-[9px] font-semibold uppercase tracking-[0.28em] text-[#1A1714]/40 transition-colors duration-300 group-hover:text-[#8B7355]/70 md:text-[10px]"
            >
              Real Estate Advisors
            </span>
          </Link>
        </motion.div>

        {/* ── Call Us Now ─────────────────────────── */}
        <motion.div variants={buttonVariant} initial="initial" animate="animate">
          <CallButton />
        </motion.div>
      </motion.nav>
    </div>
  );
}

/* ── CallButton ─────────────────────────────────────── */

function CallButton() {
  return (
    <motion.a
      href={PHONE}
      aria-label={`Call us now at ${PHONE_DISPLAY}`}
      whileHover={{
        y: -2,
        boxShadow: [
          "0 14px 40px rgba(0,0,0,0.28)",
          "0 4px 12px rgba(0,0,0,0.16)",
          "inset 0 1px 0 rgba(255,255,255,0.12)",
          "0 0 0 1px rgba(221,199,161,0.18)",
        ].join(", "),
      }}
      whileTap={{ scale: 0.98, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative inline-flex cursor-pointer select-none items-center gap-2.5 overflow-hidden sm:gap-3"
      style={{
        borderRadius: "100px",
        paddingInline: "clamp(14px, 2vw, 22px)",
        paddingBlock: "clamp(9px, 1.2vw, 11px)",
        background:
          "linear-gradient(145deg, rgba(24,19,14,0.90) 0%, rgba(14,11,8,0.94) 100%)",
        backdropFilter: "blur(20px) saturate(1.55)",
        WebkitBackdropFilter: "blur(20px) saturate(1.55)",
        border: "1px solid rgba(221,199,161,0.26)",
        boxShadow: [
          "0 6px 24px rgba(0,0,0,0.22)",
          "0 2px 6px rgba(0,0,0,0.12)",
          "inset 0 1px 0 rgba(255,255,255,0.10)",
        ].join(", "),
      }}
    >
      {/* Top shimmer */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-3 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(221,199,161,0.45) 50%, transparent 100%)",
        }}
      />

      {/* Hover glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[100px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at 50% 120%, rgba(221,199,161,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Phone icon */}
      <span
        className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 group-hover:bg-[rgba(221,199,161,0.20)] sm:h-9 sm:w-9"
        style={{
          background:
            "linear-gradient(135deg, rgba(221,199,161,0.20) 0%, rgba(221,199,161,0.08) 100%)",
          border: "1px solid rgba(221,199,161,0.32)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)",
        }}
      >
        <RiPhoneLine className="text-[15px] text-[#E8D4B0] sm:text-base" />
      </span>

      {/* Label + number */}
      <span className="relative z-10 flex flex-col items-start gap-0.5 pr-0.5">
        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C9A573] sm:text-[11px]">
          Call Us Now
        </span>
        <span className="whitespace-nowrap font-sans text-[12px] font-semibold leading-none text-white transition-colors duration-300 group-hover:text-[#F5EDE0] sm:text-[13px]">
          {PHONE_DISPLAY}
        </span>
      </span>
    </motion.a>
  );
}
