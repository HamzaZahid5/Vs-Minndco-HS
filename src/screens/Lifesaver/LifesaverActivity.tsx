import React, { useEffect, useState } from 'react'
import { DefaultScreenPropType, DefaultScreenRouteType } from '../../../types'
import { View } from 'react-native'
import AudioScreen from '../ActivityScreen/AudioActivity'
import ReadScreen from '../ActivityScreen/Read'
import { LifesaverAudioType, LifesaverDoType, LifesaverReadType } from '../../utils/lifesaverActivities'

const ActivityScreen = ({
  navigation,
  route,
}: DefaultScreenPropType<'LifesaverActivity'> & DefaultScreenRouteType<'LifesaverActivity'>) => {
  const [activityScreen, setActivityScreen] = useState<React.ReactElement | undefined>(undefined)
  useEffect(() => {
    if (route.params.type) {
      switch (route.params.type) {
        case 'audio':
          const audParams = route.params as LifesaverAudioType
          setActivityScreen(
            <AudioScreen
              audioSrc={audParams.source}
              backImage="https://marylineg1.sg-host.com/blog/wp-content/uploads/2018/12/matterhorn-1313x875.jpg"
              onDonePressed={() => {
                return
              }}
              onPlayPressed={() => {
                return
              }}
              title={route.params.title || ''}
              description=""
              duration=""
            />,
          )
          break
        case 'text':
          const textParams = route.params as LifesaverReadType
          setActivityScreen(
            <ReadScreen
              title={textParams.title || ''}
              read={textParams.pages.reduce((page, all) => all + '\n' + page)}
              backImage="https://marylineg1.sg-host.com/blog/wp-content/uploads/2018/12/matterhorn-1313x875.jpg"
              onDonePressed={() => {
                return
              }}
            />,
          )
          break
        case 'activity':
          const activityParams = route.params as LifesaverDoType
          setActivityScreen(activityParams.screen)
          break
        default:
          setActivityScreen(
            <ReadScreen
              title="Not Implemented"
              read="Not implemented"
              backImage="https://marylineg1.sg-host.com/blog/wp-content/uploads/2018/12/matterhorn-1313x875.jpg"
              onDonePressed={() => {
                return
              }}
            />,
          )
          break
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params])

  // PREVENT RETURNING TO LIFESAVER
  useEffect(() => {
    const unsub = navigation.addListener('beforeRemove', e => {
      // Prevent default behavior of leaving the screen
      e.preventDefault()
      navigation.navigate('Home')
    })
    return () => unsub()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return activityScreen ? activityScreen : <View style={{ width: '100%', height: '100%' }} />
}

export default ActivityScreen
