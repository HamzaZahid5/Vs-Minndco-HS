import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import ScreenDecorator from '../../components/ScreenDecorator';
import Carousel from '../../components/Carousel';
import { usePathEndingBarButton } from '../PathEnding';
import { useTheme } from 'react-native-paper';
// import { BlurView, VibrancyView } from '@react-native-community/blur';
import { Platform } from 'react-native';
import { translate } from '../../utils/localization';

const slide1 = (paragraph1, paragraph2) => `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
  </head>
  <body style="font-family: 'Raleway', sans-serif; display: flex; flex-basis: 100%; height: 100%; flex-direction: column; justify-content: center">
    
    <div>
    ${paragraph1}
    </div>
    <div>
    ${paragraph2}
    </div>
  </body>
</html>
`;
const slide2 = (paragraph1, paragraph2, paragraph3) => `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
  </head>
  <body style="font-family: 'Raleway', sans-serif; display: flex; flex-basis: 100%; height: 100%; flex-direction: column; justify-content: center;">
    <div style={{ color: 'black' }}>
    ${paragraph1}
      <br/><br/>
    </div>
    <div>
    ${paragraph2}
    </div>
    <div style="line-height: 24px">
    ${paragraph3}
    </div>
  </body>
</html>
`;

const slide3 = (paragraph1, paragraph2) => `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
  </head>
  <body style="font-family: 'Raleway', sans-serif; display: flex; flex-basis: 100%; height: 100%; flex-direction: column; justify-content: center;">
    <div style={{ color: 'black' }}>
    ${paragraph1}
    </div>
    <div style="line-height: 24px">
    ${paragraph2}
    </div>
  </body>
</html>
`;

const HowItWorks = ({ navigation }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  usePathEndingBarButton(navigation, {
    routeParams: {
      header: {
        type: 'learning',
      },
      body: {
        options: ['LearnRow', 'StressManagementRow', 'TutorialRow'],
      },
    },
  });
  return (
    <ScreenDecorator>
      <Carousel
        items={[
          {
            content: (
              <View style={[styles.container, { borderRadius: 30, overflow: 'hidden' }]}>
                <View
                  // blurType="light"
                  // blurAmount={5}
                  // reducedTransparencyFallbackColor="white"
                  style={{ height: '100%', width: '100%', padding: 20 }}
                >
                  <WebView
                    style={{
                      flexDirection: 'column',
                      backgroundColor: 'transparent',
                      flex: 1,
                      height: '100%',
                      minWidth: '100%',
                      overflow: 'hidden',
                      marginLeft: Platform.OS === 'android' ? 20 : 'auto',
                      marginRight: Platform.OS === 'android' ? -20 : 'auto',
                    }}
                    overScrollMode="never"
                    showsVerticalScrollIndicator={false}
                    originWhitelist={['*']}
                    textZoom={100}
                    source={{
                      html: slide1(
                        translate('screens.HowItWorks.slide1-p1'),
                        translate('screens.HowItWorks.slide1-p2'),
                      ),
                    }}
                  />
                </View>
              </View>
            ),
          },
          {
            content: (
              <View style={[styles.container, { borderRadius: 30, overflow: 'hidden' }]}>
                <View
                  // blurType="light"
                  // blurAmount={5}
                  // reducedTransparencyFallbackColor="white"
                  style={{
                    height: '100%',
                    width: '100%',
                    padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexBasis: '100%',
                  }}
                >
                  <WebView
                    style={{
                      flexDirection: 'column',
                      backgroundColor: 'transparent',
                      flex: 1,
                      height: '100%',
                      minWidth: '100%',
                      marginLeft: Platform.OS === 'android' ? 20 : 'auto',
                      marginRight: Platform.OS === 'android' ? -20 : 'auto',
                    }}
                    overScrollMode="never"
                    showsVerticalScrollIndicator={false}
                    originWhitelist={['*']}
                    textZoom={100}
                    source={{
                      html: slide2(
                        translate('screens.HowItWorks.slide2-p1'),
                        translate('screens.HowItWorks.slide2-p2'),
                        translate('screens.HowItWorks.slide2-p3'),
                      ),
                    }}
                  />
                </View>
              </View>
            ),
          },
          {
            content: (
              <View style={[styles.container, { borderRadius: 30, overflow: 'hidden' }]}>
                <View
                  // blurType="light"
                  // blurAmount={5}
                  // reducedTransparencyFallbackColor="white"
                  style={{
                    height: '100%',
                    width: '100%',
                    padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexBasis: '100%',
                  }}
                >
                  <WebView
                    style={{
                      flexDirection: 'column',
                      backgroundColor: 'transparent',
                      flex: 1,
                      height: '100%',
                      minWidth: '100%',
                      marginLeft: Platform.OS === 'android' ? 20 : 'auto',
                      marginRight: Platform.OS === 'android' ? -20 : 'auto',
                    }}
                    overScrollMode="never"
                    showsVerticalScrollIndicator={false}
                    originWhitelist={['*']}
                    textZoom={100}
                    source={{ html: slide3(
                      translate('screens.HowItWorks.slide3-p1'),
                      translate('screens.HowItWorks.slide3-p2'),
                    ) }}
                  />
                </View>
              </View>
            ),
          },
        ]}
      />
    </ScreenDecorator>
  );
};

HowItWorks.propTypes = {
  navigation: PropTypes.object,
};

export default HowItWorks;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      margin: 'auto',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginHorizontal: 20,
      zIndex: 10,
    },
  });
