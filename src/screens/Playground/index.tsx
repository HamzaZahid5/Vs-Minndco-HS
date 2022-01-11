import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Headline, Paragraph, Subheading, useTheme } from 'react-native-paper';
// @ts-ignore: non-ts file
import GenericPageLayout from '../../components/GenericPageLayout';
// @ts-ignore: non-ts file
import ScreenDecorator from '../../components/ScreenDecorator';
import BigButton from '../../components/BigButton';
// @ts-ignore: non-ts file
import { auth } from '../../services/Auth';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { translate } from '../../utils/localization';
// @ts-ignore: non-ts file
import RowItem from '../../components/RowItem';
import { DefaultScreenPropType, RootStackParamList } from '../../../types';

const PlaygroundActivities: {
  title: () => string;
  description: () => string;
  activityScreen: keyof RootStackParamList;
  params: RootStackParamList[keyof RootStackParamList];
}[] = [
  {
    title: () => translate('playground-activities.identify-triggers.title'),
    description: () => translate('playground-activities.identify-triggers.description'),
    activityScreen: 'StressTrigger',
    params: { isTrigerIdentification: true },
  },
  {
    title: () => translate('playground-activities.reading.title'),
    description: () => translate('playground-activities.reading.description'),
    activityScreen: 'ReadActivitySelect',
    params: {},
  },
  {
    title: () => translate('playground-activities.audio.title'),
    description: () => translate('playground-activities.audio.description'),
    activityScreen: 'StressActivityToDo',
    params: { isFromPlayground: true, type: 'LISTEN' },
  },
  {
    title: () => translate('playground-activities.do.title'),
    description: () => translate('playground-activities.do.description'),
    activityScreen: 'StressActivitySelect',
    params: {},
  },
  {
    title: () => translate('playground-activities.zen-mode.title'),
    description: () => translate('playground-activities.zen-mode.description'),
    activityScreen: 'VRPlaygroundActivity',
    params: { url: 'zenmode' },
  },
];

const Playground = ({ navigation }: DefaultScreenPropType<'Playground'>) => {
  const theme = useTheme() as CustomThemeType;
  const styles = getStyles(theme);
  const [scrollStatus, setScrollStatus] = useState(0);
  const scrollEnd = useRef(0);

  return (
    <ScreenDecorator>
      <GenericPageLayout
        fullScroll
        headerHeight={152}
        scrolableScreen={false}
        header={
          <View style={styles.container}>
            <View style={{ position: 'absolute' }}>
              <Headline style={styles.headline}>{translate('screens.Playground.title')}</Headline>
              <Subheading style={styles.paragraph}>{translate('screens.Playground.subtitle')}</Subheading>
              <Paragraph style={styles.paragraph}>{translate('screens.Playground.description')}</Paragraph>
            </View>
            <Image
              style={styles.topImage}
              source={require('../../../assets/images/header_bg_3.png')}
              resizeMode="cover"
            />
          </View>
        }
      >
        <View
          style={{
            borderBottomColor: theme.colors.onSurface,
            borderBottomWidth: scrollEnd.current - scrollStatus > 5 ? 1 : 0,
            borderTopColor: theme.colors.onSurface,
            borderTopWidth: scrollStatus > 5 ? 1 : 0,
            flex: 1,
            marginTop: '20%',
            marginBottom: '5%',
          }}
        >
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            keyboardShouldPersistTaps={'handled'}
            contentContainerStyle={styles.bodyContainer}
            style={styles.scroolViewStyle}
            onScroll={event => {
              setScrollStatus(event.nativeEvent.contentOffset.y);
              scrollEnd.current = event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height;
            }}
          >
            {PlaygroundActivities.map((value, i) => (
              <View key={`activity_${value.title()}-${i}`} style={{ marginVertical: '2%' }}>
                <RowItem
                  title={value.title()}
                  text={value.description()}
                  onPress={() => navigation.navigate(value.activityScreen, value.params)}
                  testID={`playgrond-activity-${i + 1}`}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </GenericPageLayout>
    </ScreenDecorator>
  );
};

export default Playground;

const getStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    bodyContainer: {
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    scroolViewStyle: {
      width: '100%',
      height: '100%',
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
