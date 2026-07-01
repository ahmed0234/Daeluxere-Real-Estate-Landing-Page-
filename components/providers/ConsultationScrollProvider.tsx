"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLenis } from "lenis/react";
import {
  CONSULTATION_CTA_ATTR,
  CONSULTATION_FORM_ID,
  CONSULTATION_HIGHLIGHT_MS,
} from "@/lib/consultation";

interface ConsultationScrollContextValue {
  scrollToConsultation: () => void;
  isHighlighted: boolean;
}

const ConsultationScrollContext =
  createContext<ConsultationScrollContextValue | null>(null);

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function focusFirstFormControl(form: HTMLElement) {
  const focusable = form.querySelector<HTMLElement>(
    'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  focusable?.focus({ preventScroll: true });
}

export function ConsultationScrollProvider({ children }: { children: ReactNode }) {
  const lenis = useLenis();
  const [isHighlighted, setIsHighlighted] = useState(false);
  const highlightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isScrollingRef = useRef(false);

  const clearHighlightTimer = useCallback(() => {
    if (highlightTimerRef.current) {
      clearTimeout(highlightTimerRef.current);
      highlightTimerRef.current = null;
    }
  }, []);

  const triggerHighlight = useCallback(() => {
    clearHighlightTimer();
    setIsHighlighted(true);

    const duration = prefersReducedMotion()
      ? CONSULTATION_HIGHLIGHT_MS * 0.5
      : CONSULTATION_HIGHLIGHT_MS;

    highlightTimerRef.current = setTimeout(() => {
      setIsHighlighted(false);
      highlightTimerRef.current = null;
    }, duration);
  }, [clearHighlightTimer]);

  const onArrive = useCallback(() => {
    const form = document.getElementById(CONSULTATION_FORM_ID);
    if (!form) return;

    isScrollingRef.current = false;
    triggerHighlight();
    focusFirstFormControl(form);
  }, [triggerHighlight]);

  const scrollToConsultation = useCallback(() => {
    const form = document.getElementById(CONSULTATION_FORM_ID);
    if (!form) {
      isScrollingRef.current = false;
      return;
    }
    if (isScrollingRef.current) return;

    isScrollingRef.current = true;
    clearHighlightTimer();
    setIsHighlighted(false);

    const reduced = prefersReducedMotion();

    if (lenis) {
      lenis.scrollTo(form, {
        offset: -48,
        duration: reduced ? 0.6 : 1.15,
        immediate: reduced,
        onComplete: onArrive,
      });
      return;
    }

    form.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "center",
    });

    setTimeout(onArrive, reduced ? 0 : 850);
  }, [lenis, onArrive, clearHighlightTimer]);

  /* Delegate clicks from any consultation CTA anchor or button */
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target) return;

      const anchor = target.closest<HTMLAnchorElement>(
        `a[href="#${CONSULTATION_FORM_ID}"]`
      );
      const button = target.closest<HTMLButtonElement>(
        `[${CONSULTATION_CTA_ATTR}]`
      );

      if (!anchor && !button) return;

      event.preventDefault();
      scrollToConsultation();
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [scrollToConsultation]);

  useEffect(() => clearHighlightTimer, [clearHighlightTimer]);

  return (
    <ConsultationScrollContext.Provider
      value={{ scrollToConsultation, isHighlighted }}
    >
      {children}
    </ConsultationScrollContext.Provider>
  );
}

export function useConsultationScroll() {
  const context = useContext(ConsultationScrollContext);
  if (!context) {
    throw new Error(
      "useConsultationScroll must be used within ConsultationScrollProvider"
    );
  }
  return context;
}
