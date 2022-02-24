import React, { useEffect } from 'react'
import { DefaultScreenPropType } from '../../../types'
import useProgramActivities from '../../utils/hooks/useProgramActivities'
import Program from './Program'

const ProgramScreen = () => {
  const activities = useProgramActivities()
  return (
    <Program
      vr={activities.filter(act => act.activity.type === 'vr-met')}
      video={activities.filter(act => act.activity.type === '2d-video')}
      audio={activities.filter(act => act.activity.type === 'audio')}
    />
  )
}

export default ProgramScreen
