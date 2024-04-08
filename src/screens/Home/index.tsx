import React, { useEffect, useState } from 'react'
import { View, StatusBar, useWindowDimensions, Linking, Platform } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import {
  TabbedScreen,
  Row,
  Carousel,
  Icon,
  Paragraph,
  Button,
  Text,
  Billboard,
  useRobTheme,
  BackgroundArt,
  Subheading,
} from '@mindcoxr/rob'
import { homeBGColors } from '../../utils/config'
import { ProgramActivityType, RootStackParamList } from '../../../types'
import { StackNavigationProp } from '@react-navigation/stack'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { DrawerParamList } from '../DrawerNavigator'
import { CompositeNavigationProp } from '@react-navigation/native'
import { translate } from '../../utils/localization'
import useNextActivity from '../../utils/hooks/useNextActivity'
import useTodaysActivityDone from '../../utils/hooks/useTodaysActivityDone'
import { IconNamesTypes } from '@mindcoxr/rob/dist/typescript/components/Icon'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { TabsParamList } from '../TabsNavigator'
import { SMOKE_RECORD, SHOW_BASIC_TUTORIAL, PROGRESS, IS_PREMIUM } from '../../store/selectors'
import { useSelector, useDispatch } from 'react-redux'
import useQueryKitReceived from '../../utils/hooks/useQueryKitReceived'
import TutorialCarousel from './TutorialCarousel'
import ActivitySlide from '../../components/Skeletons/ActivitySlide'
import useTutorialFinished from '../../utils/hooks/useTutorialFinished'
import { isActivityDone } from '../../utils/helpers'
import useSmokeAlertPopup from '../../utils/hooks/useSmokeAlertPopup'
import useCongratsQuitDayPopup from '../../utils/hooks/useCongratsQuitDayPopUp'
import useFinishProgramPopup from '../../utils/hooks/useFinishProgramPopup'
import useChangeQuitDayIfSmoke from '../../utils/hooks/useChangeQuitDayIfSmoke'
import useDate from '../../utils/hooks/useDate'
import useAppVersion from '../../utils/hooks/useAppVersion'
import { FontAwesome } from '@expo/vector-icons'

type InternalNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, 'DrawerHome'>,
  BottomTabNavigationProp<TabsParamList, 'Home'>
>
export type HomeScreenNavigationProp = CompositeNavigationProp<
  InternalNavigationProp,
  StackNavigationProp<RootStackParamList, 'Home'>
>

const programActivityToCardActivity = (actType?: ProgramActivityType): IconNamesTypes => {
  switch (actType) {
    case '2d-video':
      return 'Video'
    case 'audio':
      return 'Audio'
    case 'vr-met':
      return 'VR'
    case 'reflection':
      return 'Edit'
    default:
      return 'Read'
  }
}

const PopupContentRateApp = ({ close }: { close: () => Promise<void> }) => {
  const rateApp = () => {
    if (Platform.OS === 'ios') {
      const appStoreUrl = 'itms-apps://apps.apple.com/us/app/mindcotine/id1506021271'
      Linking.canOpenURL(appStoreUrl)
        .then(supported => {
          supported && Linking.openURL(appStoreUrl)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      const linkPlayStore = 'https://play.google.com/store/apps/details?id=com.habitfly.mindcotine&hl=es_419'
      Linking.canOpenURL(linkPlayStore)
        .then(supported => {
          supported && Linking.openURL(linkPlayStore)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  return (
    <>
      <Row grow justifyContentOnGrow="flex-start" gutter={20}>
        <Paragraph size="large" weight="bold" textAlign="center">
          {translate('screens.Program.enjoying_program', {
            defaultValue: 'Enjoying the MindCotine program?',
          })}
        </Paragraph>
        <Paragraph size="medium" weight="normal" textAlign="center">
          {translate('screens.Program.completed', {
            defaultValue: 'Your review helps our team to keep getting better.',
          })}
        </Paragraph>
      </Row>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <View key={index}>
            <FontAwesome
              name={'star'}
              size={30}
              color={'gold'}
              style={{ marginHorizontal: 5, alignContent: 'center' }}
            />
          </View>
        ))}
      </View>
      <Row>
        <Button
          onPress={() => {
            rateApp()
            close()
          }}
          round
        >
          {translate('commons.buttons.review_now', {
            defaultValue: 'Review now',
          })}
        </Button>
      </Row>
    </>
  )
}

const HomeScreen = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  // TOOLS
  const theme = useRobTheme()
  const windowsDimension = useWindowDimensions()
  const dispatch = useDispatch()
  const { nextActivity, nextActivityKey, isLastActivity, withoutActKey } = useNextActivity()
  const todayActivityDone = useTodaysActivityDone()
  // const smokeRecord = useSelector(SMOKE_RECORD)
  // const hasSmokeRecords = smokeRecord !== undefined && Object.keys(smokeRecord).length > 0
  // const showBasicTutorial = useSelector(SHOW_BASIC_TUTORIAL)
  const progress = useSelector(PROGRESS)
  const isLastActivityDone = isLastActivity && nextActivityKey && isActivityDone(nextActivityKey, progress)
  // const isPremium = useSelector(IS_PREMIUM)

  // useAppVersion(navigation as StackNavigationProp<RootStackParamList>)
  // useEffect(() => {
  //   if (showBasicTutorial && !hasSmokeRecords) {
  //     if (isPremium) {
  //       dispatch({ type: 'flags/showChatCTAHelper', payload: true })
  //     } else {
  //       dispatch({ type: 'flags/showLifeSaverCTAHelper', payload: true })
  //     }
  //   }
  // }, [showBasicTutorial, hasSmokeRecords, dispatch, isPremium])

  const [showChangeQuitDayIfSmoked, setShowChangeQuitDayIfSmoked] = useState(true)
  const { nextDayIsMyQuitDay, daysSmokedMoreThan1ThisWeek } = useDate()
  useEffect(() => {
    if (nextDayIsMyQuitDay && daysSmokedMoreThan1ThisWeek && showChangeQuitDayIfSmoked) {
      dispatch({ type: 'user/setShowChangeQuitDayIfSmoked', payload: true })
      setShowChangeQuitDayIfSmoked(false)
    }
  }, [nextDayIsMyQuitDay, daysSmokedMoreThan1ThisWeek])

  // HELPERS
  // useQueryKitReceived(navigation as StackNavigationProp<RootStackParamList>)
  // useTutorialFinished(navigation as StackNavigationProp<RootStackParamList>)
  useSmokeAlertPopup(navigation as StackNavigationProp<RootStackParamList>)
  useCongratsQuitDayPopup(navigation as StackNavigationProp<RootStackParamList>)
  useFinishProgramPopup(navigation as StackNavigationProp<RootStackParamList>)
  useChangeQuitDayIfSmoke(navigation as StackNavigationProp<RootStackParamList>)

  const popUpHandler = () => {
    if (progress.length === 5) {
      navigation.navigate('Activity')

      navigation.navigate('BasicModal', {
        content: PopupContentRateApp,
      })
    } else {
      navigation.navigate('Activity')
    }
  }
  // HELPERS
  let activityTypeText = ''
  switch (nextActivity?.type) {
    case '2d-video':
      activityTypeText = translate('screens.Home.activity-2d-video')
      break
    case 'audio':
      activityTypeText = translate('screens.Home.activity-audio')
      break
    case 'reflection':
      activityTypeText = translate('screens.Home.activity-reflection')
      break
    case 'vr-met':
      activityTypeText = translate('screens.Home.activity-vr')
      break
  }

  return (
    <TabbedScreen colors={homeBGColors}>
      <StatusBar
        animated={true}
        // backgroundColor="#61dafb"
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        hidden
      />
      <BackgroundArt
        paddingTop={windowsDimension.height > windowsDimension.width ? 5 : 0}
        paddingBottom={0}
        colors={homeBGColors}
        source={require('../../../assets/images/bg_01.png')}
      />
      {/* top spacer */}
      <Row />
      <Row margin={20}>
        <View style={{ alignItems: 'flex-start' }}>
          <TouchableRipple borderless style={{ borderRadius: 26, padding: 5 }} onPress={() => navigation.openDrawer()}>
            <Icon name="MenuLeft" color="#fcfcfc" size={34} />
          </TouchableRipple>
        </View>
      </Row>

      <Row grow margin={0}>
        {/* {showBasicTutorial && <TutorialCarousel />} */}
        {/* {!showBasicTutorial && ( */}
        {/* <Carousel
          // currentSlide={currentSlide}
          dotConfig={{
            justify: 'flex-end',
          }}
        > */}
        <View style={{ width: '100%', alignItems: 'flex-start', padding: 24 }}>
          {!nextActivity && <ActivitySlide />}
          {nextActivity && !isLastActivityDone && !withoutActKey && (
            <>
              <Row margin={0}>
                <Paragraph light weight="normal" size="large">
                  {todayActivityDone
                    ? translate('screens.Home.program_slide_tomorrowActivity')
                    : translate('screens.Home.program_slide_todayActivity')}
                </Paragraph>
              </Row>
              <Row margin={0}>
                <Billboard textAlign="left" light>
                  {nextActivity?.name}
                </Billboard>
              </Row>
              <Row margin={0}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Icon
                    name={programActivityToCardActivity(nextActivity?.type)}
                    color={theme.colors.onSurface}
                    wrapperStyle={{
                      marginRight: 10,
                    }}
                  />
                  <Paragraph size="medium" light weight="normal">
                    {activityTypeText} {nextActivity?.duration} min
                  </Paragraph>
                </View>
              </Row>
              <Row margin={0}>
                <View style={{ flexDirection: 'row' }}>
                  <Button compact onPress={popUpHandler}>
                    {translate('screens.Home.program_slide_startActivity')}
                  </Button>
                </View>
              </Row>
            </>
          )}

          {nextActivity && !isLastActivityDone && withoutActKey && (
            <>
              {/* <Row margin={0}>
                    <Text light>
                      {translate('screens.home.allCompletedLabel')}
                    </Text>
                  </Row> */}
              <Row margin={0}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Icon
                    name={'Achieve'}
                    color={theme.colors.onSurface}
                    wrapperStyle={{
                      marginRight: 10,
                    }}
                  />
                  <Paragraph size="medium" light weight="normal">
                    {translate('screens.home.allCompletedLabel')}
                  </Paragraph>
                </View>
              </Row>
              <Row margin={0}>
                <Billboard textAlign="left" light>
                  {translate('screens.home.programFinishCircleMessage')}
                </Billboard>
              </Row>

              <Row margin={0}>
                <View style={{ flexDirection: 'row' }}>
                  <Button
                    compact
                    onPress={() => {
                      navigation.navigate('Program')
                    }}
                  >
                    {translate('screens.home.programFinishCTALabel')}
                  </Button>
                </View>
              </Row>
            </>
          )}

          {nextActivity && isLastActivityDone && (
            <>
              <Row margin={0}>
                <Billboard textAlign="left" light>
                  {translate('screens.Home.program_slide_programFinishedTitle')}
                </Billboard>
              </Row>
              <Row margin={0}>
                <Paragraph size="medium" light weight="normal" textAlign="left">
                  {translate('screens.Home.program_slide_programFinishedSubtitle')}
                </Paragraph>
              </Row>
              <Row margin={0}>
                <View style={{ flexDirection: 'row' }}>
                  <Button
                    compact
                    onPress={() => {
                      navigation.navigate('Program')
                    }}
                  >
                    {translate('screens.Home.program_slide_programFinishedButton')}
                  </Button>
                </View>
              </Row>
            </>
          )}
        </View>

        {/* {(quit_day === undefined || !quit_day) && (
              <View style={{ width: '100%', alignItems: 'flex-start', padding: 24 }}>
                <Row margin={0}>
                  <Icon name="Calendar" size={60} color={theme.colors.monochrome.offWhite} strokeWidth={1} />
                </Row>
                <TouchableRipple rippleColor="transparent">
                  <>
                    <Row margin={0}>
                      <Billboard textAlign="left" light>
                        {translate('screens.Home.qd_slide_title', {
                          defaultValue: 'Reinforce your commitment',
                        })}
                      </Billboard>
                    </Row>
                    <Row margin={0}>
                      <View style={{ flexDirection: 'row' }}>
                        <Button light compact role="secondary" onPress={() => navigation.navigate('QuitDayModal')}>
                          {translate('screens.Home.qd_slide_subTitle', { defaultValue: 'Set your Quit Day' })}
                        </Button>
                      </View>
                    </Row>
                  </>
                </TouchableRipple>
              </View>
            )} */}

        {/* <View style={{ width: '100%', alignItems: 'flex-start', padding: 24 }}>
            <Row margin={0}>
              <Icon name="Paste" size={60} color={theme.colors.monochrome.offWhite} strokeWidth={1} />
            </Row>
            <TouchableRipple rippleColor="transparent">
              <>
                <Row margin={0}>
                  <Billboard textAlign="left" light>
                    {translate('screens.Home.progress_slide_title', {
                      defaultValue: 'Check your progress and savings',
                    })}
                  </Billboard>
                </Row>
                <Row margin={0}>
                  <View style={{ flexDirection: 'row' }}>
                    <Button light compact role="secondary" onPress={() => navigation.navigate('Program')}>
                      {translate('screens.Home.progress_slide_subTitle', { defaultValue: 'Visit your Overview' })}
                    </Button>
                  </View>
                </Row>
              </>
            </TouchableRipple>
          </View> */}

        {/* <View style={{ width: '100%', alignItems: 'flex-start', padding: 24 }}>
            <Row margin={0}>
              <Icon name="Plus" size={60} color={theme.colors.monochrome.offWhite} strokeWidth={1} />
            </Row>
            <TouchableRipple rippleColor="transparent">
              <>
                <Row margin={0}>
                  <Billboard textAlign="left" light>
                    {translate('screens.Home.journal_slide_title', {
                      defaultValue: "Don't forget to log your daily smoking",
                    })}
                  </Billboard>
                </Row>
                <Row margin={0}>
                  <View style={{ flexDirection: 'row' }}>
                    <Button light compact role="secondary" onPress={() => navigation.navigate('SmokeModal')}>
                      {translate('screens.Home.journal_slide_Subtitle', { defaultValue: 'Open your smoke journal' })}
                    </Button>
                  </View>
                </Row>
              </>
            </TouchableRipple>
          </View> */}

        {/* <View style={{ width: '100%', alignItems: 'flex-start', padding: 24 }}>
            <Row margin={0}>
              <Icon name="Help" size={60} color={theme.colors.monochrome.offWhite} strokeWidth={1} />
            </Row>
            <TouchableRipple rippleColor="transparent">
              <>
                <Row margin={0}>
                  <Billboard textAlign="left" light>
                    {translate('screens.Home.vc_slide_title', { defaultValue: 'Manage the urge' })}
                  </Billboard>
                </Row>
                <Row margin={0}>
                  <View style={{ flexDirection: 'row' }}>
                    <Button light compact role="secondary" onPress={() => navigation.navigate('Lifesaver')}>
                      {translate('screens.Home.vc_slide_Subtitle', { defaultValue: 'Visit the Virtual Coach' })}
                    </Button>
                  </View>
                </Row>
              </>
            </TouchableRipple>
          </View> */}
        {/* </Carousel> */}
        {/* )} */}
      </Row>
    </TabbedScreen>
  )
}

export default HomeScreen
