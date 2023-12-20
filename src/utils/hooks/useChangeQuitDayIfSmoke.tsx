import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Subheading, Row, Paragraph, Button } from '@mindcoxr/rob'
import { StackNavigationProp } from '@react-navigation/stack'
import { CHANGE_QUIT_DAY_IF_SMOKED, QUIT_DAY, SMOKE_RECORD } from '../../store/selectors'
import { translate } from '../localization'
import { RootStackParamList } from '../../../types'
import moment from 'moment'
import { filter, reduce } from 'lodash'

const MakePopupContent = (navigation: StackNavigationProp<RootStackParamList>) => {
  const PopupContent = ({ close }: { close: () => Promise<void> }) => {
    const dispatch = useDispatch()
    return (
      <>
        <Row gutter={10}>
          <Subheading>{translate('screens.changeQuitDayIfSmoked.title')}</Subheading>
        </Row>
        <Row grow justifyContentOnGrow="flex-start" gutter={10}>
          <Paragraph size="medium" weight="normal" textAlign="left">
            {translate('screens.changeQuitDayIfSmoked.description')}
          </Paragraph>
        </Row>
        <Row gutter={10} grow justifyContentOnGrow="flex-end">
          <Button
            role="primary"
            compact
            onPress={async () => {
              dispatch({ type: 'user/setShowChangeQuitDayIfSmoked', payload: false })
              await close()
              navigation.navigate('QuitDayModal')
            }}
          >
            {translate('screens.changeQuitDayIfSmoked.confirm')}
          </Button>
          <Button
            role="secondary"
            compact
            outline
            onPress={async () => {
              dispatch({ type: 'user/setShowChangeQuitDayIfSmoked', payload: false })
              await close()
            }}
          >
            {translate('screens.changeQuitDayIfSmoked.cancel')}
          </Button>
        </Row>
      </>
    )
  }
  return PopupContent
}

const useChangeQuitDayIfSmoke = (navigation: StackNavigationProp<RootStackParamList>) => {
  const dispatch = useDispatch()
  const actualQuitDay = useSelector(QUIT_DAY)
  const showChangeQuitDayIfSmoked = useSelector(CHANGE_QUIT_DAY_IF_SMOKED)
  const smoke_record = useSelector(SMOKE_RECORD)

  const nextDayIsMyQuitDay = moment().add(1, 'd').format('YYYY-MM-DD') === actualQuitDay
  const sevenDaysAgo = moment().subtract(7, 'd')
  // days count with more than 1 cig this week
  const daysSmokedMoreThan1ThisWeek = reduce(
    filter(smoke_record, (_, date) => moment(date) > sevenDaysAgo),
    (r, i) => r + (i > 1 ? 1 : 0),
    0,
  )

  useEffect(() => {
    if (nextDayIsMyQuitDay && daysSmokedMoreThan1ThisWeek > 1 && showChangeQuitDayIfSmoked) {
      dispatch({ type: 'user/setShowChangeQuitDayIfSmoked', payload: false })
      setTimeout(() => {
        navigation.navigate('BasicModal', {
          content: MakePopupContent(navigation),
        })
      }, 100)
    }
  }, [navigation, dispatch, daysSmokedMoreThan1ThisWeek, showChangeQuitDayIfSmoked])
}

export default useChangeQuitDayIfSmoke
