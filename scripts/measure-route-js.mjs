// Reports the client JS a prerendered route actually loads, by reading the
// <script src> tags out of its build output HTML and summing the chunk sizes.
//
// Usage: node scripts/measure-route-js.mjs [htmlName]   (default: index)
import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const name = process.argv[2] ?? "index";
const html = readFileSync(join(process.cwd(), ".next/server/app", `${name}.html`), "utf8");

const srcs = [...html.matchAll(/src="(\/_next\/static\/[^"]+\.js)"/g)].map((m) => m[1]);
const unique = [...new Set(srcs)];

let raw = 0;
let gz = 0;
const rows = [];
for (const src of unique) {
  const path = join(process.cwd(), ".next", src.replace("/_next/", ""));
  let bytes;
  try {
    bytes = statSync(path).size;
  } catch {
    continue;
  }
  const gzBytes = gzipSync(readFileSync(path)).length;
  raw += bytes;
  gz += gzBytes;
  rows.push([src.replace("/_next/static/", ""), bytes, gzBytes]);
}

rows.sort((a, b) => b[2] - a[2]);
for (const [f, b, g] of rows) {
  console.log(`${(b / 1024).toFixed(1).padStart(9)} kB  ${(g / 1024).toFixed(1).padStart(8)} kB gz  ${f}`);
}
console.log("-".repeat(72));
console.log(
  `${(raw / 1024).toFixed(1).padStart(9)} kB  ${(gz / 1024).toFixed(1).padStart(8)} kB gz  TOTAL /${name === "index" ? "" : name} (${rows.length} scripts)`
);
