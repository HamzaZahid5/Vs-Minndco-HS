/* eslint-disable no-console */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { Row, Button, PopupWrapper, Headline, Subheading, Paragraph } from '@mindcoxr/rob'
import { StackNavigationProp } from '@react-navigation/stack'
import moment from 'moment'
import { RootStackParamList } from '../../../types'
import { Calendar, CalendarProps } from 'react-native-calendars'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import DayComponent from './DayComponent'
import useSaveQuitDay from './useSaveQuitDay'
import { useDispatch, useSelector } from 'react-redux'
import { PROGRESS, QUIT_DAY, TREATMENT_MODULE_AND_LEVEL } from '../../store/selectors'
import { translate } from '../../utils/localization'
import { calculateProgressForQuitDayRevert } from '../../utils/helpers'
import { revertQuitDay } from '../../services/Firestore'

const momentToCalendarDate = (m?: moment.Moment) => (m ? m.format('YYYY-MM-DD') : '')

const QuitDayScreen = ({ navigation }: { navigation: StackNavigationProp<RootStackParamList> }) => {
  // LOCAL STATE
  const [show, setShow] = useState(false)
  const insets = useSafeAreaInsets()
  const actualQuitDay = useSelector(QUIT_DAY)
  const progress = useSelector(PROGRESS)
  const [treatment_module, treatment_level] = useSelector(TREATMENT_MODULE_AND_LEVEL)
  const isAbstinence = treatment_module === 3
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

  const closePanel = async () => {
    setShow(false)
  }

  const MakePopupContent = (progress: string[], actualQuitDay: moment.Moment) => {
    const PopupContent = ({ close }: { close: () => Promise<void> }) => {
      const dispatch = useDispatch()
      return (
        <>
          <Row gutter={10}>
            <Subheading>{translate('screens.quitDay.popupRelapseTitle')}</Subheading>
          </Row>
          <Row grow justifyContentOnGrow="flex-start" gutter={10}>
            <Paragraph size="medium" weight="normal" textAlign="left">
              {translate('screens.quitDay.popupRelapseText')}
            </Paragraph>
          </Row>
          <Row gutter={10} grow justifyContentOnGrow="flex-end">
            <Button
              role="primary"
              compact
              onPress={async () => {
                const [highestModule, highestLevelOnModule] = calculateProgressForQuitDayRevert(progress)
                revertQuitDay(actualQuitDay, highestModule, highestLevelOnModule)
                await close()
              }}
            >
              {translate('screens.quitDay.popupRelapseButtonOk')}
            </Button>
            <Button
              role="secondary"
              compact
              outline
              onPress={async () => {
                await close()
              }}
            >
              {translate('screens.quitDay.popupRelapseButtonCancel')}
            </Button>
          </Row>
        </>
      )
    }
    return PopupContent
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
                    if (!isAbstinence) {
                      await saveQuitDay(selected, closePanel)
                      dispatch({ type: 'user/setQuitDay', payload: selected.format('YYYY-MM-DD') })
                      dispatch({ type: 'user/setShowChangeQuitDayIfSmoked', payload: false })
                      await closePanel()
                    } else {
                      await closePanel()
                      navigation.navigate('BasicModal', {
                        content: MakePopupContent(progress, selected),
                      })
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
                onPress={async () => {
                  dispatch({ type: 'user/setShowChangeQuitDayIfSmoked', payload: false })
                  await closePanel()
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
