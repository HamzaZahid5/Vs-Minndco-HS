import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';
// import YoutubePlayer from 'react-native-youtube-iframe';
// @ts-ignore: non-ts file
import GenericPageLayout from '../../components/GenericPageLayout';
import BigButton from '../../components/BigButton';
// @ts-ignore: non-ts file
import ScreenDecorator from '../../components/ScreenDecorator';
import { translate } from '../../utils/localization';
import { DefaultScreenPropType } from '../../../types';
import { CustomThemeType } from '../../utils/OriginalTheme';

const KitAssemble = ({ navigation }: DefaultScreenPropType<'KitAssemble'>) => {
  const theme = useTheme() as CustomThemeType;
  const styles = getStyles(theme);
  return (
    <ScreenDecorator>
      <GenericPageLayout onClose={() => navigation.popToTop()} fullScroll header={<View style={styles.hero} />}>
        <View style={styles.contentWrapper}>
          {/* <Paragraph style={styles.description}>{translate('screens.KitAssemble.vr-guiade')}</Paragraph> */}
          <View style={{ width: '100%', marginTop: 40, alignItems: 'center' }}>
            <BigButton
              style={{
                marginBottom: 20,
              }}
              onPress={() => navigation.navigate('VRDemo')}
            >
              {translate('screens.KitAssemble.load-vr-met')}
            </BigButton>
          </View>
        </View>
      </GenericPageLayout>
    </ScreenDecorator>
  );
};

KitAssemble.propTypes = {
  navigation: PropTypes.object,
};

export default KitAssemble;

const getStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    hero: {
      height: '100%',
      justifyContent: 'center',
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
    },
    headline: {
      ...theme.fonts.headline3,
      // fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },
    contentWrapper: {
      width: '100%',
      height: '100%',
      marginVertical: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      // alignItems: 'flex-start',
    },
    itemOption: {
      flexDirection: 'column',
      alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: theme.colors.primary,
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
      color: 'white',
      marginTop: 5,
    },
  });
