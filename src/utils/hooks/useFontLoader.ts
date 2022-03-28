import { useEffect, useState } from 'react'
import * as Font from 'expo-font'

export default () => {
  const [fontsLoaded, setFontsLoaded] = useState<boolean>()
  const loadFonts = async () => {
    await Font.loadAsync({
      Poppins_400Regular: require('../../../assets/fonts/Poppins/Poppins-Regular.ttf'),
      Poppins_700Bold: require('../../../assets/fonts/Poppins/Poppins-Bold.ttf'),
      Poppins_300Light: require('../../../assets/fonts/Poppins/Poppins-Light.ttf'),
      Poppins_100Thin: require('../../../assets/fonts/Poppins/Poppins-Thin.ttf'),
      Poppins_600SemiBold: require('../../../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    })
    setFontsLoaded(true)
  }

  useEffect(() => {
    loadFonts()
  }, [])

  return [fontsLoaded]
}
