"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import {
  Home,
  Tag,
  Camera,
  Megaphone,
  CheckCircle,
  Gem,
  Shield,
  Clock,
  Users,
  Target,
  type LucideIcon,
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/*  Tokens — derived from the reference design                            */
/* ---------------------------------------------------------------------- */
/*  bg cream:        #F6F2ED                                              */
/*  ink (headings):  #1A1815                                              */
/*  body copy:       #5C5954                                              */
/*  accent (gold):   #B97D45                                              */
/*  dark panel:      #15120E                                              */
/*  dark copy:       #F3EFE9                                              */
/*  dark muted:      #ABA399                                              */
/* ---------------------------------------------------------------------- */

interface Service {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  checklist: string[];
  image: string;
}

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const SERVICES: Service[] = [
  {
    number: "01",
    icon: Home,
    title: "Buy Your Dream Home",
    description:
      "We help you find the perfect home that fits your lifestyle, budget, and long-term goals.",
    checklist: [
      "Personalized Home Search",
      "Expert Negotiation",
      "Guidance Every Step of the Way",
    ],
    image:
      "https://images.unsplash.com/photo-1757359056339-22968344cce6?auto=format&fit=crop&w=900&q=80",
  },
  {
    number: "02",
    icon: Tag,
    title: "Sell Your Property",
    description:
      "We position your property to sell faster and for the best possible price.",
    checklist: [
      "Accurate Market Pricing",
      "Strategic Marketing",
      "Maximum Exposure",
    ],
    image: "/Services/SellYourProperty.webp",
  },
  {
    number: "03",
    icon: Camera,
    title: "High Quality Real Estate Marketing",
    description:
      "We showcase your property with stunning visuals and compelling storytelling.",
    checklist: [
      "Professional Photography",
      "Cinematic Videography",
      "Eye-Catching Listing Design",
    ],
    image: "/Services/HighQualityRealEstateMarketing.webp",
  },
  {
    number: "04",
    icon: Megaphone,
    title: "Social Media Marketing",
    description:
      "We leverage social media to connect, engage, and generate real results.",
    checklist: [
      "Targeted Content Strategy",
      "Platform-Specific Campaigns",
      "Audience Growth & Engagement",
    ],
    image: "/Services/SocialMediaMarketing.webp",
  },
];

const WHY_CHOOSE_US: FeatureItem[] = [
  {
    icon: Shield,
    title: "Trusted Advice",
    description: "Honest guidance you can rely on.",
  },
  {
    icon: Clock,
    title: "Local Expertise",
    description: "Deep knowledge of Denver and surrounding areas.",
  },
  {
    icon: Users,
    title: "Client-First Approach",
    description: "Your goals come first, always.",
  },
  {
    icon: Target,
    title: "Results That Matter",
    description: "Focused on outcomes that move your life forward.",
  },
];

const BANNER_IMAGE =
  "https://images.unsplash.com/photo-1758448511322-8bfc73daf606?auto=format&fit=crop&w=1400&q=80";

/* ---------------------------------------------------------------------- */
/*  Motion variants                                                       */
/* ---------------------------------------------------------------------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardGrid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const featureItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ---------------------------------------------------------------------- */
/*  Component                                                             */
/* ---------------------------------------------------------------------- */

export default function ServicesSection() {
  return (
    <section className="w-full overflow-hidden bg-[#F6F2ED] px-5 py-12 sm:px-8 sm:py-16 lg:px-14 lg:py-16 xl:px-20 2xl:px-28">
      {/* ----------------------------- Header ----------------------------- */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="mx-auto mb-16 max-w-3xl text-center lg:mb-20"
      >
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-[#B97D45] sm:text-sm">
          Our Services
        </span>

        <h2 className="mt-4 font-sans text-[2.25rem] leading-[1.15] text-[#1A1815] sm:text-5xl lg:text-[3.35rem]">
          <span className="block font-bold">Comprehensive Services.</span>
          <span className="relative mt-1 block font-playfair italic font-semibold text-[#B97D45]">
            Exceptional Results.
            <span className="mx-auto mt-3 block h-[2px] w-12 bg-[#B97D45]" />
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl font-sans text-base  leading-relaxed text-[#413d38] sm:text-lg">
          From finding the perfect home to marketing your property with impact,
          we provide end to end real estate services designed around you.
        </p>
      </motion.div>

      {/* ------------------------------ Cards ------------------------------ */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={cardGrid}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
      >
        {SERVICES.map((service) => (
          <ServiceCard key={service.number} {...service} />
        ))}
      </motion.div>

      {/* ------------------------------ Banner ------------------------------ */}
      <WhyChooseBanner />
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  Service card                                                          */
/* ---------------------------------------------------------------------- */

function ServiceCard({
  number,
  icon: Icon,
  title,
  description,
  checklist,
  image,
}: Service) {
  return (
    <motion.div
      variants={cardItem}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.04] bg-[#F6F2ED] shadow-[0_1px_2px_rgba(20,16,10,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-12px_rgba(20,16,10,0.18)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />

        {/* Icon badge — centered, half-overlapping the bottom edge */}
        <div className="absolute -bottom-7 left-1/2 z-10 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-[#15120E] shadow-[0_8px_20px_rgba(20,16,10,0.35)] transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-6 w-6 text-[#C98E55]" strokeWidth={1.5} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-7 pb-7 pt-11 text-center sm:text-left">
        <span className="font-playfair text-2xl italic font-medium text-[#bd793a]">
          {number}
        </span>

        <h3 className="mt-2 font-sans text-xl font-semibold leading-snug text-[#1A1815] lg:text-2xl">
          {title}
        </h3>

        <span className="mx-auto mt-3 mb-4 block h-[2px] w-8 bg-[#B97D45] sm:mx-0" />

        <p className="font-sans text-sm leading-relaxed text-[#6B6660]">
          {description}
        </p>

        <ul className="mt-5 space-y-2.5">
          {checklist.map((item) => (
            <li
              key={item}
              className="flex items-start justify-center gap-2.5 text-left text-sm text-[#2A2722] sm:justify-start"
            >
              <CheckCircle
                className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 text-[#B97D45]"
                strokeWidth={1.75}
              />
              <span className="font-sans font-normal text-sm md:text-base">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Bottom "Why choose us" banner                                         */
/* ---------------------------------------------------------------------- */

function WhyChooseBanner() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      className="mt-8 grid grid-cols-1 overflow-hidden rounded-3xl bg-[#15120E] shadow-[0_30px_60px_-20px_rgba(20,16,10,0.35)] lg:mt-10 lg:grid-cols-[0.78fr_1fr_1.05fr]"
    >
      {/* Left — partnership statement */}
      <div className="flex flex-col justify-center px-8 py-10 sm:px-10 lg:px-10 lg:py-12">
        <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[#B97D45]/40">
          <span className="absolute inset-0 rounded-full bg-[#B97D45]/10 blur-md" />
          <Gem className="relative h-6 w-6 text-[#C98E55]" strokeWidth={1.5} />
        </div>

        <h3 className="font-sans text-2xl leading-tight text-[#F3EFE9] sm:text-[1.65rem]">
          <span className="block font-bold">More Than Services.</span>
          <span className="mt-1 block font-playfair italic font-bold text-[#C98E55]">
            A Partnership.
          </span>
        </h3>

        <span className="my-4 block h-[2px] w-10 bg-[#B97D45]" />

        <p className="font-sans text-base leading-relaxed text-[#a59684]">
          We&apos;re with you from the first conversation to long after the
          closing. Your goals become our priority.
        </p>
      </div>

      {/* Middle — image */}
      <div className="relative min-h-[260px] overflow-hidden lg:min-h-0 lg:h-full">
        <Image
          src={BANNER_IMAGE}
          alt="Luxury living room with panoramic city view"
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
        />
      </div>

      {/* Right — why clients choose us */}
      <div className="px-8 py-10 sm:px-10 lg:px-10 lg:py-12">
        <h4 className="mb-7 font-sans text-xl font-bold text-[#F3EFE9] sm:text-xl lg:mb-8">
          Why Clients Choose Daeluxe
        </h4>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 gap-x-7 gap-y-6 sm:grid-cols-2"
        >
          {WHY_CHOOSE_US.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={featureItem}
              className="flex items-start gap-3.5"
            >
              <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#241F18]">
                <Icon
                  className="h-[18px] w-[18px] text-[#C98E55]"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <p className="font-sans text-sm font-semibold text-[#F3EFE9]">
                  {title}
                </p>
                <p className="mt-1 font-sans text-[13px] leading-relaxed text-[#948C81]">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
