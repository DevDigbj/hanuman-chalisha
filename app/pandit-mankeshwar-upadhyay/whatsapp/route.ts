import { pandit } from "@/data/pandit";

/**
 * Sends visitors to Pandit ji's WhatsApp chat (with a greeting typed in) without the number
 * ever appearing in the page's HTML - the profile's WhatsApp button links here instead.
 */
export function GET() {
  const { whatsapp, whatsappGreeting } = pandit.contact;
  if (!whatsapp) return new Response("WhatsApp is not available.", { status: 404 });
  const target = `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappGreeting)}`;
  return new Response(null, {
    status: 307,
    headers: { Location: target, "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "no-store" },
  });
}
