import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, Image, ImageSourcePropType } from 'react-native'
import { ActivityIndicator, Paragraph as PaperParagraph, TouchableRipple } from 'react-native-paper'
import { Video } from 'expo-av'
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

export type VRActivityScreenProps = {
  onPlayPressed: () => void
  onDonePressed: () => void
  videoSrc: string
  title: string
  description: string
  duration: string | number
  backImage?: string | ImageSourcePropType
}

const PopupContent = ({ close }: { close: () => void }) => (
  <>
    <Row gutter={10}>
      <Subheading>{translate('screens.Activity.tipsTitle')}</Subheading>
    </Row>
    <Row grow justifyContentOnGrow="flex-start" gutter={10}>
      <Paragraph size="xsmall" weight="normal" textAlign="left">
        {translate('screens.Activity.tipsVideo')}
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

const VideoActivity = ({
  onPlayPressed,
  onDonePressed,
  videoSrc,
  title,
  description,
  duration,
  backImage = 'https://marylineg1.sg-host.com/blog/wp-content/uploads/2018/12/matterhorn-1313x875.jpg',
}: VRActivityScreenProps) => {
  const [loading, setLoading] = useState(true)
  const video = useRef<Video | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const theme = useRobTheme()
  const styles = getStyles(theme)
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const [colorlessButton, setColorlessButton] = useState(true)
  const [shouldRestart, setShouldRestar] = useState(false)

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
      showGradient: 'always',
    },
    [],
  )

  const asset = useStorageDownloadURL(videoSrc)
  useEffect(() => {
    if (loading) return
    if (isFullscreen) {
      video.current?.presentFullscreenPlayerAsync().then(() => {
        if (shouldRestart) {
          video.current?.replayAsync()
          setShouldRestar(false)
        } else {
          video.current?.playAsync()
        }
      })
    } else {
      video.current?.pauseAsync()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullscreen, shouldRestart]) //Run only when fullscreen status change

  return (
    <View style={styles.externalContainer}>
      <View style={styles.imageContainer}>
        <View style={styles.loadingContainer}>
          <Image
            source={
              typeof backImage === 'string'
                ? {
                    uri: backImage,
                  }
                : backImage
            }
            resizeMode="cover"
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />
        </View>
        <View
          style={[
            styles.loadingPosition,
            loading && styles.hideLoading, // Render on top (iOS fix)
          ]}
        >
          {asset && (
            <Video
              ref={video}
              style={[styles.image]}
              source={{
                uri: asset,
              }}
              onFullscreenUpdate={update => {
                if (update.fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS) {
                  setIsFullscreen(false)
                }
              }}
              // useNativeControls={isFullscreen}
              resizeMode={isFullscreen ? 'contain' : 'cover'}
              onPlaybackStatusUpdate={status => {
                if (status.isLoaded) {
                  if (status.durationMillis) {
                    const actualProgress = Math.round((status.positionMillis * 100) / status.durationMillis)
                    if (actualProgress > 95 && colorlessButton) {
                      setColorlessButton(false)
                    }
                  }

                  if (status.didJustFinish) {
                    setShouldRestar(true)
                    if (video.current) {
                      video.current.dismissFullscreenPlayer()
                    }
                  }
                }
                if (status.isLoaded && !status.isBuffering) {
                  setLoading(false)
                }
              }}
            />
          )}
        </View>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ flexGrow: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
      >
        <View style={styles.videoSpacer} />
        <View style={styles.infoContainer}>
          {!loading ? (
            <TouchableRipple
              borderless
              onPress={() => {
                onPlayPressed()
                setIsFullscreen(true)
              }}
              style={styles.playButton}
            >
              <View style={[styles.playContainer, loading && styles.hide]}>
                <Icon name="Play" color={theme.colors.monochrome.input} />
              </View>
            </TouchableRipple>
          ) : (
            <View style={styles.playButton}>
              <ActivityIndicator animating color={theme.colors.monochrome.label} size="large" />
            </View>
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
            <View style={styles.separatorLine} />
            <View style={styles.iconsContainer}>
              <View style={[styles.iconsWrapper]}>
                <Icon name="Video" color={theme.colors.monochrome.placeholder} />
                <PaperParagraph numberOfLines={1} style={styles.paragraphStyle}>
                  Video
                </PaperParagraph>
              </View>
              <View style={[styles.iconsWrapper]}>
                <Icon name="Clock" color={theme.colors.monochrome.placeholder} />
                <PaperParagraph numberOfLines={1} style={styles.paragraphStyle}>
                  {duration} min
                </PaperParagraph>
              </View>
            </View>
            <View style={styles.fullWidth}>
              <Button subVariant={colorlessButton ? ButtonSubVariant.colorless : undefined} onPress={popUpHandler}>
                Done
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
      justifyContent: 'center',
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
      zIndex: -1,
    },
    textContainer: { backgroundColor: theme.colors.monochrome.input, flexGrow: 1 },
    titleContainer: {
      position: 'absolute',
      bottom: 27,
      left: 24,
      zIndex: 1,
    },
    image: { height: 314, borderRadius: 0, display: 'flex' },
    imageSmall: { height: 120, borderRadius: 24 },
    imageLoading: { display: 'none' },
    textConteinar: {
      justifyContent: 'space-between',
      alignItems: 'stretch',
      paddingTop: 24,
    },
    playButton: {
      width: 64,
      height: 64,
      borderRadius: 32,
      justifyContent: 'center',
      alignItems: 'center',
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
    separatorLine: { height: 3, backgroundColor: '#EFF0F6', width: '100%', marginBottom: 15 },
    loadingContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
    },
    horizontalMargin: { marginHorizontal: 32 },
    horizontalMarginSmall: { marginHorizontal: 16 },
  })

export default VideoActivity
