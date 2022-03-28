import React, { useEffect, useState } from 'react'
import { DefaultScreenPropType, DefaultScreenRouteType } from '../../../types'
import { View } from 'react-native'
import AudioScreen from '../ActivityScreen/AudioActivity'
import ReadScreen from '../ActivityScreen/Read'
import { LifesaverAudioType, LifesaverDoType, LifesaverReadType } from '../../utils/lifesaverActivities'
import saveLifesaverActivityDone from './actions'

const ActivityScreen = ({
  navigation,
  route,
}: DefaultScreenPropType<'LifesaverActivity'> & DefaultScreenRouteType<'LifesaverActivity'>) => {
  const [activityScreen, setActivityScreen] = useState<React.ReactElement | undefined>(undefined)
  const saveLifesaverInteraction = () => {
    saveLifesaverActivityDone(route.params.activity, route.params.urge, route.params.place, route.params.company)
    navigation.navigate('Home')
  }
  useEffect(() => {
    if (route.params.activity.type) {
      switch (route.params.activity.type) {
        case 'audio':
          const audParams = route.params.activity as LifesaverAudioType
          setActivityScreen(
            <AudioScreen
              audioSrc={audParams.source}
              backImage={require('../../../assets/images/bg_act_05.jpeg')}
              onDonePressed={saveLifesaverInteraction}
              onPlayPressed={() => {
                return
              }}
              title={route.params.activity.title || ''}
              description=""
              duration=""
            />,
          )
          break
        case 'text':
          const textParams = route.params.activity as LifesaverReadType
          setActivityScreen(
            <ReadScreen
              title={textParams.title || ''}
              readPages={textParams.pages}
              backImage="https://marylineg1.sg-host.com/blog/wp-content/uploads/2018/12/matterhorn-1313x875.jpg"
              onDonePressed={saveLifesaverInteraction}
            />,
          )
          break
        case 'activity':
          const activityParams = route.params.activity as LifesaverDoType
          setActivityScreen(activityParams.screen)
          break
        default:
          setActivityScreen(
            <ReadScreen
              title="Not Implemented"
              readPages={['Not implemented']}
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
