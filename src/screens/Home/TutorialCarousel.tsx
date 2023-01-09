import React, { useEffect, useMemo } from 'react'
import { Carousel, Row, Icon, Paragraph, Billboard, Button, useRobTheme } from '@mindcoxr/rob'
import { translate } from '../../utils/localization'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import TargetIndicator from '../../components/TargetIndicator'
import { useDispatch, useSelector } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../types'
import { SHOW_BASIC_TUTORIAL, SMOKE_RECORD, FLAGS, IS_PREMIUM } from '../../store/selectors'
import { updateShowBasicTutorialCompleted, updateShowChatHelper, updateShowJournalHelper, updateShowLifeSaverHelper, updateShowProgramHelper } from '../../services/Firestore'

const SlideSmokeJournal = () => {
  const theme = useRobTheme()
  return (
    <Row>
      <Row margin={0}>
        <Billboard textAlign="left" light>
          {translate('screens.BasicsTutorial.tutorial_program_title', { defaultValue: 'Fisrt steps' })}
        </Billboard>
      </Row>
      <Row margin={0}>
        <Icon name="Plus" size={60} color={theme.colors.monochrome.offWhite} strokeWidth={1} />
        <Paragraph size="medium" light weight="normal" textAlign="left">
          {translate('screens.BasicsTutorial.tutorial_program_subtitle', {
            defaultValue: "Let's regiter your first smoke journal together. Press the icon with the plus (",
          })}
        </Paragraph>
      </Row>
    </Row>
  )
}
const SlideCoachChat = () => {
  const theme = useRobTheme()
  return (
    <Row>
      <Row margin={0}>
        <Billboard textAlign="left" light>
          {translate('screens.BasicsTutorial.tutorial_chat_title', { defaultValue: 'Fisrt steps' })}
        </Billboard>
      </Row>
      <Row margin={0}>
        <Icon name="Comment" size={60} color={theme.colors.monochrome.offWhite} strokeWidth={1} />
        <Paragraph size="medium" light weight="normal" textAlign="left">
          {translate('screens.BasicsTutorial.tutorial_chat_subtitle', {
            defaultValue: 'Send a message to your Coach. Press the icon with the chat bubble (',
          })}
        </Paragraph>
      </Row>
    </Row>
  )
}
const SlideProgramActivity = () => {
  const stackNavigator = useNavigation<StackNavigationProp<RootStackParamList>>()

  return (
    <Row>
      <Row margin={0}>
        <Billboard textAlign="left" light>
          {translate('screens.BasicsTutorial.tutorial_program_title', { defaultValue: 'Fisrt steps' })}
        </Billboard>
      </Row>
      <Row margin={0}>
        <Paragraph size="medium" light weight="normal" textAlign="left">
          {translate('screens.BasicsTutorial.tutorial_program_subtitle', {
            defaultValue: 'Take your first lesson. Click the following button to perform your next program activty',
          })}
        </Paragraph>
      </Row>
      <Row margin={0}>
        <View style={{ flexDirection: 'row' }}>
          <TargetIndicator show>
            <Button
              compact
              onPress={() => {
                stackNavigator.navigate('Activity')
              }}
            >
              {translate('screens.BasicsTutorial.tutorial_program_CTA')}
            </Button>
          </TargetIndicator>
        </View>
      </Row>
    </Row>
  )
}
const SlideLifeSaverChat = () => {
  const theme = useRobTheme()
  return (
    <Row>
      <Row margin={0}>
        <Billboard textAlign="left" light>
          {translate('screens.BasicsTutorial.tutorial_LS_title', { defaultValue: 'Fisrt steps' })}
        </Billboard>
      </Row>
      <Row margin={0}>
        <Icon name="Help" size={60} color={theme.colors.monochrome.offWhite} strokeWidth={1} />
        <Paragraph size="medium" light weight="normal" textAlign="left">
          {translate('screens.BasicsTutorial.tutorial_LS_subtitle', {
            defaultValue: "Let's try a useful tool to manage the urge. Press the icon with the help (",
          })}
        </Paragraph>
      </Row>
    </Row>
  )
}
const TutorialCarousel = () => {
  const smokeRecord = useSelector(SMOKE_RECORD)
  const hasSmokeRecords = Object.keys(smokeRecord).length > 0
  const showBasicTutorial = useSelector(SHOW_BASIC_TUTORIAL)
  const { showJournalHelper, showChatHelper, showProgramHelper, showLifeSaverHelper } = useSelector(FLAGS)
  const isPremium = useSelector(IS_PREMIUM)
  const dispatch = useDispatch()

  const slides = useMemo(
    () => [
      {
        id: 'chat-slide',
        component: SlideCoachChat,
        show: showChatHelper && isPremium,
        effect: () => {
          dispatch({ type: 'flags/showChatCTAHelper', payload: true })
        },
      },
      {
        id: 'lifesaver-slide',
        component: SlideLifeSaverChat,
        show: showLifeSaverHelper && !isPremium,
        effect: () => {
          dispatch({ type: 'flags/showLifeSaverCTAHelper', payload: true })
        },
      },
      {
        id: 'journal-slide',
        component: SlideSmokeJournal,
        show: showJournalHelper,
        effect: () => {
          if (showBasicTutorial && !hasSmokeRecords) {
            dispatch({ type: 'flags/showJournalCTAHelper', payload: true })
          }
        },
      },
      {
        id: 'program-slide',
        component: SlideProgramActivity,
        show: showProgramHelper,
        effect: () => {
          dispatch({ type: 'flags/hideAllCTAHelper' })
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showJournalHelper, hasSmokeRecords, showChatHelper, showProgramHelper, showLifeSaverHelper],
  )
  const onSlideEntered = (idx: number) => {
    slides.filter(s => s.show)[idx].effect()
  }

  useEffect(() => {
    const activeSlides = slides.filter(s => s.show)
    if (activeSlides.length > 0) {
      activeSlides[0].effect()
    } else {
      dispatch({ type: 'flags/setShowBasicTutorialFinished', payload: false })
      updateShowBasicTutorialCompleted(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides])

  return (
    <Carousel
      onSlideEntered={onSlideEntered}
      // currentSlide={currentSlide}
      dotConfig={{
        justify: 'flex-end',
      }}
    >
      {slides.map(S => (S.show ? <S.component key={S.id} /> : null))}
    </Carousel>
  )
}

export default TutorialCarousel
