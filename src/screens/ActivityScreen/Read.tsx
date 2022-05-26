import React, { useState } from 'react'
import { View, StyleSheet, Platform, Image, Text, ScrollView, ImageSourcePropType } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { useRobTheme, Theme as RobTheme, Headline, Paragraph, Button, Row, Subheading } from '@mindcoxr/rob'
import { StackNavigationProp } from '@react-navigation/stack'
import { useSetHeaderProps } from '../../components/NavigationHeader'
import { RootStackParamList } from '../../../types'
import { translate } from '../../utils/localization'
import { useNavigation } from '@react-navigation/native'
import useAnimatedParallax from '../../utils/hooks/useAnimatedParallax'

export type ReadActivityScreenProps = {
  onDonePressed: () => void
  backImage: string | ImageSourcePropType
  title: string
  readPages: string[]
}

const PopupContent = ({ close }: { close: () => void }) => (
  <>
    <Row gutter={10}>
      <Subheading>{translate('screens.Activity.tipsTitle')}</Subheading>
    </Row>
    <Row grow justifyContentOnGrow="flex-start" gutter={10}>
      <Paragraph size="xsmall" weight="normal" textAlign="left">
        {translate('screens.Activity.tipsRead')}
      </Paragraph>
    </Row>
    <Row>
      <Button onPress={close} round>
        {translate('commons.messages.close')}
      </Button>
    </Row>
  </>
)

const ReadActivityScreen = ({ onDonePressed, backImage, title, readPages }: ReadActivityScreenProps) => {
  const [loading, setLoading] = useState(typeof backImage === 'string')
  const theme = useRobTheme()
  const styles = getStyles(theme)
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { AnimatedViewElement, animatedEvent, animationControl } = useAnimatedParallax({
    styles: [styles.imageContainer],
  })
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
        style={styles.externalGrowContainer}
        bounces={false}
        onScroll={animatedEvent()}
        scrollEventThrottle={50}
      >
        <View style={styles.imageSpacer} />
        <View style={styles.growContainer}>
          <View style={styles.textContainer}>
            <View style={{ marginBottom: 24 }}>
              <Headline size="small" weight="bold" textAlign="left">
                {title}
              </Headline>
            </View>
            {readPages.map((read, i) => (
              <View key={i.toString()}>
                <Paragraph size="small" textAlign="left" weight="normal">
                  <Text style={styles.textColor}>{read}</Text>
                </Paragraph>
                <View style={styles.separatorLine} />
              </View>
            ))}
          </View>
          <View style={styles.fullWidth}>
            <Button onPress={onDonePressed}>{translate('screens.Activity.done')}</Button>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const getStyles = (theme: typeof RobTheme) =>
  StyleSheet.create({
    externalContainer: { flexGrow: 1, overflow: 'hidden', backgroundColor: '#fcfcfc' },
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
    externalGrowContainer: { flexGrow: 1 },
    imageSpacer: { maxHeight: 298, minHeight: 200, flexGrow: 50, justifyContent: 'flex-end', alignItems: 'flex-start' },
    growContainer: {
      borderRadius: 16,
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
    separatorLine: { height: 5, backgroundColor: 'transparent', width: '100%', marginVertical: 15, borderRadius: 5 },
    fullWidth: { width: '100%', marginTop: 20, marginBottom: 15 },
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
    image: { height: 314, width: 'auto', borderRadius: 0, display: 'flex' },
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

export default ReadActivityScreen
