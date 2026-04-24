import type { Studio } from "../types/Anime";

export const getMainStudioName = (studios?: Studio[]): string | null =>
  studios?.find((s) => s.isMain)?.name ?? studios?.[0]?.name ?? null;
