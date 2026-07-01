"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import type { IconType } from "react-icons";
import {
  PiTrophy,
  PiUserCircle,
  PiShieldCheck,
  PiHouseSimpleFill,
  PiCalendarBlank,
  PiPhone,
  PiArrowRight,
  PiTarget,
  PiChartLineUp,
  PiHandshake,
} from "react-icons/pi";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FeatureItem {
  icon: IconType;
  eyebrow?: string;
  title: string;
  description: string;
}

interface TrustItem {
  icon: IconType;
  title: string;
  description: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const FEATURES: FeatureItem[] = [
  {
    icon: PiTrophy,
    title: "Proven Results",
    description: "Delivering outcomes that speak for themselves.",
  },
  {
    icon: PiUserCircle,
    title: "Client-First Approach",
    description: "Your goals, our priority always.",
  },
  {
    icon: PiShieldCheck,
    eyebrow: "Trusted by",
    title: "Homes & Investors",
    description: "Built on trust, integrity, and lasting relationships.",
  },
];

const TRUST_BAR: TrustItem[] = [
  {
    icon: PiTarget,
    title: "Tailored Strategies",
    description: "Solutions designed around your unique goals.",
  },
  {
    icon: PiChartLineUp,
    title: "Market Expertise",
    description: "In-depth knowledge that gives you an edge.",
  },
  {
    icon: PiHandshake,
    title: "Seamless Experience",
    description: "From start to finish, we make it easy.",
  },
  {
    icon: PiShieldCheck,
    title: "Long-Term Value",
    description: "Building relationships that create lasting success.",
  },
];

const PHONE_NUMBER = "(720) 916-8926";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

/* ------------------------------------------------------------------ */
/*  Decorative bloom icon (matches the small mark above the eyebrow)   */
/* ------------------------------------------------------------------ */

function BloomMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 40"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 40C24 40 23 26 24 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 17C24 17 14 15 7 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 17C24 17 15 21 5 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 17C24 17 24 7 19 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 17C24 17 33 15 40 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 17C24 17 33 21 43 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 17C24 17 28 7 28 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FinalCTASection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F7F2E7] px-6 py-20 font-sans sm:px-10 lg:px-16 xl:px-20 2xl:px-28">
      <div className="w-full">
        {/* ============================================================ */}
        {/* Top: headline + copy + features   |   image                  */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* -------------------------------------------------- */}
          {/* Left column                                         */}
          {/* -------------------------------------------------- */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="flex flex-col justify-center"
          >
            <motion.div variants={fadeUp}>
              <BloomMark className="h-9 w-11 text-[#A9803E]" />
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#A9803E] sm:text-sm"
            >
              Let&apos;s Achieve More, Together
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="mt-5 font-sans font-bold text-4xl leading-[1.12] text-[#1E211D] sm:text-5xl lg:text-[3.25rem]"
            >
              If we can achieve this for other clients,{" "}
              <span className="inline-block border-b-2 border-[#A9803E]/40 pb-1 italic text-[#A9803E]">
                we can achieve it together for you.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-lg text-[15.5px] leading-relaxed text-[#5B5B53] font-semibold"
            >
              At Daeluxe, we turn goals into results. With expert guidance,
              market knowledge, and a client-first approach, we&apos;ll help you
              buy, sell, or invest with confidence and clarity.
            </motion.p>

            {/* Feature row */}
            <motion.div
              variants={stagger}
              className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4"
            >
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  className={`flex gap-3 sm:flex-col sm:gap-3 ${
                    i !== 0 ? "sm:border-l sm:border-[#DED3BC] sm:pl-4" : ""
                  }`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EFE6D5]">
                    <feature.icon className="h-5 w-5 text-[#1E211D]" />
                  </div>
                  <div>
                    {feature.eyebrow && (
                      <p className="text-[13px] text-[#5B5B53]">
                        {feature.eyebrow}
                      </p>
                    )}
                    <p className="text-[15px] font-semibold text-[#1E211D]">
                      {feature.title}
                    </p>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-[#6B6B62]">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* -------------------------------------------------- */}
          {/* Right column — image                                */}
          {/* -------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[340px] overflow-hidden rounded-[2rem] shadow-[0_30px_70px_-25px_rgba(30,25,15,0.35)] ring-1 ring-black/5 lg:min-h-[600px]"
          >
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop"
                alt="Modern luxury residence"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority={false}
              />
            </motion.div>

            {/* soft gradient overlay for depth */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />

            {/* left-edge fade blending into the page background */}
            <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-[#F7F2E7] to-transparent lg:block" />
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* CTA card                                                      */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-col gap-8 rounded-[1.75rem] border border-[#E7DBC0] bg-[#F2EBDA] p-7 shadow-[0_25px_60px_-30px_rgba(30,25,15,0.25)] sm:p-9 lg:flex-row lg:items-center lg:justify-between lg:gap-6"
        >
          {/* left: icon + copy */}
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#8B6B3D] to-[#4A3520] shadow-inner">
              <PiHouseSimpleFill className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="text-lg font-semibold leading-snug text-[#1E211D] sm:text-xl">
                Your real estate goals deserve the right strategy and the right
                team.
              </p>
              <p className="mt-1.5 font-serif text-lg italic text-[#A9803E]">
                Let&apos;s make your next move your best one yet.
              </p>
            </div>
          </div>

          {/* right: buttons */}
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <motion.a
              href="#consultation"
              whileHover={{
                y: -3,
                boxShadow: "0 16px 30px -12px rgba(74,53,32,0.55)",
              }}
              whileTap={{ y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group flex items-center justify-center gap-3 rounded-full bg-gradient-to-b from-[#9C7A45] to-[#7C5D32] px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-white shadow-[0_10px_24px_-10px_rgba(74,53,32,0.5)]"
            >
              <PiCalendarBlank className="h-4 w-4" />
              Get Free Consultation
              <PiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>

            <motion.a
              href="tel:+17209168926"
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex items-center justify-center gap-3 rounded-full border border-[#1E211D]/20 bg-white px-7 py-4 text-[13px] font-semibold text-[#1E211D] shadow-[0_10px_24px_-14px_rgba(30,25,15,0.25)]"
            >
              <PiPhone className="h-4 w-4" />
              <span className="uppercase tracking-[0.08em]">Call Us</span>
              <span className="text-[#5B5B53]">{PHONE_NUMBER}</span>
            </motion.a>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* Bottom trust bar                                              */}
        {/* ============================================================ */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-6 grid grid-cols-1 gap-8 rounded-[1.75rem] bg-[#1C1C1A] px-7 py-9 sm:grid-cols-2 sm:gap-y-8 lg:grid-cols-4 lg:gap-6 lg:px-10"
        >
          {TRUST_BAR.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className={`flex items-start gap-4 ${
                i !== 0 ? "lg:border-l lg:border-white/10 lg:pl-6" : ""
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#A9803E]/50 text-[#C79F5E]">
                <item.icon className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-[15px] font-semibold text-white">
                  {item.title}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-white/55">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
