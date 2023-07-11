import { useState, useEffect } from 'react'
import useProgram from './useProgram'
import { useDispatch, useSelector } from 'react-redux'
import { getActivityFromKey, getAllActivitiesKey } from '../helpers'
import { PROGRESS, TREATMENT_MODULE_AND_LEVEL, HAS_VIEWER, STATE } from '../../store/selectors'
import { ProgramActivity } from '../../../types'

export default (fixedActivityId?: string) => {
  const dispatch = useDispatch()
  // STATE
  const [nextActivityInState, setNextActivity] = useState<ProgramActivity>()
  const [nextActivityKey, setNextActivityKey] = useState<string>()
  const [isLastActivityInState, setIsLastActivity] = useState<boolean>()
  const [noFirstNonCompletedIndex, setNoFirstNonCompletedIndex] = useState<boolean>(false)

  // REDUX SELECTORS
  const progress = useSelector(PROGRESS)
  const program = useProgram()
  const includeVR = useSelector(HAS_VIEWER)
  const [mId, lId] = useSelector(TREATMENT_MODULE_AND_LEVEL)
  const state = useSelector(STATE)

  useEffect(() => {
    if (program && progress) {
      const allActivityKeys = getAllActivitiesKey(program, includeVR)
      // const firstNonCompletedIndex = allActivityKeys.findIndex(aKey =>
      //   state === 'ABSTINENCE' ? !progress.includes(aKey) : !progress.includes(aKey) && aKey.includes(`M${mId}`),
      // )
      const firstNonCompletedIndex = allActivityKeys.findIndex(aKey => {
        if (state === 'ABSTINENCE' /*  || mId === 3 */) {
          return !progress.includes(aKey) && aKey.includes('M3')
        } else {
          return !progress.includes(aKey) && !aKey.includes('M3')
        }
      })
      firstNonCompletedIndex === -1 ? setNoFirstNonCompletedIndex(true) : setNoFirstNonCompletedIndex(false)
      // when we got a fixed activity id it doesn't matter if the activity is repeated into another
      // module or level. The first match we find into the array of activity key is enough to let the
      // user to perform that activity again.
      let fixedActivityIndex

      if (fixedActivityId) {
        fixedActivityIndex = allActivityKeys.findIndex(aKey => aKey.includes(fixedActivityId))
      }
      // if fixed act id, fixed activity index, otherwise the next index from last completed act.
      const activityIndex =
        fixedActivityIndex !== undefined && fixedActivityIndex >= 0 ? fixedActivityIndex : firstNonCompletedIndex
      // if exists, the activity key by index, otherwise the last activity key.
      const nextActKey = (allActivityKeys[activityIndex] || [...allActivityKeys].pop()) as string
      // if fixed activity id, it will be the last activity when index + 1 is equal to array length.
      // if next activity is the last one, index plus 1 it will be equal to array length.
      // if next activity is unexistent (current activity was the last one), act index plus one will be greather than array length.
      const isLastActivity = !noFirstNonCompletedIndex && nextActKey === allActivityKeys[allActivityKeys.length - 1]
      const nextActivity = getActivityFromKey(program, nextActKey)

      setIsLastActivity(isLastActivity)
      setNextActivity(nextActivity)
      setNextActivityKey(nextActKey)

      if (isLastActivity) {
        dispatch({ type: 'user/finishProgramPopup', payload: true })
      }
    }
  }, [program, progress, includeVR, mId, lId, fixedActivityId, state])

  return {
    nextActivity: nextActivityInState,
    nextActivityKey,
    isLastActivity: isLastActivityInState,
    withoutActKey: noFirstNonCompletedIndex,
  }
}
