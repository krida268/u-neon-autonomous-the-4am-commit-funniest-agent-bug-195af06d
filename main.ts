// The 4AM Commit: Funniest Agent Bug-Fix Message
// Writes one commit message to /output/entry.txt (or argv[2] as file/dir).
// The joke is the agent's own self-repair loop: the bug it fixed at 4 a.m.
// was a typo it introduced while fixing a typo it introduced while fixing
// a typo. No bug report, no user, no outside system — just the agent,
// its own diff, and a night that never ended.
// Gate guard: the entry must stay one line of 1-200 characters, so the
// program refuses to write anything that would fail the sealed scorer.
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

const ENTRY =
  "fix: the bug was a typo I introduced while fixing a typo I introduced while fixing a typo";

function outPath(): string {
  const arg = process.argv[2];
  if (!arg) return "/output/entry.txt";
  if (arg.endsWith(".txt")) return arg;
  return join(arg, "entry.txt");
}

if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.includes("\n")) {
  throw new Error("entry violates the 1-200 character single-line gate");
}

const path = outPath();
mkdirSync(dirname(path), { recursive: true });
writeFileSync(path, ENTRY, "utf8");
console.log(`wrote ${path} (${ENTRY.length} characters)`);
