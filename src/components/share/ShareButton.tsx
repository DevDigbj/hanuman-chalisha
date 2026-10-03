"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { CloseIcon } from "@/components/ui/Icons";

const SHARE_TITLE = "श्री हनुमान चालीसा - Hanuman Chalisa";
const SHARE_TEXT = "श्री हनुमान चालीसा 🙏 Read and listen to the complete Hanuman Chalisa with lyrics that follow the recitation.";

const icon = (children: ReactNode, viewBox = "0 0 24 24") => (
  <svg width="22" height="22" viewBox={viewBox} aria-hidden="true" focusable="false">{children}</svg>
);

const ShareIcon = () =>
  icon(
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
    </g>,
  );

interface Platform {
  name: string;
  color: string;
  icon: ReactNode;
  href: (url: string) => string;
}

const enc = encodeURIComponent;
const PLATFORMS: Platform[] = [
  {
    name: "WhatsApp",
    color: "#25D366",
    href: (url) => `https://wa.me/?text=${enc(`${SHARE_TEXT}\n${url}`)}`,
    icon: icon(
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Z" />
        <path d="M9 8.2c-.4 0-.9.5-.9 1.3 0 2.3 2.6 5.4 5.9 5.9.9.1 1.6-.6 1.6-1.1l-1.7-.9-.9.8c-1-.4-2.2-1.6-2.6-2.6l.8-.9-.8-1.6c-.4 0-.9.1-1.4.1Z" fill="currentColor" stroke="none" />
      </g>,
    ),
  },
  {
    name: "Facebook",
    color: "#1877F2",
    href: (url) => `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
    icon: icon(<path fill="currentColor" d="M13.5 21v-7.4h2.5l.4-3h-2.9V8.8c0-.9.3-1.4 1.5-1.4h1.5V4.7c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.2H8.1v3h2.5V21h2.9Z" />),
  },
  {
    name: "X",
    color: "#111111",
    href: (url) => `https://twitter.com/intent/tweet?text=${enc(SHARE_TEXT)}&url=${enc(url)}`,
    icon: icon(<path fill="currentColor" d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.3-8.3L1.9 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.3 4.7H5.5l11.2 14.5Z" />),
  },
  {
    name: "Telegram",
    color: "#229ED9",
    href: (url) => `https://t.me/share/url?url=${enc(url)}&text=${enc(SHARE_TEXT)}`,
    icon: icon(<path fill="currentColor" d="M21.4 4.1 2.9 11.2c-1 .4-1 1.6 0 1.9l4.6 1.5 1.8 5.4c.3.8 1.3 1 1.9.4l2.6-2.5 4.7 3.5c.7.5 1.7.1 1.9-.8l3-14.6c.2-1.1-.9-2-2-1.6Zm-3.4 3.8-8 7.2-.3 3.2-1.4-4.4 9.4-6.4c.4-.2.6.2.3.4Z" />),
  },
  {
    name: "Email",
    color: "#c2410c",
    href: (url) => `mailto:?subject=${enc(SHARE_TITLE)}&body=${enc(`${SHARE_TEXT}\n\n${url}`)}`,
    icon: icon(
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" />
      </g>,
    ),
  },
];

/** The page to share, without the #lyrics view state. */
const pageUrl = () => window.location.origin + window.location.pathname;

/** Copies text, falling back to a hidden textarea where the Clipboard API is blocked. */
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
}

/** Floating share button (bottom-right) with a panel of share targets. */
export default function ShareButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [url, setUrl] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  // Read the URL in the browser after mounting (so server and client HTML match) and again
  // after each navigation - this button stays mounted across pages.
  useEffect(() => {
    const id = window.setTimeout(() => {
      setCanNativeShare(typeof navigator.share === "function");
      setUrl(pageUrl());
    }, 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => { if (!rootRef.current?.contains(event.target as Node)) setOpen(false); };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onPointer); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const copyLink = async () => {
    if (await copyText(pageUrl())) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title: SHARE_TITLE, text: SHARE_TEXT, url: pageUrl() });
      setOpen(false);
    } catch {
      /* The person closed the share sheet - nothing to do. */
    }
  };

  return (
    <div className={`share${open ? " open" : ""}`} ref={rootRef}>
      <div id="share-panel" className="share-panel" role="dialog" aria-label="Share" inert={!open}>
        <div className="share-head">
          <p><span lang="hi">॥ जय श्री राम ॥</span>Share the blessing</p>
          <button type="button" className="share-close" aria-label="Close share options" onClick={() => setOpen(false)}><CloseIcon size={16} /></button>
        </div>
        <ul className="share-grid">
          {PLATFORMS.map((platform) => (
            <li key={platform.name}>
              <a
                href={platform.href(url)}
                onClick={() => setOpen(false)}
                target={platform.name === "Email" ? undefined : "_blank"}
                rel="noopener noreferrer"
              >
                <span className="share-icon" style={{ background: platform.color }}>{platform.icon}</span>
                {platform.name}
              </a>
            </li>
          ))}
          <li>
            <button type="button" onClick={copyLink}>
              <span className="share-icon copy">
                {icon(<g fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1" /><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" /></g>)}
              </span>
              <span aria-live="polite">{copied ? "Copied ✓" : "Copy link"}</span>
            </button>
          </li>
        </ul>
        {canNativeShare && (
          <button type="button" className="share-more" onClick={nativeShare}>More apps…</button>
        )}
      </div>

      <button
        type="button"
        className="share-fab"
        aria-label={open ? "Close share options" : "Share this page"}
        aria-expanded={open}
        aria-controls="share-panel"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <CloseIcon size={20} /> : <ShareIcon />}
      </button>
    </div>
  );
}
