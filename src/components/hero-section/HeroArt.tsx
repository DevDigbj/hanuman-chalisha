import Image from "next/image";
import { Diya, Mandala } from "@/components/ui/Icons";

const MANTRA = "श्री राम जय राम जय जय राम ॥ ";

/** Hanuman ji with an animated aura (rays, mandalas, mantra ring and rising sparks) behind. */
export default function HeroArt() {
  return (
    <div className="hero-art">
      <div className="hero-figure">
        <div className="aura-rays" aria-hidden="true" />
        <div className="aura-glow" aria-hidden="true" />
        <Mandala className="aura-mandala outer" />
        <Mandala className="aura-mandala inner" />
        <svg className="mantra-ring" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
          <defs><path id="mantra-circle" d="M200 200m-182 0a182 182 0 1 1 364 0a182 182 0 1 1-364 0" /></defs>
          <text lang="hi"><textPath href="#mantra-circle">{MANTRA.repeat(6)}</textPath></text>
        </svg>
        <div className="sparks" aria-hidden="true">{Array.from({ length: 10 }, (_, i) => <i key={i} />)}</div>
        <Image
          className="hanuman-img"
          src="/images/hanumanpic.webp"
          alt="Shri Hanuman ji seated in meditation, holding his gada"
          width={500}
          height={500}
          sizes="(max-width: 899px) 116vw, 580px"
          preload
        />
      </div>
      <div className="hero-diyas" aria-hidden="true"><Diya /><Diya /><Diya /></div>
    </div>
  );
}
