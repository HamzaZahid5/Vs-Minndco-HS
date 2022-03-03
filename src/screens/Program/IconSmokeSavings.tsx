import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useRobTheme, Button, Paragraph, Row, Subheading } from '@mindcoxr/rob'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../types'
import { HeroIconType } from './Program'
import { translate } from '../../utils/localization'
import { useSelector } from 'react-redux'
import { MONEY_SAVED, PRICE_BY_UNIT, SMOKE_BASLINE, SMOKE_RECORD } from '../../store/selectors'
import { listOfLastXDays, calculateSavedCigarettesFromJournal } from '../../utils/helpers'
import { SmokeRecordsState } from '../../store/slices/smokeRecord'
import { template } from 'lodash'

const useIconSmokeSavings = (): HeroIconType => {
  // TOOLS
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const theme = useRobTheme()

  // REDUX
  const moneySaved = useSelector(MONEY_SAVED)
  const baseLine = useSelector(SMOKE_BASLINE)
  const priceByUnit = useSelector(PRICE_BY_UNIT)
  const smokeRecord = useSelector(SMOKE_RECORD)

  // HELPERS
  const days = 30
  const last30Days = listOfLastXDays(days)
  // takes only those records matching last 30 days
  const filteredRecord = last30Days.reduce((record: SmokeRecordsState, date) => {
    if (Object.keys(smokeRecord).includes(date)) {
      record[date] = smokeRecord[date]
    }
    return record
  }, {})
  const savedUnits = calculateSavedCigarettesFromJournal(filteredRecord, baseLine)
  const savedThisMonth = Math.round(savedUnits * priceByUnit * 10) / 10

  return {
    icon: 'Money',
    label: translate('screens.Program.savings', { defaultValue: 'Ahorrado' }),
    value: `$${moneySaved}`,
    valueColor: theme.colors.success.darkmode,
    onPress: () => {
      navigation.navigate('BasicModal', {
        content: ({ close }) => (
          <>
            <Row margin={70}>
              <Subheading textAlign="left">{translate('screens.Program.savings_info_title')}</Subheading>
              <Paragraph size="small" weight="normal" textAlign="left">
                {template(translate('screens.Program.savings_info_desc'))({
                  savedThisMonth,
                  moneySaved,
                })}
              </Paragraph>
            </Row>
            <Row margin={50}>
              <Button round compact onPress={close}>
                {translate('commons.messages.close')}
              </Button>
              {/* <Button
                light
                compact
                onPress={async () => {
                  await close()
                  navigation.navigate('SmokeModal')
                }}
              >
                Update cost
              </Button> */}
            </Row>
          </>
        ),
      })
    },
  }
}

export default useIconSmokeSavings
