import React from 'react'
import moment from 'moment'
import { template } from 'lodash'
import { Button, Paragraph, Row, Subheading, useRobTheme } from '@mindcoxr/rob'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../types'
import { SMOKE_RECORD, USER_PROFILE } from '../../store/selectors'
import { translate } from '../../utils/localization'
import { HeroIconType } from './Program'
import { listOfLastXDays } from '../../utils/helpers'
import useJournalTrend, { TRENDS } from '../../utils/hooks/useJournalTrend'

const useIconSmokeLog = (): HeroIconType => {
  // REDUX
  const smokeRecord = useSelector(SMOKE_RECORD)
  const { created_at } = useSelector(USER_PROFILE)

  // TOOLS
  const theme = useRobTheme()
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

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
  const logTrend = useJournalTrend()

  return {
    icon: 'Cigarette',
    label: translate('screens.Program.log'),
    value:
      logTrend === TRENDS.EMPTY
        ? ' '
        : logTrend === TRENDS.GOOD
        ? translate('screens.Program.log_good', { defaultValue: 'Great' })
        : logTrend === TRENDS.FINE
        ? translate('screens.Program.log_fine', { defaultValue: 'Fine' })
        : translate('screens.Program.log_low', { defaultValue: 'Low' }),
    valueColor:
      logTrend === TRENDS.GOOD
        ? theme.colors.success.darkmode
        : logTrend === TRENDS.FINE
        ? theme.colors.warning.darkmode
        : theme.colors.danger.darkmode,
    onPress: () => {
      navigation.navigate('BasicModal', {
        content: ({ close }) => (
          <>
            <Row margin={50}>
              <Subheading>{translate('screens.Program.log_info_title')}</Subheading>
              <Paragraph size="small" weight="normal">
                {isLogBlankslate
                  ? translate('screens.Program.log_info_desc_blank')
                  : template(translate('screens.Program.log_info_desc'))({ logDays })}
              </Paragraph>
            </Row>
            <Row margin={50}>
              <Button round compact onPress={close}>
                {translate('commons.messages.close')}
              </Button>
              <Button
                light
                compact
                onPress={async () => {
                  await close()
                  navigation.navigate('SmokeModal')
                }}
              >
                {translate('screens.Program.log_info_open')}
              </Button>
            </Row>
          </>
        ),
      })
    },
  }
}

export default useIconSmokeLog
