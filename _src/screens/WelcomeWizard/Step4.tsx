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
// @ts-ignore: non-ts file
import FABButton from '../../components/MindCoFABButton';
import ArrowIndicator from './ArrowIndicator';
import { CustomThemeType } from '../../utils/OriginalTheme';

const FullScreenHomeMessage = ({
  message = 'a third message',
  next,
  end,
}: {
  message?: React.Component | string;
  next: (arg?: number) => void;
  end: () => void;
}) => {
  const theme = useTheme() as CustomThemeType;
  const styles = getStyles(theme);
  const [messgeIsVisible, showMessage] = useState(false);
  const [actionsAreVisible, showActions] = useState(false);
  const [newElementIsVisible, showNewElement] = useState(false);
  const [indicatorIsVisible, showIndicator] = useState(false);
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
        duration: 0,
        complete: function () {
          showNewElement(true);
        },
      })
      .add({
        duration: 500,
        complete: function () {
          showIndicator(true);
        },
      })
      .add({
        duration: 500,
        complete: function () {
          showMessage(true);
        },
      })
      .add({
        duration: 2000,
        complete: function () {
          showActions(true);
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
      <HomeLayout.TopRight />
      <HomeLayout.MiddleCenter>
        <View style={styles.contentWrapper}>
          <FadeEffect style={styles.messageContainer} show={messgeIsVisible}>
            {content}
          </FadeEffect>
          <View style={styles.actionsPlaceholder}>
            <FadeEffect style={styles.actionsContainer} show={actionsAreVisible}>
              <SkipTutorialButton onPress={end} />
              <NextStepButton onPress={next} testID="step-4-ok" />
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
        <FABButton icon="account-heart" />
      </HomeLayout.BottomLeft>
      <HomeLayout.BottomRight>
        <FadeEffect show={newElementIsVisible}>
          <FABButton icon="head-check" />
        </FadeEffect>
        <View style={styles.bottomRightIndicator}>
          <FadeEffect show={indicatorIsVisible}>
            <ArrowIndicator />
          </FadeEffect>
        </View>
      </HomeLayout.BottomRight>
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
    bottomLeftIndicator: {
      position: 'absolute',
      left: 90,
      bottom: 0,
      transform: [{ scaleY: -1 }],
    },
    topRightIndicator: {
      position: 'absolute',
      right: 90,
      top: 0,
      transform: [{ scaleX: -1 }, { rotateZ: '23deg' }],
    },
    bottomRightIndicator: {
      position: 'absolute',
      bottom: 15,
      right: 80,
      transform: [{ scaleX: -1 }, { scaleY: -1 }],
    },
    messageText: {
      color: theme.colors.primary,
      ...theme.fonts.medium,
      lineHeight: 17,
    },
  });
