import React from 'react';
import { StyleSheet, View } from 'react-native';
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

const Library = ({ navigation }: Props): JSX.Element => {
  const theme = useTheme() as CustomThemeType;
  const styles = getStyles(theme);
  return (
    <ScreenDecorator>
      <GenericPageLayout
        fullScroll
        header={
          <View style={styles.container}>
            <Headline style={styles.headline}>Your personal library</Headline>
            <Paragraph style={styles.paragraph}>
              Review the contents any time you need to refresh some knowledge
            </Paragraph>
          </View>
        }
      >
        <View style={styles.bodyContainer}>
          <RowItem
            title="How the program Works"
            text="Overview the key concepts of MindCo Relief"
            // reverse
            onPress={() => navigation.push('HowItWorks')}
          />
          <RowItem
            title="Mindfulness"
            text="Enhance your innate resilience, health, and contentment"
            // reverse
            onPress={() => navigation.push('ContentsShelf', { category: 'mindfulness' })}
          />
          <RowItem
            title="VR Education"
            text="VR contents for learning about stress and coping skills"
            // reverse
            onPress={() => navigation.push('ContentsShelf', { category: 'education' })}
          />
          <RowItem
            title="VR Relaxations"
            text="VR contents to stay calm and relax your mind"
            // reverse
            onPress={() => navigation.push('ContentsShelf', { category: 'relaxation' })}
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
      color: Color(theme.colors.dark).darken(0.3).toString(),
    },
    paragraph: {
      textAlign: 'center',
    },
  });
