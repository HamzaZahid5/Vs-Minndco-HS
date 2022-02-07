import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Headline, Paragraph, useTheme } from 'react-native-paper';
import { CustomThemeType } from '../../utils/OriginalTheme';
import Color from 'color';
import { translate } from '../../utils/localization';

const HeaderStatistics = () => {
  const theme = useTheme() as CustomThemeType;
  const styles = getStyles(theme);
  return (
    <View style={styles.container} testID="path-endind-header-statistics">
      <View style={{ position: 'absolute' }}>
        <Headline style={styles.headline}>{translate('screens.PathEnding.header-statistics')}</Headline>
        <View style={styles.main}>
          <Paragraph style={styles.paragraph}>{translate('screens.PathEnding.parag-statistics')}</Paragraph>
        </View>
      </View>
      <Image style={styles.topImage} source={require('../../../assets/images/header_bg_2.png')} resizeMode="cover" />
    </View>
  );
};

export default HeaderStatistics;

const getStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    headline: {
      color: Color(theme.colors.dark).darken(0.3).toString(),
    },
    paragraph: {
      textAlign: 'center',
    },
    container: {
      height: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    main: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    topImage: {
      // backgroundColor: '#f00a',
      opacity: 0.75,
    },
  });
