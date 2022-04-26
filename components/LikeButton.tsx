import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { Pressable } from 'react-native'

import type { Media } from '../types/imbd'

import { usePreferences } from './PreferencesContextProvider'

interface LikeButtonProps {
  media: Media
}

const LikeButton: React.FC<LikeButtonProps> = ({ media }) => {
  const { addFavorite } = usePreferences()

  const onPress = () => {
    addFavorite(media)
  }

  return (
    <Pressable onPress={onPress} hitSlop={20}>
      <AntDesign name="hearto" size={20} color="red" />
    </Pressable>
  )
}

export default LikeButton
