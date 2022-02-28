import React, { useEffect } from 'react'
import { DefaultScreenPropType } from '../../../types'
import useProgramActivities from '../../utils/hooks/useProgramActivities'
import Program from './Program'

const ProgramScreen = ({ navigation }: DefaultScreenPropType<'Main'>) => {
  const activities = useProgramActivities()
  return (
    <Program
      tab1={activities.filter(act => act.activity.type === 'vr-met')}
      tab2={activities.filter(act => act.activity.type === '2d-video')}
      tab3={activities.filter(act => act.activity.type === 'audio')}
      onPressActivity={id => navigation.navigate('Activity', { activityId: id })}
    />
  )
}

export default ProgramScreen
