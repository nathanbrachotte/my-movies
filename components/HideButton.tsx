import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { Pressable } from 'react-native'

import type { Media } from '../types/imbd'

import { usePreferences } from './PreferencesContextProvider'

interface HideButtonProps {
  media: Media
}

const HideButton: React.FC<HideButtonProps> = ({ media }) => {
  const { addHidden } = usePreferences()

  const onPress = () => {
    addHidden(media)
  }

  return (
    <Pressable onPress={onPress} hitSlop={20}>
      <AntDesign name="delete" size={20} color="black" />
    </Pressable>
  )
}

export default HideButton
