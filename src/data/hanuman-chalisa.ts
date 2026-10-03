import type { ChalisaVerse } from "@/types/lyrics";
const hindi = [
"श्रीगुरु चरन सरोज रज, निज मनु मुकुरु सुधारि। बरनऊँ रघुबर बिमल जसु, जो दायकु फल चारि॥",
"बुद्धिहीन तनु जानिके, सुमिरौं पवन-कुमार। बल बुद्धि विद्या देहु मोहिं, हरहु कलेस बिकार॥",
"जय हनुमान ज्ञान गुन सागर। जय कपीस तिहुँ लोक उजागर॥",
"राम दूत अतुलित बल धामा। अंजनि-पुत्र पवनसुत नामा॥",
"महाबीर बिक्रम बजरंगी। कुमति निवार सुमति के संगी॥",
"कंचन बरन बिराज सुबेसा। कानन कुण्डल कुंचित केसा॥",
"हाथ बज्र औ ध्वजा बिराजै। काँधे मूँज जनेऊ साजै॥",
"शंकर सुवन केसरी नंदन। तेज प्रताप महा जग वंदन॥",
"विद्यावान गुनी अति चातुर। राम काज करिबे को आतुर॥",
"प्रभु चरित्र सुनिबे को रसिया। राम लखन सीता मन बसिया॥",
"सूक्ष्म रूप धरि सियहिं दिखावा। बिकट रूप धरि लंक जरावा॥",
"भीम रूप धरि असुर सँहारे। रामचन्द्र के काज सँवारे॥",
"लाय सजीवन लखन जियाये। श्रीरघुबीर हरषि उर लाये॥",
"रघुपति कीन्ही बहुत बड़ाई। तुम मम प्रिय भरतहि सम भाई॥",
"सहस बदन तुम्हरो जस गावैं। अस कहि श्रीपति कंठ लगावैं॥",
"सनकादिक ब्रह्मादि मुनीसा। नारद सारद सहित अहीसा॥",
"जम कुबेर दिगपाल जहाँ ते। कवि कोविद कहि सके कहाँ ते॥",
"तुम उपकार सुग्रीवहिं कीन्हा। राम मिलाय राजपद दीन्हा॥",
"तुम्हरो मंत्र विभीषण माना। लंकेश्वर भए सब जग जाना॥",
"जुग सहस्र जोजन पर भानू। लील्यो ताहि मधुर फल जानू॥",
"प्रभु मुद्रिका मेलि मुख माहीं। जलधि लाँघि गये अचरज नाहीं॥",
"दुर्गम काज जगत के जेते। सुगम अनुग्रह तुम्हरे तेते॥",
"राम दुआरे तुम रखवारे। होत न आज्ञा बिनु पैसारे॥",
"सब सुख लहै तुम्हारी सरना। तुम रक्षक काहू को डरना॥",
"आपन तेज सम्हारो आपै। तीनों लोक हाँक तें काँपै॥",
"भूत पिशाच निकट नहिं आवै। महाबीर जब नाम सुनावै॥",
"नासै रोग हरै सब पीरा। जपत निरंतर हनुमत बीरा॥",
"संकट तें हनुमान छुड़ावै। मन क्रम वचन ध्यान जो लावै॥",
"सब पर राम तपस्वी राजा। तिनके काज सकल तुम साजा॥",
"और मनोरथ जो कोई लावै। सोइ अमित जीवन फल पावै॥",
"चारों जुग परताप तुम्हारा। है परसिद्ध जगत उजियारा॥",
"साधु संत के तुम रखवारे। असुर निकंदन राम दुलारे॥",
"अष्ट सिद्धि नौ निधि के दाता। अस बर दीन जानकी माता॥",
"राम रसायन तुम्हरे पासा। सदा रहो रघुपति के दासा॥",
"तुम्हरे भजन राम को पावै। जनम जनम के दुख बिसरावै॥",
"अंत काल रघुबर पुर जाई। जहाँ जन्म हरिभक्त कहाई॥",
"और देवता चित्त न धरई। हनुमत सेइ सर्व सुख करई॥",
"संकट कटै मिटै सब पीरा। जो सुमिरै हनुमत बलबीरा॥",
"जय जय जय हनुमान गोसाईं। कृपा करहु गुरुदेव की नाईं॥",
"जो सत बार पाठ कर कोई। छूटहि बंदि महा सुख होई॥",
"जो यह पढ़ै हनुमान चालीसा। होय सिद्धि साखी गौरीसा॥",
"तुलसीदास सदा हरि चेरा। कीजै नाथ हृदय महँ डेरा॥",
"पवनतनय संकट हरन, मंगल मूरति रूप। राम लखन सीता सहित, हृदय बसहु सुर भूप॥"
];
const hinglish = [
"Shri guru charan saroj raj, nij manu mukur sudhaari. Barnau Raghubar bimal jasu, jo daayaku phal chaari.",
"Buddhiheen tanu jaanike, sumirau Pavan-Kumaar. Bal buddhi vidya dehu mohi, harahu kalesh bikaar.",
"Jai Hanuman gyaan gun saagar. Jai Kapees tihun lok ujaagar.",
"Ram doot atulit bal dhaama. Anjani-putra Pawansut naama.",
"Mahaabeer bikram Bajrangi. Kumati nivaar sumati ke sangi.",
"Kanchan baran biraaj subesa. Kaanan kundal kunchit kesa.",
"Haath bajra au dhwaja biraajai. Kaandhe moonj janeu saajai.",
"Shankar suvan Kesari nandan. Tej prataap maha jag bandan.",
"Vidyavaan guni ati chaatur. Ram kaaj karibe ko aatur.",
"Prabhu charitra sunibe ko rasiya. Ram Lakhan Sita man basiya.",
"Sookshma roop dhari Siyahin dikhawa. Bikat roop dhari Lanka jarawa.",
"Bheem roop dhari asur sanhaare. Ramchandra ke kaaj sanwaare.",
"Laay Sajeevan Lakhan jiyaaye. Shri Raghubeer harashi ur laaye.",
"Raghupati keenhi bahut badaai. Tum mam priya Bharatahi sam bhaai.",
"Sahas badan tumharo jas gaavain. Asa kahi Shripati kanth lagaavain.",
"Sanakaadik Brahmaadi muneesa. Naarad Shaarad sahit Aheesa.",
"Jam Kuber Digpaal jahaan te. Kavi kovid kahi sake kahaan te.",
"Tum upkaar Sugreevahin keenha. Ram milaay raajpad deenha.",
"Tumharo mantra Vibheeshan maana. Lankeshwar bhaye sab jag jaana.",
"Jug sahasra jojan par Bhaanu. Leelyo taahi madhur phal jaanu.",
"Prabhu mudrika meli mukh maaheen. Jaladhi laanghi gaye acharaj naaheen.",
"Durgam kaaj jagat ke jete. Sugam anugrah tumhare tete.",
"Ram duaare tum rakhwaare. Hot na aagya binu paisaare.",
"Sab sukh lahai tumhaari sarna. Tum rakshak kaahoo ko darna.",
"Aapan tej samhaaro aapai. Teenon lok haank ten kaanpai.",
"Bhoot pisaach nikat nahin aavai. Mahaabeer jab naam sunaavai.",
"Naasai rog harai sab peera. Japat nirantar Hanumat beera.",
"Sankat ten Hanuman chhudaavai. Man kram vachan dhyaan jo laavai.",
"Sab par Ram tapasvee raaja. Tin ke kaaj sakal tum saaja.",
"Aur manorath jo koi laavai. Soi amit jeevan phal paavai.",
"Chaaron jug prataap tumhaara. Hai parsiddh jagat ujiyaara.",
"Saadhu sant ke tum rakhwaare. Asur nikandan Ram dulaare.",
"Ashta siddhi nau nidhi ke daata. Asa bar deen Jaanaki maata.",
"Ram rasaayan tumhare paasa. Sada raho Raghupati ke daasa.",
"Tumhare bhajan Ram ko paavai. Janam janam ke dukh bisraavai.",
"Ant kaal Raghubar pur jaai. Jahaan janma Haribhakt kahaai.",
"Aur devta chitt na dharaee. Hanumat sei sarv sukh karaee.",
"Sankat katai mitai sab peera. Jo sumirai Hanumat balbeera.",
"Jai jai jai Hanuman Gosaai. Kripa karahu Gurudev ki naaee.",
"Jo sat baar paath kar koi. Chhootahi bandi maha sukh hoi.",
"Jo yah padhai Hanuman Chaalisa. Hoy siddhi saakhi Gaurisa.",
"Tulsidas sada Hari chera. Keejai Naath hriday mah dera.",
"Pawantanay sankat haran, mangal moorati roop. Ram Lakhan Sita sahit, hriday basahu sur bhoop."
];

// Split a verse into its two halves, keeping the traditional danda marks.
const splitHindi = (text: string): [string, string] => {
  const [first, ...rest] = text.split("।");
  return [`${first.trim()}।`, rest.join("।").trim()];
};
const splitHinglish = (text: string): [string, string] => {
  const index = text.indexOf(". ");
  return index < 0 ? [text, ""] : [text.slice(0, index + 1), text.slice(index + 2)];
};

const LAST = hindi.length - 1;

export const hanumanChalisa: ChalisaVerse[] = hindi.map((text, index) => {
  const kind = index < 2 || index === LAST ? "doha" : "chaupai";
  const number = kind === "chaupai" ? index - 1 : index === LAST ? 3 : index + 1;
  return {
    id: index,
    kind,
    number,
    hindi: splitHindi(text),
    hinglish: splitHinglish(hinglish[index]),
    label: index < 2 ? `Opening Doha ${index + 1}` : index === LAST ? "Closing Doha" : `Chaupai ${number}`,
  };
});

export interface VerseTiming { start: number; end: number }

/** Where a verse starts, and optionally where its singing ends before a music break. */
export interface VerseMark { start: number; end?: number }
/** One mark per verse, in order. */
export type TimingMarks = VerseMark[];

export const isCompleteTimings = (marks: TimingMarks | null | undefined): marks is TimingMarks =>
  Array.isArray(marks) && marks.length === hanumanChalisa.length && marks.every((m) => Number.isFinite(m?.start));

// Relative length of each verse, used to spread verses between known points. Chaupais are
// sung to a steady beat (every one takes the same time whatever its wording), so they all
// get the same weight; dohas are sung freely, so theirs follows the length of the text.
const textLength = (line: string) => line.replace(/[^a-z]/gi, "").length;
const CHAUPAI_WEIGHT =
  hinglish.slice(2, -1).reduce((sum, line) => sum + textLength(line), 0) / (hinglish.length - 3);
const WEIGHTS = hinglish.map((line, i) => (i >= 2 && i < hinglish.length - 1 ? CHAUPAI_WEIGHT : textLength(line)));

/** Seconds of music after a verse, keyed by verse index. */
export type MusicBreaks = Record<number, number>;

/**
 * Splits [from, to] across verses first..last (inclusive) in proportion to their length,
 * leaving room for the music breaks that follow any of them.
 */
function spread(timeline: VerseTiming[], first: number, last: number, from: number, to: number, breaks: MusicBreaks) {
  if (last < first) return;
  let weight = 0, music = 0;
  for (let i = first; i <= last; i++) { weight += WEIGHTS[i]; music += breaks[i] ?? 0; }
  const singing = Math.max(0, to - from - music);
  let cursor = from;
  for (let i = first; i <= last; i++) {
    const length = (WEIGHTS[i] / (weight || 1)) * singing;
    timeline[i] = { start: cursor, end: cursor + length };
    cursor += length + (breaks[i] ?? 0);
  }
}

/**
 * Verse timeline for the lyrics highlight.
 * - `marks`: exact timings for every verse (from /sync or VERSE_TIMINGS) - used as-is.
 * - `anchors`: known points for some verses; the verses in between are spread by length.
 * - `breaks`: seconds of music after given verses, kept free of any highlight.
 * Gaps between a verse's `end` and the next verse's start are music breaks.
 */
export function buildTimeline(
  duration: number,
  marks?: TimingMarks | null,
  anchors: Record<number, VerseMark> = {},
  breaks: MusicBreaks = {},
): VerseTiming[] {
  const count = hanumanChalisa.length;
  const total = Number.isFinite(duration) && duration > 0 ? duration : count * 15;

  if (isCompleteTimings(marks)) {
    return marks.map((mark, i) => {
      const next = marks[i + 1]?.start ?? total;
      return { start: mark.start, end: Math.min(mark.end ?? next, next) };
    });
  }

  const timeline: VerseTiming[] = new Array(count);
  const known = Object.keys(anchors)
    .map(Number)
    .filter((i) => i >= 0 && i < count && Number.isFinite(anchors[i].start) && anchors[i].start < total)
    .sort((a, b) => a - b);

  // Verses before the first anchor share the time from 0 up to it.
  spread(timeline, 0, (known[0] ?? count) - 1, 0, known.length ? anchors[known[0]].start : total, breaks);

  known.forEach((index, k) => {
    const anchor = anchors[index];
    const nextIndex = known[k + 1] ?? count;
    const nextStart = known[k + 1] !== undefined ? anchors[nextIndex].start : total;
    if (anchor.end !== undefined) {
      // The anchored verse is exactly known; the verses after it share the rest.
      timeline[index] = { start: anchor.start, end: Math.min(anchor.end, nextStart) };
      spread(timeline, index + 1, nextIndex - 1, Math.min(anchor.end, nextStart), nextStart, breaks);
    } else {
      spread(timeline, index, nextIndex - 1, anchor.start, nextStart, breaks);
    }
  });
  return timeline;
}
