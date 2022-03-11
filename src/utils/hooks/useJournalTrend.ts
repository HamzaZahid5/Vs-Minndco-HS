import moment from 'moment'
import { useSelector } from 'react-redux'
import { SMOKE_RECORD, USER_PROFILE } from '../../store/selectors'
import { listOfLastXDays } from '../helpers'

export enum TRENDS {
  GOOD = 'good',
  FINE = 'fine',
  LOW = 'low',
  EMPTY = 'empty',
}

const useJournalTrend = () => {
  // REDUX
  const smokeRecord = useSelector(SMOKE_RECORD)
  const { created_at } = useSelector(USER_PROFILE)

  // HELPERS
  const daysFromCreation = moment().diff(created_at?.toDate(), 'd')
  const isLogBlankslate = Object.keys(smokeRecord).length === 0 && daysFromCreation <= 3
  const last7Days = listOfLastXDays(7)
  const logDays = last7Days.reduce((count, date) => {
    if (Object.keys(smokeRecord).includes(date)) {
      count++
    }
    return count
  }, 0)
  const logTrend = isLogBlankslate ? TRENDS.EMPTY : logDays > 4 ? TRENDS.GOOD : logDays > 2 ? TRENDS.FINE : TRENDS.LOW

  return logTrend
}

export default useJournalTrend
