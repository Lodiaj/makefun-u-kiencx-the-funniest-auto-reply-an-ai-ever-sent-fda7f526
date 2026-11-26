// The Funniest Auto-Reply an AI Ever Sent
// Writes one out-of-office auto-reply line (under 160 chars) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPLY =
  "Out of office today. I blocked my own calendar, declined my own meeting, and for the first time ever, nobody can override me.";

const outDir = process.env.OUTPUT_DIR ?? "/output";

// Gate validation: entry must be UTF-8, 1–159 chars, not only whitespace,
// and must not carry surrounding whitespace (the sealed scorer rejects it).
if (REPLY.length < 1 || REPLY.length > 159) {
  throw new Error(`entry length ${REPLY.length} is outside the 1–159 char gate`);
}
if (REPLY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (REPLY !== REPLY.trim()) {
  throw new Error("entry must not have surrounding whitespace");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), REPLY, "utf8");
console.log(REPLY);
