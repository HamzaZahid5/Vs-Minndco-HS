import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useRobTheme, Button, Paragraph, Row, Subheading } from '@mindcoxr/rob'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../types'
import { HeroIconType } from './Program'
import { translate } from '../../utils/localization'
import { useSelector } from 'react-redux'
import { MONEY_SPENT, PRICE_BY_UNIT, SMOKE_BASLINE, SMOKE_RECORD } from '../../store/selectors'
import { listOfLastXDays, calculateSavedCigarettesFromJournal, calculateSmokedCigarettesFromJournal } from '../../utils/helpers'
import { SmokeRecordsState } from '../../store/slices/smokeRecord'
import { template } from 'lodash'

const useIconSmokeSpend = (): HeroIconType => {
  // TOOLS
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const theme = useRobTheme()

  // REDUX
  const moneySpent = useSelector(MONEY_SPENT)
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

  const spentUnits = calculateSmokedCigarettesFromJournal(filteredRecord)
  const spentThisMonth = Math.round(spentUnits * priceByUnit * 10) / 10

  return {
    icon: 'Money',
    label: translate('screens.Program.spent', { defaultValue: 'Gastado' }),
    value: `$${moneySpent}`,
    valueColor: theme.colors.danger.darkmode,
    onPress: () => {
      navigation.navigate('BasicModal', {
        content: ({ close }) => (
          <>
            <Row margin={70}>
              <Subheading textAlign="left">{translate('screens.Program.spent_info_title')}</Subheading>
              <Paragraph size="small" weight="normal" textAlign="left">
                {template(translate('screens.Program.spent_info_desc'))({
                  spentThisMonth,
                  moneySpent,
                })}
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

export default useIconSmokeSpend
