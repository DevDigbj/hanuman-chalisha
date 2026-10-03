export interface NavLink {
  href: string;
  label: string;
  hi: string;
  description: string;
}

export const navLinks: NavLink[] = [
  { href: "/", label: "Home", hi: "मुख्य पृष्ठ", description: "Listen to the recitation" },
  { href: "/#lyrics", label: "Lyrics", hi: "पाठ", description: "Read along, verse by verse" },
  { href: "/about", label: "About", hi: "परिचय", description: "The hymn and its significance" },
  { href: "/guide", label: "How to read", hi: "विधि", description: "Using this reader" },
  { href: "/faq", label: "FAQ", hi: "जिज्ञासा", description: "Common questions" },
  { href: "/pandit-mankeshwar-upadhyay", label: "Pandit ji", hi: "पंडित जी", description: "Vedic Purohit · 43 years of experience" },
];
