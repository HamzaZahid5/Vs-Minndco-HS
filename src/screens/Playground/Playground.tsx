/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react'
import { LayoutRectangle, ScrollView, View, Text as NativeText, Image } from 'react-native'
import {
  fromActivityIdToDictionaryEntry,
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
const newImage = require('../../../assets/images/new.png')

export type PropType = {
  audios: LifesaverAudioType[]
  readings: LifesaverReadType[]
  activities: LifesaverDoType[]
  onPress: (asset: LifesaverActivityBase) => void
}

const Playground = ({ audios, readings, activities, onPress }: PropType) => {
  const theme = useRobTheme()
  return (
    <View style={{ backgroundColor: '#eff0f7', flex: 1 }}>
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
                    icon="SoundPlaying"
                    actions={[
                      <ActionButton
                        key={aud.id + aud.source + '_audio'}
                        icon="Audio"
                        label={translate('commons.activities.audio-label')}
                      />,
                      <ActionButton key={aud.id + aud.source + '_duration'} icon="Clock" label="2 min" />,
                      // aud.new ?  : <></>,
                    ]}
                  />
                  {aud.new && (
                    <Image source={newImage} style={{ position: 'absolute', width: 50, height: 50, left: 5, top: 5 }} />
                  )}
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
                    image={require('../../../assets/images/bg_act_03.png')}
                    actions={[
                      <ActionButton key={read.id} icon="Read" label={translate('commons.activities.reading-label')} />,
                      <ActionButton key={`${read.id}_duration`} icon="Clock" label="2 min" />,
                    ]}
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
                    title={translate(`contents.${fromActivityIdToDictionaryEntry(act.id)}.screen_title`) ?? 'No title'}
                    image={require('../../../assets/images/bg_act_02.png')}
                    actions={[
                      <ActionButton
                        key={act.id}
                        icon="Gym"
                        label={translate('commons.activities.interactive-label')}
                      />,
                    ]}
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
    </View>
  )
}

export default Playground
