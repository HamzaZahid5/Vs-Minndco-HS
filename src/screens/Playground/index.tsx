import React, { useEffect } from 'react'
import { DefaultScreenPropType, DefaultScreenRouteType } from '../../../types'
import { getLocale } from '../../utils/localization'
import {
  LifesaverAudioType,
  LifesaverDoType,
  LifesaverReadType,
  LIFESAVER_AUDIOS,
  LIFESAVER_READS,
  LIFESAVER_ACTIVITIES,
} from '../../utils/lifesaverActivities'
import Playground from './Playground'
import { useSetHeaderProps } from '../../components/NavigationHeader'

const ProgramScreen = ({
  navigation,
  route,
}: DefaultScreenPropType<'Playground'> & DefaultScreenRouteType<'Playground'>) => {
  return (
    <Playground
      audios={
        route.params?.only
          ? LIFESAVER_AUDIOS(getLocale()).filter(aud => route.params.only && aud.only.includes(route.params.only))
          : LIFESAVER_AUDIOS(getLocale())
      }
      readings={LIFESAVER_READS()}
      activities={LIFESAVER_ACTIVITIES}
      onPress={asset =>
        navigation.navigate('LifesaverActivity', {
          activity: asset as LifesaverReadType | LifesaverAudioType | LifesaverDoType,
          urge: route.params.urge,
          company: route.params.company,
          place: route.params.place,
        })
      }
    />
  )
}

export default ProgramScreen
