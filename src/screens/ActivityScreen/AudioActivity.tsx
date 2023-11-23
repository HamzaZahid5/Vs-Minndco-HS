import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Text, Image, Platform, ScrollView, ImageSourcePropType } from 'react-native'
import { Paragraph as PaperParagraph } from 'react-native-paper'
import { Audio, AVPlaybackStatus } from 'expo-av'
import {
  useRobTheme,
  Theme as RobTheme,
  Headline,
  Paragraph,
  Button,
  Row,
  Subheading,
  Icon,
  ButtonSubVariant,
} from '@mindcoxr/rob'
import { useStorageDownloadURL } from '../../services/Storage'
import { useSetHeaderProps } from '../../components/NavigationHeader'
import { translate } from '../../utils/localization'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../types'
import useAnimatedParallax from '../../utils/hooks/useAnimatedParallax'
import RoundPlayButton from '../../components/RoundPlayButton'
import InlineAudioPlayer from '../../components/Skeletons/InlineAudioPlayer'

export type VRActivityScreenProps = {
  onPlayPressed: () => void
  onDonePressed: () => void
  audioSrc: string
  backImage: string | ImageSourcePropType
  title: string
  description: string
  duration: string | number
}

const PopupContent = ({ close }: { close: () => void }) => (
  <>
    <Row gutter={10}>
      <Subheading>{}</Subheading>
    </Row>
    <Row grow justifyContentOnGrow="flex-start" gutter={10}>
      <Paragraph size="small" weight="normal" textAlign="left">
        {translate('screens.Activity.tipsAudio')}
      </Paragraph>
    </Row>
    <Row>
      <Button onPress={close} round>
        {translate('commons.messages.close')}
      </Button>
    </Row>
  </>
)

const PopupContentWellDone = () => (
  <>
    <Row gutter={10}>
      <Subheading>{translate('screens.activityPoll.congratsMessage')}</Subheading>
    </Row>
    <Row grow justifyContentOnGrow="flex-start" gutter={10}>
      <Paragraph size="large" weight="bold" textAlign="center">
        {translate('screens.activityPoll.topBarTitle')}
      </Paragraph>
      <Paragraph size="large" weight="bold" textAlign="center">
        {translate('screens.activityPoll.keepTraining')}
      </Paragraph>
    </Row>
  </>
)

const AudioActivityScreen = ({
  onPlayPressed,
  onDonePressed,
  audioSrc,
  backImage,
  title,
  description,
  duration,
}: VRActivityScreenProps) => {
  const [loading, setLoading] = useState(true)
  const theme = useRobTheme()
  const styles = getStyles(theme)
  const [error, setError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<Audio.Sound | null>(null)
  const maxWidth = useRef<number>(0)
  const [finished, setFinished] = useState(false)
  const [progress, setProgress] = useState(0)
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { AnimatedViewElement, animatedEvent, animationControl } = useAnimatedParallax({
    styles: [styles.imageContainer],
  })

  const asset = useStorageDownloadURL(audioSrc)
  const startLoad = useRef(false)

  const popUpHandler = () => {
    navigation.navigate('BasicModal', {
      content: PopupContentWellDone,
    })
    setTimeout(() => {
      onDonePressed()
    }, 2000)
  }

  useSetHeaderProps(
    {
      rightActions: [
        {
          icon: 'QuestionMark',
          action: () =>
            navigation.navigate('BasicModal', {
              content: PopupContent,
            }),
        },
      ],
      animatedControl: { animatedValue: animationControl, interpolationInput: [0, 155] },
    },
    [],
  )

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded === true && status.isBuffering === false && status.durationMillis) {
      const actualProgress = Math.round((status.positionMillis * 100) / status.durationMillis)
      if (actualProgress !== progress) {
        setProgress(actualProgress)
      }
      if (status.positionMillis === status.durationMillis) {
        setIsPlaying(false)
        setFinished(true)
      }
      if (loading) {
        setLoading(false)
      }
    }
  }
  useEffect(() => {
    if (asset && startLoad.current === false) {
      const makeSound = async () => {
        try {
          const audio = await Audio.Sound.createAsync(
            { uri: asset },
            { shouldPlay: false },
            onPlaybackStatusUpdate,
            false,
          )
          //Used for testing
          //await audio.sound.setRateAsync(32, true)
          //await audio.sound.setPositionAsync(547996 * 0.95)
          audioRef.current = audio.sound
        } catch (error) {
          setError(true)
        }
      }
      startLoad.current = true
      makeSound()
      return () => {
        if (audioRef.current) {
          audioRef.current.unloadAsync()
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asset])
  return (
    <View style={styles.externalContainer}>
      <AnimatedViewElement>
        <View style={[styles.loadingPosition]}>
          <Image
            source={
              typeof backImage === 'string'
                ? {
                    uri: backImage,
                  }
                : backImage
            }
            resizeMode="cover"
            style={[styles.image, Platform.OS !== 'ios' && loading && styles.hide]}
          />
        </View>
      </AnimatedViewElement>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ flexGrow: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        onScroll={animatedEvent()}
        scrollEventThrottle={50}
      >
        <View style={styles.videoSpacer} />
        <View style={styles.infoContainer}>
          {loading && <InlineAudioPlayer style={{ height: 65 }} />}
          {!loading && (
            <>
              <RoundPlayButton
                onPress={() => {
                  if (audioRef.current) {
                    if (isPlaying) {
                      audioRef.current.pauseAsync().then(() => setIsPlaying(false))
                    } else {
                      if (progress === 100) {
                        audioRef.current
                          .setPositionAsync(0)
                          .then(() => audioRef.current?.playAsync())
                          .then(() => setIsPlaying(true))
                          .then(() => setProgress(0))
                      } else {
                        audioRef.current.playAsync().then(() => setIsPlaying(true))
                      }
                    }
                  }
                  onPlayPressed && onPlayPressed()
                }}
                isPlaying={isPlaying}
              />
              <View style={[{ flexGrow: 1 }, loading && styles.hide]}>
                <View
                  style={{
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: theme.colors.monochrome.line,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    overflow: 'hidden',
                  }}
                  onLayout={e => {
                    maxWidth.current = e.nativeEvent.layout.width
                  }}
                >
                  <View
                    style={{
                      height: '100%',
                      width: (maxWidth.current * progress) / 100,
                      backgroundColor: theme.colors.monochrome.offBlack,
                      borderRadius: 6,
                    }}
                  />
                </View>
                <View style={{ marginLeft: 5 }}>
                  <Paragraph weight="bold" size="small" textAlign="left">
                    <Text style={{ color: theme.colors.monochrome.offBlack }}>{progress}%</Text> Complete
                  </Paragraph>
                </View>
              </View>
            </>
          )}
        </View>
        <View style={styles.textContainer}>
          <View style={styles.internalText}>
            <View style={styles.title}>
              <Headline size="small" weight="bold" textAlign="left">
                {title}
              </Headline>
              <Paragraph size="small" textAlign="left" weight="normal">
                <Text style={styles.paragraphColor}>{description}</Text>
              </Paragraph>
            </View>
            <View style={styles.iconsContainer}>
              <View style={[styles.iconsWrapper]}>
                <Icon name="Audio" color={theme.colors.monochrome.placeholder} />
                <PaperParagraph numberOfLines={1} style={styles.paragraphStyle}>
                  {translate('commons.activities.audio-label')}
                </PaperParagraph>
              </View>
              <View style={[styles.iconsWrapper]}>
                <Icon name="Clock" color={theme.colors.monochrome.placeholder} />
                <PaperParagraph numberOfLines={1} style={styles.paragraphStyle}>
                  {duration} {duration === 1 ? translate('commons.values.minute') : translate('commons.values.minutes')}
                </PaperParagraph>
              </View>
            </View>
            <View style={[styles.fullWidth, { flexGrow: 1, justifyContent: 'flex-end' }]}>
              <Button subVariant={progress < 95 ? ButtonSubVariant.colorless : undefined} onPress={popUpHandler}>
                {translate('screens.Activity.done')}
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const getStyles = (theme: typeof RobTheme) =>
  StyleSheet.create({
    externalContainer: { flexGrow: 1, overflow: 'hidden', backgroundColor: theme.colors.monochrome.input },
    paragraphStyle: {
      ...theme.fonts.regular,
      ...theme.fontSizes.body.large,
      fontFamily: 'Poppins_600SemiBold',
      fontWeight: '600',
      color: theme.colors.monochrome.label,
    },
    title: { marginBottom: 15 },
    image: { height: 314, width: 'auto', borderRadius: 0, display: 'flex' },
    loadingPosition: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
    hideLoading: { top: -314, bottom: 314 },
    videoSpacer: { maxHeight: 314, minHeight: 200, flexGrow: 50, justifyContent: 'flex-end', alignItems: 'flex-start' },
    headbarContainer: {
      position: 'absolute',
      top: 30,
      left: 25,
      right: 25,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    infoContainer: {
      paddingVertical: 20,
      paddingHorizontal: 24,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: theme.colors.monochrome.input,
    },
    internalText: {
      backgroundColor: '#fcfcfc',
      paddingVertical: 32,
      paddingHorizontal: 24,
      alignItems: 'flex-start',
      flexGrow: 1,
    },
    fullWidth: { width: '100%' },
    paragraphColor: { color: '#14142b' },
    hide: { display: 'none' },
    leftArrow: { justifyContent: 'center', alignItems: 'center', paddingTop: 5, paddingLeft: 5, borderRadius: 16 },
    questionMark: { justifyContent: 'center', alignItems: 'center', borderRadius: 16, padding: 5 },
    playContainer: {
      backgroundColor: '#14142B',
      height: 64,
      width: 64,
      borderRadius: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    paragraphStyleFav: {
      color: theme.colors.errors.darkmode,
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'stretch',
      height: 314,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    textContainer: { backgroundColor: theme.colors.monochrome.input, flexGrow: 1 },
    titleContainer: {
      position: 'absolute',
      bottom: 27,
      left: 24,
      zIndex: 999,
    },
    imageSmall: { height: 120, borderRadius: 24 },
    imageLoading: { display: 'none' },
    textConteinar: {
      justifyContent: 'space-between',
      alignItems: 'stretch',
      paddingTop: 24,
    },
    textConteinarSmall: {
      paddingTop: 16,
    },
    description: { marginTop: 16, marginBottom: 8, marginHorizontal: 32 },
    descriptionSmall: { marginHorizontal: 16 },
    iconsContainer: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 15 },
    iconsContainerSmall: { paddingHorizontal: 16 },
    iconsWrapper: { alignItems: 'center', justifyContent: 'center', marginTop: 10, marginRight: 40 },
    touchable: { borderRadius: 24 },
    touchableFav: { borderRadius: 8, justifyContent: 'center' },
    touchableView: { borderRadius: 8, justifyContent: 'center', flex: 1 },
    containerAlingCenter: { justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
    containerAlingLeft: { justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' },
    containerAlingRigth: { justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' },
    horizontalMargin: { marginHorizontal: 32 },
    horizontalMarginSmall: { marginHorizontal: 16 },
  })

export default AudioActivityScreen
