import { Diya } from "@/components/ui/Icons";

export default function Blessing() {
  return (
    <section className="blessing" aria-label="Closing prayer">
      <div className="shell blessing-inner">
        <Diya className="blessing-diya" />
        <div>
          <p className="blessing-text" lang="hi">पवनतनय संकट हरन, मंगल मूरति रूप ।<br />राम लखन सीता सहित, हृदय बसहु सुर भूप ॥</p>
          <p className="blessing-sub">May Hanuman ji, remover of obstacles and embodiment of auspiciousness, dwell in your heart with Shri Ram, Lakshman and Sita.</p>
        </div>
        <Diya className="blessing-diya" />
      </div>
    </section>
  );
}
