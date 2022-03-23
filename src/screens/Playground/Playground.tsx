/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react'
import { LayoutRectangle, ScrollView, View, Text as NativeText } from 'react-native'
import {
  LifesaverActivityBase,
  LifesaverAudioType,
  LifesaverDoType,
  LifesaverReadType,
} from '../../utils/lifesaverActivities'
import {
  BasicScreen as Screen,
  Row,
  Headline,
  Paragraph,
  useRobTheme,
  Card,
  ListSelect,
  ActionButton,
} from '@mindcoxr/rob'
import NoContent from './NoContent'
import { translate } from '../../utils/localization'
import HeaderPadding from '../../utils/HeaderPadding'
export type PropType = {
  audios: LifesaverAudioType[]
  readings: LifesaverReadType[]
  activities: LifesaverDoType[]
  onPress: (asset: LifesaverActivityBase) => void
}

const Playground = ({ audios, readings, activities, onPress }: PropType) => {
  const theme = useRobTheme()

  return (
    <Screen>
      <HeaderPadding />
      <Row gutter={20}>
        <Headline size="huge" weight="bold" textAlign="center">
          {translate('screens.Playground.headline')}
        </Headline>
        <Paragraph textAlign="center" size="small">
          {translate('screens.Playground.description')}
        </Paragraph>
        <View style={{ height: 0 }} />
      </Row>

      <Row margin={0} gutter={15}>
        <View style={{ marginHorizontal: theme.spaces.sidesMargin }}>
          <Headline size="small" weight="bold" textAlign="left">
            {translate('screens.Playground.audio-title')}
          </Headline>
        </View>
        {audios.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View style={{ width: theme.spaces.sidesMargin }} />

            {audios.map(aud => (
              <View
                key={aud.id + aud.source}
                style={{
                  marginRight: 16,
                  maxWidth: 250,
                  minWidth: 200,
                  height: 400,
                }}
              >
                <Card
                  onPress={() => onPress(aud)}
                  small
                  title={aud.title ?? 'No title'}
                  image={{
                    uri: 'https://news.harvard.edu/wp-content/uploads/2018/02/mindful-science_2500-1600x900.jpg',
                  }}
                  actions={[<ActionButton key={aud.id + aud.source + '_audio'} icon="Audio" label="" />]}
                />
              </View>
            ))}
          </ScrollView>
        ) : (
          <NoContent />
        )}
      </Row>

      <Row margin={0} gutter={15}>
        <View style={{ marginHorizontal: theme.spaces.sidesMargin }}>
          <Headline size="small" weight="bold" textAlign="left">
            {translate('screens.Playground.readings-title')}
          </Headline>
        </View>
        {readings.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View style={{ width: theme.spaces.sidesMargin }} />
            {readings.map(read => (
              <View
                key={read.id + read.title}
                style={{
                  marginRight: 16,
                  maxWidth: 250,
                  minWidth: 200,
                }}
              >
                <Card
                  onPress={() => onPress(read)}
                  small
                  title={read.title ?? 'No title'}
                  image={{
                    uri: 'https://news.harvard.edu/wp-content/uploads/2018/02/mindful-science_2500-1600x900.jpg',
                  }}
                  actions={[<ActionButton key={read.id} icon="Read" label="" />]}
                />
              </View>
            ))}
          </ScrollView>
        ) : (
          <NoContent />
        )}
      </Row>

      <Row margin={0} gutter={15}>
        <View style={{ marginHorizontal: theme.spaces.sidesMargin }}>
          <Headline size="small" weight="bold" textAlign="left">
            {translate('screens.Playground.doable-title')}
          </Headline>
        </View>
        {activities.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View style={{ width: theme.spaces.sidesMargin }} />
            {activities.map(act => (
              <View
                key={act.id + act.title}
                style={{
                  marginRight: 16,
                  maxWidth: 250,
                  minWidth: 200,
                }}
              >
                <Card
                  onPress={() => onPress(act)}
                  small
                  title={act.title ?? 'No title'}
                  image={{
                    uri: 'https://news.harvard.edu/wp-content/uploads/2018/02/mindful-science_2500-1600x900.jpg',
                  }}
                  actions={[<ActionButton key={act.id} icon="Gym" label="" />]}
                />
              </View>
            ))}
          </ScrollView>
        ) : (
          <NoContent />
        )}
        <View style={{ height: 30 }} />
      </Row>
    </Screen>
  )
}

export default Playground
