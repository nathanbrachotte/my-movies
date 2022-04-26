import React from 'react'
import { Text } from 'react-native'

interface RatingsProps {
  imDbRating?: string
  metacriticRating?: string
}

const Ratings: React.FC<RatingsProps> = ({ imDbRating, metacriticRating }) => {
  const isImDbRatingGiven = imDbRating && imDbRating.length > 1
  const isMetacriticRatingGiven =
    metacriticRating && metacriticRating.length > 1

  if (!isImDbRatingGiven && !isMetacriticRatingGiven) {
    return null
  }

  return (
    <>
      {isImDbRatingGiven ? <Text>IMDB Rating: {imDbRating}/10</Text> : null}
      {isMetacriticRatingGiven ? (
        <Text>Metacritic Rating: {metacriticRating}/100</Text>
      ) : null}
    </>
  )
}

export default Ratings
