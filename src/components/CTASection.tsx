import { type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useMediaQuery";
import CtaParticles from "./CtaParticles";
import { trackCtaClick } from "../utils/analytics";
import "./CTASection.css";

const reveal = (delay: number): CSSProperties =>
  ({ "--reveal-delay": `${delay}ms` }) as CSSProperties;

export default function CTASection() {
  const [sectionRef, inView] = useInView<HTMLElement>({
    threshold: 0.15,
    once: false,
  });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      className={`marvel-cta${inView ? " is-visible" : ""}${
        shouldReduceMotion ? " is-reduced" : ""
      }`}
      aria-labelledby="cta-title"
    >
      {/* Animated particle constellation */}
      <div className="cta-bg" aria-hidden="true">
        <CtaParticles
          reduceMotion={shouldReduceMotion}
          className="cta-particles"
        />
      </div>

      <div className="container">
        <div className="cta-shell">
          {/* Message + action */}
          <div className="cta-copy">
            <h2 id="cta-title" className="cta-title cta-reveal" style={reveal(0)}>
              <span className="cta-title-line">
                <span className="cta-mobile-first-line">Looking to Transform</span>
                <br className="cta-mobile-break" /> Your Business?
              </span>
              <span className="cta-lav-row">
                <span className="cta-lav-copy">
                  <span className="cta-title-lav">Let&apos;s Create Technology</span>
                  <span className="cta-title-lav cta-title-accent">That Moves You Forward.</span>
                </span>
                <Link
                  to="/#contact"
                  className="hero-btn hero-btn--primary"
                  aria-label="Get a Quote — go to the contact form"
                  onClick={() => trackCtaClick('Get a Quote (CTA Banner)', '/#contact')}
                >
                  Get a Quote
                  <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
                </Link>
              </span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
