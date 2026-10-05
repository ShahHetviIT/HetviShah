import { ArrowDownToLine, ArrowUpRight, Github, Linkedin } from "lucide-react";
import { isSocialUrl, portfolio } from "@/data/portfolio";

export function SocialLinks({ iconsOnly = false }: { iconsOnly?: boolean }) {
  return (
    <>
      {Object.entries(portfolio.socials)
        .filter(([, url]) => isSocialUrl(url))
        .map(([name, url]) => {
          const Icon = name === "github" ? Github : Linkedin;
          const label = name === "github" ? "GitHub" : "LinkedIn";
          return (
            <a
              key={name}
              className={iconsOnly ? "icon-link" : "social-link"}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${portfolio.name} on ${label} (opens in a new tab)`}
            >
              <Icon size={17} aria-hidden="true" />
              {!iconsOnly && (
                <>
                  {label}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </>
              )}
            </a>
          );
        })}
    </>
  );
}

export function ResumeLink({
  available,
  compact = false,
}: {
  available: boolean;
  compact?: boolean;
}) {
  if (!available)
    return (
      <span
        className={`resume-unavailable ${compact ? "compact" : ""}`}
        title="Resume will be available soon"
      >
        <ArrowDownToLine size={15} aria-hidden="true" />
        {compact ? "Resume" : "Download resume"}
        <span className="soon">Soon</span>
      </span>
    );
  return (
    <a
      href={portfolio.resume}
      download
      className={`button ${compact ? "button-nav" : "button-secondary"}`}
    >
      <ArrowDownToLine size={16} aria-hidden="true" />
      {compact ? "Resume" : "Download resume"}
    </a>
  );
}

export function SectionHeading({
  label,
  title,
  description,
  light = false,
}: {
  label: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-heading ${light ? "on-dark" : ""}`}>
      <span className="eyebrow">
        <span className="label-dash" />
        {label}
      </span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
