import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClient, QueryClientProvider } from 'react-query'

import Navigation from './navigation/Navigation'
import PreferencesContextProvider from './components/PreferencesContextProvider'

const queryClient = new QueryClient()

export default function App() {
  return (
    <PreferencesContextProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      </QueryClientProvider>
    </PreferencesContextProvider>
  )
}
