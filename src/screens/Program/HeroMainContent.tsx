import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { TREATMENT_MODULE_AND_LEVEL, SMOKE_RECORD, QUIT_DAY } from '../../store/selectors'
import { translate } from '../../utils/localization'
import BigCounter from './BigCounter'
import { listOfLastXDays } from '../../utils/helpers'
import SmokeFreeCounter from './SmokeFreeCounter'

const HeroMainContent = () => {
  // REDUX
  const [module] = useSelector(TREATMENT_MODULE_AND_LEVEL)
  const smokeRecord = useSelector(SMOKE_RECORD)

  // HELPERS
  const isSmokeFree = module > 2
  const last7Days = listOfLastXDays(7)
  const smokeAmuont = last7Days.reduce((count, date) => {
    if (Object.keys(smokeRecord).includes(date)) {
      count += smokeRecord[date]
    }
    return count
  }, 0)

  useEffect(() => {}, [smokeAmuont, isSmokeFree])

  return isSmokeFree ? (
    <SmokeFreeCounter />
  ) : (
    <BigCounter value={smokeAmuont} label={translate('screens.Program.headerSubtitle')} />
  )
}

export default HeroMainContent
