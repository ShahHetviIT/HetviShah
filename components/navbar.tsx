"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation, portfolio } from "@/data/portfolio";
import { ResumeLink, SocialLinks } from "@/components/ui/shared";

export function Navbar({ resumeAvailable }: { resumeAvailable: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    navigation.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() =>
      drawerRef.current?.querySelector<HTMLAnchorElement>("a")?.focus(),
    );
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key === "Tab") {
        const links =
          drawerRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]");
        const first = links?.[0];
        const last = links?.[links.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          toggleRef.current?.focus();
        } else if (
          event.shiftKey &&
          document.activeElement === toggleRef.current
        ) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          toggleRef.current?.focus();
        }
      }
    };
    const media = window.matchMedia("(min-width: 900px)");
    const onResize = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onResize);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = oldOverflow;
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKey);
      media.removeEventListener("change", onResize);
    };
  }, [open]);

  function navigate(href: string) {
    setOpen(false);
    requestAnimationFrame(() =>
      document.querySelector<HTMLElement>(href)?.focus({ preventScroll: true }),
    );
  }

  return (
    <header className={`navbar-shell ${scrolled ? "is-scrolled" : ""}`}>
      <div className="navbar">
        <a href="#home" className="brand" title="Back to top">
          <span className="monogram" aria-hidden="true">
            h<span>s</span>
            <i />
          </span>
          <span>
            {portfolio.name}
            <span className="brand-dot">.</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? "location" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <div className="nav-socials">
            <SocialLinks iconsOnly />
          </div>
          <ResumeLink available={resumeAvailable} compact />
          <button
            ref={toggleRef}
            className="menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            ref={drawerRef}
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: reduced ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="eyebrow">Explore the portfolio</span>
            {navigation.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => navigate(item.href)}
              >
                <span className="mono">0{index + 1}</span>
                {item.label}
                <ArrowUpRight size={22} />
              </a>
            ))}
            <div className="mobile-socials">
              <SocialLinks />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
