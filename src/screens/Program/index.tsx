import React, { useEffect } from 'react'
import { DefaultScreenPropType } from '../../../types'
import useProgramActivities from '../../utils/hooks/useProgramActivities'
import Program from './Program'

const ProgramScreen = () => {
  const activities = useProgramActivities()
  console.log(activities)
  return null
}

export default ProgramScreen
