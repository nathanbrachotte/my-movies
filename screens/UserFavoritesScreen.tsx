import React from 'react'
import { Text, FlatList, StyleSheet, View, Button } from 'react-native'

import FavoritesItem from '../components/FavoritesItem'
import { usePreferences } from '../components/PreferencesContextProvider'
import type { Media } from '../types/imbd'
import type { RootTabScreenProps } from '../types/navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    width: '100%',
  },
  listContainer: { paddingVertical: 20 },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  emptyView: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    paddingHorizontal: '20%',
  },
  emptyComponentText: {
    marginBottom: 20,
    alignSelf: 'center',
  },
})

const UserFavoritesScreen: React.FC<RootTabScreenProps<'UserFavorites'>> = ({
  navigation,
}) => {
  const { favorites } = usePreferences()

  const onPressSearch = () => {
    navigation.navigate('Search')
  }

  const onPressGoToDetails = (media: Media) => {
    navigation.navigate('MediaDetails', { media })
  }

  const hasAnyFavorites = favorites.length > 0

  return (
    <View style={styles.container}>
      {hasAnyFavorites ? (
        <FlatList
          alwaysBounceVertical={false}
          contentContainerStyle={styles.listContainer}
          scrollEventThrottle={16}
          initialNumToRender={4}
          style={styles.list}
          data={favorites}
          renderItem={({ item, index }) => {
            return (
              <>
                {index > 0 ? <View style={styles.separator} /> : null}
                <FavoritesItem media={item} onPress={onPressGoToDetails} />
              </>
            )
          }}
          keyExtractor={(item) => item.id}
          bounces
        />
      ) : (
        <View style={styles.emptyView}>
          <Text style={styles.emptyComponentText}>No favorites yet</Text>
          <Button onPress={onPressSearch} title="Search for some" />
        </View>
      )}
    </View>
  )
}

export default UserFavoritesScreen
