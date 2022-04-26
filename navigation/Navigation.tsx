/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  NavigationContainer,
  DefaultTheme,
  useTheme,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { View, Button, StyleSheet } from 'react-native'

import SearchScreen from '../screens/SearchScreen'
import MediaDetailsScreen from '../screens/MediaDetailsScreen'
import UserFavoritesScreen from '../screens/UserFavoritesScreen'
import type { RootStackParamList, RootTabParamList } from '../types/navigation'
import { usePreferences } from '../components/PreferencesContextProvider'

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: DefaultTheme.colors.card,
  },
}

const styles = StyleSheet.create({
  headerRight: { paddingRight: 5 },
  tabBarIcon: { marginBottom: -5 },
})

export default function Navigation() {
  return (
    <NavigationContainer theme={MyTheme}>
      <RootNavigator />
    </NavigationContainer>
  )
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MediaDetails"
        component={MediaDetailsScreen}
        options={{ title: 'More Details' }}
      />
    </Stack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  const { removeAllFavorites, removeAllHiddenMedia } = usePreferences()
  const {
    colors: { primary },
  } = useTheme()

  const onPressHeaderRight = () => {
    alert('All your preferences have been reset')
    removeAllFavorites()
    removeAllHiddenMedia()
  }

  return (
    <BottomTab.Navigator
      initialRouteName="UserFavorites"
      screenOptions={{
        tabBarActiveTintColor: primary,
      }}
    >
      <BottomTab.Screen
        name="UserFavorites"
        component={UserFavoritesScreen}
        options={{
          title: 'My favorites',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          headerRight: () => (
            <View style={styles.headerRight}>
              <Button title="Reset all" onPress={onPressHeaderRight} />
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={18} style={styles.tabBarIcon} {...props} />
}
