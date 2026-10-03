import { LotusDivider } from "./Icons";

interface SectionHeadingProps {
  id?: string;
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  light?: boolean;
}

export default function SectionHeading({ id, eyebrow, title, children, light }: SectionHeadingProps) {
  return (
    <div className={`section-heading${light ? " light" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id}>{title}</h2>
      <LotusDivider />
      {children && <p>{children}</p>}
    </div>
  );
}
