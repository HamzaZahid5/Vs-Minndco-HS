import { useEffect, useState } from 'react'
import useProgram from './useProgram'
import { getActivityIdFromKey, getAllActivities } from '../helpers'
import { ProgramActivity } from '../../../types'
import { useSelector } from 'react-redux'
import { PROGRESS } from '../../store/selectors'

const useProgramActivities = () => {
  const [filteredActivities, setFilteredActivities] = useState<{ activity: ProgramActivity; done: boolean }[]>([])
  // brings VR contents despite kit activation to avoid showing nothing.
  const includeVR = true
  const program = useProgram()
  const progress = useSelector(PROGRESS)

  useEffect(() => {
    if (program && progress !== undefined) {
      const allActivities = getAllActivities(program, includeVR)

      //Filter repeated activities
      const activityCount: Record<string, number> = {}
      const allActivitiesFiltered = allActivities.filter(act => {
        if (activityCount[act.id] > 0) {
          return false
        } else {
          activityCount[act.id] = 1
          return true
        }
      })

      const activitiesIdsDone = progress?.map(getActivityIdFromKey)

      const activitiesDone = allActivitiesFiltered.map(act => ({
        activity: act,
        done: activitiesIdsDone.includes(act.id),
      }))
      setFilteredActivities(activitiesDone)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [program, progress])

  return filteredActivities
}

export default useProgramActivities
