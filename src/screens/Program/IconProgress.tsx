import React from 'react'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import { Button, Paragraph, Row, Subheading, useRobTheme } from '@mindcoxr/rob'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../types'
import { HeroIconType } from './Program'
import { translate } from '../../utils/localization'
import { useSelector } from 'react-redux'
import { LAST_ACTIVITY_AT, PROGRESS, TREATMENT_MODULE_AND_LEVEL, USER_PROFILE } from '../../store/selectors'
import useNextActivity from '../../utils/hooks/useNextActivity'

const GOOD = 'good'
const FINE = 'fine'
const SLOW = 'slow'
const FULL = 'full'

const useIconProgres = (): HeroIconType => {
  // TOOLS
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const theme = useRobTheme()
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
  const progressTrend = isProgramFinished
    ? FULL
    : daysFromLastActivity < 2
    ? GOOD
    : daysFromLastActivity < 5
    ? FINE
    : SLOW

  return {
    icon: 'Calendar',
    label: translate('screens.Program.progress'),
    value: isProgressBlankslate
      ? ' '
      : progressTrend === FULL
      ? translate('screens.Program.progress_full', { defaultValue: 'Completo' })
      : progressTrend === GOOD
      ? translate('screens.Program.progress_good', { defaultValue: 'Good' })
      : progressTrend === FINE
      ? translate('screens.Program.progress_fine', { defaultValue: 'Fine' })
      : translate('screens.Program.progress_slow', { defaultValue: 'Slow' }),
    valueColor:
      progressTrend === FULL
        ? theme.colors.success.darkmode
        : progressTrend === GOOD
        ? theme.colors.success.darkmode
        : progressTrend === FINE
        ? theme.colors.warning.darkmode
        : theme.colors.danger.darkmode,
    onPress: () => {
      navigation.navigate('BasicModal', {
        content: ({ close }) => (
          <>
            <Row margin={50}>
              <Subheading>{translate('screens.Program.progress_info_title')}</Subheading>
              <Paragraph size="small" weight="normal">
                {isProgressBlankslate
                  ? translate('screens.Program.progress_info_desc_blank')
                  : progressTrend === FULL
                  ? translate('screens.Program.progress_info_desc_full')
                  : progressTrend === GOOD
                  ? translate('screens.Program.progress_info_desc_good')
                  : progressTrend === FINE
                  ? translate('screens.Program.progress_info_desc_fine')
                  : translate('screens.Program.progress_info_desc_slow')}
              </Paragraph>
            </Row>
            <Row margin={50}>
              <Button round compact onPress={close}>
                {translate('commons.messages.close')}
              </Button>
            </Row>
          </>
        ),
      })
    },
  }
}

export default useIconProgres
