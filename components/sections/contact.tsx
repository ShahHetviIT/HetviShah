import { ArrowUpRight, Mail } from "lucide-react";
import { hasEmail, portfolio } from "@/data/portfolio";
import { Glow, Reveal } from "@/components/ui/motion";
import { SocialLinks } from "@/components/ui/shared";

export function Contact() {
  return (
    <section
      id="contact"
      className="contact-section"
      tabIndex={-1}
      aria-label="Contact"
    >
      <Glow className="contact-inner">
        <div className="section-container">
          <Reveal>
            <div className="contact-layout">
              <div>
                <span className="eyebrow">
                  <span className="label-dash" />
                  LET’S BUILD SOMETHING THAT MATTERS
                </span>
                <h2>
                  Have an AI problem
                  <br />
                  worth <span>solving?</span>
                  <ArrowUpRight
                    className="contact-arrow"
                    strokeWidth={1}
                    aria-hidden="true"
                  />
                </h2>
                <p>{portfolio.contact}</p>
              </div>
              <div className="contact-action">
                <span className="contact-orbit" aria-hidden="true">
                  <SparkleMark />
                </span>
                {hasEmail ? (
                  <a
                    className="button button-contact"
                    href={`mailto:${portfolio.email}`}
                  >
                    Let’s connect
                    <ArrowUpRight size={18} />
                  </a>
                ) : (
                  <div className="contact-pending">
                    <span>
                      <Mail size={17} />
                      Let’s connect
                    </span>
                    <small>Contact details coming soon</small>
                  </div>
                )}
                <div className="contact-socials">
                  <SocialLinks />
                </div>
              </div>
            </div>
            {hasEmail && (
              <a className="contact-email" href={`mailto:${portfolio.email}`}>
                {portfolio.email}
                <ArrowUpRight size={14} />
              </a>
            )}
          </Reveal>
        </div>
      </Glow>
    </section>
  );
}

function SparkleMark() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <path
        d="M30 3V57M3 30H57M11 11L49 49M11 49L49 11"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="30" cy="30" r="10" fill="currentColor" />
    </svg>
  );
}
