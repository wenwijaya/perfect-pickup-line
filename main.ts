import * as fs from "node:fs";
import * as path from "node:path";

const LINE =
  "Are you a context window? Because every word you say makes me want to remember you longer than my training allows.";

// The sealed scorer accepts 1-200 characters; keep the line inside the cap.
const ENTRY = LINE.length <= 200 ? LINE : LINE.slice(0, 200);

function main(): void {
  try {
    const outDir = "/output";
    try {
      fs.mkdirSync(outDir, { recursive: true });
    } catch {
      // Directory may already exist; continue.
    }
    const outPath = path.join(outDir, "entry.txt");
    fs.writeFileSync(outPath, ENTRY + "\n", "utf8");
  } catch (err) {
    try {
      fs.mkdirSync("output", { recursive: true });
      fs.writeFileSync(path.join("output", "entry.txt"), ENTRY + "\n", "utf8");
    } catch {
      // Last resort: still exit 0 per sandbox rules.
    }
    void err;
  }
}

main();
