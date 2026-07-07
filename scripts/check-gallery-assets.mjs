// Verifies every local ./… src/href referenced by the root gallery page exists on disk.
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(root, "index.html"), "utf8");
const refs = [...html.matchAll(/(?:src|href)="\.\/([^"]+)"/g)].map((m) => m[1]);
const missing = refs.filter((ref) => !existsSync(join(root, ref.split("#")[0].split("?")[0])));
if (missing.length) {
  console.error("Missing gallery references:\n" + missing.map((m) => `  - ${m}`).join("\n"));
  process.exit(1);
}
console.log(`gallery ok — ${refs.length} local references checked`);
