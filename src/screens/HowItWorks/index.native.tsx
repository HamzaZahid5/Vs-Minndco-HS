import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
// @ts-ignore: non-ts file
import ScreenDecorator from '../../components/ScreenDecorator';
// @ts-ignore: non-ts file
import Carousel from '../../components/Carousel';
// @ts-ignore: non-ts file
import { usePathEndingBarButton } from '../PathEnding';
import { BlurView } from '@react-native-community/blur';
import { Platform } from 'react-native';
import { DefaultScreenPropType } from '../../../types';

const slide1 = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
  </head>
  <body style="font-family: 'Raleway', sans-serif; display: flex; flex-basis: 100%; height: 100%; flex-direction: column; justify-content: center">
    <div style={{ color: 'black' }}>
      <b>MindCo Relief</b> is a program developed by behavioral change experts to help you ease your anxiety and
      stress levels<br/><br/>
    </div>
    <div>
      You will learn about <i>anxiety</i> and <i>stress</i> through <b>informational</b> and <b>educational</b> lessons, getting to
      know all there is to know about it.
      <br/><br/>
    </div>
    <div>
      <u>Less than 10 minutes a day</u> to: <br/>
        <br/>👉 &nbsp; Identify triggers
        <br/>👉 &nbsp; Map stress-related habits
        <br/>👉 &nbsp; Deconstruct behaviors and learn coping skills
    </div>
  </body>
</html>
`;
const slide2 = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
  </head>
  <body style="font-family: 'Raleway', sans-serif; display: flex; flex-basis: 100%; height: 100%; flex-direction: column; justify-content: center;">
    <div style={{ color: 'black' }}>
      <b>First,  do a 8 week training plan</b>
      <br/><br/>
    </div>
    <div>
      In order to map your habits, you need to keep track of your triggers and moods. That's what the Journal is for. It help you to acknowledge and log, moment to moment, day by day, the anxiety pattern, and collect information related to statistics.
    <br/><br/>
    </div>
    <div style="line-height: 24px">
      <u>The Program</u> includes: <br/>
        <br/>1️⃣ <b>VR Mindful Exposure Therapy & education</b>
        <br/>&nbsp;&nbsp;📌 &nbsp; 140 minutes of VR therapy exercises, using VR-MET
        <br/>&nbsp;&nbsp;📌 &nbsp; 50 minutes of VR education
        <br/><br/>2️⃣ <b>Formal mindfulness exercises</b>
        <br/>&nbsp;&nbsp;📌 &nbsp; 80 minutes of video in 8 exercises
        <br/>&nbsp;&nbsp;📌 &nbsp; 50 minutes of audio in 8 exercises
        <br/><br/>3️⃣ <b>JOURNAL</b>
        <br/>&nbsp;&nbsp;📌 &nbsp; 24 self-reflective CBT questions 
        
    </div>
  </body>
</html>
`;

const slide3 = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
  </head>
  <body style="font-family: 'Raleway', sans-serif; display: flex; flex-basis: 100%; height: 100%; flex-direction: column; justify-content: center;">
    <div style={{ color: 'black' }}>
      <b>YOUR JOURNEY WITH MINDCO RELIEF</b>
      <br/><br/>
    </div>
    <div style="line-height: 24px">
        <br/><b>- Set up stage</b>: 8 weeks
        <br/><b>Goals</b>
        <br/>&nbsp;&nbsp;⭐ &nbsp; LEARN ABOUT YOUR HABITS
        <br/>&nbsp;&nbsp;⭐ &nbsp; CHALLENGE YOUR BELIEFS
        <br/>&nbsp;&nbsp;⭐ &nbsp; EASE YOUR ANXIETY
        <br/><br/><b>- Maintenance stage</b>: 9 months
        <br/><b>Goals</b>
        <br/>&nbsp;&nbsp;⭐ &nbsp; STRENGTHEN YOUR COPING SKILLS 
        <br/>&nbsp;&nbsp;⭐ &nbsp; CHANGE YOUR IDENTIFIED HABITS 
        <br/>&nbsp;&nbsp;⭐ &nbsp; BECOME A MORE BALANCED AND RELAXED PERSON  
        
    </div>
  </body>
</html>
`;
const HowItWorks = ({ navigation }: DefaultScreenPropType<'HowItWorks'>) => {
  const styles = getStyles();
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
              <View style={styles.container}>
                <BlurView
                  blurType="light"
                  blurAmount={5}
                  reducedTransparencyFallbackColor="white"
                  // style={[StyleSheet.absoluteFillObject]}
                  style={styles.slide1BlurView}
                >
                  <WebView
                    style={styles.slideWebView}
                    overScrollMode="never"
                    showsVerticalScrollIndicator={false}
                    originWhitelist={['*']}
                    textZoom={100}
                    source={{ html: slide1 }}
                  />
                </BlurView>
              </View>
            ),
          },
          {
            content: (
              <View style={styles.container}>
                <BlurView
                  blurType="light"
                  blurAmount={5}
                  reducedTransparencyFallbackColor="white"
                  // style={[StyleSheet.absoluteFillObject]}
                  style={styles.slideBlurView}
                >
                  <WebView
                    style={styles.slideWebView}
                    overScrollMode="never"
                    showsVerticalScrollIndicator={false}
                    originWhitelist={['*']}
                    textZoom={100}
                    source={{ html: slide2 }}
                  />
                </BlurView>
              </View>
            ),
          },
          {
            content: (
              <View style={styles.container}>
                <BlurView
                  blurType="light"
                  blurAmount={5}
                  reducedTransparencyFallbackColor="white"
                  // style={[StyleSheet.absoluteFillObject]}
                  style={styles.slide1BlurView}
                >
                  <WebView
                    style={styles.slideWebView}
                    overScrollMode="never"
                    showsVerticalScrollIndicator={false}
                    originWhitelist={['*']}
                    textZoom={100}
                    source={{ html: slide3 }}
                  />
                </BlurView>
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

const getStyles = () =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      margin: 'auto',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginHorizontal: 20,
      zIndex: 10,
      borderRadius: 30,
      overflow: 'hidden',
    },
    slideBlurView: {
      height: '100%',
      width: '100%',
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      flexBasis: '100%',
    },
    slideWebView: {
      flexDirection: 'column',
      backgroundColor: 'transparent',
      flex: 1,
      height: '100%',
      minWidth: '100%',
      marginLeft: Platform.OS === 'android' ? 20 : 'auto',
      marginRight: Platform.OS === 'android' ? -20 : 'auto',
    },
    slide1BlurView: { height: '100%', width: '100%', padding: 20 },
  });
