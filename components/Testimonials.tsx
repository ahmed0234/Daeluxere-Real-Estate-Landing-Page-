"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { Quote, Star } from "lucide-react";

/* ---------------------------------------------------------------------- */
/*  Tokens — sampled from the reference design                            */
/* ---------------------------------------------------------------------- */
/*  bg:            #F3F4F6                                                */
/*  card white:    #FFFFFF                                                */
/*  heading black: #0A0A0A                                                */
/*  role gray:     #6B6B6B                                                */
/*  star amber:    #F2860F                                                */
/*  star empty:    #DADADA                                                */
/* ---------------------------------------------------------------------- */

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "John D.",
    role: "Home Buyer",
    quote:
      "Thanks to Daeluxe, I found my dream home in no time. The team understood exactly what I was looking for and made the whole process feel effortless.",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1656338997878-279d71d48f6e?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Jesse Hiss",
    role: "Property Seller",
    quote:
      "I had an incredible experience selling my home through Daeluxe. The process was smooth, and I received multiple offers within a week. Their support team was outstanding.",
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1631377307475-9acfa929b062?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Emily R.",
    role: "First-Time Buyer",
    quote:
      "As a first-time homebuyer, I was nervous about the loan process. The team explained every option clearly, and the whole application felt completely manageable.",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Sarah L.",
    role: "Repeat Client",
    quote:
      "The best part about Daeluxe is how comprehensive the service is. From finding a property to securing financing, everything was handled with real care and transparency.",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc?auto=format&fit=crop&w=400&h=400&q=80",
  },
];

/* ---------------------------------------------------------------------- */
/*  Motion variants                                                       */
/* ---------------------------------------------------------------------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const gridParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const pairItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

/* ---------------------------------------------------------------------- */
/*  Component                                                             */
/* ---------------------------------------------------------------------- */

export default function TestimonialsSection() {
  return (
    <section className="w-full overflow-hidden bg-[#F3F4F6] px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-28 xl:px-20 2xl:px-28">
      {/* ----------------------------- Header ----------------------------- */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="mx-auto mb-14 max-w-2xl text-center lg:mb-16 "
      >
        <h2 className="font-sans text-[2.25rem] font-bold leading-[1.15] text-[#0A0A0A] sm:text-5xl lg:text-[3.25rem]">
          <span className="block">See what our customers</span>
          <span className="block font-playfair italic font-semibold">
            are saying
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-lg font-sans text-base leading-relaxed text-[#0A0A0A]/70 sm:text-lg">
          More than <span className="font-bold italic">12,000</span> homebuyers
          and sellers have worked with us and shared their story.
        </p>
      </motion.div>

      {/* ------------------------------ Bento grid ------------------------------ */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={gridParent}
        className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6"
      >
        {TESTIMONIALS.map((t, i) => (
          <TestimonialPair key={t.name} testimonial={t} imageFirst={i < 2} />
        ))}
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  A single bento "pair" — avatar tile + quote tile                      */
/* ---------------------------------------------------------------------- */

function TestimonialPair({
  testimonial,
  imageFirst,
}: {
  testimonial: Testimonial;
  imageFirst: boolean;
}) {
  const imageTile = <AvatarTile testimonial={testimonial} />;
  const quoteTile = <QuoteTile testimonial={testimonial} />;

  return (
    <motion.div
      variants={pairItem}
      className={`grid items-stretch gap-4 sm:gap-5 grid-cols-1 ${
        imageFirst
          ? "sm:grid-cols-[minmax(140px,0.85fr)_1.7fr]"
          : "sm:grid-cols-[1.7fr_minmax(140px,0.85fr)]"
      }`}
    >
      {imageFirst ? (
        <>
          {imageTile}
          {quoteTile}
        </>
      ) : (
        <>
          {quoteTile}
          {imageTile}
        </>
      )}
    </motion.div>
  );
}

function AvatarTile({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="group relative min-h-[160px] sm:min-h-[220px] aspect-[16/10] sm:aspect-auto overflow-hidden rounded-2xl shadow-[0_1px_3px_rgba(10,10,10,0.06)]">
      <Image
        src={testimonial.image}
        alt={testimonial.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 30vw, 20vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
    </div>
  );
}

function QuoteTile({ testimonial }: { testimonial: Testimonial }) {
  const { name, role, quote, rating } = testimonial;
  return (
    <div className="group relative flex min-h-[220px] flex-col justify-between rounded-2xl bg-white px-6 py-6 shadow-[0_1px_3px_rgba(10,10,10,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(10,10,10,0.16)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:px-7 sm:py-7">
      <Quote
        className="absolute left-5 top-5 h-6 w-6 -scale-x-100 text-black/10 sm:left-6 sm:top-6"
        fill="currentColor"
        strokeWidth={0}
      />

      <p className="relative font-sans text-[15px] leading-relaxed text-[#1A1A1A] sm:text-base">
        {quote}
      </p>

      <div className="mt-5 flex items-end justify-between gap-3">
        <div>
          <p className="font-sans text-base font-bold text-[#0A0A0A]">{name}</p>
          <p className="mt-0.5 font-sans text-sm text-[#6B6B6B]">{role}</p>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <span className="font-sans text-lg font-bold text-[#0A0A0A]">
            {rating.toFixed(1)}
          </span>
          <Stars rating={rating} />
        </div>
      </div>
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  const filled = Math.floor(rating);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) =>
        i < filled ? (
          <Star
            key={i}
            className="h-[15px] w-[15px] text-[#F2860F]"
            fill="currentColor"
            strokeWidth={0}
          />
        ) : (
          <Star
            key={i}
            className="h-[15px] w-[15px] text-[#DADADA]"
            fill="currentColor"
            strokeWidth={0}
          />
        ),
      )}
    </div>
  );
}
