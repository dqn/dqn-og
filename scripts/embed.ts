import { readFile, writeFile } from "fs/promises";

async function main(): Promise<void> {
  const buf = await readFile("./assets/font.woff");
  const src = `export const fontData = Buffer.from([${[...buf].join(", ")}]);`;
  await writeFile("./embedded-font.ts", src);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
