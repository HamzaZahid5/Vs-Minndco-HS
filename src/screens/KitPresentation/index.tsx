import React from 'react'
import { DefaultScreenPropType, DefaultScreenRouteType } from '../../../types'
import useVRPlayerCTA, { VRPlayerCTAPropType } from '../../utils/hooks/useVRPlayerCTA'
import { translate } from '../../utils/localization'
import i18n from 'i18n-js'
import AssembleCardboardScreen from './AssembleCardboardScreen'
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
      title={translate('screens.KitPresentation.VRTitle')}
      description={translate('screens.KitPresentation.VRDescription')}
      duration={1}
    />
  ) : (
    <AssembleCardboardScreen
      onDonePressed={() => {
        navigation.goBack()
      }}
      onPlayPressed={() => {
        return
      }}
      videoSrc={`content/assemble-headset-${i18n.locale}.mp4`}
      title={translate('screens.KitPresentation.VideoTitle')}
      description={translate('screens.KitPresentation.VideoDescription')}
      duration={1}
    />
  )
}

export default KitPresentation
