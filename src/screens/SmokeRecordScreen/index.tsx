import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Row, Icon, BasicScreen, useRobTheme, Button, PopupWrapper, Subheading } from '@mindcoxr/rob'
import { StackNavigationProp } from '@react-navigation/stack'
import { TouchableRipple, Paragraph as PaperParagraph } from 'react-native-paper'
import moment from 'moment'
import { RootStackParamList } from '../../../types'
import WeekDaysBar from './WeekDaysBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { fillWeek, EmptyRecordsType } from './helpers'
import { SMOKE_RECORD } from '../../store/selectors'
import { translate, getDayRefFormat, getLocale } from '../../utils/localization'
import { saveSmokeJurnal } from '../../services/Functions'
import { SmokeRecordsState } from '../../store/slices/smokeRecord'

const SmokeRecordScreen = ({ navigation }: { navigation: StackNavigationProp<RootStackParamList> }) => {
  // LOCAL STATE
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState(0)
  const [agendaItems, setAgendaItems] = useState<EmptyRecordsType>({})
  const [selectedDay, setSelectedDay] = useState(moment().format('YYYY-MM-DD'))

  // REDUX
  const smokeRecords = useSelector(SMOKE_RECORD)

  // HELPERS
  const insets = useSafeAreaInsets()
  const theme = useRobTheme()
  const setIntakeSecureWrapper = (n: number) => {
    if (n >= 0) {
      const changedItem = { [selectedDay]: { count: n, id: selectedDay } }
      const newItems = { ...agendaItems, ...changedItem }
      setAgendaItems(newItems)
    }
  }

  const closePanel = () => {
    setShow(false)
  }

  const saveJournal = () => {
    saveSmokeJurnal(
      // builds a SmokeRecordsState object
      Object.keys(agendaItems).reduce(
        (res: SmokeRecordsState, k: string) => ({
          ...res,
          [k]: agendaItems[k].count,
        }),
        {},
      ),
    )
  }

  // BOOT UP CALENDAR
  useEffect(() => {
    const agenda = fillWeek(smokeRecords)
    setAgendaItems(agenda)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [smokeRecords])

  // BOOT UP PANEL STATE
  useEffect(() => {
    const unsubsFocus = navigation.addListener('focus', () => {
      // delay for make the auto-open to work
      setTimeout(() => {
        setShow(true)
      }, 100)
    })
    const unsubsBlur = navigation.addListener('blur', () => {
      saveJournal()
    })
    return () => {
      unsubsFocus()
      unsubsBlur()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agendaItems])

  const isToday = selectedDay === moment().format('YYYY-MM-DD')
  const isYesterday = selectedDay === moment().subtract(1, 'd').format('YYYY-MM-DD')
  const currentCount = agendaItems[selectedDay]?.count
  return (
    <>
      {/* container to hide panel on web */}
      <View style={{ flexGrow: 1, overflow: 'hidden' }}>
        <PopupWrapper noPaddingHorizontal show={show} onClose={() => navigation.pop()}>
          <Row gutter={45}>
            <WeekDaysBar
              selected={selected}
              daysWithInputs={agendaItems}
              onPress={i => {
                setSelected(i)
                setSelectedDay(
                  moment()
                    // since "i" have negative values or zero we multiply by -1 to remove sign and use .subtract method
                    .subtract(i * -1, 'd')
                    .format('YYYY-MM-DD'),
                )
              }}
            />
            <Subheading numberOfLines={1}>
              {isToday
                ? translate('screens.smokeRecording.lableToday')
                : isYesterday
                ? translate('screens.smokeRecording.lableYesterday')
                : `${translate('screens.smokeRecording.lableDayAdv')} ${moment(selectedDay).format(
                    getDayRefFormat(getLocale()),
                  )}`}{' '}
              {translate('screens.smokeRecording.lableIHaveSmoked')}
            </Subheading>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableRipple
                borderless
                style={{
                  height: 47,
                  width: 47,
                  borderRadius: 24,
                  backgroundColor: theme.colors.monochrome.input,
                  justifyContent: 'center',
                  marginRight: 27,
                  alignItems: 'center',
                }}
                onPress={() => setIntakeSecureWrapper(currentCount - 1)}
              >
                <Icon name="Minus" size={19} strokeWidth={4} color="black" />
              </TouchableRipple>
              <PaperParagraph
                style={{
                  ...theme.fonts.medium,
                  ...theme.fontSizes.display.large,
                  fontFamily: 'Poppins_600SemiBold',
                  fontWeight: '600',
                  color: currentCount >= 0 ? theme.colors.text : theme.colors.monochrome.placeholder,
                }}
              >
                {currentCount >= 0 ? currentCount : '0'}
              </PaperParagraph>
              <TouchableRipple
                borderless
                style={{
                  marginLeft: 27,
                  height: 47,
                  width: 47,
                  borderRadius: 24,
                  backgroundColor: theme.colors.monochrome.input,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setIntakeSecureWrapper(currentCount + 1)}
              >
                <Icon name="Plus" size={19} strokeWidth={4} color="black" />
              </TouchableRipple>
            </View>
          </Row>
          <Row gutter={20} grow justifyContentOnGrow="flex-end">
            <View style={{ marginHorizontal: 10 }}>
              <Button
                round
                onPress={() => {
                  closePanel()
                }}
              >
                {translate('screens.smokeRecording.confirmCTA')}
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

export default SmokeRecordScreen
