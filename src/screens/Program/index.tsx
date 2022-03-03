import React from 'react'
import { DefaultScreenPropType } from '../../../types'
import useProgramActivities from '../../utils/hooks/useProgramActivities'
import Program from './Program'
import useIconSmokeLog from './IconSmokeLog'
import useIconProgress from './IconProgress'
import useIconSmokeSavings from './IconSmokeSavings'
import HeroMainContent from './HeroMainContent'
import { useSelector } from 'react-redux'
import { PROGRESS } from '../../store/selectors'

const ProgramScreen = ({ navigation }: DefaultScreenPropType<'Main'>) => {
  const activities = useProgramActivities()
  const progress = useSelector(PROGRESS)

  const icon1 = useIconSmokeLog()
  const icon2 = useIconProgress()
  const icon3 = useIconSmokeSavings()
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
      heroBottomActions={[icon1, icon2, icon3]}
    />
  )
}

export default ProgramScreen
