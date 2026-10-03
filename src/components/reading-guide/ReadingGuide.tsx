import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  { title: "Find a quiet moment", text: "Sit comfortably, light a diya if you wish, and remember Shri Ram and Hanuman ji." },
  { title: "Listen in Audio mode", text: "Press play in the player at the bottom of the screen. It has verse skipping, speed and repeat." },
  { title: "Read in Lyrics mode", text: "Switch to Lyrics to read over the page. The current verse glows and follows the recitation. Tap any verse to begin from there." },
  { title: "Count your paath", text: "Each complete recitation is counted on your device. Open the player’s ⋯ menu to tap +1 when you recite on your own." },
];

export default function ReadingGuide() {
  return (
    <section className="section guide" id="guide" aria-labelledby="guide-title">
      <div className="shell">
        <SectionHeading id="guide-title" eyebrow="॥ विधि ॥" title="Four simple steps" />
        <ol className="steps">
          {steps.map((step, index) => (
            <li className="step" key={step.title}>
              <span className="step-number" aria-hidden="true">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="guide-tip">Tip: on a keyboard, press <kbd>Space</kbd> to play or pause, <kbd>←</kbd> <kbd>→</kbd> to skip 5 seconds and <kbd>Esc</kbd> to close the lyrics.</p>
      </div>
    </section>
  );
}
