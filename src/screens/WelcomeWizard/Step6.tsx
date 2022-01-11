import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import CircularContent from '../Home/CircularContent';
// @ts-ignore: non-ts file
import HomeLayout from './../../components/HomeLayout';
import GenericChipButton from './GenericChipButton';
// @ts-ignore: non-ts file
import anime from '../../utils/anime';
import FadeEffect from '../../components/FadeEffect';
// @ts-ignore: non-ts file
import FABButton from '../../components/MindCoFABButton';
import { Platform } from 'react-native';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { translate } from '../../utils/localization';

const FullScreenHomeMessage = ({
  message = '',
  next,
}: {
  message?: React.Component | string;
  next: (arg?: number) => void;
}) => {
  const theme = useTheme() as CustomThemeType;
  const styles = getStyles(theme);
  const [messgeIsVisible, showMessage] = useState(false);
  const [actionsAreVisible, showActions] = useState(false);
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
              <GenericChipButton onPress={() => next(7)} text={translate('commons.general.no')} testID="step-6-no" />
              <GenericChipButton onPress={() => next(8)} text={translate('commons.general.yes')} testID="step-6-yes" />
            </FadeEffect>
          </View>
        </View>
        {/*Circular content should not be touched*/}
        <View pointerEvents="none">
          <CircularContent progress={0} />
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
        <FABButton icon="head-check" />
      </HomeLayout.BottomRight>
    </HomeLayout>
  );
};

export default FullScreenHomeMessage;

const getStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    contentWrapper: {
      height: 'auto',
      position: 'absolute',
      width: Platform.OS === 'web' ? '100vw' : '100%',
      top: -90,
      minWidth: '100%',
      alignContent: 'center',
      justifyContent: 'center',
      zIndex: 15,
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
      bottom: -5,
      right: 80,
    },
    centerIndicator: {
      position: 'absolute',
      bottom: -90,
    },
    messageText: {
      color: theme.colors.primary,
      ...theme.fonts.medium,
      lineHeight: 17,
    },
  });
