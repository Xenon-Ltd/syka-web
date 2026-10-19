// Search over the support articles in lib/support-content.ts.
//
// The index is small (a couple of dozen articles), so everything runs in the
// browser on each keystroke. Matching is forgiving on purpose: people type
// "fees" for "cost", "refund" for "cancel", half-finished words and typos.

import { SUPPORT_SEARCH_INDEX, type SupportSearchEntry } from "./support-content";

const STOP_WORDS = new Set(
  "a an and are as at be been but by can could do does for from get got has have how i if in into is it its me my of on or our so than that the their them then there these they this to too us was we were what when where which who why will with would you your".split(" "),
);

// Words people use for the same idea. Each group matches any of its members,
// and a word can sit in more than one group ("account" as sign-up or bank details).
const SYNONYM_GROUPS = [
  ["cost", "fee", "price", "pricing", "charge", "expensive", "cheap", "rate", "commission", "pay"],
  ["send", "sent", "transfer", "remit", "remittance", "payment", "paid", "wire", "money"],
  ["cancel", "refund", "reverse", "reversal", "undo", "return", "recall", "stop", "back"],
  ["verify", "verification", "kyc", "identity", "id", "passport", "document", "license", "licence"],
  ["time", "long", "fast", "quick", "speed", "delay", "delayed", "slow", "minute", "hour", "day", "take"],
  ["limit", "maximum", "max", "cap", "minimum"],
  ["safe", "secure", "security", "protect", "protection", "trust", "regulated"],
  ["scam", "fraud", "fake", "phishing", "suspicious", "scammer"],
  ["wrong", "mistake", "incorrect", "error", "typo"],
  ["fail", "failure", "decline", "reject", "unsuccessful", "bounce"],
  ["block", "frozen", "freeze", "hold", "held", "stuck", "pending", "processing"],
  ["country", "currency", "destination", "supported", "available"],
  ["contact", "help", "support", "email", "phone", "call", "talk", "agent", "reach"],
  ["recipient", "receiver", "beneficiary", "family", "friend"],
  ["account", "signup", "register", "registration"],
  ["detail", "account", "number", "bank", "iban", "swift"],
  ["reason", "purpose"],
];

/** Lowercase, strip accents and punctuation. */
export function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ");
}

export function tokenize(text: string) {
  return normalize(text).split(/\s+/).filter(Boolean);
}

/** A light suffix stripper: enough to match "payments", "sending", "currencies". */
export function stem(word: string) {
  if (word.length <= 3) return word;
  let w = word;
  if (w.endsWith("ies") && w.length > 4) w = `${w.slice(0, -3)}y`;
  else if (w.endsWith("ied") && w.length > 4) w = `${w.slice(0, -3)}y`;
  else if (/(sses|ches|shes|xes)$/.test(w)) w = w.slice(0, -2);
  else if (w.endsWith("ing") && w.length > 5) w = w.slice(0, -3);
  else if (w.endsWith("ed") && w.length > 4) w = w.slice(0, -2);
  else if (w.endsWith("s") && !w.endsWith("ss") && !w.endsWith("us")) w = w.slice(0, -1);
  if (w.endsWith("e") && w.length > 4) w = w.slice(0, -1);
  return w;
}

const groupsOf = new Map<string, number[]>();
SYNONYM_GROUPS.forEach((group, index) => {
  for (const word of new Set(group.flatMap((member) => [member, stem(member)]))) {
    groupsOf.set(word, [...(groupsOf.get(word) ?? []), index]);
  }
});
const synonymGroups = (word: string) => groupsOf.get(word) ?? groupsOf.get(stem(word)) ?? [];

/** Edit distance, giving up early once it passes `max`. */
function editDistance(a: string, b: string, max: number) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost);
      rowMin = Math.min(rowMin, current[j]);
    }
    if (rowMin > max) return max + 1;
    previous = current;
  }
  return previous[b.length];
}

const allowedTypos = (word: string) => (word.length >= 7 ? 2 : word.length >= 4 ? 1 : 0);

type Field = { stems: Set<string>; groups: Set<number> };

function indexField(text: string): Field {
  const stems = new Set<string>();
  const groups = new Set<number>();
  for (const token of tokenize(text)) {
    if (STOP_WORDS.has(token)) continue;
    stems.add(stem(token));
    for (const group of synonymGroups(token)) groups.add(group);
  }
  return { stems, groups };
}

// Question matches count most, then the topic name, then the answer text.
const FIELD_WEIGHTS = { question: 3, category: 1.5, answer: 1 } as const;
type FieldName = keyof typeof FIELD_WEIGHTS;

const DOCUMENTS = SUPPORT_SEARCH_INDEX.map((entry) => ({
  entry,
  question: normalize(entry.question).replace(/\s+/g, " ").trim(),
  fields: {
    question: indexField(entry.question),
    category: indexField(entry.categoryTitle),
    answer: indexField(entry.answer),
  } satisfies Record<FieldName, Field>,
}));

type QueryTerm = { word: string; stem: string; groups: number[]; isLast: boolean };

function parseQuery(query: string): QueryTerm[] {
  const words = tokenize(query).filter((token) => !STOP_WORDS.has(token));
  const endsMidWord = /[a-z0-9]$/i.test(query);
  return words.map((word, index) => ({
    word,
    stem: stem(word),
    groups: synonymGroups(word),
    isLast: endsMidWord && index === words.length - 1,
  }));
}

/** How well one query term matches one field, from 0 to 1. */
function matchField(term: QueryTerm, field: Field) {
  if (field.stems.has(term.stem)) return 1;
  if (term.groups.some((group) => field.groups.has(group))) return 0.75;
  let best = 0;
  for (const candidate of field.stems) {
    // Still typing: "verif" should find "verify".
    if (term.word.length >= 2 && candidate.startsWith(term.stem)) best = Math.max(best, term.isLast ? 0.8 : 0.6);
    const typos = allowedTypos(term.word);
    if (typos && editDistance(term.stem, candidate, typos) <= typos) best = Math.max(best, 0.55);
  }
  return best;
}

export type SupportSearchResult = SupportSearchEntry & { score: number; terms: QueryTerm[] };

// Results scoring below this share of the best one are noise.
const RELATIVE_CUTOFF = 0.35;

export function searchSupport(query: string, limit = 6): SupportSearchResult[] {
  const phrase = normalize(query).replace(/\s+/g, " ").trim();
  if (phrase.length < 2) return [];
  const terms = parseQuery(query);

  // "how do i" is all stop words: match it as a phrase in the questions instead.
  if (!terms.length) {
    return DOCUMENTS.filter(({ question }) => question.includes(phrase))
      .sort((a, b) => Number(b.question.startsWith(phrase)) - Number(a.question.startsWith(phrase)))
      .slice(0, limit)
      .map(({ entry }) => ({ ...entry, score: 1, terms }));
  }

  const scored = DOCUMENTS.map(({ entry, question, fields }) => {
    let score = 0;
    let matched = 0;
    for (const term of terms) {
      let best = 0;
      for (const name of Object.keys(FIELD_WEIGHTS) as FieldName[]) {
        best = Math.max(best, matchField(term, fields[name]) * FIELD_WEIGHTS[name]);
      }
      if (best > 0) matched++;
      score += best;
    }
    const coverage = matched / terms.length;
    if (phrase.length > 2 && question.includes(phrase)) score += 4;
    return { entry, score: score * coverage, coverage };
  });

  const matches = scored
    .filter(({ coverage, score }) => score > 0 && coverage >= 0.5)
    .sort((a, b) => b.coverage - a.coverage || b.score - a.score);
  const best = matches[0]?.score ?? 0;
  return matches
    .filter(({ score }) => score >= best * RELATIVE_CUTOFF)
    .slice(0, limit)
    .map(({ entry, score }) => ({ ...entry, score, terms }));
}

/** Whether a word in the text should be highlighted for these query terms. */
function wordMatches(word: string, terms: QueryTerm[]) {
  const token = normalize(word).trim();
  if (!token || STOP_WORDS.has(token)) return false;
  const tokenStem = stem(token);
  const groups = synonymGroups(token);
  return terms.some(
    (term) =>
      term.stem === tokenStem ||
      term.groups.some((group) => groups.includes(group)) ||
      (term.word.length >= 2 && tokenStem.startsWith(term.stem)) ||
      (allowedTypos(term.word) > 0 && editDistance(term.stem, tokenStem, allowedTypos(term.word)) <= allowedTypos(term.word)),
  );
}

export type HighlightPart = { text: string; match: boolean };

/** Splits text into runs, marking the words that match the query. */
export function highlight(text: string, terms: QueryTerm[]): HighlightPart[] {
  return text
    .split(/(\s+)/)
    .map((piece) => ({ text: piece, match: /\S/.test(piece) && wordMatches(piece, terms) }));
}

/** A short excerpt of the answer, centred on the first matching word. */
export function snippet(text: string, terms: QueryTerm[], length = 120) {
  if (text.length <= length) return text;
  const words = text.split(/\s+/);
  const first = words.findIndex((word) => wordMatches(word, terms));
  let start = 0;
  if (first > 4) start = text.indexOf(words[first - 3]);
  let excerpt = text.slice(start, start + length);
  excerpt = excerpt.slice(0, excerpt.lastIndexOf(" ")) || excerpt;
  return `${start > 0 ? "…" : ""}${excerpt}…`;
}
