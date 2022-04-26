import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'

import Ratings from '../components/Ratings'
import type { RootStackParamList } from '../types/navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  image: {
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  description: {
    marginBottom: 20,
  },
})

type MediaScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MediaDetails'
>

const MediaScreen: React.FC<MediaScreenProps> = ({
  route: {
    params: { media },
  },
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{media.title}</Text>
      <Image
        style={styles.image}
        source={{
          uri: media.image,
        }}
      />
      <Text style={styles.description}>{media.plot}</Text>
      <Ratings
        imDbRating={media.imDbRating}
        metacriticRating={media.metacriticRating}
      />
    </View>
  )
}

export default MediaScreen
