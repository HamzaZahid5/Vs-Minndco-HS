/* eslint-disable no-console */
import React, { ReactComponentElement, useEffect, useRef, useState } from 'react'
import {
  ScrollView,
  View,
  Text as NativeText,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
  Button,
} from 'react-native'
import {
  Row,
  Headline,
  Paragraph,
  Text,
  useRobTheme,
  Card,
  BackgroundArt,
  Icon,
  Tabs,
  ActionButton,
  Subheading,
} from '@mindcoxr/rob'
import { ProgramActivity, ProgramActivityType, RootStackParamList } from '../../../types'
import { homeBGColors } from '../../utils/config'
import { translate } from '../../utils/localization'
import { IconNamesTypes } from '@mindcoxr/rob/dist/typescript/components/Icon'
import { tabHeight } from '../TabsNavigator'
import { TouchableRipple } from 'react-native-paper'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { USER_SUPPORT_PROFILE } from '../../store/selectors'
import { useSelector } from 'react-redux'

const programActivityToIcon = (actType: ProgramActivityType): IconNamesTypes => {
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

const programActivityToBGImage = (actType: ProgramActivityType): ImageBitmap => {
  switch (actType) {
    case '2d-video':
      return require('../../../assets/images/bg_act_03.png')
    case 'vr-met':
      return require('../../../assets/images/bg_act_01.png')
    case 'reflection':
      return require('../../../assets/images/bg_act_02.png')
    default:
      return require('../../../assets/images/bg_act_01.png')
  }
}

const programActivityToLabel = (actType: ProgramActivityType): string => {
  switch (actType) {
    case '2d-video':
      return translate('commons.activities.video-label')
    case 'audio':
      return translate('commons.activities.audio-label')
    case 'vr-met':
      return translate('commons.activities.vr-label')
    case 'reflection':
      return translate('commons.activities.reflection-label')
    default:
      return translate('commons.activities.reading-label')
  }
}

const programActivityToCardActivity = (actType: ProgramActivityType): string => {
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

export type HeroIconType = {
  icon: IconNamesTypes
  label: string
  value: string
  valueColor: string
  onPress?: () => void
}

type ScreenProps = {
  tab1: { activity: ProgramActivity; done: boolean }[]
  tab2: { activity: ProgramActivity; done: boolean }[]
  tab3: { activity: ProgramActivity; done: boolean }[]
  onPressActivity: (id: string) => void
  heroCenterComponent: ReactComponentElement<any>
  heroBottomActions: HeroIconType[]
}

const ProgramScreen = ({ tab1, tab2, tab3, onPressActivity, heroCenterComponent, heroBottomActions }: ScreenProps) => {
  const windowsDimension = useWindowDimensions()
  const theme = useRobTheme()
  const userData = useSelector(USER_SUPPORT_PROFILE)
  const scrollViewRef = useRef<ScrollView>(null)
  const [viewAllContent, setViewAllContent] = useState<boolean | null>(null)
  const [internalScrollEnabled, setInternalScrollEnabled] = useState(false)
  const heroHeight = 450
  const internalHandlerMargin = 50
  const [tabsHeaderSize, setTabsHeaderSize] = useState(0)
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const internalScrollHandler = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y >= internalHandlerMargin) {
      setInternalScrollEnabled(true)
    } else {
      setInternalScrollEnabled(false)
    }
  }

  useEffect(() => {
    setViewAllContent(userData.view_all_content)
  }, [userData.view_all_content])

  const internalScrollHandlerInternalScrollview = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y > 0) {
      setInternalScrollEnabled(true)
    } else if (e.nativeEvent.contentOffset.y < 0) {
      setInternalScrollEnabled(false)
    }
  }

  const PopupContent = () => (
    <>
      <Row gutter={10}>
        <Subheading>{translate('screens.Program.woops', { defaultValue: 'Woops!' })}</Subheading>
      </Row>
      <Row grow justifyContentOnGrow="flex-start" gutter={10}>
        <Paragraph size="medium" weight="normal" textAlign="center">
          {translate('screens.Program.unlockContent', {
            defaultValue: 'To unlock content in your library, complete todays training activity.',
          })}
        </Paragraph>
      </Row>
      <Row grow justifyContentOnGrow="flex-start" gutter={10}>
        <Paragraph size="xsmall" weight="normal" textAlign="center">
          {translate('screens.Program.todaysActivity', {
            defaultValue: 'To access todays activity, tap the activity icon.',
          })}
        </Paragraph>
      </Row>
    </>
  )

  return (
    <ScrollView
      onScroll={internalScrollHandler}
      bounces={false}
      ref={scrollViewRef}
      scrollEventThrottle={50}
      scrollEnabled={true}
      snapToStart
      snapToEnd={false}
      snapToOffsets={[heroHeight]}
      onMomentumScrollEnd={internalScrollHandler}
      showsVerticalScrollIndicator={!internalScrollEnabled}
      decelerationRate="fast"
    >
      <View
        style={{
          width: '100%',
          height: heroHeight,
        }}
      >
        <BackgroundArt
          paddingTop={windowsDimension.height > windowsDimension.width ? '40%' : 0}
          paddingBottom="0%"
          colors={homeBGColors}
          source={require('../../../assets/images/bg_01.png')}
        />
        <Row grow>{heroCenterComponent}</Row>
        <View style={{ alignItems: 'stretch', justifyContent: 'flex-end', flexGrow: 1 }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginBottom: 25,
            }}
          >
            {heroBottomActions.map(item => (
              <TouchableRipple onPress={item.onPress} key={item.label} style={{ alignItems: 'center', flex: 1 }}>
                <>
                  <Icon name={item.icon} color={theme.colors.monochrome.offWhite} />
                  <NativeText
                    style={{
                      color: theme.colors.monochrome.offWhite,
                      fontStyle: 'normal',
                      ...theme.fontSizes.exeptions.program,
                      fontFamily: 'Poppins_700Bold',
                      fontWeight: '700',
                    }}
                  >
                    {item.label}
                  </NativeText>
                  <NativeText
                    style={{
                      color: item.valueColor,
                      fontStyle: 'normal',
                      ...theme.fontSizes.exeptions.program,
                      fontFamily: 'Poppins_700Bold',
                      fontWeight: '700',
                    }}
                  >
                    {item.value}
                  </NativeText>
                </>
              </TouchableRipple>
            ))}
          </View>
        </View>
      </View>
      <View
        style={{ backgroundColor: '#f7f7fc', paddingTop: 15 }}
        onLayout={e => setTabsHeaderSize(e.nativeEvent.layout.height)}
      >
        <Row>
          <Headline size="small" weight="bold" textAlign="left">
            {translate('screens.Program.replay_title', { defaultValue: 'Want to replay an activity?' })}
          </Headline>
          <Paragraph size="small" textAlign="left" weight="normal">
            <Text>
              {translate('screens.Program.replay_description', {
                defaultValue: 'Chose from the list below any activity you have already done',
              })}
            </Text>
          </Paragraph>
        </Row>
      </View>
      <View
        style={{
          backgroundColor: '#f7f7fc',
          height: windowsDimension.height - tabsHeaderSize - tabHeight,
        }}
      >
        <Tabs>
          <ScrollView
            data-tabName={translate('screens.Program.category1')}
            scrollEnabled={internalScrollEnabled}
            onMomentumScrollEnd={internalScrollHandlerInternalScrollview}
            nestedScrollEnabled
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingVertical: 25,
              paddingHorizontal: 20,
              paddingBottom: 50,
            }}
          >
            {tab1.map(act => (
              <View key={act.activity.id} style={{ marginVertical: 10, opacity: viewAllContent || act.done ? 1 : 0.3 }}>
                <Card
                  onPress={
                    viewAllContent || act.done
                      ? () => onPressActivity(act.activity.id)
                      : () =>
                          navigation.navigate('BasicModal', {
                            content: PopupContent,
                          })
                  }
                  actions={[
                    <ActionButton
                      key={'tab1_type' + act.activity.id}
                      icon={programActivityToIcon(act.activity.type)}
                      label={programActivityToLabel(act.activity.type)}
                    />,
                    <ActionButton
                      key={'tab1_duration' + act.activity.id}
                      icon="Clock"
                      label={act.activity.duration + ' min'}
                    />,
                  ]}
                  title={act.activity.name}
                  description={act.activity.description}
                  image={act.activity.type !== 'audio' ? programActivityToBGImage(act.activity.type) : undefined}
                  icon={act.activity.type === 'audio' ? 'SoundPlaying' : undefined}
                />
              </View>
            ))}
          </ScrollView>
          <ScrollView
            data-tabName={translate('screens.Program.category2')}
            nestedScrollEnabled
            scrollEnabled={internalScrollEnabled}
            onMomentumScrollEnd={internalScrollHandlerInternalScrollview}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingVertical: 25,
              paddingHorizontal: 20,
              paddingBottom: 50,
            }}
          >
            {tab2.map(act => (
              <View key={act.activity.id} style={{ marginVertical: 10, opacity: viewAllContent || act.done ? 1 : 0.3 }}>
                <Card
                  onPress={
                    viewAllContent || act.done
                      ? () => onPressActivity(act.activity.id)
                      : () => {
                          navigation.navigate('BasicModal', {
                            content: PopupContent,
                          })
                        }
                  }
                  actions={[
                    <ActionButton
                      key={'tab2_type' + act.activity.id}
                      icon={programActivityToIcon(act.activity.type)}
                      label={programActivityToLabel(act.activity.type)}
                    />,
                    <ActionButton
                      key={'tab2_duration' + act.activity.id}
                      icon="Clock"
                      label={act.activity.duration + ' min'}
                    />,
                  ]}
                  title={act.activity.name}
                  description={act.activity.description}
                  image={act.activity.type !== 'audio' ? programActivityToBGImage(act.activity.type) : undefined}
                  icon={act.activity.type === 'audio' ? 'SoundPlaying' : undefined}
                />
              </View>
            ))}
          </ScrollView>
          <ScrollView
            data-tabName={translate('screens.Program.category3')}
            nestedScrollEnabled
            scrollEnabled={internalScrollEnabled}
            onMomentumScrollEnd={internalScrollHandlerInternalScrollview}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingVertical: 25,
              paddingHorizontal: 20,
              paddingBottom: 50,
            }}
          >
            {tab3.map(act => (
              <View key={act.activity.id} style={{ marginVertical: 10, opacity: viewAllContent || act.done ? 1 : 0.3 }}>
                <Card
                  onPress={
                    viewAllContent || act.done
                      ? () => onPressActivity(act.activity.id)
                      : () => {
                          navigation.navigate('BasicModal', {
                            content: PopupContent,
                          })
                        }
                  }
                  actions={[
                    <ActionButton
                      key={'tab3_type' + act.activity.id}
                      icon={programActivityToIcon(act.activity.type)}
                      label={programActivityToLabel(act.activity.type)}
                    />,
                    <ActionButton
                      key={'tab3_reflection' + act.activity.id}
                      icon="Clock"
                      label={act.activity.duration + ' min'}
                    />,
                  ]}
                  title={act.activity.name}
                  description={act.activity.description}
                  image={act.activity.type !== 'audio' ? programActivityToBGImage(act.activity.type) : undefined}
                  icon={act.activity.type === 'audio' ? 'SoundPlaying' : undefined}
                />
              </View>
            ))}
          </ScrollView>
        </Tabs>
      </View>
    </ScrollView>
  )
}

export default ProgramScreen
