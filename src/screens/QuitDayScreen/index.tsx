/* eslint-disable no-console */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { Row, Button, PopupWrapper, Headline } from '@mindcoxr/rob'
import { StackNavigationProp } from '@react-navigation/stack'
import moment from 'moment'
import { RootStackParamList } from '../../../types'
import { Calendar, CalendarProps } from 'react-native-calendars'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import DayComponent from './DayComponent'
import useSaveQuitDay from './useSaveQuitDay'
import { useDispatch, useSelector } from 'react-redux'
import { QUIT_DAY } from '../../store/selectors'
import userActions from '../../store/slices/user'
import { translate } from '../../utils/localization'

const momentToCalendarDate = (m?: moment.Moment) => (m ? m.format('YYYY-MM-DD') : '')

const QuitDayScreen = ({ navigation }: { navigation: StackNavigationProp<RootStackParamList> }) => {
  // LOCAL STATE
  const [show, setShow] = useState(false)
  const insets = useSafeAreaInsets()
  const actualQuitDay = useSelector(QUIT_DAY)
  const [selected, setSelected] = useState<moment.Moment | undefined>(
    actualQuitDay !== undefined ? moment(actualQuitDay) : undefined,
  )
  const minDate = moment().add(1, 'day')
  const saveQuitDay = useSaveQuitDay()
  const dispatch = useDispatch()

  const onDayPress: CalendarProps['onDayPress'] = useCallback(day => {
    setSelected(moment(day.dateString))
  }, [])

  useEffect(() => console.log(selected), [selected])

  const marked = useMemo(() => {
    return {
      [momentToCalendarDate(selected)]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: 'orange',
        selectedTextColor: 'red',
      },
    }
  }, [selected])
  // BOOT UP PANEL STATE
  useEffect(() => {
    const unsubsFocus = navigation.addListener('focus', () => {
      // delay for make the auto-open to work
      setTimeout(() => {
        setShow(true)
      }, 100)
    })
    return () => {
      unsubsFocus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const closePanel = () => {
    setShow(false)
  }

  return (
    <>
      {/* container to hide panel on web */}
      <View style={{ flexGrow: 1, overflow: 'hidden' }}>
        <PopupWrapper noPaddingHorizontal show={show} onClose={() => navigation.pop()}>
          <Row gutter={45}>
            <Headline size="medium" weight="bold" textAlign="center">
              {translate('screens.QuitDay.title', { defaultValue: 'I’d love to quit by..' })}
            </Headline>
            <Calendar
              minDate={momentToCalendarDate(minDate)}
              enableSwipeMonths
              current={actualQuitDay ?? momentToCalendarDate(minDate)}
              onDayPress={onDayPress}
              markedDates={marked}
              dayComponent={DayComponent}
            />
          </Row>
          <Row gutter={20} grow justifyContentOnGrow="flex-end">
            <View style={{ marginHorizontal: 30 }}>
              <Button
                round
                disabled={selected === undefined}
                onPress={async () => {
                  if (selected) {
                    try {
                      await saveQuitDay(selected, closePanel)
                      dispatch(userActions.actions.setQuitDay(selected))
                    } catch (error) {
                      console.log(error)
                    }
                  }
                }}
              >
                {translate('screens.QuitDay.goal', { defaultValue: 'Set my goal' })}
              </Button>
            </View>
            <View style={{ marginHorizontal: 30 }}>
              <Button
                role="secondary"
                round
                // subVariant="#14142b"
                onPress={() => {
                  closePanel()
                }}
              >
                {translate('screens.QuitDay.later', { defaultValue: 'I’ll set the date later' })}
              </Button>
            </View>
          </Row>
          {/* padding bottom of the panel */}
          <View style={{ marginBottom: insets.bottom * 2 }} />
        </PopupWrapper>
      </View>
    </>
  )
}

export default QuitDayScreen
