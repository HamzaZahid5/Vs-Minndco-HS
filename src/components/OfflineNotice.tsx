import React, { useEffect, useState } from 'react'
import Toast from 'react-native-root-toast'
import * as Network from 'expo-network'
import { translate } from '../utils/localization'

const OfflineNotice: React.FC = () => {
  const [netWorkToNetwork, setIsConnectedToNetwork] = useState(true)

  useEffect(() => {
    const checkInternetConnection = async () => {
      Network.getNetworkStateAsync()
      const { isConnected } = await Network.getNetworkStateAsync()
      isConnected && setIsConnectedToNetwork(isConnected)
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
    <Toast
      visible={!netWorkToNetwork}
      position={50}
      shadow={false}
      animation={true}
      hideOnPress={false}
      backgroundColor="red"
    >
      {translate('screens.OfflineNotice.text', {
        defaultValue: 'Your internet connection is unstable, which may impact the performance of the app',
      })}
    </Toast>
  )
}

export default OfflineNotice
