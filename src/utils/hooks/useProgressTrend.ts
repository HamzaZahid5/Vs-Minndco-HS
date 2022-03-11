import moment from 'moment'
import { useSelector } from 'react-redux'
import { LAST_ACTIVITY_AT, PROGRESS, TREATMENT_MODULE_AND_LEVEL, USER_PROFILE } from '../../store/selectors'
import useNextActivity from './useNextActivity'

export enum TRENDS {
  GOOD = 'good',
  FINE = 'fine',
  SLOW = 'slow',
  FULL = 'full',
  EMPTY = 'empty',
}
const useProgressTrend = () => {
  // TOOLS
  const nextActivity = useNextActivity()
  const [module] = useSelector(TREATMENT_MODULE_AND_LEVEL)

  // REDUX
  const lastActivityAt = useSelector(LAST_ACTIVITY_AT)
  const progress = useSelector(PROGRESS)
  const { created_at } = useSelector(USER_PROFILE)

  // HELPERS
  const daysFromCreation = moment().diff(created_at?.toDate(), 'd')
  const daysFromLastActivity = moment().diff(lastActivityAt, 'd')
  const isProgressBlankslate = progress.length === 0 && daysFromCreation <= 3
  const isProgramFinished = module === 3 && nextActivity === null
  const progressTrend = isProgressBlankslate
    ? TRENDS.EMPTY
    : isProgramFinished
    ? TRENDS.FULL
    : daysFromLastActivity < 2
    ? TRENDS.GOOD
    : daysFromLastActivity < 5
    ? TRENDS.FINE
    : TRENDS.SLOW

  return progressTrend
}

export default useProgressTrend
