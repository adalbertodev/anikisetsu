export const formatDate = (
  day: number | null | undefined,
  month: number | null | undefined,
  year: number | null | undefined,
): string | undefined => {
  if (!day || !month || !year) {
    return undefined;
  }

  return new Date(year, month, day).toLocaleDateString("es-Es", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
