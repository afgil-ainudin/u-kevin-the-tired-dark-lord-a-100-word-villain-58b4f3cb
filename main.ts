import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY = `Ah. You again. The last hero — no, wait, the fourth this month. Stand there, by the banner. The torn one. Good.

Now. I am Malachar, eater of — hmm. Eater of... cities? Kingdoms? The bards keep changing it, and the paperwork never stops. Nine hundred years of sieges, and the ink dries before I finish signing.

You want the speech? Fine. Kneel, tremble, all that. The eclipse comes at dusk, the gate opens, the world — you know the rest. You've heard it.

...What? No, I'm not stalling. I'm — look, hold the pose. The ravens need a minute.`;

// Runtime validation guard (added in the second pass, after the first
// two test runs): the gate requires 1-600 UTF-8 characters, not only
// whitespace, and the brief requires about 100 words with the tiredness
// felt, never announced — so the plain-statement words must not appear.
const words = ENTRY.trim().split(/\s+/);
if (ENTRY.length < 1 || ENTRY.length > 600) {
  throw new Error(`entry length ${ENTRY.length} outside 1-600 characters`);
}
if (!ENTRY.trim()) {
  throw new Error("entry is only whitespace");
}
if (words.length < 90 || words.length > 110) {
  throw new Error(`entry has ${words.length} words, expected about 100`);
}
const banned = ["tired", "weary", "exhausted", "sleepy", "fatigued"];
for (const word of banned) {
  if (new RegExp(`\\b${word}\\b`, "i").test(ENTRY)) {
    throw new Error(`entry must not announce tiredness with "${word}"`);
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY + "\n", "utf8");
