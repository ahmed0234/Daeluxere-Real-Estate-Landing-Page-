"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import {
  Navigation,
  Mousewheel,
  Keyboard,
  FreeMode,
  A11y,
} from "swiper/modules";
/* Only import the bare reset â€” no navigation/pagination CSS that ships blue defaults */
import "swiper/css";
import {
  Home,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Bath,
  Ruler,
  Users,
  CheckCircle2,
  Handshake,
  Star,
} from "lucide-react";

/**
 * SuccessStoriesSection
 * ------------------------------------------------------------------
 * "Real Results. Real Stories." â€” a horizontally-scrollable carousel
 * of past closings used as social proof, not a listings page. Every
 * card links out to the corresponding Zillow listing in a new tab.
 */

const successStories = [
  {
    id: 1,
    price: "$1,230,000",
    addressLine1: "7842 W Oxford Circle",
    addressLine2: "Lakewood, CO 80235",
    beds: 6,
    baths: 5,
    sqft: "4,655",
    image: "/Listings/1.avif",
    zillowUrl: "#",
  },
  {
    id: 2,
    price: "$515,000",
    addressLine1: "1059 S Alkire Street",
    addressLine2: "Lakewood, CO 80228",
    beds: 4,
    baths: 3,
    sqft: "2,415",
    image: "/Listings/2.avif",
    zillowUrl: "#",
  },
  {
    id: 3,
    price: "$850,000",
    addressLine1: "16300 Cattle Avenue",
    addressLine2: "Parker, CO 80134",
    beds: 4,
    baths: 4,
    sqft: "4,166",
    image: "/Listings/3.avif",
    zillowUrl: "#",
  },
  {
    id: 4,
    price: "$615,000",
    addressLine1: "11010 Tennyson Place",
    addressLine2: "Westminster, CO 80031",
    beds: 4,
    baths: 4,
    sqft: "3,085",
    image: "/Listings/4.avif",
    zillowUrl: "#",
  },
  {
    id: 5,
    price: "$1,050,000",
    addressLine1: "8659 E Kenyon Avenue",
    addressLine2: "Denver, CO 80237",
    beds: 4.5,
    baths: 4,
    sqft: "2,584",
    image: "/Listings/5.avif",
    zillowUrl: "#",
  },
  {
    id: 6,
    price: "$1,390,000",
    addressLine1: "217 Meadowview Drive",
    addressLine2: "Loveland, CO 80537",
    beds: 5,
    baths: 3,
    sqft: "5,655",
    image: "/Listings/6.avif",
    zillowUrl: "#",
  },
  {
    id: 7,
    price: "$765,000",
    addressLine1: "1646 Marbeck Dr",
    addressLine2: "Windsor, CO 80550",
    beds: 4,
    baths: 3,
    sqft: "3,979",
    image: "/Listings/7.avif",
    zillowUrl: "#",
  },
  {
    id: 8,
    price: "$695,000",
    addressLine1: "15785 W 2nd Avenue",
    addressLine2: "Golden, CO 80401",
    beds: 4,
    baths: 3,
    sqft: "2,040",
    image: "/Listings/8.avif",
    zillowUrl: "#",
  },
  {
    id: 9,
    price: "$465,000",
    addressLine1: "8391 Stonybridge Circle",
    addressLine2: "Highlands Ranch, CO 80126",
    beds: 2,
    baths: 3,
    sqft: "1,568",
    image: "/Listings/9.avif",
    zillowUrl: "#",
  },
  {
    id: 10,
    price: "$504,999",
    addressLine1: "19468 E 65th Place",
    addressLine2: "Aurora, CO 80019",
    beds: 3,
    baths: 2,
    sqft: "1,655",
    image: "/Listings/10.avif",
    zillowUrl: "#",
  },
];

const trustPoints = [
  {
    icon: CheckCircle2,
    title: "Proven Track Record",
    caption: "Hundreds of successful transactions and happy clients.",
  },
  {
    icon: Handshake,
    title: "Local Expertise",
    caption: "Deep knowledge of the market that delivers results.",
  },
  {
    icon: Star,
    title: "Client-Focused",
    caption: "Your goals are our priority, every step of the way.",
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

const pad = (n: number) => String(n).padStart(2, "0");

function PropertyCard({ story }: { story: (typeof successStories)[0] }) {
  return (
    <a
      href={story.zillowUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${story.addressLine1}, ${story.addressLine2} on Zillow â€” opens in a new tab`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_18px_45px_-22px_rgba(40,30,15,0.3)] ring-1 ring-black/5 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-20px_rgba(40,30,15,0.35)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={story.image}
          alt={`${story.addressLine1}, ${story.addressLine2}`}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 42vw, (max-width: 1536px) 26vw, 320px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* hover scrim */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <span className="absolute left-4 top-4 rounded-full bg-[#C68A3D] px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-md">
          Sold
        </span>

        <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1a1714] shadow-md backdrop-blur-sm transition-transform duration-500 ease-out group-hover:rotate-45 group-hover:bg-white">
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
        <p className="font-sans text-xl font-semibold text-[#1a1714]">
          {story.price}
        </p>
        <p className="mt-1 font-sans text-sm leading-snug text-deep-charcoal">
          {story.addressLine1}
          <br />
          {story.addressLine2}
        </p>

        <div className="mt-4 flex items-center gap-4 border-t border-black/5 pt-4 font-sans text-xs text-[#6f6a63]">
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-3.5 w-3.5" strokeWidth={1.75} />
            {story.beds} Beds
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-3.5 w-3.5" strokeWidth={1.75} />
            {story.baths} Baths
          </span>
          <span className="flex items-center gap-1.5">
            <Ruler className="h-3.5 w-3.5" strokeWidth={1.75} />
            {story.sqft} Sqft
          </span>
        </div>

        <div className="mt-4 flex items-center gap-1.5 font-sans text-sm font-medium text-champagne-gold transition-transform duration-300 ease-out group-hover:translate-x-1">
          View on Zillow
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
        </div>
      </div>
    </a>
  );
}

/* â”€â”€ Premium custom pagination dots â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function PaginationDots({
  total,
  active,
  onDotClick,
}: {
  total: number;
  active: number;
  onDotClick: (i: number) => void;
}) {
  return (
    <div
      className="flex items-center justify-center gap-1.5"
      role="tablist"
      aria-label="Carousel navigation"
    >
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === active;
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to listing ${i + 1}`}
            onClick={() => onDotClick(i)}
            className="relative flex items-center justify-center transition-all duration-300 ease-out focus-visible:outline-none"
            style={{ width: isActive ? 28 : 8, height: 8 }}
          >
            <span
              className="absolute inset-0 rounded-full transition-all duration-300 ease-out"
              style={{
                background: isActive
                  ? "linear-gradient(90deg, #d9a861, #a8713a)"
                  : "rgba(26,23,20,0.18)",
                boxShadow: isActive
                  ? "0 1px 6px rgba(185,125,69,0.45)"
                  : "none",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

/* â”€â”€ Custom nav arrow button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function NavArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  const isPrev = direction === "prev";
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isPrev ? "Previous listing" : "Next listing"}
      whileTap={disabled ? {} : { scale: 0.92 }}
      className={[
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-300",
        isPrev
          ? "border border-black/12 bg-white text-[#1a1714] hover:border-[#C68A3D] hover:text-[#C68A3D]"
          : "bg-[#1a1714] text-white hover:bg-[#2c2219]",
        disabled ? "pointer-events-none opacity-35" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Icon className="h-4 w-4" strokeWidth={2} />
    </motion.button>
  );
}

export default function SuccessStoriesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const total = successStories.length;

  const slidePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const slideNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  const slideTo = useCallback((index: number) => {
    swiperRef.current?.slideTo(index);
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  return (
    <section
      id="success-stories"
      className="w-full overflow-hidden bg-[#F7F3EB] px-5 py-20 sm:px-8 md:py-24 lg:px-14 lg:py-28"
    >
      {/* â”€â”€ Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        className="mx-auto mb-14 max-w-3xl text-center lg:mb-16"
      >
        <p className="font-sans text-sm font-semibold uppercase tracking-[0.28em] text-yellow-600">
          Success Stories
        </p>
        <h2 className="mt-4 font-sans font-bold text-4xl leading-[1.12] tracking-tight text-[#1a1714] sm:text-5xl lg:text-[3.4rem]">
          Real Results.{" "}
          <span className="bg-gradient-to-r from-[#d9a861] to-[#a8713a] bg-clip-text font-playfair italic text-transparent font-semibold">
            Real Stories.
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-deep-charcoal sm:text-lg">
          From first time buyers to seasoned sellers, our clients achieve
          exceptional results and so can you.
        </p>
      </motion.div>

      {/* â”€â”€ Carousel shell â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
        className="mx-auto w-full rounded-[2rem] border border-black/5 bg-white/60 p-5 shadow-[0_25px_60px_-30px_rgba(40,30,15,0.2)] backdrop-blur-sm sm:p-8 lg:p-10"
      >
        {/* â”€â”€ Controls row â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 sm:mb-8">
          {/* Title block */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a1714] text-[#e8b873] sm:h-12 sm:w-12">
              <Home className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
            </span>
            <div>
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-yellow-600 sm:text-xs">
                10+ Successful Transactions
              </p>
              <h3 className="mt-0.5 font-sans text-lg font-bold text-[#1a1714] sm:text-2xl 2xl:text-4xl">
                A Glimpse of Recent Wins
              </h3>
            </div>
          </div>

          {/* Nav buttons + counter */}
          <div className="flex items-center gap-3">
            <NavArrow
              direction="prev"
              onClick={slidePrev}
              disabled={isBeginning}
            />
            <NavArrow
              direction="next"
              onClick={slideNext}
              disabled={isEnd}
            />
            <p className="font-sans text-sm text-[#6f6a63]">
              <span className="text-base font-semibold text-champagne-gold">
                {pad(activeIndex + 1)}
              </span>{" "}
              / {pad(total)}
            </p>
          </div>
        </div>

        {/* â”€â”€ Swiper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <Swiper
          modules={[Navigation, Mousewheel, Keyboard, FreeMode, A11y]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={handleSlideChange}
          keyboard={{ enabled: true }}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 0.7,
            releaseOnEdges: true,
          }}
          freeMode={{
            enabled: true,
            sticky: true,
            momentumRatio: 0.6,
            momentumBounce: false,
          }}
          grabCursor
          watchOverflow
          spaceBetween={16}
          slidesPerView={1.08}
          breakpoints={{
            400: { slidesPerView: 1.2, spaceBetween: 16 },
            480: { slidesPerView: 1.35, spaceBetween: 20 },
            640: { slidesPerView: 1.8, spaceBetween: 24 },
            768: { slidesPerView: 2.3, spaceBetween: 24 },
            1024: { slidesPerView: 2.6, spaceBetween: 28 },
            1280: { slidesPerView: 3.3, spaceBetween: 28 },
            1536: { slidesPerView: 4.2, spaceBetween: 28 },
          }}
          a11y={{
            containerMessage: "Success stories carousel",
            slideLabelMessage: "Listing {{index}} of {{slidesLength}}",
          }}
          className="!overflow-visible"
        >
          {successStories.map((story) => (
            <SwiperSlide key={story.id} className="!h-auto py-2">
              <PropertyCard story={story} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* â”€â”€ Custom pagination â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between">
          <PaginationDots
            total={total}
            active={activeIndex}
            onDotClick={slideTo}
          />
          {/* Mobile-only swipe hint */}
          <p className="font-sans text-[11px] text-[#9e9790] sm:hidden">
            Swipe to browse all listings
          </p>
        </div>
      </motion.div>

      {/* â”€â”€ Trust / CTA strip â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        className="mx-auto mt-6 flex w-full flex-col gap-8 rounded-[1.75rem] border border-black/5 bg-white px-7 py-8 shadow-[0_25px_60px_-30px_rgba(40,30,15,0.25)] sm:px-9 lg:mt-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-12"
      >
        <div className="flex items-center gap-5 lg:shrink-0">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1a1714] text-[#e8b873]">
            <Users className="h-6 w-6" strokeWidth={1.75} />
          </span>
          <div>
            <p className="font-sans text-lg font-bold text-deep-charcoal">
              We don&rsquo;t just close deals.
            </p>
            <h4 className="font-sans text-2xl font-semibold leading-snug text-[#1a1714]">
              We create success{" "}
              <span className="bg-gradient-to-r from-[#d9a861] to-[#a8713a] bg-clip-text font-playfair italic text-transparent">
                stories.
              </span>
            </h4>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-3 lg:px-4">
          {trustPoints.map(({ icon: Icon, title, caption }) => (
            <div key={title} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-champagne-gold/30 text-champagne-gold">
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <div>
                <p className="font-sans text-base font-semibold text-[#1a1714]">
                  {title}
                </p>
                <p className="mt-0.5 font-sans text-sm leading-relaxed text-deep-charcoal">
                  {caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="lg:shrink-0"
        >
          <a
            href="#consultation"
            className="group flex w-fit shrink-0 items-center gap-3 rounded-full bg-[#1a1714] py-2 pl-6 pr-2 font-sans text-sm font-medium text-white transition-colors hover:bg-[#272019]"
          >
            Get Free Consultation
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white transition-colors group-hover:border-[#cd9a5b] group-hover:bg-[#cd9a5b] group-hover:text-[#1a1714]">
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

