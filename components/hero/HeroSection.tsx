"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import {
  RiArrowRightLine,
  RiMapPin2Line,
  RiShieldCheckLine,
  RiPhoneLine,
  RiBuilding2Line,
  RiTeamLine,
  RiLineChartLine,
  RiStarFill,
} from "react-icons/ri";
import ConsultationWizard from "./ConsultationWizard";
import ConsultationFormHighlight from "./ConsultationFormHighlight";
import { useConsultationScroll } from "@/components/providers/ConsultationScrollProvider";

/* ── Motion variants ─────────────────────────────────── */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const wordVariant = {
  initial: { opacity: 0, y: 24, filter: "blur(5px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Stats data ────────────────────────────────────── */

const STATS = [
  {
    icon: RiBuilding2Line,
    num: 20,
    suffix: "+",
    prefix: "",
    label: "Years of Experience",
    decimals: 0,
  },
  {
    icon: RiTeamLine,
    num: 500,
    suffix: "+",
    prefix: "",
    label: "Happy Families Helped",
    decimals: 0,
  },
  {
    icon: RiLineChartLine,
    num: 250,
    suffix: "M+",
    prefix: "$",
    label: "Closed Transactions",
    decimals: 0,
  },
];

const HERO_TEAM = [
  { name: "Dae Han Trejo", src: "/Team/CEO.avif" },
  { name: "Vanessa Sanchez", src: "/Team/VanessaSanchez.avif" },
  { name: "Kyle Rupert", src: "/Team/KyleRupert.avif" },
  { name: "Mikaela Paclar", src: "/Team/MikaelaPaclar.avif" },
];

/* Border classes for 3-col grid */
const STAT_BORDERS = [
  "border-r border-white/[0.09]",
  "border-r border-white/[0.09]",
  "",
];

/* ── CountUp — animates 0 → target when scrolled into view ── */

function CountUp({
  to,
  duration = 1600,
  decimals = 0,
}: {
  to: number;
  duration?: number;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isInView) return;
    startRef.current = null;
    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * to).toFixed(decimals)));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, to, duration, decimals]);

  return <span ref={ref}>{count.toFixed(decimals)}</span>;
}

/* ── Component ─────────────────────────────────────────── */

export default function HeroSection() {
  const { isHighlighted } = useConsultationScroll();

  return (
    /* ── Hero bento wrapper — side + bottom gutters only (top handled by Navbar) ── */
    <main className="flex-1 flex flex-col px-2 sm:px-4 pb-4 md:px-5 md:pb-5">
      {/* ── Bento hero container ── */}
      <section className="relative flex-1 rounded-[32px] overflow-hidden bg-hard-ivory shadow-[0_8px_80px_rgba(34,34,34,0.13)]">
        {/* ── Background image ── */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.07 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/HeroBackgroundImage.webp"
            alt="Luxury modern home at golden hour — Denver, Colorado"
            fill
            priority
            quality={90}
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>

        {/* ── Overlays ── */}
        {/* Left directional gradient — preserves text legibility while revealing the architecture */}
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(to_right,rgba(8,6,4,0.72)_0%,rgba(8,6,4,0.46)_40%,rgba(8,6,4,0.14)_68%,rgba(8,6,4,0.02)_100%)]" />
        {/* Cinematic bottom vignette */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#100d08]/55 via-transparent to-transparent" />
        {/* Soft top fade */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#100d08]/25 via-transparent to-transparent" />

        {/* ── Content grid ── */}
        <div className="relative z-10 min-h-[92vh] grid grid-cols-1 lg:grid-cols-[1fr_520px] xl:grid-cols-[1fr_560px] 2xl:grid-cols-[1fr_580px] gap-6 px-4 sm:px-8 md:px-14 lg:px-16 py-10 md:py-14 lg:py-16 items-center">
          {/* ════════════════════════════════
              LEFT COLUMN
          ════════════════════════════════ */}
          <div className="flex flex-col justify-center">
            {/* Eyebrow */}
            <motion.div {...fadeUp(0.1)} className="mb-8">
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/35 max-sm:text-center bg-hard-ivory/10 text-white text-xs font-semibold tracking-[0.15em] uppercase backdrop-blur-sm">
                <RiMapPin2Line className="text-sm shrink-0" />
                Trusted Luxury Real Estate in Colorado
              </span>
            </motion.div>

            {/* H1 — staggered word reveal */}
            <motion.h1
              variants={stagger}
              initial="initial"
              animate="animate"
              className="leading-[1.05] mb-8"
            >
              <motion.span
                variants={wordVariant}
                className="block text-white text-5xl 2xl:text-7xl  font-bold tracking-[-0.01em]"
              >
                Helping Buyers & Sellers.
              </motion.span>
              <motion.span
                variants={wordVariant}
                className="block text-white font-playfair italic font-semibold text-5xl 2xl:text-7xl  tracking-[-0.01em]"
              >
                Find Their Perfect Home
              </motion.span>
              <motion.span
                variants={wordVariant}
                className="block text-white text-5xl 2xl:text-7xl  font-bold tracking-[-0.01em]"
              >
              
              </motion.span>
            </motion.h1>

            {/* Supporting copy */}
            <motion.p
              {...fadeUp(0.6)}
              className="text-white/95 text-base lg:text-lg 2xl:text-xl leading-normal mb-10 max-w-[500px]"
            >
              Whether you&apos;re buying your first home, upgrading to luxury
              living, or selling for maximum value our local experts guide you
              through every step with confidence.
            </motion.p>

            {/* ── Premium Stats Glass Card ── */}
            <motion.div
              {...fadeUp(0.72)}
              className="w-full max-w-[440px] mb-11"
            >
              <motion.div
                whileHover={{
                  y: -3,
                  transition: { type: "spring", stiffness: 280, damping: 22 },
                }}
                className="relative overflow-hidden rounded-[20px]"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(12, 10, 8, 0.38) 0%, rgba(20, 16, 12, 0.28) 100%)",
                  backdropFilter: "blur(40px) saturate(1.6) brightness(0.95)",
                  WebkitBackdropFilter:
                    "blur(40px) saturate(1.6) brightness(0.95)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  boxShadow: [
                    "0 12px 32px rgba(0,0,0,0.25)",
                    "0 2px 6px rgba(0,0,0,0.12)",
                    "inset 0 1px 0 rgba(255,255,255,0.08)",
                    "0 0 0 1px rgba(221,199,161,0.05)",
                  ].join(", "),
                }}
              >
                {/* Top shimmer — gold tinted */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne-gold/30 to-transparent pointer-events-none" />
                {/* Warm corner glow */}
                <div className="absolute top-0 left-0 w-32 h-20 bg-gradient-to-br from-champagne-gold/[0.05] to-transparent rounded-tl-[20px] pointer-events-none" />
                {/* Bottom vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/[0.10] via-transparent to-transparent pointer-events-none" />

                {/* 3-col responsive grid */}
                <div className="grid grid-cols-3">
                  {STATS.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={i}
                        whileHover={{
                          backgroundColor: "rgba(255,255,255,0.025)",
                        }}
                        transition={{ duration: 0.18 }}
                        className={`relative flex flex-col items-center justify-center gap-1 px-2.5 py-3 sm:px-4 sm:py-3.5 text-center ${STAT_BORDERS[i]}`}
                      >
                        {/* Icon ring */}
                        <motion.div
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          transition={{
                            type: "spring",
                            stiffness: 320,
                            damping: 20,
                          }}
                          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            background:
                              "linear-gradient(145deg, rgba(221,199,161,0.15) 0%, rgba(221,199,161,0.05) 100%)",
                            border: "1px solid rgba(221,199,161,0.22)",
                            boxShadow:
                              "0 0 10px rgba(221,199,161,0.10), inset 0 1px 0 rgba(255,255,255,0.10)",
                          }}
                        >
                          <Icon className="text-white text-sm" />
                        </motion.div>

                        {/* Animated number */}
                        <span
                          className="text-white font-bold leading-none tracking-tight"
                          style={{ fontSize: "clamp(1.15rem, 1.6vw, 1.4rem)" }}
                        >
                          {stat.prefix}
                          <CountUp to={stat.num} decimals={stat.decimals} />
                          {stat.suffix}
                        </span>

                        {/* Label */}
                        <span className="text-white/45 text-[9px] sm:text-[9.5px] tracking-[0.08em] uppercase leading-snug">
                          {stat.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>

            {/* CTA row */}
            <motion.div
              {...fadeUp(0.86)}
              className="flex flex-wrap items-center gap-6 sm:gap-8 mb-12"
            >
              {/* Primary CTA — frosted glass */}
              <motion.a
                href="#consultation"
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 16px 48px rgba(221,199,161,0.25), 0 0 0 1px rgba(221,199,161,0.4)",
                  background:
                    "linear-gradient(135deg, rgba(221, 199, 161, 0.24) 0%, rgba(221, 199, 161, 0.08) 100%)",
                }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-white font-bold text-sm tracking-[0.07em] uppercase transition-all duration-250 cursor-pointer"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(221, 199, 161, 0.18) 0%, rgba(221, 199, 161, 0.06) 100%)",
                  backdropFilter: "blur(24px) saturate(1.6)",
                  WebkitBackdropFilter: "blur(24px) saturate(1.6)",
                  border: "1px solid rgba(221, 199, 161, 0.35)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.16), 0 4px 20px rgba(0,0,0,0.15)",
                }}
              >
                {/* Inner top highlight */}
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne-gold/40 to-transparent" />
                Book a Free Consultation
                <RiArrowRightLine className="text-base text-white" />
              </motion.a>

              {/* Secondary decorative element next to CTA button */}
              <motion.a
                href="#success-stories"
                whileHover={{ x: 4 }}
                className="inline-flex items-center gap-2 text-white/70 hover:text-white text-[13px] font-bold tracking-[0.14em] uppercase transition-colors group cursor-pointer"
              >
                <span>Success Stories</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors group-hover:border-champagne-gold group-hover:bg-champagne-gold/15">
                  <RiArrowRightLine className="text-xs text-champagne-gold transition-transform group-hover:translate-x-0.5" />
                </span>
              </motion.a>
            </motion.div>

            {/* ── Meet Our Team Widget (Bottom highlighted area) ── */}
            <motion.div
              {...fadeUp(0.95)}
              className="mt-6 flex flex-wrap items-center gap-5 border border-white/5 bg-black/10 backdrop-blur-md rounded-2xl p-4 max-w-sm"
            >
              {/* Overlapping Avatar Stack */}
              <div className="flex -space-x-3.5 hover:-space-x-2 transition-all duration-300 ease-out cursor-pointer py-1">
                {HERO_TEAM.map((member) => (
                  <motion.div
                    key={member.name}
                    className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#120f0d] shadow-[0_4px_10px_rgba(0,0,0,0.4)]"
                    whileHover={{ 
                      y: -4, 
                      scale: 1.1, 
                      zIndex: 10,
                      boxShadow: "0 8px 16px rgba(221,199,161,0.25)"
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 15 }}
                  >
                    <Image
                      src={member.src}
                      alt={member.name}
                      fill
                      sizes="40px"
                      className="object-cover object-top"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Text info */}
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-champagne-gold/90">
                  Our Experts
                </span>
                <a
                  href="#team"
                  className="group flex items-center gap-1 text-white hover:text-champagne-gold font-bold text-sm tracking-wide transition-colors"
                >
                  Meet Our Team
                  <RiArrowRightLine className="text-xs text-champagne-gold transition-transform group-hover:translate-x-0.5" />
                </a>
                <span className="text-white/45 text-[10px] sm:text-[11px] leading-tight truncate">
                  Direct access to local luxury leaders
                </span>
              </div>
            </motion.div>
          </div>

          {/* ════════════════════════════════
              RIGHT COLUMN
          ════════════════════════════════ */}
          <div className="relative flex flex-col items-stretch lg:items-end justify-center gap-4 w-full max-w-xl mx-auto lg:max-w-none lg:mx-0">
            {/* Consultation Wizard */}
            <motion.div
              id="consultation"
              initial={{ opacity: 0, x: 44, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.95,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.3,
              }}
              className={`relative w-full z-10${isHighlighted ? " consultation-highlight-active" : ""}`}
              tabIndex={-1}
            >
              <ConsultationFormHighlight active={isHighlighted} />
              <ConsultationWizard />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.9,
              }}
              className="w-full"
              style={{ animation: "float 7s ease-in-out 1s infinite" }}
            >
              <div
                className="relative overflow-hidden rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 py-4 sm:px-5"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(14, 12, 10, 0.78) 0%, rgba(22, 18, 14, 0.68) 100%)",
                  backdropFilter: "blur(40px) saturate(1.6) brightness(0.88)",
                  WebkitBackdropFilter:
                    "blur(40px) saturate(1.6) brightness(0.88)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  boxShadow:
                    "0 32px 80px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.10), 0 0 0 1px rgba(221,199,161,0.06)",
                }}
              >
                {/* Top shimmer line — gold tinted */}
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne-gold/25 to-transparent" />
                {/* Dark vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/[0.12] pointer-events-none" />

                <div className="flex items-center gap-3">
                  {/* Image thumbnail */}
                  <div className="relative w-16 h-14 sm:w-20 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
                    <Image
                      src="/HeroBackgroundImage.webp"
                      alt="Luxury Denver home"
                      fill
                      className="object-cover object-center"
                      sizes="80px"
                    />
                    <div className="absolute inset-0 bg-woody-brown/15" />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <span className="text-champagne-gold text-[10px] sm:text-xs font-bold tracking-[0.14em] uppercase">
                      Prefer to Talk?
                    </span>
                    <span className="text-white text-xs sm:text-sm font-bold leading-tight">
                      Call Us Now Free Consultation
                    </span>
                    <span className="text-white/55 text-[10px] sm:text-xs">
                      Denver advisors available Mon–Sat
                    </span>
                  </div>
                </div>

                {/* Phone CTA — frosted glass */}
                <motion.a
                  href="tel:+17209168926"
                  whileHover={{
                    scale: 1.05,
                    boxShadow:
                      "0 8px 28px rgba(221,199,161,0.25), 0 0 0 1px rgba(221,199,161,0.4)",
                    background:
                      "linear-gradient(135deg, rgba(221, 199, 161, 0.24) 0%, rgba(221, 199, 161, 0.10) 100%)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="relative flex-shrink-0 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-white text-xs sm:text-sm font-bold tracking-wide cursor-pointer transition-all duration-200 w-full sm:w-auto"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(221, 199, 161, 0.18) 0%, rgba(221, 199, 161, 0.06) 100%)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(221, 199, 161, 0.35)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
                  }}
                >
                  <RiPhoneLine className="text-base text-champagne-gold" />
                  Call Now
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Bottom security badge ── */}
        <motion.div
          {...fadeUp(1.3)}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center gap-2 w-[calc(100%-2rem)] max-w-max px-4 py-2 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm"
        >
          <RiShieldCheckLine className="text-champagne-gold text-sm shrink-0" />
          <span className="text-white/35 text-[10px] sm:text-xs tracking-wide whitespace-nowrap">
            Your privacy is protected. No spam, ever.
          </span>
        </motion.div>
      </section>
    </main>
  );
}
