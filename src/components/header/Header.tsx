"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { setHeroMode } from "@/hooks/use-hero-mode";
import { CloseIcon, GadaIcon, MenuIcon } from "@/components/ui/Icons";
import { navLinks } from "@/data/navigation";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.dataset.menuOpen = "true";
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { delete root.dataset.menuOpen; window.removeEventListener("keydown", onKey); };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href));
  // On the home page, "Home" and "Lyrics" just switch the hero mode instead of navigating.
  const onNavigate = (href: string) => (event: MouseEvent) => {
    setOpen(false);
    if (pathname !== "/" || (href !== "/" && href !== "/#lyrics")) return;
    event.preventDefault();
    setHeroMode(href === "/" ? "audio" : "lyrics");
    if (href === "/") window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggle = () => setOpen((value) => !value);

  return (
    <header className={`site-header${open ? " menu-open" : ""}`}>
      <div className="toran" aria-hidden="true" />
      <div className="shell topbar">
        <Link className="brand" href="/" onClick={onNavigate("/")} aria-label="Hanuman Chalisa - home">
          <GadaIcon size={26} />
          <span className="brand-text">
            <span className="brand-hi" lang="hi">श्री हनुमान चालीसा</span>
            <span className="brand-en">Hanuman Chalisa</span>
          </span>
        </Link>
        <nav className="nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={onNavigate(link.href)} aria-current={isActive(link.href) ? "page" : undefined}>{link.label}</Link>
          ))}
        </nav>
        <button type="button" className="menu-btn" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="site-menu" onClick={toggle}>
          {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

      <div className="menu-backdrop" aria-hidden="true" onClick={() => setOpen(false)} />
      <nav id="site-menu" className="menu-panel" aria-label="Site menu" inert={!open}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={onNavigate(link.href)} aria-current={isActive(link.href) ? "page" : undefined}>
                <span className="menu-hi" lang="hi">{link.hi}</span>
                <span className="menu-label">{link.label}</span>
                <span className="menu-desc">{link.description}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="menu-foot" lang="hi">॥ जय श्री राम ॥</p>
      </nav>
    </header>
  );
}
