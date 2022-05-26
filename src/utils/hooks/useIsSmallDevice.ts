import { useState, useEffect } from 'react'
import { useWindowDimensions, PixelRatio } from 'react-native'
import { BREAK_DIMENSION, BREAK_INCHES } from '../config'
import { deviceInch } from 'react-native-utils-scale'
import { getAspectRatio, getRealWidth } from '../helpers'

export default () => {
  const [isSmall, setIsSmall] = useState<boolean>()
  const dimensions = useWindowDimensions()
  useEffect(() => {
    if (dimensions) {
      const realWitth = getRealWidth(deviceInch, dimensions.width, dimensions.height)

      if (realWitth <= BREAK_DIMENSION || deviceInch <= BREAK_INCHES) {
        setIsSmall(true)
      } else {
        setIsSmall(false)
      }
    }
  }, [dimensions])
  return isSmall
}
