import moment from 'moment'
import { useSelector } from 'react-redux'
import { revertQuitDay, saveQuitDay as saveQuitDayIntoDB } from '../../services/Firestore'
import { PROGRESS, QUIT_DAY } from '../../store/selectors'
import { calculateProgressForQuitDayRevert } from '../../utils/helpers'

const useSaveQuitDay = () => {
  const actualQuitDay = moment(useSelector(QUIT_DAY))
  const progress = useSelector(PROGRESS)
  return async (date: moment.Moment, then?: () => void) => {
    const isInAbstinence = actualQuitDay && actualQuitDay.startOf('d') < moment().startOf('d')
    if (isInAbstinence) {
      const [highestModule, highestLevelOnModule] = calculateProgressForQuitDayRevert(progress)
      revertQuitDay(date, highestModule, highestLevelOnModule)
    } else {
      await saveQuitDayIntoDB(date)
    }
    then && then()
  }
}

export default useSaveQuitDay
