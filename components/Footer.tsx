"use client";

import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { motion, type Variants } from "motion/react";
import { MapPin, Phone, Mail, Lock, PhoneCall } from "lucide-react";
import {
  FaFacebookF,
  FaTiktok,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

interface ContactItem {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  lines: string[];
  href?: string;
}

const CONTACT_ITEMS: ContactItem[] = [
  {
    icon: MapPin,
    label: "Address",
    lines: ["123 Daeluxe Way", "Beverly Hills, CA 90210"],
  },
  {
    icon: Phone,
    label: "Call Us",
    lines: ["(720) 916-8926", "Mon - Sat: 9AM - 6PM"],
    href: "tel:+17209168926",
  },
  {
    icon: Mail,
    label: "Email Us",
    lines: ["dae@daeluxere.com", "We reply within 24h"],
    href: "mailto:dae@daeluxere.com",
  },
];

interface SocialLink {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: FaFacebookF,
    label: "Facebook",
    href: "https://www.facebook.com/Daejunghomes?_rdc=1&_rdr#",
  },
  {
    icon: FaTiktok,
    label: "TikTok",
    href: "https://www.tiktok.com/@daeluxere",
  },
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dae-jung-3aa8121a7",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/daeluxere/",
  },
];

const PHONE_NUMBER = "(720) 916-8926";
const PHONE_HREF = "tel:+17209168926";

const BACKDROP_IMAGE =
  "https://images.unsplash.com/photo-1759372945658-1e9f56e751bd?fm=jpg&q=60&w=3000&auto=format&fit=crop";

/* ------------------------------------------------------------------ */
/*  Motion variants                                                    */
/* ------------------------------------------------------------------ */

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#0B0906] px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
      {/* backdrop photo + darkening layers */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={BACKDROP_IMAGE}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0B0906]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0906] via-[#0B0906]/70 to-[#0B0906]/40" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 60% at 18% 30%, rgba(201,165,115,0.10) 0%, rgba(201,165,115,0) 70%)",
          }}
        />
      </div>

      {/* glass card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-7xl"
      >
        {/* ambient gold glow floating behind the card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-10 -top-10 h-32 rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(60% 100% at 20% 0%, rgba(201,165,115,0.35) 0%, rgba(201,165,115,0) 70%)",
          }}
        />

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/45 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-2xl sm:rounded-[32px]"
        >
          {/* subtle inner top sheen */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
          />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="flex flex-col gap-10 px-6 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-12"
          >
            {/* --------------------------------------------------- */}
            {/* Logo                                                  */}
            {/* --------------------------------------------------- */}
            <motion.div
              variants={fadeUp}
              className="flex shrink-0 flex-col items-center text-center lg:items-start lg:text-left"
            >
              <span className="font-playfair text-6xl leading-none text-[#C9A573] sm:text-7xl">
                D
              </span>
              <span className="mt-1 font-playfair text-2xl tracking-[0.28em] text-white sm:text-3xl">
                DAELUXE
              </span>
              <span className="mt-2 font-sans text-[11px] font-medium tracking-[0.32em] text-[#C9A573] sm:text-xs">
                REAL ESTATE
              </span>
            </motion.div>

            {/* vertical divider */}
            <div
              aria-hidden="true"
              className="hidden h-20 w-px shrink-0 bg-white/10 lg:block"
            />

            {/* --------------------------------------------------- */}
            {/* Contact info                                          */}
            {/* --------------------------------------------------- */}
            <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:w-auto lg:flex-1 lg:gap-10">
              {CONTACT_ITEMS.map((item) => {
                const Icon = item.icon;
                const body = (
                  <>
                    <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                      {item.label}
                    </p>
                    <div className="mt-1.5 space-y-0.5">
                      <p className="font-sans text-[15px] text-white/90">
                        {item.lines[0]}
                      </p>
                      <p className="font-sans text-[13px] text-white/50">
                        {item.lines[1]}
                      </p>
                    </div>
                  </>
                );

                return (
                  <motion.div
                    key={item.label}
                    variants={fadeUp}
                    className="flex flex-col items-center gap-3 text-center md:flex-row md:items-start md:text-left"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon
                        className="h-[18px] w-[18px] text-[#C9A573]"
                        strokeWidth={1.75}
                      />
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="rounded-sm transition-colors hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A573]"
                      >
                        {body}
                      </a>
                    ) : (
                      <address className="not-italic">{body}</address>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* vertical divider */}
            <div
              aria-hidden="true"
              className="hidden h-20 w-px shrink-0 bg-white/10 lg:block"
            />

            {/* --------------------------------------------------- */}
            {/* CTA                                                   */}
            {/* --------------------------------------------------- */}
            <motion.a
              variants={fadeUp}
              href={PHONE_HREF}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex w-full shrink-0 items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#D6B583] to-[#B98C4E] px-7 py-4 font-sans text-[15px] font-semibold tracking-wide text-[#1F1B16] shadow-[0_10px_30px_-8px_rgba(185,140,78,0.55)] transition-shadow duration-300 hover:shadow-[0_16px_40px_-8px_rgba(185,140,78,0.75)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A573] sm:w-auto"
              aria-label={`Call now at ${PHONE_NUMBER}`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/20">
                <PhoneCall className="h-4 w-4 text-[#1F1B16]" strokeWidth={2} />
              </span>
              CALL NOW
            </motion.a>
          </motion.div>

          {/* horizontal divider */}
          <div className="h-px w-full bg-white/10" />

          {/* --------------------------------------------------- */}
          {/* Bottom row                                            */}
          {/* --------------------------------------------------- */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={containerVariants}
            className="flex flex-col items-center gap-6 px-6 py-6 text-center sm:px-10 sm:py-7 lg:flex-row lg:justify-between lg:gap-4 lg:px-12 lg:text-left"
          >
            <motion.p
              variants={fadeUp}
              className="font-sans text-[13px] text-white/50"
            >
              &copy; {new Date().getFullYear()} Daeluxe Real Estate. All rights
              reserved.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2.5 font-sans text-[13px] text-white/70"
            >
              <Lock className="h-3.5 w-3.5 text-[#C9A573]" strokeWidth={1.75} />
              <span>Your trusted real estate partner.</span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9A573]">
                Follow Us
              </span>
              <ul className="flex items-center gap-2.5">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <li key={social.label}>
                      <motion.a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        whileHover={{
                          scale: 1.12,
                          boxShadow:
                            "0 0 0 1px rgba(201,165,115,0.6), 0 0 18px rgba(201,165,115,0.45)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/80 transition-colors duration-300 hover:text-[#C9A573]"
                      >
                        <Icon className="h-[15px] w-[15px]" />
                      </motion.a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
