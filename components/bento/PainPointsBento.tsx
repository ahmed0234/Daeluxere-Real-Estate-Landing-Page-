"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
  RiDoubleQuotesL,
  RiHome4Line,
  RiCompass3Line,
  RiTimeLine,
  RiArrowRightLine,
  RiStarFill,
} from "react-icons/ri";

/* ── Motion Variants ─────────────────────────────────── */

const sectionHeaderVariant = {
  initial: { opacity: 0, y: 24, filter: "blur(5px)" },
  whileInView: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
  viewport: { once: true, margin: "-80px" },
};

const cardContainerVariant = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.06,
    },
  },
  viewport: { once: true, margin: "-80px" },
};

const cardVariant = {
  initial: { opacity: 0, y: 30, filter: "blur(6px)" },
  whileInView: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PainPointsBento() {
  return (
    <section className="w-full px-4 py-12 md:px-8 max-w-6xl mx-auto flex flex-col gap-10">
      
      {/* ── Section Header ── */}
      <motion.div
        variants={sectionHeaderVariant}
        initial="initial"
        whileInView="whileInView"
        viewport={sectionHeaderVariant.viewport}
        className="flex flex-col gap-3.5 max-w-2xl"
      >
        <span className="text-black text-xs font-semibold tracking-[0.18em] uppercase">
          The Reality of Real Estate
        </span>
        <h2 className="text-deep-charcoal text-3xl sm:text-4xl 2xl:text-5xl font-bold tracking-tight leading-[1.15] font-sans">
          Buying or Selling Shouldn&apos;t Feel This Hard.
        </h2>
        <p className="text-deep-charcoal/90 text-sm sm:text-base leading-relaxed">
          Whether you&apos;re searching for your dream home or preparing to sell your current one, it&apos;s normal to feel overwhelmed. Every decision matters, and having the right guidance can make all the difference.
        </p>
      </motion.div>

      {/* ── Bento Grid ── */}
      <motion.div
        variants={cardContainerVariant}
        initial="initial"
        whileInView="whileInView"
        viewport={cardContainerVariant.viewport}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        
        {/* Card 1: Large Quote Card (spans 2 cols on lg) — Playfair font */}
        <motion.div
          variants={cardVariant}
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-2 relative overflow-hidden rounded-[24px] p-6 md:p-8 flex flex-col justify-between gap-8 border border-deep-charcoal/[0.06] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
        >
          <div className="w-9 h-9 rounded-full bg-woody-brown/5 flex items-center justify-center text-woody-brown text-base">
            <RiDoubleQuotesL />
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-playfair italic font-medium text-xl sm:text-2xl md:text-3xl text-deep-charcoal leading-tight">
              &ldquo;I&apos;ve already lost three offers.&rdquo;
            </h3>
            <p className="text-deep-charcoal/90 text-xs sm:text-sm max-w-lg font-sans">
              Finding the right home in a competitive market can feel frustrating without the right strategy.
            </p>
          </div>
        </motion.div>

        {/* Card 2: Statistic Card (spans 1 col) — Sans font */}
        <motion.div
          variants={cardVariant}
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[24px] p-6 md:p-8 flex flex-col justify-between gap-8 border border-deep-charcoal/[0.06] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
        >
          <div className="flex flex-col gap-1">
            <span className="text-deep-charcoal font-sans font-bold text-5xl sm:text-6xl tracking-tight leading-none">
              72%
            </span>
            <span className="text-deep-charcoal/40 text-[10px] font-semibold tracking-wider uppercase font-sans">
              Market Sentiment
            </span>
          </div>

          <p className="text-deep-charcoal/85 text-xs sm:text-sm leading-relaxed font-sans">
            of buyers say finding the right home is the most stressful part of the entire process.
          </p>
        </motion.div>

        {/* Card 3: Buyer Card (spans 1 col) — Sans font */}
        <motion.div
          variants={cardVariant}
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[24px] p-6 md:p-8 flex flex-col justify-between gap-6 border border-deep-charcoal/[0.06] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
        >
          <div className="w-9 h-9 rounded-lg bg-woody-brown/5 border border-woody-brown/10 flex items-center justify-center text-woody-brown text-base">
            <RiHome4Line />
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="text-woody-brown text-[9px] font-bold tracking-[0.15em] uppercase font-sans">
              Buyer Search
            </span>
            <h4 className="font-sans font-semibold text-base text-deep-charcoal leading-snug">
              &ldquo;There are too many listings... I don&apos;t even know where to start.&rdquo;
            </h4>
          </div>
        </motion.div>

        {/* Card 4: Seller Quote Card (spans 1 col) — Sans font */}
        <motion.div
          variants={cardVariant}
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[24px] p-6 md:p-8 flex flex-col justify-between gap-8 border border-deep-charcoal/[0.06] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
        >
          <div className="w-9 h-9 rounded-full bg-woody-brown/5 flex items-center justify-center text-woody-brown text-base">
            <RiDoubleQuotesL />
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="font-sans font-semibold text-base text-deep-charcoal leading-snug">
              &ldquo;I don&apos;t know what my home is actually worth.&rdquo;
            </h4>
            <p className="text-deep-charcoal/85 text-xs font-sans">
              Pricing correctly is one of the biggest factors in selling quickly and for the best value.
            </p>
          </div>
        </motion.div>

        {/* Card 5: Seller Card (spans 1 col) — Sans font */}
        <motion.div
          variants={cardVariant}
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[24px] p-6 md:p-8 flex flex-col justify-between gap-6 border border-deep-charcoal/[0.06] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
        >
          <div className="w-9 h-9 rounded-lg bg-woody-brown/5 border border-woody-brown/10 flex items-center justify-center text-woody-brown text-base">
            <RiTimeLine />
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="text-woody-brown text-[9px] font-bold tracking-[0.15em] uppercase font-sans">
              Market Duration
            </span>
            <h4 className="font-sans font-semibold text-base text-deep-charcoal leading-snug">
              &ldquo;My home has been on the market for weeks.&rdquo;
            </h4>
          </div>
        </motion.div>

        {/* Card 6: Trust Card (spans 1 col) — Sans font */}
        <motion.div
          variants={cardVariant}
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[24px] p-6 md:p-8 flex flex-col justify-between gap-6 border border-deep-charcoal/[0.06] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
        >
          <div className="flex items-center">
            {/* Overlapping Avatars */}
            {[
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            ].map((url, i) => (
              <div
                key={i}
                className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden -ml-2 first:ml-0 shadow-sm"
              >
                <Image
                  src={`${url}?auto=format&fit=crop&w=64&h=64&q=80`}
                  alt={`Client avatar ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            
            {/* Elegant woody-brown stars count */}
            <div className="flex items-center gap-0.5 ml-2.5">
              {[...Array(5)].map((_, i) => (
                <RiStarFill key={i} className="text-woody-brown text-[10px]" />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <h4 className="font-sans font-bold text-sm text-deep-charcoal">
              Trusted by 500+ Denver Families
            </h4>
            <p className="text-deep-charcoal/60 text-xs font-sans">
              Helping buyers and sellers make confident decisions every day.
            </p>
          </div>
        </motion.div>

        {/* Card 7: Solution Preview Card (spans 2 cols on lg) — Sans font */}
        <motion.div
          variants={cardVariant}
          whileHover={{
            y: -4,
            scale: 1.01,
            boxShadow: "0 16px 36px rgba(34, 34, 34, 0.04)",
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-2 relative overflow-hidden rounded-[24px] p-6 md:p-8 flex flex-col justify-between gap-8 border border-woody-brown/20 bg-white shadow-[0_4px_24px_rgba(161,124,95,0.02)]"
        >
          <div className="w-9 h-9 rounded-lg bg-woody-brown/5 flex items-center justify-center text-woody-brown text-base">
            <RiCompass3Line />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-2 max-w-md">
              <h3 className="font-sans font-bold text-lg text-deep-charcoal tracking-tight">
                You Don&apos;t Have to Navigate It Alone.
              </h3>
              <p className="text-deep-charcoal/90 text-xs sm:text-sm leading-relaxed font-sans">
                Our experienced Denver real estate advisors guide you through every step from your first conversation to the final closing with honest advice and local expertise.
              </p>
            </div>

            <motion.button
              whileHover={{ x: 3 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-deep-charcoal text-white hover:bg-deep-charcoal/90 flex items-center justify-center text-base cursor-pointer transition-colors duration-200"
            >
              <RiArrowRightLine />
            </motion.button>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
