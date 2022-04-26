import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useContext, useEffect, useState } from 'react'

import type { Media } from '../types/imbd'

const FAVORITES_KEY = 'MY_MOVIES_APP:FAVORITES'
const HIDDEN_KEY = 'MY_MOVIES_APP:HIDDEN'
const INITIAL_STATE: Media[] = []

const PreferencesContext = createContext<{
  favorites: Media[]
  hiddenMedias: Media[]
  addFavorite: (media: Media) => void
  removeAllFavorites: () => void
  addHidden: (media: Media) => void
  removeAllHiddenMedia: () => void
}>({
  favorites: INITIAL_STATE,
  hiddenMedias: INITIAL_STATE,
  addFavorite: () => undefined,
  removeAllFavorites: () => undefined,
  addHidden: () => undefined,
  removeAllHiddenMedia: () => undefined,
})

export const usePreferences = () => useContext(PreferencesContext)

async function retrieveFromStorage(
  key: string,
  setValue: (value: Media[]) => void,
) {
  const medias = await AsyncStorage.getItem(key)
  await AsyncStorage.getItem(key)

  const parsedMedia = medias != null ? JSON.parse(medias) : null

  if (parsedMedia) {
    setValue(parsedMedia)
  }
}

async function setInStorage(key: string, newMediaList: Media[]) {
  const jsonValue = JSON.stringify(newMediaList)
  await AsyncStorage.setItem(key, jsonValue)
}

const PreferencesContextProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<Media[]>(INITIAL_STATE)
  const [hiddenMedias, setHiddenMedias] = useState<Media[]>(INITIAL_STATE)

  const addFavorite = (newFavorite: Media) => {
    setFavorites((currentFavorites) => {
      return [...currentFavorites, newFavorite]
    })
  }

  const removeAllFavorites = () => {
    setFavorites(INITIAL_STATE)
    setInStorage(FAVORITES_KEY, INITIAL_STATE)
  }

  const addHidden = (newHidden: Media) => {
    setHiddenMedias((currentHidden) => {
      return [...currentHidden, newHidden]
    })
  }

  const removeAllHiddenMedia = () => {
    setHiddenMedias(INITIAL_STATE)
    setInStorage(HIDDEN_KEY, INITIAL_STATE)
  }

  useEffect(() => {
    try {
      retrieveFromStorage(FAVORITES_KEY, setFavorites)
    } catch (err) {
      // Do nothing, keep the default values
    }
    try {
      retrieveFromStorage(HIDDEN_KEY, setHiddenMedias)
    } catch (err) {
      // Do nothing, keep the default values
    }
  }, [])

  useEffect(() => {
    // Prevents useEffect from resetting async storage on mount
    if (favorites.length > 0) {
      setInStorage(FAVORITES_KEY, favorites)
    }
  }, [favorites])

  useEffect(() => {
    // Prevents useEffect from resetting async storage on mount
    if (hiddenMedias.length > 0) {
      setInStorage(HIDDEN_KEY, hiddenMedias)
    }
  }, [hiddenMedias])

  return (
    <PreferencesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeAllFavorites,
        hiddenMedias,
        addHidden,
        removeAllHiddenMedia,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}

export default PreferencesContextProvider
