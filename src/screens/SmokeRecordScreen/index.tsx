import React, { useEffect, useState } from 'react'
import { View, Dimensions, TouchableOpacity, Text } from 'react-native'
import {
  Row,
  Icon,
  BasicScreen,
  useRobTheme,
  Button,
  PopupWrapper,
  Subheading,
  Paragraph,
  ButtonSubVariant,
} from '@mindcoxr/rob'
import { StackNavigationProp } from '@react-navigation/stack'
import { TouchableRipple, Paragraph as PaperParagraph } from 'react-native-paper'
import moment from 'moment'
import { RootStackParamList } from '../../../types'
import WeekDaysBar from './WeekDaysBar'
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { fillWeek, EmptyRecordsType } from './helpers'
import { PROGRESS, QUIT_DAY, SMOKES_LOCAL, SMOKE_RECORD, TREATMENT_MODULE_AND_LEVEL } from '../../store/selectors'
import { translate, getDayRefFormat, getLocale } from '../../utils/localization'
import { saveSmokeJurnal } from '../../services/Functions'
import { SmokeRecordsState } from '../../store/slices/smokeRecord'
import { filter, reduce } from 'lodash'
import { revertQuitDay } from '../../services/Firestore'
import { calculateProgressForQuitDayRevert } from '../../utils/helpers'

const SmokeRecordScreen = ({ navigation }: { navigation: StackNavigationProp<RootStackParamList> }) => {
  // LOCAL STATE
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState(0)
  const [agendaItems, setAgendaItems] = useState<EmptyRecordsType>({})
  const [selectedDay, setSelectedDay] = useState(moment().format('YYYY-MM-DD'))
  const [showButton, setShowButton] = useState(true)

  // REDUX
  // const smokeRecords = useSelector(SMOKE_RECORD)
  const [treatment_module, treatment_level] = useSelector(TREATMENT_MODULE_AND_LEVEL)
  const actualQuitDay = useSelector(QUIT_DAY)
  const progress = useSelector(PROGRESS)
  const smokesLocal = useSelector(SMOKES_LOCAL)
  const dispatch = useDispatch()

  // HELPERS
  const { height } = Dimensions.get('screen')
  // ADAPT TO SMALL SCREENS
  const popUpCustomTop = height > 640 ? height - (height * 30) / 100 : height - (height * 20) / 100

  const insets = useSafeAreaInsets()
  const theme = useRobTheme()
  const setIntakeSecureWrapper = (n: number) => {
    if (n >= 0) {
      const changedItem = { [selectedDay]: { count: n, id: selectedDay } }
      const newItems = { ...agendaItems, ...changedItem }
      setAgendaItems(newItems)
      setShowButton(false)
    }
  }

  const isAbstinence = treatment_module === 3
  const sevenDaysAgo = moment().subtract(7, 'd')
  const daysSmokedMoreThan1ThisWeek = reduce(
    filter(smokesLocal, (_, date) => moment(date) > sevenDaysAgo),
    (r, i) => r + (i > 1 ? 1 : 0),
    0,
  )

  // LISTENER
  const saveJournal = async (noSmokeToday?: boolean) => {
    let smokesUpdate: SmokeRecordsState = {}
    if (noSmokeToday) {
      smokesUpdate = Object.keys(agendaItems).reduce((res: SmokeRecordsState, k: string) => {
        if (k === selectedDay) {
          return { ...res, [k]: 0 }
        } else if (agendaItems[k].count >= 0) {
          return { ...res, [k]: agendaItems[k].count }
        } else {
          return { ...res }
        }
      }, {})
    } else {
      smokesUpdate = Object.keys(agendaItems).reduce((res: SmokeRecordsState, k: string) => {
        if (agendaItems[k].count >= 0) {
          return { ...res, [k]: agendaItems[k].count }
        } else {
          return { ...res }
        }
      }, {})
    }
    const tomorrow = moment().add(1, 'day').format('YYYY-MM-DD')
    delete smokesUpdate[tomorrow]

    // builds a SmokeRecordsState object
    dispatch({
      type: 'smoke_record/setSmokesByDay',
      payload: {
        smokes_by_day: smokesUpdate,
      },
    })
    await saveSmokeJurnal(smokesUpdate)
    if (isAbstinence && daysSmokedMoreThan1ThisWeek > 1) {
      navigation.navigate('BasicModal', { content: MakePopupContent(progress, moment(actualQuitDay)) })
    }
  }

  const closePanel = async (noSmokeToday?: boolean) => {
    saveJournal(noSmokeToday)
    setShow(false)
  }

  // BOOT UP CALENDAR
  useEffect(() => {
    const agenda = fillWeek(smokesLocal)
    setAgendaItems(agenda)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [smokesLocal])

  // BOOT UP PANEL STATE
  useEffect(() => {
    const unsubsFocus = navigation.addListener('focus', () => {
      // delay for make the auto-open to work
      setTimeout(() => {
        setShow(true)
        // @todo trigger this conditionally only if it's needed
        dispatch({ type: 'flags/showJournalHelper', payload: false })
      }, 100)
    })
    const unsubsBlur = navigation.addListener('blur', () => {
      // saveJournal()
    })
    return () => {
      unsubsFocus()
      unsubsBlur()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agendaItems, dispatch])

  const isToday = selectedDay === moment().format('YYYY-MM-DD')
  const isYesterday = selectedDay === moment().subtract(1, 'd').format('YYYY-MM-DD')
  const currentCount = agendaItems[selectedDay]?.count

  const MakePopupContent = (progress: string[], actualQuitDay: moment.Moment) => {
    const PopupContent = ({ close }: { close: () => Promise<void> }) => {
      const dispatch = useDispatch()
      return (
        <>
          <Row gutter={10}>
            <Subheading>{translate('screens.relapseWarningPopUp.title')}</Subheading>
          </Row>
          <Row grow justifyContentOnGrow="flex-start" gutter={10}>
            <Paragraph size="medium" weight="normal" textAlign="left">
              {translate('screens.relapseWarningPopUp.message')}
            </Paragraph>
          </Row>
          <Row gutter={10} grow justifyContentOnGrow="flex-end">
            <Button
              role="primary"
              compact
              onPress={() => {
                const [highestModule, highestLevelOnModule] = calculateProgressForQuitDayRevert(progress)
                revertQuitDay(actualQuitDay, highestModule, highestLevelOnModule)
                dispatch({ type: 'user/setShowRelapseWarinigPopup', payload: false })
                close()
              }}
            >
              {translate('screens.relapseWarningPopUp.confirmButtonLabel')}
            </Button>
            <Button
              role="secondary"
              compact
              outline
              onPress={() => {
                dispatch({ type: 'user/setShowRelapseWarinigPopup', payload: false })
                close()
              }}
            >
              {translate('screens.relapseWarningPopUp.cancelButtonLabel')}
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
      <View style={{ flex: 1, flexGrow: 1, overflow: 'hidden' }}>
        <PopupWrapper customTop={popUpCustomTop} noPaddingHorizontal show={show} onClose={() => navigation.pop()}>
          <SafeAreaView>
            <Row gutter={25}>
              <WeekDaysBar
                selected={selected}
                daysWithInputs={agendaItems}
                onPress={i => {
                  setShowButton(true)
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
                    height: 65,
                    width: 65,
                    borderRadius: 32,
                    backgroundColor: theme.colors.monochrome.input,
                    justifyContent: 'center',
                    marginRight: 27,
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    if (currentCount > 0) {
                      setIntakeSecureWrapper(currentCount - 1)
                    }
                  }}
                >
                  <Icon name="Minus" size={19} strokeWidth={4} color="black" />
                </TouchableRipple>
                <PaperParagraph
                  style={{
                    ...theme.fonts.medium,
                    ...theme.fontSizes.display.large,
                    fontFamily: 'Poppins_600SemiBold',
                    fontWeight: '900',
                    color: currentCount >= 0 ? theme.colors.text : theme.colors.monochrome.placeholder,
                  }}
                >
                  {currentCount >= 0 ? currentCount : '0'}
                </PaperParagraph>
                <TouchableRipple
                  borderless
                  style={{
                    marginLeft: 27,
                    height: 65,
                    width: 65,
                    borderRadius: 32,
                    backgroundColor: theme.colors.monochrome.input,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setIntakeSecureWrapper(currentCount + 1)
                  }}
                >
                  <Icon name="Plus" size={19} strokeWidth={4} color="black" />
                </TouchableRipple>
              </View>
            </Row>
            <Row gutter={20} grow justifyContentOnGrow="flex-end">
              <View style={{ marginHorizontal: 10 }}>
                {/* BOTON 'HOY NO FUME' DESHABILITADO POR AHORA
                <View
                  style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                >
                  <TouchableOpacity
                    onPress={async () => {
                        await closePanel(true)
                      
                    }}
                    style={{
                      backgroundColor: '#00BFFF',
                      padding: 10,
                      borderRadius: 32,
                      alignItems: 'center',
                      width: 200,
                    }}
                  >
                    <Paragraph textAlign="left" size="medium" weight="bold">
                      <Text style={{ color: '#ffffff' }}>
                      {translate('screens.smokeRecording.smokeFree', { defaultValue: `Didn't smoke today` })}
                      </Text>
                    </Paragraph>
                  </TouchableOpacity>
                </View> */}
                <Button
                  subVariant={showButton ? ButtonSubVariant.colorless : undefined}
                  round
                  onPress={async () => {
                    await closePanel(false)
                  }}
                >
                  {translate('screens.smokeRecording.confirmCTA')}
                </Button>
              </View>
            </Row>
          </SafeAreaView>
          {/* padding bottom of the panel */}
          <View style={{ marginBottom: insets.bottom * 2 }} />
        </PopupWrapper>
      </View>
    </>
  )
}

export default SmokeRecordScreen
