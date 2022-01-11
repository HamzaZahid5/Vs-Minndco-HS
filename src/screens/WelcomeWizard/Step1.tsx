import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
// @ts-ignore: non-ts file
import HomeLayout from './../../components/HomeLayout';
import SkipTutorialButton from './SkipTutorialButton';
import NextStepButton from './NextStepButton';
// @ts-ignore: non-ts file
import anime from '../../utils/anime';
import FadeEffect from '../../components/FadeEffect';
import { CustomThemeType } from '../../utils/OriginalTheme';
import AnalyticEvent from '../../utils/AnalyticsEvent';

const FullScreenHomeMessage = ({
  message,
  next,
  end,
}: {
  message: React.Component | string;
  next: (arg?: number) => void;
  end: () => void;
}) => {
  useEffect(() => {
    AnalyticEvent('tutorial_begin');
  }, []);
  const theme = useTheme() as CustomThemeType;
  const styles = getStyles(theme);
  const [enterMessge, setEnterMessge] = useState(false);
  const [enterActions, setEnterActions] = useState(false);
  const content = typeof message === 'string' ? <Text style={styles.messageText}>{message}</Text> : message;
  useEffect(() => {
    const transformation = {
      opacity: 0,
    };
    anime
      .timeline({
        easing: 'linear',
        duration: 0,
        // delay: 1000,
      })
      .add({
        delay: 1000,
        complete: function () {
          setEnterMessge(true);
        },
      })
      .add({
        duration: 2000,
        complete: function () {
          setEnterActions(true);
        },
      });
    return () => anime.remove(transformation);
  }, []);
  // useEffect(() => {
  //   Navigation.mergeOptions(componentId, {
  //     animations: {
  //       pop: {
  //         content: {
  //           enabled: true,
  //           alpha: {
  //             from: 1,
  //             to: 0,
  //             duration: 400,
  //             startDelay: 100,
  //             interpolation: 'accelerate',
  //           },
  //         },
  //       },
  //     },
  //   });
  // }, [componentId]);
  return (
    <HomeLayout rowTopStyle={styles.rowTop} rowBottomStyle={styles.rowBottom}>
      <HomeLayout.TopRight>
        {/*<View style={styles.paddingTop} /> paddingTop does not exist*/}
        <View />
      </HomeLayout.TopRight>
      <HomeLayout.MiddleCenter>
        <View style={styles.contentWrapper} testID="welcome-wizard-step-1">
          <FadeEffect style={styles.messageContainer} show={enterMessge}>
            {content}
          </FadeEffect>
          <View style={styles.actionsPlaceholder}>
            <FadeEffect style={styles.actionsContainer} show={enterActions}>
              <SkipTutorialButton onPress={end} testID="step-1-skip" />
              <NextStepButton onPress={next} testID="step-1-ok" />
            </FadeEffect>
          </View>
        </View>
      </HomeLayout.MiddleCenter>
      <HomeLayout.MiddleBottom>
        {/* <BigButton
          style={styles.mainCTA}
          labelStyle={styles.mainCTALabelStyle}
          onPress={() => {
            navigateBack(componentId, { fade: true });
          }}
        >
          Start
        </BigButton> */}
      </HomeLayout.MiddleBottom>
      <HomeLayout.BottomLeft>
        {/*<View style={styles.paddingBottom} /> paddingBottom does not exist*/}
        <View />
      </HomeLayout.BottomLeft>
    </HomeLayout>
  );
};

export default FullScreenHomeMessage;

const getStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    contentWrapper: {
      height: 250,
      minWidth: '100%',
      alignContent: 'center',
      justifyContent: 'center',
    },
    messageContainer: {
      backgroundColor: '#fffa',
      borderWidth: 1,
      borderColor: theme.colors.primary,
      borderRadius: 20,
      padding: 20,
      marginHorizontal: 20,
    },
    mainCTA: {
      margin: 25,
      backgroundColor: theme.colors.primary,
      width: 200,
    },
    mainCTALabelStyle: {
      color: 'white',
    },
    rowTop: {
      height: 60,
    },
    rowBottom: {
      minHeight: 96,
    },
    actionsPlaceholder: {
      height: 30,
    },
    actionsContainer: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginTop: 10,
      marginHorizontal: 25,
      // backgroundColor: '#ff0a',
    },
    messageText: {
      color: theme.colors.primary,
      ...theme.fonts.medium,
    },
  });
