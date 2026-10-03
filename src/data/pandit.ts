/**
 * Profile of Pandit Mankeshwar Upadhyay - Vedic Purohit.
 * Add a phone / WhatsApp number to `contact` to show call and message buttons on the page.
 * Add or remove rituals in `ritualGroups` - the page updates automatically.
 */
export const pandit = {
  slug: "pandit-mankeshwar-upadhyay",
  name: "Pandit Mankeshwar Upadhyay",
  title: "Vedic Purohit",
  titleHi: "वैदिक पुरोहित",
  experienceYears: 43,
  tagline: "43 years of performing sanskars, pujas and Vedic rituals - with devotion, purity and full vidhi.",
  contact: {
    phone: null as string | null, // e.g. "+91 98xxxxxxxx"
    // Never shown on the page: the WhatsApp button goes through /pandit-mankeshwar-upadhyay/whatsapp,
    // which redirects to WhatsApp. Digits only, with country code (91 = India).
    whatsapp: "919955053865" as string | null,
    whatsappGreeting: "प्रणाम पंडित जी 🙏 I would like to enquire about a puja / sanskar.",
  },
  about: [
    "Pandit Mankeshwar Upadhyay is a Vedic Purohit with 43 years of experience in performing sanskars, pujas and sacred rituals, and in guiding families through astrology and Vastu.",
    "Every ritual is performed with full Vedic vidhi and devotion, and his readings are accurate and insightful - helping people understand their lives more deeply and make informed decisions, in their personal lives as well as their work.",
  ],
  services: [
    { glyph: "ज्यो", title: "Astrology readings", text: "Accurate, insightful readings that bring clarity to life’s questions and help you make informed decisions." },
    { glyph: "मा", title: "Consultancy & guidance", text: "Thoughtful guidance for personal and professional matters, so you can move forward with confidence." },
    { glyph: "वा", title: "Vastu consultation", text: "Advice on harmonising your home or workplace according to the principles of Vastu Shastra." },
  ],
  ritualGroups: [
    {
      title: "Sanskars",
      hi: "संस्कार",
      text: "The sacred rites that mark each stage of life.",
      items: [
        { name: "Vivah", hi: "विवाह संस्कार" },
        { name: "Upanayan Sanskar", hi: "उपनयन संस्कार" },
        { name: "Mundan Sanskar", hi: "मुंडन संस्कार" },
        { name: "Namkaran Sanskar", hi: "नामकरण संस्कार" },
        { name: "Griha Pravesh", hi: "गृह प्रवेश" },
      ],
    },
    {
      title: "Pujas & paath",
      hi: "पूजा एवं पाठ",
      text: "Worship for every occasion, festival and wish.",
      items: [
        { name: "Saraswati Puja", hi: "सरस्वती पूजा" },
        { name: "Lakshmi Narayan Puja", hi: "लक्ष्मी नारायण पूजा" },
        { name: "Durga Puja", hi: "दुर्गा पूजा" },
        { name: "Ganesh Puja", hi: "गणेश पूजा" },
        { name: "Satyanarayan Katha", hi: "सत्यनारायण कथा" },
        { name: "Rudrabhishek", hi: "रुद्राभिषेक" },
        { name: "Hanuman Puja & Sundarkand Path", hi: "हनुमान पूजा एवं सुंदरकांड पाठ" },
      ],
    },
    {
      title: "Shanti & ancestral rites",
      hi: "शांति एवं पितृ कर्म",
      text: "Rituals for peace, protection and the ancestors.",
      items: [
        { name: "Navgraha Shanti", hi: "नवग्रह शांति" },
        { name: "Pitru Dosh Nivaran", hi: "पितृ दोष निवारण" },
        { name: "Pind Daan", hi: "पिंड दान" },
      ],
    },
  ],
} as const;

/** Every ritual name, used for tags and search-engine data. */
export const allRituals = pandit.ritualGroups.flatMap((group) => group.items.map((item) => item.name));
