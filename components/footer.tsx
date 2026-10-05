import { ArrowUp, Mail } from "lucide-react";
import { hasEmail, portfolio } from "@/data/portfolio";
import { SocialLinks } from "@/components/ui/shared";

export function Footer() {
  return (
    <footer className="footer">
      <div className="section-container">
        <div className="footer-top">
          <div>
            <a href="#home" className="footer-name">
              {portfolio.name}
              <span>.</span>
            </a>
            <p>AI Engineer · Software Engineer</p>
          </div>
          <div className="footer-links">
            <SocialLinks />
            {hasEmail && (
              <a href={`mailto:${portfolio.email}`} className="social-link">
                <Mail size={16} />
                Email
              </a>
            )}
            <a className="back-to-top" href="#home" aria-label="Back to top">
              <ArrowUp size={18} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {portfolio.name}
          </span>
          <span>{portfolio.footer}</span>
          <span className="mono">
            BUILT WITH INTENT <span className="violet">✳</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
