/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react'
import { LayoutRectangle, ScrollView, View, Text as NativeText, Platform } from 'react-native'

import { useWindowDimensions } from 'react-native'
import { useLayoutEffect } from 'react'
import {
  BasicScreen as Screen,
  Row,
  Input as TextInput,
  Headline,
  Paragraph,
  Button,
  Text,
  Link,
  Checkbox,
  Snackbar,
  useRobTheme,
  Card,
  BackgroundArt,
  Icon,
  Tabs,
} from '@mindcoxr/rob'
import { ProgramActivity, ProgramActivityType } from '../../../types'
import { activityTypeType as cardActivityType } from '@mindcoxr/rob/dist/typescript/components/Card'
import { homeBGColors } from '../../utils/config'
import { translate } from '../../utils/localization'

const programActivityToCardActivity = (actType: ProgramActivityType): cardActivityType => {
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

type ScreenProps = {
  tab1: { activity: ProgramActivity; done: boolean }[]
  tab2: { activity: ProgramActivity; done: boolean }[]
  tab3: { activity: ProgramActivity; done: boolean }[]
  onPressActivity: (id: string) => void
}
const ProgramScreen = ({ tab1, tab2, tab3, onPressActivity }: ScreenProps) => {
  const windowsDimension = useWindowDimensions()
  const [headerHeight, setheaderHeight] = useState(0)
  const theme = useRobTheme()
  const scrollViewRef = useRef<ScrollView>(null)
  const tabHeaderSize = Platform.OS === 'ios' ? 80 : 70
  const [internalScrollEnabled, setInternalScrollEnabled] = useState(false)

  useLayoutEffect(() => {
    setheaderHeight(0.55 * windowsDimension.height)
  }, [windowsDimension])
  return (
    <ScrollView
      onScroll={e => {
        if (e.nativeEvent.contentOffset.y > 0.55 * windowsDimension.height - 10) {
          setInternalScrollEnabled(true)
        } else {
          setInternalScrollEnabled(false)
        }
      }}
      bounces={false}
      ref={scrollViewRef}
      scrollEventThrottle={50}
      scrollEnabled={true}
      snapToStart
      snapToEnd={false}
      snapToOffsets={[0.55 * windowsDimension.height]}
      onMomentumScrollEnd={e => {
        if (e.nativeEvent.contentOffset.y > 0.55 * windowsDimension.height - 10) {
          setInternalScrollEnabled(true)
        } else {
          setInternalScrollEnabled(false)
        }
      }}
      decelerationRate="fast"
    >
      <View
        style={{
          width: '100%',
          height: headerHeight,
        }}
      >
        <BackgroundArt
          paddingTop="40%"
          paddingBottom="0%"
          colors={homeBGColors}
          source={require('../../../assets/images/bg_01.png')}
        />
        <View style={{ alignItems: 'flex-end', marginRight: 54, marginTop: 30 }}>
          <View style={{ alignItems: 'flex-end' }}>
            <Icon name="Money" color={theme.colors.monochrome.offBlack} />
            <Paragraph size="small" weight="bold">
              <NativeText style={{ color: theme.colors.monochrome.offWhite }}>$135</NativeText>
            </Paragraph>
          </View>
        </View>
        <View style={{ alignItems: 'center', marginTop: 5 }}>
          <View style={{ alignItems: 'center' }}>
            <NativeText
              style={{
                color: theme.colors.monochrome.offBlack,
                fontStyle: 'normal',
                fontSize: 100,
                letterSpacing: 1,
                fontFamily: 'Poppins_700Bold',
                fontWeight: '700',
              }}
            >
              14
            </NativeText>
            <View style={{ marginTop: -20 }}>
              <Paragraph size="large" weight="normal">
                <NativeText style={{ color: theme.colors.monochrome.offBlack }}>
                  {translate('screens.Program.headerSubtitle')}
                </NativeText>
              </Paragraph>
            </View>
          </View>
        </View>
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
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Icon name="Cigarette" color={theme.colors.monochrome.offWhite} />
              <NativeText
                style={{
                  color: theme.colors.monochrome.offWhite,
                  fontStyle: 'normal',
                  fontSize: 17,
                  letterSpacing: 0.75,
                  fontFamily: 'Poppins_700Bold',
                  fontWeight: '700',
                }}
              >
                {translate('screens.Program.log')}
              </NativeText>
              <NativeText
                style={{
                  color: '#a6f787',
                  fontStyle: 'normal',
                  fontSize: 17,
                  letterSpacing: 0.75,
                  fontFamily: 'Poppins_700Bold',
                  fontWeight: '700',
                }}
              >
                Great
              </NativeText>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Icon name="Calendar" color={theme.colors.monochrome.offWhite} />
              <NativeText
                style={{
                  color: theme.colors.monochrome.offWhite,
                  fontStyle: 'normal',
                  fontSize: 17,
                  letterSpacing: 0.75,
                  fontFamily: 'Poppins_700Bold',
                  fontWeight: '700',
                }}
              >
                {translate('screens.Program.progress')}
              </NativeText>
              <NativeText
                style={{
                  color: '#ffdf9a',
                  fontStyle: 'normal',
                  fontSize: 17,
                  letterSpacing: 0.75,
                  fontFamily: 'Poppins_700Bold',
                  fontWeight: '700',
                }}
              >
                Fine
              </NativeText>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Icon name="Achieve" color={theme.colors.monochrome.offWhite} />
              <NativeText
                style={{
                  color: theme.colors.monochrome.offWhite,
                  fontStyle: 'normal',
                  fontSize: 17,
                  letterSpacing: 0.75,
                  fontFamily: 'Poppins_700Bold',
                  fontWeight: '700',
                }}
              >
                {translate('screens.Program.achieve')}
              </NativeText>
              <NativeText
                style={{
                  color: '#a6f787',
                  fontStyle: 'normal',
                  fontSize: 17,
                  letterSpacing: 0.75,
                  fontFamily: 'Poppins_700Bold',
                  fontWeight: '700',
                }}
              >
                3/10
              </NativeText>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{ backgroundColor: '#f7f7fc', paddingTop: 15, height: windowsDimension.height - tabHeaderSize + 10 }}
      >
        <Tabs>
          <ScrollView
            data-tabName={translate('screens.Program.category1')}
            scrollEnabled={internalScrollEnabled}
            nestedScrollEnabled
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingVertical: 25,
              paddingHorizontal: 20,
              paddingBottom: 50,
            }}
          >
            {tab1.map((act, index) => (
              <View key={act.activity.id} style={{ marginVertical: 10, opacity: act.done ? 1 : 0.3 }}>
                <Card
                  onFavPress={() => console.log('Fav pressed')}
                  onPress={act.done ? () => onPressActivity(act.activity.id) : undefined}
                  activityType={programActivityToCardActivity(act.activity.type)}
                  title={act.activity.name}
                  description={act.activity.description}
                  duration={act.activity.duration + ' min'}
                  fav={false}
                  imageUri="https://news.harvard.edu/wp-content/uploads/2018/02/mindful-science_2500-1600x900.jpg"
                />
              </View>
            ))}
          </ScrollView>
          <ScrollView
            data-tabName={translate('screens.Program.category2')}
            nestedScrollEnabled
            scrollEnabled={internalScrollEnabled}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingVertical: 25,
              paddingHorizontal: 20,
              paddingBottom: 50,
            }}
          >
            {tab2.map((act, index) => (
              <View key={act.activity.id} style={{ marginVertical: 10, opacity: act.done ? 1 : 0.3 }}>
                <Card
                  onFavPress={() => console.log('Fav pressed')}
                  onPress={act.done ? () => onPressActivity(act.activity.id) : undefined}
                  activityType={programActivityToCardActivity(act.activity.type)}
                  title={act.activity.name}
                  description={act.activity.description}
                  duration={act.activity.duration + ' min'}
                  fav={false}
                  imageUri="https://news.harvard.edu/wp-content/uploads/2018/02/mindful-science_2500-1600x900.jpg"
                />
              </View>
            ))}
          </ScrollView>
          <ScrollView
            data-tabName={translate('screens.Program.category3')}
            nestedScrollEnabled
            scrollEnabled={internalScrollEnabled}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingVertical: 25,
              paddingHorizontal: 20,
              paddingBottom: 50,
            }}
          >
            {tab3.map((act, index) => (
              <View key={act.activity.id} style={{ marginVertical: 10, opacity: act.done ? 1 : 0.3 }}>
                <Card
                  onFavPress={() => console.log('Fav pressed')}
                  onPress={act.done ? () => onPressActivity(act.activity.id) : undefined}
                  activityType={programActivityToCardActivity(act.activity.type)}
                  title={act.activity.name}
                  description={act.activity.description}
                  duration={act.activity.duration + ' min'}
                  fav={false}
                  imageUri="https://news.harvard.edu/wp-content/uploads/2018/02/mindful-science_2500-1600x900.jpg"
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
