export const ANILIST_API_URL = "https://graphql.anilist.co";

interface GraphQLError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string[] | number[];
  extensions?: Record<string, unknown>;
}

interface GraphQLResponse<TData> {
  data?: TData;
  errors?: GraphQLError[];
}

export const aniListRequest = async <TData, TVariables extends object>(
  query: string,
  variables?: TVariables,
): Promise<TData> => {
  const response = await fetch(ANILIST_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { ...variables, language: "JAPANESE", isMain: true },
    }),
  });

  if (!response.ok) {
    throw new Error(`AniList HTTP ${response.status} ${response.statusText}`);
  }

  const payload = (await response.json()) as GraphQLResponse<TData>;

  if (payload.errors?.length) {
    throw new Error(
      `AniList GraphQL error: ${payload.errors.map((e) => e.message).join("; ")}`,
    );
  }

  if (!payload.data) {
    throw new Error("AniList response missing `data` field");
  }

  return payload.data;
};
