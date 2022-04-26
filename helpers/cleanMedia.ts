import type { Media } from '../types/imbd'

// Allows to only save in AsyncStorage the data needed
export function cleanMedia(media: Media): Media {
  const { genres, id, imDbRating, image, metacriticRating, plot, title } = media

  return { genres, id, imDbRating, image, metacriticRating, plot, title }
}
