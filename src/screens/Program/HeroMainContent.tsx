import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { TREATMENT_MODULE_AND_LEVEL, SMOKES_LOCAL } from '../../store/selectors'
import { translate } from '../../utils/localization'
import BigCounter from './BigCounter'
import { listOfLastXDays } from '../../utils/helpers'
import SmokeFreeCounter from './SmokeFreeCounter'
import { ActivityIndicator } from 'react-native-paper'

const HeroMainContent = () => {
  // REDUX
  const [module] = useSelector(TREATMENT_MODULE_AND_LEVEL)
  // const smokeRecord = useSelector(SMOKE_RECORD)
  const smokeRecord = useSelector(SMOKES_LOCAL)
  const [isLoading, setIsLoading] = useState(true)

  // HELPERS
  const isSmokeFree = module > 2
  const last7Days = listOfLastXDays(7)
  const smokeAmuont = last7Days.reduce((count, date) => {
    if (Object.keys(smokeRecord).includes(date)) {
      count += smokeRecord[date]
    }
    return count
  }, 0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [smokeAmuont, isSmokeFree, smokeRecord, isLoading])

  if (isLoading) {
    return <ActivityIndicator />
  }

  return isSmokeFree ? (
    <SmokeFreeCounter />
  ) : (
    <BigCounter value={smokeAmuont} label={translate('screens.Program.headerSubtitle')} />
  )
}

export default HeroMainContent
