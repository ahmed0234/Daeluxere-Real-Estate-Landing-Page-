"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import {
  Users,
  TrendingUp,
  Megaphone,
  ShieldCheck,
  CheckCircle2,
  Home,
  Gem,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

interface SolutionStep {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const STEPS: SolutionStep[] = [
  {
    number: "01",
    icon: Users,
    title: "We Listen First",
    description:
      "We take the time to understand your goals, concerns, and timeline.",
  },
  {
    number: "02",
    icon: TrendingUp,
    title: "We Build the Right Strategy",
    description:
      "Custom strategy tailored to your unique situation and the current market.",
  },
  {
    number: "03",
    icon: Megaphone,
    title: "We Execute with Precision",
    description: "Expert marketing, negotiation, and guidance at every step.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "We Protect Your Interests",
    description:
      "We handle the details, anticipate challenges, and keep your best interests first.",
  },
  {
    number: "05",
    icon: CheckCircle2,
    title: "We Deliver Results",
    description:
      "Our proven process leads to smoother transactions and stronger outcomes.",
  },
];

interface Stat {
  value: string;
  label: string;
}

const STATS: Stat[] = [
  { value: "500+", label: "Families Helped" },
  { value: "4.9/5", label: "Client Rating" },
  { value: "$2B+", label: "Sales Volume" },
  { value: "20+", label: "Years Experience" },
];

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=1600&auto=format&fit=crop";

/* ------------------------------------------------------------------ */
/*  Motion variants                                                    */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

/* ------------------------------------------------------------------ */
/*  Style helpers (kept out of JSX for readability)                    */
/* ------------------------------------------------------------------ */

// Soft, multi-layer ambient elevation for the hero image card. Several
// translucent, warm-toned layers stacked at increasing blur/spread read
// as one continuous, realistic shadow rather than a single hard-edged
// box-shadow.
const heroCardShadow = [
  "0 1px 1px rgba(21,16,11,0.06)",
  "0 6px 12px -2px rgba(21,16,11,0.10)",
  "0 20px 34px -8px rgba(21,16,11,0.16)",
  "0 44px 64px -16px rgba(21,16,11,0.24)",
  "0 84px 110px -24px rgba(21,16,11,0.32)",
].join(", ");

// The blurred "second card" peeking out from behind the hero image to
// sell the stacked-depth illusion from the reference.
const heroStackedCardStyle: CSSProperties = {
  background:
    "linear-gradient(150deg, rgba(70,50,30,0.9) 0%, rgba(18,13,9,0.95) 65%)",
  filter: "blur(26px)",
  opacity: 0.65,
};

const badgeFillStyle: CSSProperties = {
  background:
    "radial-gradient(120% 120% at 50% 30%, rgba(240,202,143,0.7) 0%, rgba(198,150,82,0.55) 38%, rgba(90,62,30,0.55) 70%, rgba(28,19,11,0.62) 100%)",
  boxShadow:
    "inset 0 1px 2px rgba(255,232,196,0.55), inset 0 -18px 30px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(232,194,140,0.35)",
};

// Tight rim-light, sitting just outside the ring — reads as the bright
// "light source" core of the glow.
const badgeGlowCoreStyle: CSSProperties = {
  background:
    "radial-gradient(circle, rgba(245,202,135,0.75) 0%, rgba(245,202,135,0.0) 70%)",
};

// Wide ambient wash that softly lights the photo around the badge.
const badgeGlowAmbientStyle: CSSProperties = {
  background:
    "radial-gradient(circle, rgba(224,176,108,0.5) 0%, rgba(224,176,108,0.16) 48%, rgba(224,176,108,0) 75%)",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SolutionSection() {
  return (
    <section
      aria-label="Our solution"
      className="relative w-full overflow-hidden bg-[#F7F3EB] px-5 py-20 sm:px-10 sm:py-24 lg:px-14 lg:py-28 xl:px-20  "
    >
      {/* ambient background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(201,165,115,0.10) 0%, rgba(201,165,115,0) 70%)",
        }}
      />

      <div className="relative mx-auto w-full">
        {/* ---------------------------------------------------------- */}
        {/* Heading                                                     */}
        {/* ---------------------------------------------------------- */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
          className="mx-auto mb-14 flex max-w-3xl flex-col items-center gap-5 text-center sm:mb-20"
        >
          <motion.span
            variants={fadeUp}
            className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-[#B0824B]"
          >
            Our Solution
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-sans text-[2.25rem] leading-[1.15]  tracking-tight text-[#1F1B16] sm:text-5xl lg:text-6xl font-bold"
          >
            We Don&apos;t Just Solve Problems.
            <br />
            <span className="font-playfair italic  text-[#d8983e] font-semibold">
              We Remove Them.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="font-sans text-base leading-relaxed text-[#73706A] sm:text-lg font-semibold"
          >
            Our approach is built around clarity, strategy, and results so you
            can move forward with confidence.
          </motion.p>
        </motion.div>

        {/* ---------------------------------------------------------- */}
        {/* Image + Steps                                               */}
        {/* ---------------------------------------------------------- */}
        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1.1fr_1fr] lg:gap-6">
          {/* ---------------- Left: image card ---------------- */}
          <div className="relative lg:h-full">
            {/* stacked card peeking out behind the hero image, sells the
               "floating card" depth from the reference */}
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-5 rounded-[28px] sm:translate-x-4 sm:translate-y-7"
              style={heroStackedCardStyle}
            />

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ boxShadow: heroCardShadow }}
              className="group relative z-10 min-h-[560px] overflow-hidden rounded-[28px] sm:min-h-[620px] lg:min-h-0 lg:h-full"
            >
              <img
                src={HERO_IMAGE}
                alt="Warmly lit modern living room at dusk with a panoramic city view"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent" />

              <div className="relative flex h-full flex-col justify-between p-8 sm:p-10">
                <div>
                  <h3 className="font-sans text-[1.9rem] font-medium leading-[1.2] text-white sm:text-[2.2rem] 2xl:text-5xl">
                    A Better Experience
                    <br />
                    From{" "}
                    <span className="font-playfair italic font-normal text-[#D8BE93] font-semibold">
                      Start to Finish.
                    </span>
                  </h3>

                  <div className="my-5 h-px w-12 bg-[#C9A573]" />

                  <p className="max-w-xs font-sans text-[15px] leading-relaxed text-white/75">
                    Real estate doesn&apos;t have to be stressful. We simplify
                    the process, protect your interests, and help you achieve
                    the best outcome possible.
                  </p>
                </div>

                {/* badge */}
                <div className="relative flex h-[148px] w-[148px] shrink-0 items-center justify-center">
                  {/* soft golden glow, naturally illuminated from within and
                     spilling onto the photo behind it — a tight bright core
                     plus a wider ambient wash read as one continuous light */}
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-2.5 rounded-full blur-md"
                    style={badgeGlowCoreStyle}
                    animate={{ opacity: [0.65, 1, 0.65] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-9 rounded-full blur-2xl"
                    style={badgeGlowAmbientStyle}
                    animate={{
                      opacity: [0.5, 0.85, 0.5],
                      scale: [0.95, 1.07, 0.95],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <div
                    className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-1 rounded-full border border-[#E8C28C]/70 text-center backdrop-blur-sm"
                    style={badgeFillStyle}
                  >
                    <Home
                      className="mb-1 h-5 w-5 text-[#F2D9AE]"
                      strokeWidth={1.5}
                    />
                    <p className="font-sans text-[13px] font-medium leading-snug text-white">
                      Your Goals.
                      <br />
                      Our Priority.
                      <br />
                      Better Results.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ---------------- Right: steps list ---------------- */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="flex flex-col gap-3.5 sm:gap-4"
          >
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  className="group flex flex-1 items-center gap-5 rounded-2xl border border-[#E7E0D2] bg-[#F8F5EF] px-6 py-5 shadow-[0_1px_2px_rgba(31,27,22,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C9A573]/50 hover:shadow-[0_10px_30px_-12px_rgba(31,27,22,0.18)] sm:px-7"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#171310] transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14">
                    <Icon
                      className="h-5 w-5 text-[#C9A573] sm:h-[22px] sm:w-[22px]"
                      strokeWidth={1.75}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-sans text-base font-semibold text-[#1F1B16] sm:text-lg">
                      {step.title}
                    </h3>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-[#84807A]">
                      {step.description}
                    </p>
                  </div>

                  <div
                    className="hidden h-12 w-px shrink-0 bg-[#E3DCCB] sm:block"
                    aria-hidden="true"
                  />

                  <span
                    className="hidden shrink-0 font-playfair text-3xl italic font-normal text-[#b98a13] sm:block sm:text-4xl"
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* Bottom bar                                                  */}
        {/* ---------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mt-5 rounded-[28px] border border-white/[0.06] bg-[#15110D] px-6 py-7 sm:mt-6 sm:px-9 sm:py-8"
        >
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            {/* brand line */}
            <div className="flex items-center gap-4 text-center lg:text-left">
              <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#C9A573]/40 bg-black/40 sm:flex">
                <Gem className="h-6 w-6 text-[#C9A573]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-sans text-lg font-medium leading-snug text-white sm:text-xl">
                  Experience the{" "}
                  <span className="font-playfair italic font-normal text-[#C9A573]">
                    Daeluxe Difference.
                  </span>
                </p>
                <p className="mt-1 font-sans text-sm text-[#A9A299]">
                  Local knowledge. Proven results. Clients for life.
                </p>
              </div>
            </div>

            {/* stats */}
            <div className="grid w-full max-w-md grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-x-8 lg:w-auto">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-1 px-2 text-center sm:border-l sm:border-white/10 sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
                >
                  <span className="font-sans text-2xl font-semibold text-[#C9A573] sm:text-[1.7rem]">
                    {stat.value}
                  </span>
                  <span className="font-sans text-[11px] uppercase tracking-wider text-[#9C968B] sm:text-xs">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center justify-center gap-4 rounded-full bg-gradient-to-r from-[#D6B583] to-[#B98C4E] py-2 pl-6 pr-2 font-sans text-[15px] font-medium text-[#1F1B16] shadow-[0_8px_24px_-8px_rgba(185,140,78,0.55)] transition-shadow duration-300 hover:shadow-[0_10px_30px_-6px_rgba(185,140,78,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A573] sm:w-auto"
            >
              Let&apos;s Make Your Move
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#171310]">
                <ArrowUpRight className="h-4 w-4 text-white" strokeWidth={2} />
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
