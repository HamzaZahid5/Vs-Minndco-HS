import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Headline, Paragraph, Text, useTheme } from 'react-native-paper';
import Color from 'color';
// @ts-ignore: non-ts file
import ScreenDecorator from '../../components/ScreenDecorator';
// @ts-ignore: non-ts file
import GenericPageLayout from '../../components/GenericPageLayout';
// @ts-ignore: non-ts file
import RowItem from '../../components/RowItem';
import { CustomThemeType } from '../../utils/OriginalTheme';
import Props from './types';
import { translate } from '../../utils/localization';
import useStartPath from '../../utils/hooks/useStartPath';

const Library = ({ navigation }: Props): JSX.Element => {
  const theme = useTheme() as CustomThemeType;
  const styles = getStyles(theme);
  useStartPath('learn');
  return (
    <ScreenDecorator>
      <GenericPageLayout
        fullScroll
        header={
          <View style={styles.container}>
            <View style={{ position: 'absolute' }}>
              <Headline style={styles.headline}>{translate('screens.Library.your-personal-library')}</Headline>
              <Paragraph style={styles.paragraph}>{translate('screens.Library.header-paragraph')}</Paragraph>
            </View>
            <Image
              style={styles.topImage}
              source={require('../../../assets/images/header_bg_3.png')}
              resizeMode="cover"
            />
          </View>
        }
      >
        <View style={styles.bodyContainer}>
          <RowItem
            title={translate('screens.Library.mindfulness')}
            text={translate('screens.Library.mindfulness-paragraph')}
            // reverse
            onPress={() => navigation.navigate('ContentsShelf', { category: 'mindfulness' })}
          />
          <RowItem
            title={translate('screens.Library.vr-education')}
            text={translate('screens.Library.vr-education--paragraph')}
            // reverse
            onPress={() => navigation.navigate('ContentsShelf', { category: 'education' })}
          />
          <RowItem
            title={translate('screens.Library.vr-relaxations')}
            text={translate('screens.Library.vr-relaxations-paragraph')}
            // reverse
            onPress={() => navigation.navigate('ContentsShelf', { category: 'relaxation' })}
          />
        </View>
      </GenericPageLayout>
    </ScreenDecorator>
  );
};

export default Library;

const getStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    bodyContainer: {
      flexGrow: 1,
      margin: 'auto',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    container: {
      height: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 20,
    },
    headline: {
      // color: Color(theme.colors.dark).darken(0.3).toString(),
      ...theme.fontsHelper.heading2,
      color: 'white',
      textAlign: 'center',
    },
    paragraph: {
      textAlign: 'center',
    },
    topImage: {
      opacity: 0.75,
      position: 'absolute',
      zIndex: -1,
    },
  });
