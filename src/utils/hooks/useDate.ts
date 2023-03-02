import moment from 'moment'
import { filter, reduce } from 'lodash'
import { useSelector } from 'react-redux'
import { QUIT_DAY, SMOKE_RECORD } from '../../store/selectors'
import { useEffect, useState } from 'react'

const useDate = () => {
  const [actualQuitDay, setactualQuitDay] = useState<string>('')
  const [daysSmokedMoreThan1ThisWeek, setDaysSmokedMoreThan1ThisWeek] = useState<number>(0)
  const [nextDayIsMyQuitDay, setNextDayIsMyQuitDay] = useState<boolean>(false)

  // REDUX
  const quitDay = moment(useSelector(QUIT_DAY)).format('YYYY-MM-DD')
  const smoke_record = useSelector(SMOKE_RECORD)

  useEffect(() => {
    const calculateIfNextDayIsMyQuitDay = moment().add(1, 'd').format('YYYY-MM-DD') === quitDay
    const sevenDaysAgo = moment().subtract(7, 'd')
    // days count with more than 1 cig this week
    const calculateDaysSmokedMoreThan1ThisWeek = reduce(
      filter(smoke_record, (_, date) => moment(date) > sevenDaysAgo),
      (r, i) => r + (i > 1 ? 1 : 0),
      0,
    )

    setactualQuitDay(quitDay)
    setDaysSmokedMoreThan1ThisWeek(calculateDaysSmokedMoreThan1ThisWeek)
    setNextDayIsMyQuitDay(calculateIfNextDayIsMyQuitDay)
  }, [quitDay, smoke_record])

  return {
    actualQuitDay,
    nextDayIsMyQuitDay,
    daysSmokedMoreThan1ThisWeek,
  }
}

export default useDate
