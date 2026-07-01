"use client";

import { motion } from "motion/react";
import {
  Tag,
  Clock,
  Users,
  DollarSign,
  Search,
  Home,
  MapPin,
  ShieldAlert,
  Key,
  ArrowUpRight,
} from "lucide-react";

/**
 * PainPointsSection
 * ------------------------------------------------------------------
 * "The Challenge" section — contrasts what sellers vs. buyers face,
 * bridged by a floating "You're Not Alone" reassurance card, capped
 * with a CTA strip.
 *
 * NOTE on imagery: replace the two `imageSrc` values below with real
 * photography from your asset pipeline (next/image + a configured
 * remote pattern, or a local /public path). Placeholder photo URLs
 * are used here so the component renders out of the box.
 */

const sellerPoints = [
  { icon: Tag, text: "I don\u2019t know what my home is really worth." },
  {
    icon: Clock,
    text: "I don\u2019t want my home sitting on the market for months.",
  },
  { icon: Users, text: "I\u2019m worried about finding the right buyers." },
  {
    icon: DollarSign,
    text: "I want the best price, with the least amount of stress.",
  },
];

const buyerPoints = [
  { icon: Search, text: "There are too many listings and not enough clarity." },
  { icon: Home, text: "I keep losing out in a competitive market." },
  {
    icon: MapPin,
    text: "I\u2019m not sure which neighborhoods are right for me.",
  },
  {
    icon: ShieldAlert,
    text: "I\u2019m afraid of making the wrong investment.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const pillVariant = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const pillVariantReverse = {
  hidden: { opacity: 0, x: 16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function PainPointsSection() {
  return (
    <section className="w-full bg-[#F7F3EB] px-5 py-20 sm:px-8 md:py-24 lg:px-14 lg:py-28">
      {/* ---------------------------------------------------------- */}
      {/* Header                                                     */}
      {/* ---------------------------------------------------------- */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        className="mx-auto mb-14 max-w-3xl text-center lg:mb-20"
      >
        <p className="font-sans text-sm font-semibold uppercase tracking-[0.28em] text-yellow-600">
          The Challenge
        </p>
        <h2 className="mt-4 font-sans text-4xl leading-[1.12] tracking-tight text-[#1a1714] sm:text-5xl lg:text-[3.4rem] 2xl:text-6xl font-bold">
          Buying or Selling a Home
          <br />
          <span className="bg-gradient-to-r from-[#d9a861] to-[#a8713a] bg-clip-text font-playfair italic text-transparent">
            Shouldn&rsquo;t Feel This Hard.
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-deep-charcoal sm:text-lg">
          The journey can be overwhelming, the decisions are big, and the stakes
          are even higher.
        </p>
      </motion.div>

      {/* ---------------------------------------------------------- */}
      {/* Two-column panels + floating "not alone" card               */}
      {/* ---------------------------------------------------------- */}
      <div className="relative mx-auto grid w-full grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-24 xl:gap-28">
        {/* ---------------- Sellers panel (light) ---------------- */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="relative isolate min-h-[640px] overflow-hidden rounded-[2rem] bg-[#EFE7D8] shadow-[0_25px_60px_-25px_rgba(40,30,15,0.25)] sm:min-h-[680px] lg:min-h-[760px]"
        >
          {/* background image */}
          <img
            src="/PainProblem/PainProblemLeft.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          {/* fade overlay: top->bottom on mobile, left->right on desktop */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#EFE7D8]/85 to-[#EFE7D8] lg:bg-gradient-to-r lg:from-transparent lg:via-[#EFE7D8]/92 lg:via-[22%] lg:to-[#EFE7D8] lg:to-[42%]" />

          {/* badge */}
          <div className="absolute right-7 top-7 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#F1DFC0] text-[#9c6b32] shadow-lg ring-4 ring-white/40 sm:right-9 sm:top-9">
            <Home className="h-6 w-6" strokeWidth={1.75} />
          </div>

          {/* content */}
          <div className="relative z-10 flex h-full flex-col justify-center px-7 pb-10 pt-44 sm:px-9 sm:pt-52 lg:pl-[34%] lg:pr-28 lg:pt-14 xl:pr-32">
            <p className="font-sans text-xs 2xl:text-lg font-semibold uppercase  text-yellow-600">
              Sellers Face
            </p>
            <h3 className="mt-2 font-sans text-4xl text-[#1a1714] sm:text-5xl 2xl:text-6xl font-semibold">
              Uncertainty.
            </h3>
            <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-[#5f5a53] sm:text-base">
              Selling your home involves more than just listing it. It comes
              with questions, pressure, and difficult choices.
            </p>

            <motion.ul
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mt-7 flex flex-col gap-3"
            >
              {sellerPoints.map(({ icon: Icon, text }) => (
                <motion.li
                  key={text}
                  variants={pillVariant}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white/85 px-4 py-3.5 shadow-[0_6px_18px_-10px_rgba(40,30,15,0.3)] backdrop-blur-sm"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F1DFC0] text-[#9c6b32]">
                    <Icon className="h-4 w-4" strokeWidth={1.9} />
                  </span>
                  <span className="font-sans text-sm 2xl:text-lg leading-snug text-[#3a352e]">
                    {text}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>

        {/* ---------------- Floating "You're Not Alone" card ---------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="static z-20 mx-auto -my-12 lg:absolute lg:left-1/2 lg:top-1/2 lg:my-0 lg:-translate-x-1/2 lg:-translate-y-1/2"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-64 w-64 flex-col items-center justify-center rounded-full border-[6px] border-white bg-[#FAF7F0] px-8 text-center shadow-[0_35px_80px_-20px_rgba(40,30,15,0.35)] sm:h-72 sm:w-72 lg:h-80 lg:w-80"
          >
            <span className="font-playfair text-5xl leading-none text-[#cda35f]">
              &ldquo;
            </span>
            <h4 className="mt-1 font-sans font-semibold text-2xl text-[#1a1714]">
              You&rsquo;re Not Alone.
            </h4>
            <p className="mt-3 max-w-[210px] font-sans text-sm 2xl:text-base leading-normal text-deep-charcoal">
              These are the most common challenges we hear every day. And
              we&rsquo;re here to help you through all of them.
            </p>
            <span className="mt-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#F1DFC0] text-[#9c6b32]">
              <Users className="h-4 w-4" strokeWidth={1.9} />
            </span>
          </motion.div>
        </motion.div>

        {/* ---------------- Buyers panel (dark) ---------------- */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="relative isolate min-h-[640px] overflow-hidden rounded-[2rem] bg-[#171310] shadow-[0_25px_60px_-25px_rgba(0,0,0,0.5)] sm:min-h-[680px] lg:min-h-[760px]"
        >
          {/* background image */}
          <img
            src="/PainProblem/PainProblemRight.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-90"
            loading="lazy"
          />
          {/* fade overlay: top->bottom on mobile, right->left on desktop */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#171310]/85 to-[#171310] lg:bg-gradient-to-l lg:from-transparent lg:via-[#171310]/92 lg:via-[22%] lg:to-[#171310] lg:to-[42%]" />

          {/* badge */}
          <div className="absolute right-7 top-7 z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#2a2420] text-[#e8b873] shadow-lg sm:right-9 sm:top-9">
            <Key className="h-6 w-6" strokeWidth={1.75} />
          </div>

          {/* content */}
          <div className="relative z-10 flex h-full flex-col justify-center px-7 pb-10 pt-44 sm:px-9 sm:pt-52 lg:pl-28 lg:pr-[34%] lg:pt-14 xl:pl-32">
            <p className="font-sans text-xs 2xl:text-xl font-semibold uppercase  text-[#cd9a5b]">
              Buyers Face
            </p>
            <h3 className="mt-2 font-sans text-4xl text-white sm:text-5xl 2xl:text-6xl  font-semibold">
              Overwhelm.
            </h3>
            <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-[#bcb6ad] sm:text-base">
              Finding the right home in the right neighborhood at the right
              price can feel impossible.
            </p>

            <motion.ul
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mt-7 flex flex-col gap-3"
            >
              {buyerPoints.map(({ icon: Icon, text }) => (
                <motion.li
                  key={text}
                  variants={pillVariantReverse}
                  whileHover={{ x: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3.5 backdrop-blur-sm"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#e8b873]">
                    <Icon className="h-4 w-4" strokeWidth={1.9} />
                  </span>
                  <span className="font-sans text-sm 2xl:text-lg leading-snug text-[#e9e6e1]">
                    {text}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* CTA strip                                                  */}
      {/* ---------------------------------------------------------- */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        className="mx-auto mt-16 flex w-full flex-col items-center gap-7 rounded-[1.75rem] border border-black/5 bg-white px-7 py-8 shadow-[0_25px_60px_-30px_rgba(40,30,15,0.25)] sm:px-9 md:flex-row md:items-center md:justify-between lg:mt-20 lg:px-12"
      >
        <div className="flex items-center gap-5">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1a1714] text-[#e8b873]">
            <Home className="h-6 w-6" strokeWidth={1.75} />
          </span>
          <h4 className="font-sans text-2xl font-semibold leading-snug text-[#1a1714] sm:text-[1.7rem]">
            A Smoother Experience
            <br className="hidden sm:block" />{" "}
            <span className="bg-gradient-to-r from-[#d9a861] to-[#a8713a] bg-clip-text font-playfair italic text-transparent">
              Starts With the Right Guidance.
            </span>
          </h4>
        </div>

        <div className="hidden h-12 w-px shrink-0 bg-black/10 md:block" />

        <p className="max-w-xs font-sans text-sm leading-normal font-semibold text-deep-charcoal md:text-base">
          We simplify the process, remove the guesswork, and give you confidence
          in every decision.
        </p>

        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group flex shrink-0 items-center gap-3 rounded-full bg-[#1a1714] py-2 pl-6 pr-2 font-sans text-sm font-medium text-white transition-colors hover:bg-[#272019]"
        >
          Let&rsquo;s Talk
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white transition-colors group-hover:border-[#cd9a5b] group-hover:bg-[#cd9a5b] group-hover:text-[#1a1714]">
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
}
