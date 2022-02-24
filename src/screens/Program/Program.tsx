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
  vr: { activity: ProgramActivity; done: boolean }[]
  video: { activity: ProgramActivity; done: boolean }[]
  audio: { activity: ProgramActivity; done: boolean }[]
}
const ProgramScreen = ({ vr, video, audio }: ScreenProps) => {
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
          colors={['#5fccfb', '#003247']}
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
                <NativeText style={{ color: theme.colors.monochrome.offBlack }}>Smoked this week</NativeText>
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
                Log
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
                Progress
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
                Achieve
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
            data-tabName="VR"
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
            {vr.map((act, index) => (
              <View key={act.activity.id} style={{ marginVertical: 10, opacity: act.done ? 1 : 0.3 }}>
                <Card
                  onFavPress={() => console.log('Fav pressed')}
                  onPress={() => console.log('Pressed')}
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
            data-tabName="Video"
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
            {video.map((act, index) => (
              <View key={act.activity.id} style={{ marginVertical: 10, opacity: act.done ? 1 : 0.7 }}>
                <Card
                  onFavPress={() => console.log('Fav pressed')}
                  onPress={() => console.log('Pressed')}
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
            data-tabName="Audio"
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
            {audio.map((act, index) => (
              <View key={act.activity.id} style={{ marginVertical: 10, opacity: act.done ? 1 : 0.7 }}>
                <Card
                  onFavPress={() => console.log('Fav pressed')}
                  onPress={() => console.log('Pressed')}
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
