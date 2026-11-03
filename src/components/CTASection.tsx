import React, { type CSSProperties } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { trackCtaClick } from "../utils/analytics";
import { siteConfig } from "../data/siteData";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useMediaQuery";
import CtaParticles from "./CtaParticles";
import "./CTASection.css";

const reveal = (delay: number): CSSProperties =>
  ({ "--reveal-delay": `${delay}ms` }) as CSSProperties;

export default function CTASection() {
  const [sectionRef, inView] = useInView<HTMLElement>({
    threshold: 0.15,
    once: true,
  });
  const shouldReduceMotion = useReducedMotion();

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackCtaClick("Share Your Idea CTA Banner", "#contact");

    const el = document.getElementById("contact");
    if (el) {
      const headerOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      window.history.pushState(null, "", "#contact");

      setTimeout(() => {
        const input = el.querySelector("input");
        input?.focus();
      }, 500);
    }
  };

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
          {/* Message */}
          <div className="cta-copy">
            <h2 id="cta-title" className="cta-title cta-reveal" style={reveal(0)}>
              Have an Idea?
              <br />
              Let&apos;s Build Something{" "}
              <span className="cta-title-accent">Exceptional.</span>
            </h2>

            <p className="cta-sub cta-reveal" style={reveal(80)}>
              Turn your vision into a powerful digital solution. Tell us what
              you&apos;re planning, and let&apos;s create something that makes a
              difference.
            </p>
          </div>

          {/* Actions */}
          <div className="cta-panel">
            <a
              href="#contact"
              onClick={handleScrollToContact}
              className="cta-primary cta-reveal"
              style={reveal(160)}
            >
              <span>Start Your Project</span>
              <span className="cta-primary-arrow" aria-hidden="true">
                <ArrowRight size={18} />
              </span>
            </a>

            <a
              href={siteConfig.phoneHref}
              className="cta-callback cta-reveal"
              style={reveal(240)}
              aria-label={`Request a call back at ${siteConfig.phone}`}
            >
              <span className="cta-callback-copy">
                <span className="cta-callback-label">Have a project in mind?</span>
                <span className="cta-callback-number">{siteConfig.phone}</span>
              </span>
              <span className="cta-callback-icon" aria-hidden="true">
                <Phone size={20} fill="currentColor" strokeWidth={1.5} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
