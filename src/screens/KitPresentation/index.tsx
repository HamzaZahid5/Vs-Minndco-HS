import React from 'react'
import { DefaultScreenPropType, DefaultScreenRouteType } from '../../../types'
import useVRPlayerCTA, { VRPlayerCTAPropType } from '../../utils/hooks/useVRPlayerCTA'
import VideoActivity from '../ActivityScreen/VideoActivity'
import VRActivity from '../ActivityScreen/VRActivity'

const KitPresentation = ({
  navigation,
  route,
}: DefaultScreenPropType<'KitPresentation'> & DefaultScreenRouteType<'KitPresentation'>) => {
  const resourceId = 'content/360-demo-beach-comp.mp4'
  const openVRPlayer = useVRPlayerCTA({
    resourceId: resourceId,
    onCancel: () => {
      // eslint-disable-next-line no-console
      console.log('cancel')
    },
    onComplete: () => {
      navigation.goBack()
    },
  } as VRPlayerCTAPropType)
  return route.params.demoVr ? (
    <VRActivity
      backImage="https://marylineg1.sg-host.com/blog/wp-content/uploads/2018/12/matterhorn-1313x875.jpg"
      onDonePressed={() => {
        navigation.goBack()
        return
      }}
      onPlayPressed={() => {
        openVRPlayer()
        return
      }}
      title="Assemble your cardboard headset"
      description="Follow the video instructions to easily get your headset ready."
      duration={1}
    />
  ) : (
    <VideoActivity
      onDonePressed={() => {
        navigation.goBack()
      }}
      onPlayPressed={() => {
        return
      }}
      videoSrc="content/assemble-headset.mp4"
      title="Assemble your cardboard headset"
      description="Follow the video instructions to easily get your headset ready."
      duration={1}
    />
  )
}

export default KitPresentation
