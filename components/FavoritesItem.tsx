import React from 'react'
import { Image, Pressable, View, Text, StyleSheet } from 'react-native'

import type { Media } from '../types/imbd'

import Ratings from './Ratings'

interface FavoritesItemProps {
  media: Media
  onPress: (media: Media) => void
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: { flex: 3, minHeight: 100, resizeMode: 'contain' },
  title: { fontSize: 18, marginBottom: 8 },
  contentWrapper: {
    flex: 9,
    height: '100%',
  },
  description: {
    marginBottom: 8,
  },
})

const FavoritesItem: React.FC<FavoritesItemProps> = ({ media, onPress }) => {
  const onPressFavorite = () => {
    onPress(media)
  }

  return (
    <Pressable style={styles.container} onPress={onPressFavorite}>
      <Image
        style={styles.image}
        source={{
          uri: media.image,
        }}
      />
      <View style={styles.contentWrapper}>
        <Text style={styles.title} numberOfLines={3}>
          {media.title}
        </Text>
        <Text style={styles.description}>{media.plot}</Text>
        <Ratings
          imDbRating={media.imDbRating}
          metacriticRating={media.metacriticRating}
        />
      </View>
    </Pressable>
  )
}

export default FavoritesItem
