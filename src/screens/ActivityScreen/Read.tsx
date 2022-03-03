import React, { useLayoutEffect, useRef, useState } from 'react'
import { View, StyleSheet, Platform, Image, Text, ScrollView, TextInput } from 'react-native'
import { ActivityIndicator, Paragraph as PaperParagraph, TouchableRipple } from 'react-native-paper'
import {
  useRobTheme,
  Theme as RobTheme,
  Headline,
  Paragraph,
  Button,
  Row,
  PopupWrapper,
  Subheading,
  Icon,
} from '@mindcoxr/rob'
import { StackHeaderProps } from '@react-navigation/stack'
import NavigationHeader, { useSetHeaderProps } from '../../components/NavigationHeader'
import { DefaultScreenPropType } from '../../../types'
import { translate } from '../../utils/localization'

export type VRActivityScreenProps = {
  onDonePressed: () => void
  backImage: string
  title: string
  read: string
}

const VRActivityScreen = ({ onDonePressed, backImage, title, read }: VRActivityScreenProps) => {
  const [loading, setLoading] = useState(true)
  const theme = useRobTheme()
  const styles = getStyles(theme)
  const [show, setShow] = useState(false)
  const [answer, setAnswer] = useState('')
  return (
    <View style={styles.externalContainer}>
      <View style={[styles.imageContainer]}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator animating color={theme.colors.monochrome.label} size="large" />
          </View>
        )}
        <Image
          source={{
            uri: backImage,
          }}
          resizeMode="cover"
          style={[styles.image, Platform.OS !== 'ios' && loading && styles.hide]}
          onLoad={() => {
            setLoading(false)
          }}
        />
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.externalGrowContainer}
      >
        <View style={styles.imageSpacer} />
        <View style={styles.growContainer}>
          <View style={styles.textContainer}>
            <View style={{ marginBottom: 24 }}>
              <Headline size="small" weight="bold" textAlign="left">
                {title}
              </Headline>
            </View>
            <Paragraph size="small" textAlign="left" weight="normal">
              <Text style={styles.textColor}>{read}</Text>
            </Paragraph>
          </View>
          <View style={styles.fullWidth}>
            <Button onPress={onDonePressed}>Submit</Button>
          </View>
        </View>
      </ScrollView>
      <PopupWrapper show={show} onClose={() => setShow(false)}>
        <Row gutter={10}>
          <Subheading>How to watch VR contents</Subheading>
        </Row>
        <Row grow justifyContentOnGrow="flex-start" gutter={10}>
          <Paragraph size="xsmall" weight="normal" textAlign="left">
            {
              '1. Make sure to be seated to have the best possible experience.\n2. Place the phone right in the middle of the headset to avoid blurriness.\n3. Wear headphones if you can!'
            }
          </Paragraph>
        </Row>
      </PopupWrapper>
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
