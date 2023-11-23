import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Platform, Image, Text, ScrollView, ImageSourcePropType } from 'react-native'
import { ActivityIndicator, Paragraph as PaperParagraph, TouchableRipple } from 'react-native-paper'

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
import { useSetHeaderProps } from '../../components/NavigationHeader'
import { translate } from '../../utils/localization'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../types'
import useAnimatedParallax from '../../utils/hooks/useAnimatedParallax'
import { useSelector } from 'react-redux'
import { USER_PROFILE } from '../../store/selectors'
import { setGender } from '../../services/Firestore'

export type VRActivityScreenProps = {
  onPlayPressed: () => void
  onDonePressed: () => void
  backImage: string | ImageSourcePropType
  title: string
  description: string
  duration: string | number
}

const PopupContent = ({ close }: { close: () => void }) => (
  <>
    <Row gutter={10}>
      <Subheading>{translate('screens.Activity.tipsTitle')}</Subheading>
    </Row>
    <Row grow justifyContentOnGrow="flex-start" gutter={10}>
      <Paragraph size="xsmall" weight="normal" textAlign="left">
        {translate('screens.Activity.tipsVr')}
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

const GenderPopupContent = ({ close }: { close: () => void }) => {
  const genderSelected = useRef(false)
  const navigation = useNavigation()
  useEffect(() => {
    const unsub = navigation.addListener('beforeRemove', () => {
      if (genderSelected.current === false) {
        setGender('f')
      }
    })
    return unsub
  })
  return (
    <>
      <Row gutter={10}>
        <Subheading> {translate('screens.Activity.genderTitle')}</Subheading>
      </Row>
      <Row grow justifyContentOnGrow="flex-start" gutter={10}>
        <Paragraph size="xsmall" weight="normal" textAlign="left">
          {translate('screens.Activity.genderSubTitle')}
        </Paragraph>
      </Row>
      <Row gutter={10} grow justifyContentOnGrow="flex-end">
        <Button
          role="primary"
          onPress={() => {
            genderSelected.current = true
            setGender('f').then(close)
          }}
        >
          {translate('screens.Activity.genderFemale')}
        </Button>
        <Button
          role="primary"
          onPress={() => {
            genderSelected.current = true
            setGender('m').then(close)
          }}
        >
          {translate('screens.Activity.genderMale')}
        </Button>
        <Button
          role="secondary"
          onPress={() => {
            genderSelected.current = true
            setGender('f').then(close)
          }}
        >
          {translate('screens.Activity.genderNo')}
        </Button>
      </Row>
    </>
  )
}

const VRActivityScreen = ({
  onPlayPressed,
  onDonePressed,
  backImage,
  title,
  description,
  duration,
}: VRActivityScreenProps) => {
  const [loading, setLoading] = useState(typeof backImage === 'string')
  const theme = useRobTheme()
  const styles = getStyles(theme)
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { AnimatedViewElement, animatedEvent, animationControl } = useAnimatedParallax({
    styles: [styles.imageContainer],
  })
  const { gender } = useSelector(USER_PROFILE)
  useEffect(() => {
    if (gender === 'm' || gender === 'f') return
    navigation.navigate('BasicModal', { content: GenderPopupContent })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
  const [colorlessButton, setColorlessButton] = useState(true)
  const popUpHandler = () => {
    navigation.navigate('BasicModal', {
      content: PopupContentWellDone,
    })
    setTimeout(() => {
      onDonePressed()
    }, 2000)
  }

  return (
    <View style={styles.externalContainer}>
      <AnimatedViewElement>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator animating color={theme.colors.monochrome.label} size="large" />
          </View>
        )}
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
          onLoad={() => {
            setLoading(false)
          }}
        />
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
        <View style={styles.imageSpacer}>
          <View style={styles.titlePosition}>
            <Headline textAlign="left" size="large" weight="bold">
              <Text style={styles.titleColor}>{title}</Text>
            </Headline>
          </View>
        </View>
        <View style={styles.playContainer}>
          <TouchableRipple
            borderless
            onPress={() => {
              setTimeout(() => setColorlessButton(false), 1000)
              onPlayPressed()
            }}
            style={styles.playButton}
          >
            <Icon name="Play" color={theme.colors.monochrome.input} />
          </TouchableRipple>
        </View>
        <View style={styles.externalGrowContainer}>
          <View style={styles.growContainer}>
            <View style={styles.textContainer}>
              <Headline size="small" weight="bold" textAlign="left">
                {translate('screens.Activity.description')}
              </Headline>
              <Paragraph size="small" textAlign="left" weight="normal">
                <Text style={styles.textColor}>{description}</Text>
              </Paragraph>
            </View>
            <View style={styles.separatorLine} />
            <View style={styles.iconsContainer}>
              <View style={[styles.iconsWrapper]}>
                <Icon name="VR" color={theme.colors.monochrome.placeholder} />
                <PaperParagraph numberOfLines={1} style={styles.paragraphStyle}>
                  VR
                </PaperParagraph>
              </View>
              <View style={[styles.iconsWrapper]}>
                <Icon name="Rotate" color={theme.colors.monochrome.placeholder} />
                <PaperParagraph numberOfLines={1} style={styles.paragraphStyle}>
                  {translate('screens.Activity.rotate')}
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
    playContainer: {
      paddingVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.monochrome.input,
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
    },
    headlineContainer: {
      position: 'absolute',
      top: 30,
      left: 25,
      right: 25,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    leftArrow: { justifyContent: 'center', alignItems: 'center', paddingTop: 5, paddingLeft: 5, borderRadius: 16 },
    playButton: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: '#14142B',
      justifyContent: 'center',
      alignItems: 'center',
    },
    externalGrowContainer: { backgroundColor: theme.colors.monochrome.input, flexGrow: 1 },
    imageSpacer: { maxHeight: 298, minHeight: 200, flexGrow: 50, justifyContent: 'flex-end', alignItems: 'flex-start' },
    growContainer: {
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
      backgroundColor: '#fcfcfc',
      paddingVertical: 32,
      paddingHorizontal: 24,
      alignItems: 'flex-start',
      flexGrow: 1,
    },
    questionMark: { justifyContent: 'center', alignItems: 'center', borderRadius: 16, padding: 5 },
    textContainer: { marginBottom: 20 },
    titleColor: { color: '#FCFCFC' },
    titlePosition: { marginBottom: 27, marginLeft: 24 },
    textColor: { color: '#14142b' },
    separatorLine: { height: 3, backgroundColor: '#EFF0F6', width: '100%', marginBottom: 15 },
    fullWidth: { width: '100%' },
    paragraphStyle: {
      ...theme.fonts.regular,
      ...theme.fontSizes.body.large,
      fontFamily: 'Poppins_600SemiBold',
      fontWeight: '600',
      color: theme.colors.monochrome.label,
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
    titleContainer: {
      position: 'absolute',
      bottom: 27,
      left: 24,
      zIndex: 999,
    },
    image: { height: 314, borderRadius: 0, display: 'flex' },
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
    iconsContainer: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 25 },
    iconsContainerSmall: { paddingHorizontal: 16 },
    iconsWrapper: { alignItems: 'center', justifyContent: 'center', marginTop: 10, marginRight: 40 },
    touchable: { borderRadius: 24 },
    touchableFav: { borderRadius: 8, justifyContent: 'center' },
    touchableView: { borderRadius: 8, justifyContent: 'center', flex: 1 },
    hide: { display: 'none' },
    containerAlingCenter: { justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
    containerAlingLeft: { justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' },
    containerAlingRigth: { justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' },
    loadingContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    horizontalMargin: { marginHorizontal: 32 },
    horizontalMarginSmall: { marginHorizontal: 16 },
  })

export default VRActivityScreen
