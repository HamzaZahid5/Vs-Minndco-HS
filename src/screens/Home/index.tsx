import React, { useEffect, useState } from 'react'
import { View, StatusBar } from 'react-native'
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
} from '@mindcoxr/rob'
import { homeBGColors } from '../../utils/config'
import { DefaultScreenPropType, ProgramActivityType, RootStackParamList } from '../../../types'
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

type InternalNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, 'DrawerHome'>,
  BottomTabNavigationProp<TabsParamList, 'Home'>
>
type HomeScreenNavigationProp = CompositeNavigationProp<
  InternalNavigationProp,
  StackNavigationProp<RootStackParamList, 'Home'>
>

const programActivityToCardActivity = (actType: ProgramActivityType): IconNamesTypes => {
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

const HomeScreen = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  const theme = useRobTheme()
  const { nextActivity, isLastActivity } = useNextActivity()
  const todayActivityDone = useTodaysActivityDone()
  const [currentSlide, setCurrentSlide] = useState(1)
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
  useEffect(() => {
    if (isLastActivity === false && todayActivityDone === false) [setCurrentSlide(0)]
  }, [isLastActivity, todayActivityDone])
  return (
    <TabbedScreen colors={homeBGColors}>
      <StatusBar
        animated={true}
        // backgroundColor="#61dafb"
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        hidden
      />
      <BackgroundArt paddingTop={5} colors={homeBGColors} source={require('../../../assets/images/bg_01.png')} />
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
        <Carousel
          currentSlide={currentSlide}
          dotConfig={{
            justify: 'flex-end',
          }}
        >
          <View style={{ width: '100%', alignItems: 'flex-start', padding: 24 }}>
            {nextActivity !== undefined && isLastActivity === false && (
              <>
                <Row margin={0}>
                  <Text light>
                    {todayActivityDone
                      ? translate('screens.Home.tomorrowActivity')
                      : translate('screens.Home.todayActivity')}
                  </Text>
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
                    <Button
                      compact
                      onPress={() => {
                        navigation.navigate('Activity')
                      }}
                    >
                      {translate('screens.Home.startActivity')}
                    </Button>
                  </View>
                </Row>
              </>
            )}
            {isLastActivity === true && (
              <>
                <Row margin={0}>
                  <Billboard textAlign="left" light>
                    {translate('screens.Home.programFinishedTitle')}
                  </Billboard>
                </Row>
                <Row margin={0}>
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Paragraph size="medium" light weight="normal">
                      {translate('screens.Home.programFinishedSubtitle')}
                    </Paragraph>
                  </View>
                </Row>
                <Row margin={0}>
                  <View style={{ flexDirection: 'row' }}>
                    <Button
                      compact
                      onPress={() => {
                        navigation.navigate('Program')
                      }}
                    >
                      {translate('screens.Home.programFinishedButton')}
                    </Button>
                  </View>
                </Row>
              </>
            )}
          </View>

          <View style={{ width: '100%', alignItems: 'flex-start', padding: 24 }}>
            <Row margin={0}>
              <Icon name="Paste" size={60} color={theme.colors.monochrome.offWhite} strokeWidth={1} />
            </Row>
            <TouchableRipple onPress={() => alert('go!')} rippleColor="transparent">
              <>
                <Row margin={0}>
                  <Billboard textAlign="left" light>
                    {translate('screens.Home.slide2Title')}
                  </Billboard>
                </Row>
                <Row margin={0}>
                  <Paragraph size="medium" light weight="normal" textAlign="left">
                    {translate('screens.Home.slide2Subtitle')}
                  </Paragraph>
                </Row>
              </>
            </TouchableRipple>
          </View>
        </Carousel>
      </Row>
    </TabbedScreen>
  )
}

export default HomeScreen
