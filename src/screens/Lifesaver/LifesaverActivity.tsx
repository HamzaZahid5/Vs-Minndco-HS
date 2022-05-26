import React, { useEffect, useState } from 'react'
import { DefaultScreenPropType, DefaultScreenRouteType } from '../../../types'
import { View } from 'react-native'
import AudioScreen from '../ActivityScreen/AudioActivity'
import ReadScreen from '../ActivityScreen/Read'
import {
  fromActivityIdToDictionaryEntry,
  LifesaverAudioType,
  LifesaverDoType,
  LifesaverReadType,
} from '../../utils/lifesaverActivities'
import saveLifesaverActivityDone from './actions'
import { useRobTheme, BasicScreen as Screen, PopupWrapper, Row, Subheading, Paragraph, Button } from '@mindcoxr/rob'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { translate } from '../../utils/localization'
import { useSetHeaderProps } from '../../components/NavigationHeader'
import HeaderPadding from '../../utils/HeaderPadding'

const ActivityScreen = ({
  navigation,
  route,
}: DefaultScreenPropType<'LifesaverActivity'> & DefaultScreenRouteType<'LifesaverActivity'>) => {
  const [activityScreen, setActivityScreen] = useState<React.ReactElement | undefined>(undefined)
  const theme = useRobTheme()
  const dictionaryEntry = fromActivityIdToDictionaryEntry(route.params.activity.id)
  const insets = useSafeAreaInsets()
  const [showTips, setShowTips] = useState(false)
  const headerProps =
    route.params.activity.type !== 'activity'
      ? undefined
      : {
          contentAtBottom: true,
          color: '#14142b',
          backgroundColor: theme.colors.monochrome.input,
          routeName: translate(`contents.${dictionaryEntry}.screen_title`),
          height: 100,
          opacity: showTips ? 0 : 1,
          rightActions: [
            {
              icon: 'QuestionMark' as const,
              action: () => setShowTips(true),
            },
          ],
        }

  useSetHeaderProps(headerProps, [showTips])

  const saveLifesaverInteraction = () => {
    saveLifesaverActivityDone(route.params.activity, route.params.urge, route.params.place, route.params.company)
    navigation.popToTop()
  }
  useEffect(() => {
    if (route.params.activity.type) {
      switch (route.params.activity.type) {
        case 'audio':
          const audParams = route.params.activity as LifesaverAudioType
          setActivityScreen(
            <AudioScreen
              audioSrc={audParams.source}
              backImage={require('../../../assets/images/bg_act_05.jpeg')}
              onDonePressed={saveLifesaverInteraction}
              onPlayPressed={() => {
                return
              }}
              title={route.params.activity.title || ''}
              description=""
              duration=""
            />,
          )
          break
        case 'text':
          const textParams = route.params.activity as LifesaverReadType
          setActivityScreen(
            <ReadScreen
              title={textParams.title || ''}
              readPages={textParams.pages}
              backImage="https://marylineg1.sg-host.com/blog/wp-content/uploads/2018/12/matterhorn-1313x875.jpg"
              onDonePressed={saveLifesaverInteraction}
            />,
          )
          break
        case 'activity':
          const activityParams = route.params.activity as LifesaverDoType
          setActivityScreen(
            <SafeAreaView style={{ backgroundColor: '#eff0f7', flex: 1 }}>
              <Screen>
                <HeaderPadding />
                <View style={{ marginTop: 30 }}>{activityParams.screen}</View>
              </Screen>
            </SafeAreaView>,
          )
          break
        default:
          setActivityScreen(
            <ReadScreen
              title="Not Implemented"
              readPages={['Not implemented']}
              backImage="https://marylineg1.sg-host.com/blog/wp-content/uploads/2018/12/matterhorn-1313x875.jpg"
              onDonePressed={() => {
                return
              }}
            />,
          )
          break
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params])

  // PREVENT RETURNING TO LIFESAVER
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', async e => {
      e.preventDefault()
      unsubscribe()
      navigation.popToTop()
      return
    })
    return unsubscribe

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return activityScreen ? (
    <>
      {activityScreen}
      <PopupWrapper noPaddingHorizontal show={showTips} onClose={() => setShowTips(false)}>
        <Row gutter={10}>
          <Subheading>{translate(`contents.${dictionaryEntry}.tips_title`)}</Subheading>
        </Row>
        <Row grow justifyContentOnGrow="flex-start" gutter={10}>
          <Paragraph size="small" weight="normal" textAlign="left">
            {translate(`contents.${dictionaryEntry}.tips_description`)}
          </Paragraph>
        </Row>
        <Row>
          <Button onPress={() => setShowTips(false)} round>
            {translate('commons.messages.close')}
          </Button>
        </Row>
        <View style={{ marginBottom: insets.bottom }} />
      </PopupWrapper>
    </>
  ) : (
    <View style={{ width: '100%', height: '100%' }} />
  )
}

export default ActivityScreen
