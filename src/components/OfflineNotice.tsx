import React, { useEffect, useState } from 'react'
import Toast from 'react-native-root-toast'
import * as Network from 'expo-network'

const OfflineNotice: React.FC = () => {
  const [netWorkToNetwork, setIsConnectedToNetwork] = useState(true)

  useEffect(() => {
    const checkInternetConnection = async () => {
      Network.getNetworkStateAsync()
      //   const networkState = await NetInfo.fetch()
      const { isConnected } = await Network.getNetworkStateAsync()
      setIsConnectedToNetwork(isConnected)
    }

    checkInternetConnection()

    const interval = setInterval(checkInternetConnection, 10000) // Verificar cada 5 segundos

    return () => {
      clearInterval(interval)
    }
  }, [])

  if (netWorkToNetwork) {
    return null
  }
  return (
    <Toast visible={!netWorkToNetwork} position={50} shadow={false} animation={true} hideOnPress={false}>
      This is a message
    </Toast>
  )
}

export default OfflineNotice
