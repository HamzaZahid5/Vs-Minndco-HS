import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet, Text } from 'react-native';
import { Headline, Paragraph, useTheme } from 'react-native-paper';
// @ts-ignore: non-ts file
import ScreenDecorator from '../../components/ScreenDecorator';
// @ts-ignore: non-ts file
import GenericPageLayout from '../../components/GenericPageLayout';
// @ts-ignore: non-ts file
import RowItem from '../../components/RowItem';
import useVRPlayerCTA, { VRPlayerCTAPropType } from '../../utils/hooks/useVRPlayerCTA';
import { DefaultScreenPropType } from '../../../types';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { translate, getLocale } from '../../utils/localization';
import useStartPath from '../../utils/hooks/useStartPath';
import useSetDefaultBackOnPress from '../../utils/hooks/useSetDefaultBackOnPress';

const KitFinish = ({ navigation }: DefaultScreenPropType<'AboutVR'>) => {
  const theme = useTheme();
  const styles = getStyles(theme as CustomThemeType);
  useSetDefaultBackOnPress(
    navigation,
    defaultOnPress => () => {
      if (defaultOnPress) defaultOnPress();
      else navigation.goBack();
    },
    'back-button-about-vr',
  );
  const resourceId = `contents/00_welcome_to_relief_${getLocale().toUpperCase()}.mp4`;
  useStartPath('about_vr');
  const openVRPlayer = useVRPlayerCTA({
    resourceId,
    onCancel: () => {
      // eslint-disable-next-line no-console
      console.log('cancel');
      navigation.navigate('Main');
    },
    onComplete: () => {
      // eslint-disable-next-line no-console
      console.log('complete');
      navigation.navigate('Main');
    },
  } as VRPlayerCTAPropType);

  return (
    <ScreenDecorator>
      <GenericPageLayout
        onClose={() => navigation.goBack()}
        fullScroll
        header={
          <View style={styles.hero}>
            <View style={styles.heroView}>
              <Headline style={styles.headline}>
                {translate('screens.AboutVR.VR-MET')}
                <Text style={styles.heroText}>®</Text>
              </Headline>
              <Paragraph style={styles.description}>{translate('screens.AboutVR.program-description')}</Paragraph>
            </View>
            <Image
              style={styles.topImage}
              source={require('../../../assets/images/header_bg_4.png')}
              resizeMode="cover"
            />
          </View>
        }
      >
        <View style={styles.contentWrapper} testID="about-vr-screen">
          <Text>{translate('screens.AboutVR.content-text')}</Text>
          <View style={styles.wrapperView}>
            <RowItem
              title={translate('screens.AboutVR.setup-button-tittle')}
              text={translate('screens.AboutVR.setup-button-text')}
              reverse
              onPress={() => navigation.navigate('KitAssemble')}
            />
          </View>
          <View style={styles.contentWrapper}>
            <RowItem
              title={translate('screens.AboutVR.govr-title')}
              text={translate('screens.AboutVR.govr-text')}
              reverse
              // onPress={() => navigation.navigate('VRMet')}
              onPress={openVRPlayer}
            />
          </View>
        </View>
      </GenericPageLayout>
    </ScreenDecorator>
  );
};

KitFinish.propTypes = {
  navigation: PropTypes.object,
};

export default KitFinish;

const getStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    hero: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    floatingImageContent: {
      height: '100%',
    },
    heroContent: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    headline: {
      ...theme.fontsHelper.heading1,
      color: 'white',
      textAlign: 'center',
    },
    description: {
      textAlign: 'center',
    },
    contentWrapper: {
      marginVertical: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      // alignItems: 'flex-start',
    },
    itemOption: {
      flexDirection: 'column',
      alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: theme.colors.accent,
      width: 78,
      borderRadius: 4,
      padding: 5,
      shadowColor: '#664AB9',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 5,
      minWidth: '45%',
      margin: '2.5%',
    },
    optionText: {
      ...theme.fonts.small,
      // fontWeight: 'bold',
      color: theme.colors.text,
      marginTop: 5,
    },
    topImage: {
      opacity: 0.75,
      position: 'absolute',
      zIndex: -1,
    },
    heroView: {
      position: 'absolute',
    },
    heroText: {
      fontSize: 13,
      lineHeight: 25,
      textAlignVertical: 'top',
    },
    wrapperView: { width: '100%', marginTop: 40, alignItems: 'center' },
  });
