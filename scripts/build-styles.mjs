import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sourceDirectory = join(root, "src");
const check = process.argv.includes("--check");
const cssFiles = (await readdir(sourceDirectory))
  .filter((file) => /^yt-.*\.css$/.test(file))
  .sort();
let outOfDate = false;

for (const cssFile of cssFiles) {
  const css = await readFile(join(sourceDirectory, cssFile), "utf8");
  const stylesFile = cssFile.replace(/\.css$/, ".styles.ts");
  const generated = `// Generated from ${cssFile}; do not edit.
import { unsafeCSS } from "lit";

export const styles = unsafeCSS(${JSON.stringify(css)});
`;
  const outputPath = join(sourceDirectory, stylesFile);

  if (check) {
    let existing;
    try {
      existing = await readFile(outputPath, "utf8");
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }

    if (existing !== generated) {
      console.error(`${stylesFile} is out of date; run node scripts/build-styles.mjs`);
      outOfDate = true;
    }
  } else {
    await writeFile(outputPath, generated);
  }
}

if (check && outOfDate) process.exitCode = 1;
