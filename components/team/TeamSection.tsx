"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Trophy, Users, Star, Home, ArrowUpRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const STATS = [
  { icon: Trophy, value: "500+", label: "Homes Sold" },
  { icon: Users, value: "20+", label: "Years of\nCombined Experience" },
  { icon: Star, value: "4.9", label: "Client Rating" },
  { icon: Home, value: "$2B+", label: "Sales Volume" },
];

const TEAM = [
  {
    name: "Dae Han Trejo",
    initials: "DT",
    role: "CEO / Founder",
    bio: "With a sharp eye for detail and a results-driven approach, Dae leads Daeluxe with vision, integrity, and a commitment to excellence.",
    image: "/Team/CEO.avif",
  },
  {
    name: "Vanessa Sanchez",
    initials: "VS",
    role: "Executive Residential Agent",
    bio: "A skilled negotiator and market expert, Vanessa helps clients move forward with confidence through personalized service and strategy.",
    image: "/Team/VanessaSanchez.avif",
  },
  {
    name: "Kyle Rupert",
    initials: "KR",
    role: "Residential Agent",
    bio: "Kyle is known for his strong work ethic, market knowledge, and client-first mindset making every transaction smooth and stress-free.",
    image: "/Team/KyleRupert.avif",
  },
  {
    name: "Mikaela Paclar",
    initials: "MP",
    role: "Social Media Manager",
    bio: "Mikaela brings creativity and strategy to life online connecting with our audience and showcasing the Daeluxe difference.",
    image: "/Team/MikaelaPaclar.avif",
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

/* ------------------------------------------------------------------ */
/*  Magnetic button                                                    */
/* ------------------------------------------------------------------ */

function MagneticButton({ children, href = "#" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.15 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.15 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.4);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="group inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-6 pr-1.5 text-[15px] font-medium text-black shadow-[0_8px_24px_-8px_rgba(0,0,0,0.25)]"
    >
      {children}
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 ease-out group-hover:rotate-45">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TeamSection() {
  return (
    <section id="team" className="relative w-full overflow-hidden bg-soft-ivory font-sans px-6 py-20 sm:px-10 lg:px-16 xl:px-20 2xl:px-28">
      <div className="w-full">
        {/* ---------------------------------------------------------- */}
        {/* Header row                                                  */}
        {/* ---------------------------------------------------------- */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="max-w-xl"
          >
            <motion.p
              variants={fadeUp}
              className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#B8783A]"
            >
              Our People
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-sans font-bold text-5xl leading-[1.05] text-[#1B1B1B] sm:text-6xl lg:text-7xl"
            >
              Meet The Daeluxe Team
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-md text-[15px] font-semibold leading-relaxed text-[#5B5B57]"
            >
              A team of passionate real estate professionals dedicated to
              delivering exceptional results and unforgettable experiences.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-6">
              <MagneticButton href="#">Get to know us</MagneticButton>
            </motion.div>
          </motion.div>

          {/* Stats card */}
          {/* <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            className="grid grid-cols-2 gap-0 rounded-[20px] bg-[#FBF9F4] px-2 py-8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] sm:grid-cols-4 sm:px-4 lg:w-[640px]"
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.value}
                className={`flex flex-col items-center gap-3 px-4 text-center ${
                  i !== 0 ? "border-l border-[#E4DECE]" : ""
                }`}
              >
                <stat.icon
                  className="h-6 w-6 text-[#C9794A]"
                  strokeWidth={1.5}
                />
                <span className="text-3xl font-medium text-[#1B1B1B] sm:text-4xl">
                  {stat.value}
                </span>
                <span className="whitespace-pre-line text-xs leading-snug text-[#7A766C]">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div> */}
        </div>

        {/* ---------------------------------------------------------- */}
        {/* Team grid                                                   */}
        {/* ---------------------------------------------------------- */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TEAM.map((member) => (
            <motion.div
              key={member.name}
              variants={fadeUp}
              className="group relative h-[460px] overflow-hidden rounded-[20px] bg-[#1B1B1B]"
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* darkening gradient — stays clear on the face, deepens toward the caption */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,9,8,0.97) 0%, rgba(10,9,8,0.88) 26%, rgba(10,9,8,0.35) 52%, rgba(10,9,8,0) 72%)",
                }}
              />

              {/* initials badge */}
              <div
                className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full text-[11px] font-bold tracking-wider text-[#1B1B1B]"
                style={{
                  background:
                    "linear-gradient(135deg, #EFD9B8 0%, #D89A5E 60%, #C9794A 100%)",
                  boxShadow: "0 2px 12px rgba(201,121,74,0.45)",
                }}
              >
                {member.initials}
              </div>

              {/* content */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[13px] font-semibold uppercase font-sans tracking-[0.14em] text-champagne-gold">
                  {member.role}
                </p>
                <h3 className="mt-2 font-sans text-[26px] leading-tight text-white">
                  {member.name}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/72">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ---------------------------------------------------------- */}
        {/* Bottom row: quote + CTA                                    */}
        {/* ---------------------------------------------------------- */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-5">
          {/* Quote card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-stretch overflow-hidden rounded-[20px] bg-[#FBF9F4] lg:col-span-3"
          >
            <div className="flex flex-1 flex-col justify-center gap-4 p-8 sm:p-10">
              <span className="font-serif text-7xl leading-none text-[#C9794A]">
                “
              </span>
              <p className="-mt-3 font-sans font-bold text-xl leading-snug text-[#1B1B1B] sm:text-[26px]">
                Great things in business are never done by one person. They’re
                done by a team of people.
              </p>
              <span className="text-base text-[#504d45] font-semibold">— Steve Jobs</span>
            </div>
            <div className="relative hidden w-[38%] sm:block">
              <Image
                src="/living_room_interior.png"
                alt="Modern living room"
                fill
                sizes="400px"
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="flex items-center gap-6 rounded-[20px] bg-[#1B1B1B] p-8 sm:p-10 lg:col-span-2"
          >
            <Home
              className="hidden h-12 w-12 shrink-0 text-[#C9794A] sm:block"
              strokeWidth={1}
            />
            <div>
              <p className="text-lg leading-snug text-white sm:text-xl">
                More than agents. We’re your partners in every step of your real
                estate journey.
              </p>
              <div className="mt-5">
                <MagneticButton href="#">Work With Us</MagneticButton>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
