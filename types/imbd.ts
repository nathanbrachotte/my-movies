// A movie or series
export interface Media {
  id: string
  // * Defensive coding as we don't know what the API will return for all movies
  image?: string
  title?: string
  genres?: string
  imDbRating?: string
  metacriticRating?: string
  plot?: string
  // * Skipping other fields for simplicity sake
}

export interface IMDBResponse {
  queryString: string | null
  results: Media[] | null
  errorMessage: 'Invalid API Key' | string | null
}
