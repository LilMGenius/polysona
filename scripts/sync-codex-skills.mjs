import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");
const sourceRoot = join(repoRoot, "skills");
const destRoot = join(repoRoot, ".agents", "skills");

if (!existsSync(sourceRoot)) {
  throw new Error(`Missing source skills directory: ${sourceRoot}`);
}

mkdirSync(destRoot, { recursive: true });

const skillDirs = readdirSync(sourceRoot)
  .map((name) => ({ name, path: join(sourceRoot, name) }))
  .filter((entry) => statSync(entry.path).isDirectory());

for (const { name, path } of skillDirs) {
  const dest = join(destRoot, name);
  rmSync(dest, { recursive: true, force: true });
  cpSync(path, dest, { recursive: true });
  console.log(`Synced ${name} -> ${dest}`);
}

writeFileSync(
  join(destRoot, ".generated-by-sync"),
  "This directory mirrors ./skills for Codex repo skill discovery.\nRun `node ./scripts/sync-codex-skills.mjs` after editing ./skills.\n",
  "utf8"
);
