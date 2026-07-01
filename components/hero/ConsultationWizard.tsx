"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  RiHome4Line,
  RiBuilding2Line,
  RiPlantLine,
  RiStore2Line,
  RiLineChartLine,
  RiCheckLine,
  RiArrowRightLine,
  RiArrowLeftLine,
  RiPhoneLine,
  RiMailLine,
  RiMessage2Line,
  RiSparklingLine,
} from "react-icons/ri";

/* ── Types ───────────────────────────────────────────────── */

type WizardData = {
  propertyType: string;
  timeline: string;
  bedrooms: string;
  area: string;
  features: string[];
  budget: string;
  phone: string;
  email: string;
  comments: string;
};

const TOTAL_STEPS = 7;

/* ── Step configs ────────────────────────────────────────── */

const PROPERTY_TYPES = [
  { id: "single-family", label: "Single Family", icon: RiHome4Line },
  { id: "townhome", label: "Townhome", icon: RiBuilding2Line },
  { id: "land", label: "Land 1 Acre+", icon: RiPlantLine },
  { id: "rental", label: "Rental Property", icon: RiStore2Line },
  { id: "investment", label: "Investment Property", icon: RiLineChartLine },
];

const TIMELINES = [
  "Within 3 Months",
  "3–6 Months",
  "6–12 Months",
  "Just Exploring",
];

const BEDROOMS = ["1–2", "3–4", "5–6+"];

const AREAS = ["Denver", "Aurora", "Boulder"];

const FEATURES = [
  "Gourmet Kitchen",
  "Home Office",
  "Two-Car Garage",
  "Outdoor Living",
  "Main Floor Primary Suite",
  "Smart Home Technology",
];

const BUDGETS = ["Under $300K", "$300K–$500K", "$500K–$700K", "$750K+"];

/* ── Motion variants ─────────────────────────────────────── */

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 40 : -40,
    opacity: 0,
    filter: "blur(4px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -40 : 40,
    opacity: 0,
    filter: "blur(4px)",
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ── Sub-components ──────────────────────────────────────── */

function OptionButton({
  selected,
  onClick,
  children,
  className = "",
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative w-full text-left px-4 py-3.5 sm:px-5 sm:py-4 rounded-2xl border transition-all duration-200 cursor-pointer
        text-sm sm:text-[0.9375rem] font-medium tracking-wide backdrop-blur-md
        ${
          selected
            ? "border-champagne-gold/80 bg-champagne-gold/28 text-champagne-gold shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_32px_rgba(221,199,161,0.22),0_0_0_1px_rgba(221,199,161,0.15)]"
            : "border-white/22 bg-white/10 text-white hover:border-white/38 hover:bg-white/16 hover:text-white"
        }
        ${className}
      `}
    >
      {selected && (
        <motion.span
          layoutId="option-check"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-[1.375rem] sm:h-[1.375rem] rounded-full bg-champagne-gold flex items-center justify-center"
        >
          <RiCheckLine className="text-[#222] text-xs" />
        </motion.span>
      )}
      {children}
    </motion.button>
  );
}

function PillButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`
        px-4 py-2.5 sm:px-[1.125rem] sm:py-3 rounded-full border text-sm sm:text-[0.9375rem] font-medium tracking-wide transition-all duration-200 cursor-pointer backdrop-blur-md
        ${
          selected
            ? "border-champagne-gold/80 bg-champagne-gold/28 text-champagne-gold shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_20px_rgba(221,199,161,0.22)]"
            : "border-white/22 bg-white/10 text-white hover:border-white/38 hover:text-white hover:bg-white/16"
        }
      `}
    >
      {selected && <RiCheckLine className="inline mr-1.5 text-xs" />}
      {children}
    </motion.button>
  );
}

/* ── Main component ──────────────────────────────────────── */

export default function ConsultationWizard() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<WizardData>({
    propertyType: "",
    timeline: "",
    bedrooms: "",
    area: "",
    features: [],
    budget: "",
    phone: "",
    email: "",
    comments: "",
  });

  const progress = (step / TOTAL_STEPS) * 100;

  function goNext() {
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  function goBack() {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  }

  function pick(field: keyof WizardData, value: string) {
    setData((d) => ({ ...d, [field]: value }));
    // Auto-advance for single-select steps
    setTimeout(() => goNext(), 280);
  }

  function toggleFeature(feature: string) {
    setData((d) => ({
      ...d,
      features: d.features.includes(feature)
        ? d.features.filter((f) => f !== feature)
        : [...d.features, feature],
    }));
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  return (
    <div
      id="consultation"
      className="relative rounded-[28px] p-5 sm:p-7 lg:p-8 xl:p-9 w-full flex flex-col gap-0 select-none overflow-hidden"
      style={{
        /* Dark Charcoal Glass — deep background so white text is crisp and readable */
        background:
          "linear-gradient(145deg, rgba(14, 12, 10, 0.82) 0%, rgba(22, 18, 14, 0.75) 100%)",
        backdropFilter: "blur(56px) saturate(1.6) brightness(0.9)",
        WebkitBackdropFilter: "blur(56px) saturate(1.6) brightness(0.9)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: [
          "0 40px 100px rgba(0,0,0,0.55)",
          "0 8px 40px rgba(0,0,0,0.35)",
          "inset 0 1px 0 rgba(255,255,255,0.12)",
          "inset 0 -1px 0 rgba(0,0,0,0.20)",
          "inset 1px 0 0 rgba(255,255,255,0.06)",
          "0 0 0 1px rgba(221,199,161,0.08)",
        ].join(", "),
        animation: "float 6s ease-in-out infinite",
      }}
    >
      {/* Subtle dark-to-darker gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.15] pointer-events-none" />
      {/* Top shimmer edge — thin gold-tinted refraction line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne-gold/30 to-transparent pointer-events-none" />
      {/* Left shimmer edge */}
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-white/20 via-white/06 to-transparent pointer-events-none" />
      {/* Corner inner glow — warm top-left highlight */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-champagne-gold/[0.06] to-transparent rounded-[28px] pointer-events-none" />
      {/* Champagne warm tint at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-champagne-gold/[0.07] to-transparent pointer-events-none" />
      {/* ── Header ── */}
      <div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-champagne-gold/25 border border-champagne-gold/50 flex items-center justify-center shadow-[0_0_12px_rgba(221,199,161,0.25)]">
          <RiSparklingLine className="text-champagne-gold text-sm sm:text-base" />
        </div>
        <span className="text-champagne-gold text-sm sm:text-base lg:text-[1.05rem] font-bold tracking-[0.16em] uppercase drop-shadow-[0_1px_4px_rgba(221,199,161,0.4)]">
          Free Consultation
        </span>
      </div>

      {!submitted ? (
        <>
          {/* ── Progress ── */}
          <div className="mb-5 sm:mb-6">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-white/90 text-xs sm:text-sm tracking-wide font-semibold">
                Question {step} of {TOTAL_STEPS}
              </span>
              <span className="text-champagne-gold text-xs sm:text-sm font-bold drop-shadow-[0_0_6px_rgba(221,199,161,0.5)]">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-1.5 sm:h-[7px] bg-white/15 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-champagne-gold via-warm-ochre to-champagne-gold rounded-full shadow-[0_0_10px_rgba(221,199,161,0.6)]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* ── Step Content ── */}
          <div className="overflow-hidden min-h-[300px] sm:min-h-[340px] lg:min-h-[360px] flex flex-col">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-3 sm:gap-3.5 flex-1"
              >
                {/* Step 1 — Property Type */}
                {step === 1 && (
                  <>
                    <h3 className="text-white text-[1.25rem] sm:text-[1.4rem] lg:text-[1.5rem] font-bold mb-2 sm:mb-3 leading-snug">
                      What type of home are
                      <br />
                      <em className="text-champagne-gold font-semibold">
                        you looking for?
                      </em>
                    </h3>
                    <div className="flex flex-col gap-2.5 sm:gap-3">
                      {PROPERTY_TYPES.map(({ id, label, icon: Icon }) => (
                        <OptionButton
                          key={id}
                          selected={data.propertyType === id}
                          onClick={() => pick("propertyType", id)}
                        >
                          <span className="flex items-center gap-3 sm:gap-3.5">
                            <Icon className="text-champagne-gold text-base sm:text-lg flex-shrink-0" />
                            {label}
                          </span>
                        </OptionButton>
                      ))}
                    </div>
                  </>
                )}

                {/* Step 2 — Timeline */}
                {step === 2 && (
                  <>
                    <h3 className="text-white text-[1.2rem] sm:text-[1.35rem] lg:text-[1.45rem] font-semibold mb-1 sm:mb-2 leading-snug">
                      When are you planning
                      <br />
                      <em className="text-champagne-gold">to move?</em>
                    </h3>
                    <div className="flex flex-col gap-2.5 sm:gap-3">
                      {TIMELINES.map((t) => (
                        <OptionButton
                          key={t}
                          selected={data.timeline === t}
                          onClick={() => pick("timeline", t)}
                        >
                          {t}
                        </OptionButton>
                      ))}
                    </div>
                  </>
                )}

                {/* Step 3 — Bedrooms */}
                {step === 3 && (
                  <>
                    <h3 className="text-white text-[1.2rem] sm:text-[1.35rem] lg:text-[1.45rem] font-semibold mb-1 sm:mb-2 leading-snug">
                      How many
                      <br />
                      <em className="text-champagne-gold">bedrooms?</em>
                    </h3>
                    <div className="flex gap-2.5 sm:gap-3">
                      {BEDROOMS.map((b) => (
                        <motion.button
                          key={b}
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => pick("bedrooms", b)}
                          className={`
                            flex-1 py-4 sm:py-5 lg:py-[1.375rem] rounded-2xl border text-sm sm:text-base font-semibold transition-all duration-200 cursor-pointer
                            ${
                              data.bedrooms === b
                                ? "border-champagne-gold bg-champagne-gold/12 text-champagne-gold"
                                : "border-white/10 bg-white/5 text-white/70 hover:border-white/25 hover:text-white"
                            }
                          `}
                        >
                          {b}
                        </motion.button>
                      ))}
                    </div>
                  </>
                )}

                {/* Step 4 — Area */}
                {step === 4 && (
                  <>
                    <h3 className="text-white text-[1.2rem] sm:text-[1.35rem] lg:text-[1.45rem] font-semibold mb-1 sm:mb-2 leading-snug">
                      What&apos;s your preferred
                      <br />
                      <em className="text-champagne-gold">area?</em>
                    </h3>
                    <div className="flex flex-col gap-2.5 sm:gap-3">
                      {AREAS.map((a) => (
                        <OptionButton
                          key={a}
                          selected={data.area === a}
                          onClick={() => pick("area", a)}
                        >
                          {a}
                        </OptionButton>
                      ))}
                    </div>
                  </>
                )}

                {/* Step 5 — Features */}
                {step === 5 && (
                  <>
                    <h3 className="text-white text-[1.2rem] sm:text-[1.35rem] lg:text-[1.45rem] font-semibold mb-1 sm:mb-2 leading-snug">
                      Which features
                      <br />
                      <em className="text-champagne-gold">matter most?</em>
                    </h3>
                    <p className="text-white/40 text-xs sm:text-sm mb-1">
                      Select all that apply
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {FEATURES.map((f) => (
                        <PillButton
                          key={f}
                          selected={data.features.includes(f)}
                          onClick={() => toggleFeature(f)}
                        >
                          {f}
                        </PillButton>
                      ))}
                    </div>
                    <motion.button
                      onClick={goNext}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-auto w-full py-3.5 sm:py-4 rounded-2xl bg-champagne-gold/12 border border-champagne-gold/30 text-champagne-gold text-sm sm:text-[0.9375rem] font-semibold tracking-wide hover:bg-champagne-gold/20 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                    >
                      Continue
                      <RiArrowRightLine />
                    </motion.button>
                  </>
                )}

                {/* Step 6 — Budget */}
                {step === 6 && (
                  <>
                    <h3 className="text-white text-[1.2rem] sm:text-[1.35rem] lg:text-[1.45rem] font-semibold mb-1 sm:mb-2 leading-snug">
                      What&apos;s your
                      <br />
                      <em className="text-champagne-gold">target budget?</em>
                    </h3>
                    <div className="flex flex-col gap-2.5 sm:gap-3">
                      {BUDGETS.map((b) => (
                        <OptionButton
                          key={b}
                          selected={data.budget === b}
                          onClick={() => pick("budget", b)}
                        >
                          {b}
                        </OptionButton>
                      ))}
                    </div>
                  </>
                )}

                {/* Step 7 — Contact */}
                {step === 7 && (
                  <>
                    <h3 className="text-white text-[1.2rem] sm:text-[1.35rem] lg:text-[1.45rem] font-semibold mb-1 sm:mb-2 leading-snug">
                      Last step
                      <br />
                      <em className="text-champagne-gold">
                        Enter your Details so we will contact you
                      </em>
                    </h3>
                    <div className="flex flex-col gap-3 sm:gap-3.5">
                      <label className="flex items-center gap-3 sm:gap-3.5 px-4 py-3.5 sm:px-5 sm:py-4 rounded-2xl border border-white/28 bg-white/14 focus-within:border-champagne-gold/60 focus-within:bg-white/20 transition-all duration-200 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_4px_16px_rgba(0,0,0,0.08)]">
                        <RiPhoneLine className="text-champagne-gold text-base sm:text-lg flex-shrink-0" />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={data.phone}
                          onChange={(e) =>
                            setData((d) => ({ ...d, phone: e.target.value }))
                          }
                          className="bg-transparent text-white text-sm sm:text-[0.9375rem] placeholder:text-white/60 outline-none w-full font-medium"
                        />
                      </label>
                      <label className="flex items-center gap-3 sm:gap-3.5 px-4 py-3.5 sm:px-5 sm:py-4 rounded-2xl border border-white/28 bg-white/14 focus-within:border-champagne-gold/60 focus-within:bg-white/20 transition-all duration-200 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_4px_16px_rgba(0,0,0,0.08)]">
                        <RiMailLine className="text-champagne-gold text-base sm:text-lg flex-shrink-0" />
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={data.email}
                          onChange={(e) =>
                            setData((d) => ({ ...d, email: e.target.value }))
                          }
                          className="bg-transparent text-white text-sm sm:text-[0.9375rem] placeholder:text-white/60 outline-none w-full font-medium"
                        />
                      </label>
                      <label className="flex items-start gap-3 sm:gap-3.5 px-4 py-3.5 sm:px-5 sm:py-4 rounded-2xl border border-white/28 bg-white/14 focus-within:border-champagne-gold/60 focus-within:bg-white/20 transition-all duration-200 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_4px_16px_rgba(0,0,0,0.08)]">
                        <RiMessage2Line className="text-champagne-gold text-base sm:text-lg flex-shrink-0 mt-0.5" />
                        <textarea
                          placeholder="Any comments or questions..."
                          value={data.comments}
                          onChange={(e) =>
                            setData((d) => ({ ...d, comments: e.target.value }))
                          }
                          rows={3}
                          className="bg-transparent text-white text-sm sm:text-[0.9375rem] placeholder:text-white/60 outline-none w-full resize-none font-medium"
                        />
                      </label>
                    </div>
                    <motion.button
                      onClick={handleSubmit}
                      whileHover={{
                        scale: 1.02,
                        boxShadow:
                          "0 10px 48px rgba(221,199,161,0.28), 0 0 0 1px rgba(221,199,161,0.45)",
                        backgroundColor: "rgba(221,199,161,0.24)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="relative mt-2 w-full py-4 sm:py-[1.125rem] rounded-2xl text-white text-sm sm:text-[0.9375rem] font-bold tracking-[0.08em] uppercase cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(221, 199, 161, 0.22) 0%, rgba(221, 199, 161, 0.08) 100%)",
                        backdropFilter: "blur(24px) saturate(1.6)",
                        WebkitBackdropFilter: "blur(24px) saturate(1.6)",
                        border: "1px solid rgba(221, 199, 161, 0.40)",
                        boxShadow:
                          "inset 0 1px 0 rgba(255,255,255,0.20), 0 4px 20px rgba(0,0,0,0.15)",
                      }}
                    >
                      {/* Top shimmer */}
                      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne-gold/50 to-transparent" />
                      Book My Free Consultation
                      <RiArrowRightLine className="text-champagne-gold" />
                    </motion.button>
                    <p className="text-center text-white/50 text-xs sm:text-sm mt-1">
                      🔒 Your information is secure and confidential.
                    </p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Navigation ── */}
          {step > 1 && step < 7 && (
            <div className="mt-4 sm:mt-5 pt-4 border-t border-white/8">
              <button
                onClick={goBack}
                className="flex items-center gap-1.5 text-white/35 text-xs sm:text-sm hover:text-white/60 transition-colors duration-200 cursor-pointer"
              >
                <RiArrowLeftLine />
                Back
              </button>
            </div>
          )}
        </>
      ) : (
        /* ── Success Screen ── */
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center text-center py-8 gap-5"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-full bg-champagne-gold/15 border border-champagne-gold/40 flex items-center justify-center"
          >
            <RiCheckLine className="text-champagne-gold text-2xl" />
          </motion.div>
          <div>
            <h3 className="text-white text-2xl font-semibold mb-2">
              Thank You!
            </h3>
            <p className="text-white/95 text-sm lg:text-lg leading-normal">
              Our Denver team will contact you
              <br />
              within 24 hours.
            </p>
          </div>
          <div className="flex items-center gap-2 px-5 py-3 rounded-full border border-champagne-gold/25 bg-champagne-gold/8">
            <RiCheckLine className="text-champagne-gold text-sm" />
            <span className="text-champagne-gold text-sm font-medium tracking-wide">
              Request Received
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
