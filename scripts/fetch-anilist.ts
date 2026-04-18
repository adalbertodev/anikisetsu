import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getAnimes } from "../src/api/aniListAnimesService.ts";
import type { Anime } from "../src/types/Anime.ts";
import type { AnimesVariables } from "../src/api/types/AniListAnimesRequest.ts";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(
  SCRIPT_DIR,
  "..",
  "src",
  "data",
  new Date().toJSON().slice(0, 10),
);

interface AnimesOptions {
  name: string;
  variables: AnimesVariables[];
}

const OPTIONS_COLLECTION: AnimesOptions[] = [
  { name: "trending", variables: [{ sort: ["TRENDING_DESC"] }] },
  {
    name: "popular_this_season",
    variables: [
      { sort: ["POPULARITY_DESC"], season: "SPRING", seasonYear: 2026 },
    ],
  },
  {
    name: "popular_next_season",
    variables: [
      { sort: ["POPULARITY_DESC"], season: "SUMMER", seasonYear: 2026 },
    ],
  },
  { name: "popular_all_time", variables: [{ sort: ["POPULARITY_DESC"] }] },
  {
    name: "top_100_animes",
    variables: [{ sort: ["SCORE_DESC"] }, { page: 2, sort: ["SCORE_DESC"] }],
  },
];

const main = async (): Promise<void> => {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const optionsList of OPTIONS_COLLECTION) {
    let animes: Anime[] = [];

    process.stdout.write(`→ Fetching anime to anilist... `);

    for (const options of optionsList.variables) {
      animes = [...animes, ...(await getAnimes(options))];
    }

    const outPath = join(OUTPUT_DIR, `${optionsList.name}.json`);
    writeFileSync(outPath, JSON.stringify(animes, null, 2));

    process.stdout.write(`${animes.length} animes → ${outPath}\n`);
  }
};

main().catch((error: unknown) => {
  console.error("Error:", error);
  process.exit(1);
});
