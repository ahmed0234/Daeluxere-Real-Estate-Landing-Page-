"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { RiArrowRightUpLine } from "react-icons/ri";

/* ── Data ─────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Buy", href: "#buy" },
  { label: "Sell", href: "#buy" },
  { label: "Rent", href: "#rent" },
  { label: "About", href: "#about" },
];

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

const linkContainerVariant = {
  animate: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.38,
    },
  },
};

const linkVariant = {
  initial: { opacity: 0, y: -6 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const buttonVariant = {
  initial: { opacity: 0, y: -6 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.62 },
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
        className="flex items-center justify-between h-[88px] px-7 md:px-9"
      >
        {/* ── Logo ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          <Link
            href="/"
            aria-label="Daeluxe — Luxury Real Estate Home"
            className="group flex items-baseline gap-[3px] select-none"
          >
            <span
              className="font-sans font-semibold text-deep-charcoal leading-none"
              style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.22rem)", letterSpacing: "-0.035em" }}
            >
              Daeluxe
            </span>
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                marginBottom: "2px",
                flexShrink: 0,
                background: "#302f2f",
              }}
            />
          </Link>
        </motion.div>

        {/* ── Nav links ─────────────────────────── */}
        <motion.ul
          role="list"
          variants={linkContainerVariant}
          initial="initial"
          animate="animate"
          className="hidden md:flex items-center gap-1"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <motion.li key={label} variants={linkVariant}>
              <NavLink href={href} label={label} />
            </motion.li>
          ))}
        </motion.ul>

        {/* ── Contact Us Button ─────────────────── */}
        <motion.div variants={buttonVariant} initial="initial" animate="animate">
          <ContactButton />
        </motion.div>
      </motion.nav>
    </div>
  );
}

/* ── NavLink ───────────────────────────────────────────── */

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex items-center px-4 py-2 font-sans font-medium text-[0.875rem] text-deep-charcoal/90 tracking-[-0.005em] select-none cursor-pointer"
    >
      <span className="relative z-10 transition-colors duration-300 group-hover:text-deep-charcoal text-base">
        {label}
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-[6px] left-4 right-4 h-[1.5px] rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          background:
            "linear-gradient(90deg, #1C1D1F 0%, #3A3D40 50%, #1C1D1F 100%)",
        }}
      />
    </motion.a>
  );
}

/* ── ContactButton ─────────────────────────────────────── */

function ContactButton() {
  return (
    <motion.a
      href="#contact"
      whileHover={{
        y: -2,
        boxShadow:
          "0 8px 28px rgba(34, 34, 34, 0.22), 0 2px 8px rgba(34, 34, 34, 0.14), 0 0 0 1px rgba(34,34,34,0.18), 0 0 24px rgba(221, 199, 161, 0.12)",
        background:
          "linear-gradient(160deg, #2e2e2e 0%, #1a1a1a 60%, #222222 100%)",
      }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative inline-flex items-center gap-2 select-none cursor-pointer overflow-hidden"
      style={{
        borderRadius: "100px",
        paddingInline: "clamp(18px, 2vw, 24px)",
        paddingBlock: "11px",
        background:
          "linear-gradient(160deg, #282828 0%, #1c1c1c 60%, #222222 100%)",
        border: "1px solid rgba(255, 255, 255, 0.10)",
        boxShadow:
          "0 4px 16px rgba(34, 34, 34, 0.18), 0 1px 4px rgba(34, 34, 34, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Inner top highlight */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.16) 50%, transparent 100%)",
        }}
      />

      {/* Warm radial glow on hover */}
      <span
        aria-hidden="true"
        className="absolute -inset-[1px] rounded-[100px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(ellipse at 50% 120%, rgba(221,199,161,0.09) 0%, transparent 70%)",
        }}
      />

      <span
        className="relative z-10 font-sans font-medium tracking-[-0.01em] text-[#F9F9F9]"
        style={{ fontSize: "0.845rem" }}
      >
        Contact Us
      </span>

      <motion.span
        className="relative z-10 flex items-center text-[#DDC7A1]"
        style={{ fontSize: "0.9rem" }}
        initial={{ x: 0 }}
        whileHover={{ x: 2 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <RiArrowRightUpLine aria-hidden="true" />
      </motion.span>
    </motion.a>
  );
}
