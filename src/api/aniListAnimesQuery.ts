export const ANIMES_QUERY = `
query($page: Int, $perPage: Int, $sort: [MediaSort], $type: MediaType, $season: MediaSeason, $seasonYear: Int, $language: StaffLanguage, $isMain: Boolean)  { 
  Page(page: $page, perPage: $perPage) {
    media(sort: $sort, type: $type, season: $season, seasonYear: $seasonYear) {
      id
      title {
        romaji
        native
        english
      }
      coverImage {
        extraLarge
      }
      averageScore
      genres
      popularity
      trending
      status
      stats {
        scoreDistribution {
          amount
          score
        }
      }
      bannerImage
      characters {
        edges {
          role
          voiceActors(language: $language) {
            image {
              large
            }
            name {
              full
            }
            languageV2
          }
          node {
            name {
              full
            }
          }
        }
      }
      description
      duration
      endDate {
        day
        month
        year
      }
      episodes
      format
      relations {
        edges {
          relationType
          node {
            id
            title {
              romaji
            }
            format
            seasonYear
            studios(isMain: $isMain) {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        }
      }
      season
      seasonYear
      staff {
        edges {
          role
          node {
            name {
              full
            }
            image {
              large
            }
          }
        }
      }
      studios {
        edges {
          id
          node {
            name
          }
          isMain
        }
      }
      type
      source
      startDate {
        day
        month
        year
      }
      rankings {
        rank
        allTime
        type
        season
        format
        context
        year
      }
    }
    pageInfo {
      currentPage
      hasNextPage
      lastPage
      perPage
      total
    }  
  }
}
`;
