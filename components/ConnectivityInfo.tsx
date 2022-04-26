import React from 'react'
import { Text } from 'react-native'
import { useNetInfo } from '@react-native-community/netinfo'

const ConnectivityInfo: React.FC = ({}) => {
  const netInfo = useNetInfo()

  if (!netInfo.isConnected) {
    return (
      <Text style={{ color: 'red' }}>Your internet connection was lost</Text>
    )
  }
  return null
}

export default ConnectivityInfo
