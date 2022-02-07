import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const DEFAUTL_WIDTH = 245
const DEFAUTL_HEIGHT = 354

const Blob = ({ width, height, ...props }: SvgProps) => (
  <Svg width={width ?? DEFAUTL_WIDTH} height={height ?? DEFAUTL_HEIGHT} fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M198.182.109c51.044-1.638 102.148 15.14 135.236 54.11 34.332 40.436 48.512 95.619 35.608 147.106-12.595 50.255-54.619 83.518-99.752 108.826-50.187 28.143-106.121 57.313-159.848 36.746C51.573 324.751 8.626 268.938.825 207.387-6.32 151.011 34.237 103.685 73.39 62.563 107.157 27.1 149.286 1.678 198.182.11Z"
      fill="#EFF0F7"
    />
  </Svg>
)

export default Blob
