import React from 'react'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import { ViewProps } from 'react-native'

const InlineAudioPlayer = (props: ViewProps) => (
  <ContentLoader
    speed={2}
    width="100%"
    // height="100%"
    // viewBox="0 0 400 160"
    backgroundColor="#e3e3e3"
    foregroundColor="#a7a9a9"
    {...props}
  >
    <Rect x="90" y="17" rx="3" ry="3" width="186" height="9" />
    <Rect x="90" y="36" rx="3" ry="3" width="52" height="6" />
    <Circle cx="30" cy="30" r="30" />
  </ContentLoader>
)

export default InlineAudioPlayer
