import Link from "next/link";
import { GadaIcon } from "@/components/ui/Icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <Link className="footer-brand" href="/" aria-label="Hanuman Chalisa - home">
          <GadaIcon size={20} />
          <span lang="hi">श्री हनुमान चालीसा</span>
        </Link>
        <p>
          © {new Date().getFullYear()} <span className="hide-xs">Copyright by </span>
          <a href="https://www.qubitsoftech.com/" target="_blank" rel="noopener">QubitSofTech</a>
        </p>
      </div>
    </footer>
  );
}
