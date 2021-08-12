import React from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import { Headline, Paragraph, useTheme } from 'react-native-paper';
import { CustomThemeType } from '../../utils/OriginalTheme';
import Color from 'color';
import { translate } from '../../utils/localization';

const HeaderStatistics = () => {
  const theme = useTheme() as CustomThemeType;
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute' }}>
        <Headline style={styles.headline}>{translate('Keep an eye on your statistics')}</Headline>
        <View style={styles.main}>
          <Paragraph style={styles.paragraph}>
            {translate('They are a valuable source of personal infromation about your behavioral change.')}
          </Paragraph>
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
      // width: Dimensions.get('window').width,
      // backgroundColor: '#f00a',
      opacity: 0.75,
    },
  });
