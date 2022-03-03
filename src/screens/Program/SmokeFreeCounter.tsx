import React from 'react'
import moment from 'moment'
import { Row, Headline, useRobTheme } from '@mindcoxr/rob'
import { Text as NativeText } from 'react-native'
import { useSelector } from 'react-redux'
// @ts-ignore no type declarations for countdown
import Countdown from 'countdown'
import { QUIT_DAY } from '../../store/selectors'
import { translate } from '../../utils/localization'

const SmokeFreeCounter = () => {
  const theme = useRobTheme()
  const quitDay = useSelector(QUIT_DAY)
  const daysLabel = Countdown(
    moment(quitDay).toDate(),
    null,
    Countdown.YEARS | Countdown.MONTHS | Countdown.WEEKS | Countdown.DAYS,
  ).toString()

  return (
    <Row>
      <NativeText style={{ color: theme.colors.monochrome.offBlack }}>
        {translate('screens.Program.smoke_free_by')}
      </NativeText>
      <Headline textAlign="left">{daysLabel}</Headline>
    </Row>
  )
}

export default SmokeFreeCounter
