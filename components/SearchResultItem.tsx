import React, { useMemo } from 'react'
import { Image, Pressable, View, Text, StyleSheet } from 'react-native'

import type { Media } from '../types/imbd'

import HideButton from './HideButton'
import LikeButton from './LikeButton'
import { usePreferences } from './PreferencesContextProvider'
interface SearchResultItemProps {
  media: Media
  onPressGoToDetails: (media: Media) => void
  showDescription?: boolean
  showRatings?: boolean
  shouldShowSeparator: boolean
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: { flex: 3, minHeight: 80, resizeMode: 'contain' },
  title: { fontSize: 14, top: 5 },
  contentWrapper: {
    flex: 10,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
    backgroundColor: '#CED0CE',
    alignSelf: 'center',
  },
})

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  media,
  onPressGoToDetails,
  shouldShowSeparator,
}) => {
  const { favorites, hiddenMedias } = usePreferences()

  const isHidden = useMemo(
    () => hiddenMedias.some((hiddenMedia) => hiddenMedia.id === media.id),
    [hiddenMedias, media.id],
  )

  const isFavorite = useMemo(
    () =>
      favorites.filter((favorite: Media) => favorite.id === media.id).length >
      0,
    [favorites, media.id],
  )

  if (isHidden) {
    return null
  }

  const onPress = () => {
    onPressGoToDetails(media)
  }

  return (
    <>
      <Pressable style={styles.container} onPress={onPress}>
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
          {!isFavorite ? (
            <View style={styles.buttonWrapper}>
              <LikeButton media={media} />
              <HideButton media={media} />
            </View>
          ) : null}
        </View>
      </Pressable>
      {shouldShowSeparator ? <View style={styles.separator} /> : null}
    </>
  )
}

export default SearchResultItem
