import { allRituals, pandit } from "@/data/pandit";
import SectionHeading from "@/components/ui/SectionHeading";
import { Diya, Mandala } from "@/components/ui/Icons";

const LotusBullet = () => (
  <svg className="ritual-bullet" viewBox="0 0 40 24" width="18" height="12" aria-hidden="true" focusable="false">
    <path d="M20 22C12 20 6 14 4 8c7 1 13 6 16 14Z" fill="currentColor" opacity=".6" />
    <path d="M20 22c8-2 14-8 16-14-7 1-13 6-16 14Z" fill="currentColor" opacity=".6" />
    <path d="M20 1.5c5 6 5 14 0 20.5-5-6.5-5-14.5 0-20.5Z" fill="currentColor" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Z" />
    <path d="M9 8.2c-.4 0-.9.5-.9 1.3 0 2.3 2.6 5.4 5.9 5.9.9.1 1.6-.6 1.6-1.1l-1.7-.9-.9.8c-1-.4-2.2-1.6-2.6-2.6l.8-.9-.8-1.6c-.4 0-.9.1-1.4.1Z" fill="currentColor" stroke="none" />
  </svg>
);

/** Call / WhatsApp buttons - shown only once a number is added in data/pandit.ts. */
function ContactButtons() {
  const { contact } = pandit;
  return (
    <>
      {contact.phone && <a className="pandit-btn primary" href={`tel:${contact.phone.replace(/\s/g, "")}`}>Call Pandit ji</a>}
      {contact.whatsapp && (
        <a
          className={`pandit-btn whatsapp${contact.phone ? "" : " primary"}`}
          href={`/${pandit.slug}/whatsapp`}
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <WhatsAppIcon /> WhatsApp Pandit ji
        </a>
      )}
    </>
  );
}

export default function PanditProfile() {
  const { contact, experienceYears } = pandit;
  const ritualCount = allRituals.length;

  return (
    <>
      {/* Profile card */}
      <section className="section pandit-intro" aria-labelledby="pandit-name">
        <div className="shell">
          <div className="pandit-card">
            <div className="pandit-avatar" aria-hidden="true">
              <Mandala className="pandit-avatar-mandala" />
              <span lang="hi">ॐ</span>
            </div>
            <div className="pandit-info">
              <p className="pandit-role" lang="hi">॥ {pandit.titleHi} ॥</p>
              <h2 id="pandit-name">{pandit.name}</h2>
              <p className="pandit-title">{pandit.title} · {experienceYears} years of experience</p>
              <p className="pandit-tagline">{pandit.tagline}</p>
              <ul className="pandit-tags" aria-label="Specialities">
                {["Vivah", "Upanayan Sanskar", "Griha Pravesh", "Saraswati Puja", "Lakshmi Narayan Puja", "Durga Puja", "Astrology", "Vastu"].map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
              <div className="pandit-actions">
                <ContactButtons />
                <a className={`pandit-btn${contact.phone || contact.whatsapp ? "" : " primary"}`} href="#rituals">View rituals & pujas</a>
                <a className="pandit-btn" href="#services">Astrology & Vastu</a>
              </div>
            </div>
          </div>

          <ul className="pandit-highlights" aria-label="Highlights">
            <li><strong>{experienceYears}</strong><span>Years of experience</span></li>
            <li><strong>{ritualCount}+</strong><span>Sanskars & pujas</span></li>
            <li><strong lang="hi">वैदिक</strong><span>Full vidhi</span></li>
          </ul>
        </div>
      </section>

      {/* About */}
      <section className="section pandit-about" aria-labelledby="pandit-about-title">
        <div className="shell pandit-narrow">
          <SectionHeading id="pandit-about-title" eyebrow="॥ परिचय ॥" title="About Pandit ji" />
          {pandit.about.map((paragraph) => <p className="pandit-para" key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      {/* Rituals */}
      <section className="section significance pandit-rituals" id="rituals" aria-labelledby="pandit-rituals-title">
        <Mandala className="significance-mandala" />
        <div className="shell">
          <SectionHeading id="pandit-rituals-title" eyebrow="॥ संस्कार एवं अनुष्ठान ॥" title="Sanskars, pujas & rituals" light>
            From Vivah and Upanayan to Saraswati and Lakshmi Narayan puja - every rite performed with full Vedic vidhi.
          </SectionHeading>
          <div className="ritual-groups">
            {pandit.ritualGroups.map((group) => (
              <article className="ritual-group" key={group.title}>
                <header>
                  <span className="ritual-group-hi" lang="hi">{group.hi}</span>
                  <h3>{group.title}</h3>
                  <p>{group.text}</p>
                </header>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <LotusBullet />
                      <span className="ritual-name">{item.name}<small lang="hi">{item.hi}</small></span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="ritual-note">…and other pujas, paath and sanskars on request.</p>
        </div>
      </section>

      {/* Services */}
      <section className="section about" id="services" aria-labelledby="pandit-services-title">
        <div className="shell">
          <SectionHeading id="pandit-services-title" eyebrow="॥ ज्योतिष एवं वास्तु ॥" title="Astrology & Vastu">
            Alongside rituals, Pandit ji offers guidance through astrology and Vastu Shastra.
          </SectionHeading>
          <div className="card-grid">
            {pandit.services.map((item) => (
              <article className="info-card" key={item.title}>
                <span className="info-glyph" lang="hi" aria-hidden="true">{item.glyph}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section guide" aria-labelledby="pandit-exp-title">
        <div className="shell pandit-narrow">
          <SectionHeading id="pandit-exp-title" eyebrow="॥ अनुभव ॥" title={`${experienceYears} years of devotion`} />
          <p className="pandit-para">
            For {experienceYears} years, Pandit Mankeshwar Upadhyay has served families at every important moment of life -
            from naming ceremonies and sacred thread rites to weddings, house-warmings and the final rites for the ancestors.
            He is a trusted name for sanskars, pujas, astrology and consultancy.
          </p>
          <p className="pandit-para">
            Whether you are planning a sanskar or puja, or seeking guidance in your personal life or work, Pandit ji brings
            the knowledge, care and devotion to see it done rightly.
          </p>
        </div>
      </section>

      {/* Invite */}
      <section className="section faq" aria-labelledby="pandit-invite-title">
        <div className="shell">
          <div className="pandit-visit">
            <Diya className="pandit-visit-diya" />
            <div>
              <h2 id="pandit-invite-title">Invite Pandit ji</h2>
              <p>
                For a wedding, sanskar, puja or path at your home, or for an astrology or Vastu consultation, invite Pandit ji
                to perform it with full Vedic vidhi and devotion.
              </p>
              <div className="pandit-actions">
                <ContactButtons />
                <a className={`pandit-btn${contact.phone || contact.whatsapp ? "" : " primary"}`} href="#rituals">See all rituals</a>
              </div>
            </div>
          </div>
          <p className="pandit-summary">
            With {experienceYears} years of experience, Pandit Mankeshwar Upadhyay - Vedic Purohit is a trusted guide for
            sanskars, pujas, astrology and consultancy, with a focus on the families he serves.
          </p>
        </div>
      </section>
    </>
  );
}
