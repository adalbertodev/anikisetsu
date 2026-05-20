import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import XMLBuilder from "fast-xml-builder";
import type { AnimeFormat } from "../src/types/Anime.ts";
import { getAllAnimes } from "../src/data/index.ts";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(SCRIPT_DIR, "..", "public", "studios");

interface Anime {
  id: number;
  format?: AnimeFormat | null;
  title: string;
  score?: number | null;
  popularity?: number | null;
  year?: number | null;
  episodes?: number | null;
}

interface Studio {
  name: string;
  animes: Anime[];
}

const ALLOWED_FORMATS: Anime["format"][] = [
  "MOVIE",
  "ONA",
  "ONE_SHOT",
  "OVA",
  "SPECIAL",
  "TV",
  "TV_SHORT",
];

const transformData = () => {
  const allAnimes = getAllAnimes().filter(
    (anime) => !anime.format || ALLOWED_FORMATS.includes(anime.format),
  );
  const allStudios = new Map<string, Studio>();

  allAnimes.forEach((anime) => {
    const animeMainStudio = anime.studios?.find((studio) => studio.isMain);

    if (!animeMainStudio) return;

    if (allStudios.has(animeMainStudio.name)) {
      const addedStudio = allStudios.get(animeMainStudio.name)!;
      addedStudio.animes = [
        ...addedStudio.animes,
        {
          id: anime.id,
          format: anime.format,
          title: anime.title.romaji,
          score: anime.averageScore,
          popularity: anime.popularity,
          year: anime.seasonYear,
          episodes: anime.episodes,
        },
      ];

      return;
    }

    const studio = {
      name: animeMainStudio.name,
      animes: [
        {
          id: anime.id,
          format: anime.format,
          title: anime.title.romaji,
          score: anime.averageScore,
          popularity: anime.popularity,
          year: anime.seasonYear,
          episodes: anime.episodes,
        },
      ],
    };

    allStudios.set(animeMainStudio.name, studio);
  });

  return Array.from(allStudios.values());
};

const main = (): void => {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  process.stdout.write(`→ Transforming animes to studios... `);

  const studios: Studio[] = transformData();

  const xmlObject = {
    studios: {
      studio: studios.map((studio) => ({
        name: studio.name,
        animes: {
          anime: studio.animes.map((anime) => ({
            "@_id": anime.id.toString(),
            "@_format": anime.format ?? undefined,
            title: anime.title,
            score: anime.score ?? undefined,
            popularity: anime.popularity ?? undefined,
            year: anime.year ?? undefined,
            episodes: anime.episodes ?? undefined,
          })),
        },
      })),
    },
  };

  const builder = new XMLBuilder({
    ignoreAttributes: false,
    format: true,
  });
  const xml = builder.build(xmlObject);

  const outPath = join(OUTPUT_DIR, "studiosRaw.xml");
  writeFileSync(outPath, xml);

  process.stdout.write(`${studios.length} studios → ${outPath}\n`);
};

main();
