import React, { useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useTheme } from '@react-navigation/native'

import SearchResultItem from '../components/SearchResultItem'
import type { Media } from '../types/imbd'
import type { RootTabScreenProps } from '../types/navigation'
import { useSearch } from '../hooks/useSearch'
import useDebounce from '../hooks/useDebounce'
import ConnectivityInfo from '../components/ConnectivityInfo'
import { cleanMedia } from '../helpers/cleanMedia'

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  textInput: {
    marginVertical: 20,
    width: '80%',
    backgroundColor: 'white',
    borderColor: 'grey',
    padding: 10,
    fontSize: 15,
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
  },
  list: {
    flex: 1,
    width: '100%',
  },
  listContainer: { paddingVertical: 20 },
  emptyView: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: 20,
  },
  emptyComponentText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 15,
  },
})

const SearchScreen: React.FC<RootTabScreenProps<'Search'>> = ({
  navigation,
}) => {
  const {
    colors: { primary },
  } = useTheme()
  const [searchText, setSearchText] = useState('')
  const debouncedSearchText = useDebounce(searchText)

  const onPressGoToDetails = (media: Media) => {
    navigation.navigate('MediaDetails', { media })
  }

  //? imdb doesn't respect status code convention, an error would be a 200 with a structure
  //? that looks like this: { results: null, error: 'Error message' }
  const { data, isLoading, isFetched } = useSearch(debouncedSearchText)

  const mediaResults = data?.results
  const resultAmount = data?.results?.length ?? 0
  const error = data?.errorMessage
  const hasError = Boolean(error)
  const shouldEmptyComponentBeShown = !isLoading && !hasError
  const emptyText =
    isFetched && searchText.length !== 0
      ? 'Please try another name'
      : 'Type a movie/series title in the search bar'

  return (
    <View style={styles.container}>
      <ConnectivityInfo />
      <TextInput
        style={styles.textInput}
        onChangeText={setSearchText}
        value={searchText}
        placeholder="Search for a movie or serie"
      />
      {isLoading ? <ActivityIndicator size="large" color={primary} /> : null}
      {hasError ? (
        <Text style={styles.errorText}>
          Something went wrong, please try again
        </Text>
      ) : null}
      <FlatList
        alwaysBounceVertical={false}
        scrollEventThrottle={16}
        initialNumToRender={5}
        contentContainerStyle={styles.listContainer}
        style={styles.list}
        data={mediaResults}
        renderItem={({ item, index }) => (
          <SearchResultItem
            shouldShowSeparator={index < resultAmount - 1}
            media={cleanMedia(item)}
            onPressGoToDetails={onPressGoToDetails}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.emptyView}>
            {shouldEmptyComponentBeShown ? (
              <Text style={styles.emptyComponentText}>{emptyText}</Text>
            ) : null}
          </View>
        }
        bounces
      />
    </View>
  )
}

export default SearchScreen
