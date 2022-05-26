import React from 'react'
import { ViewProps } from 'react-native'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'

const MyLoader = (props: ViewProps) => (
  <ContentLoader
    speed={2}
    // width="100%"
    // height="100%"
    width={400}
    height={300}
    // viewBox="0 0 400 300"
    backgroundColor="#e3e3e3"
    foregroundColor="#a7a9a9"
    style={{ opacity: 0.5 }}
    {...props}
  >
    <Rect x="8" y="17" rx="3" ry="3" width="78" height="8" />
    <Rect x="8" y="55" rx="3" ry="3" width="273" height="60" />
    <Circle cx="20" cy="165" r="12" />
    <Rect x="44" y="160" rx="3" ry="3" width="52" height="12" />
    <Rect x="6" y="200" rx="3" ry="3" width="135" height="61" />
  </ContentLoader>
)

export default MyLoader
