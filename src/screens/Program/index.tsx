import React from 'react'
import { DefaultScreenPropType } from '../../../types'
import useProgramActivities from '../../utils/hooks/useProgramActivities'
import Program from './Program'
import useIconSmokeLog from './IconSmokeLog'
import useIconProgress from './IconProgress'
import useIconSmokeSavings from './IconSmokeSavings'
import HeroMainContent from './HeroMainContent'
import { useSelector } from 'react-redux'
import { PROGRESS, TREATMENT_MODULE_AND_LEVEL } from '../../store/selectors'
import useIconSmokeSpend from './IconSmokeSpend'

const ProgramScreen = ({ navigation }: DefaultScreenPropType<'Main'>) => {
  const activities = useProgramActivities()
  const progress = useSelector(PROGRESS)
  const [treatment_module, treatment_level] = useSelector(TREATMENT_MODULE_AND_LEVEL)
  const isAbstinence = treatment_module === 3

  const icon1 = useIconSmokeLog()
  const icon2 = useIconProgress()
  const icon3 = useIconSmokeSavings()
  const icon4 = useIconSmokeSpend()
  return (
    <Program
      tab1={activities.filter(act => act.activity.type === 'vr-met')}
      tab2={activities.filter(act => act.activity.type === '2d-video')}
      tab3={activities.filter(act => act.activity.type === 'audio')}
      onPressActivity={id => {
        const activityKey = progress.find(key => key.includes(id)) || ''
        navigation.navigate('Activity', { activityId: activityKey })
      }}
      heroCenterComponent={<HeroMainContent />}
      heroBottomActions={[icon1, icon2, isAbstinence ? icon3 : icon4]}
    />
  )
}

export default ProgramScreen
