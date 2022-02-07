import { StyleSheet, View, Image, useWindowDimensions, Platform } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';
// @ts-ignore: non-ts file
import { Headline, Paragraph } from 'react-native-paper';
import { BlurView } from '@react-native-community/blur';
import { translate } from '../../utils/localization';
// @ts-ignore: non-ts file
import Carousel from '../../components/Carousel';
// @ts-ignore: non-ts file
import ScreenDecorator from '../../components/ScreenDecorator';

const slide2 = (paragraph1: string, paragraph2: string) => `
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

const RoadmapScreen = () => {
  const styles = getStyles();
  const screenSize = useWindowDimensions();
  return (
    <ScreenDecorator>
      <Carousel
        items={[
          {
            content: (
              <View style={[styles.carouselContainer]}>
                <BlurView
                  blurType="light"
                  blurAmount={5}
                  reducedTransparencyFallbackColor="white"
                  // style={[StyleSheet.absoluteFillObject]}
                  style={styles.slideBlurView}
                >
                  <View style={styles.container}>
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <View
                        style={{
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          position: 'absolute',
                          top: 0,
                          zIndex: 999,
                        }}
                      >
                        <Headline style={{ fontWeight: 'bold', fontSize: 30, marginTop: 20 }}>
                          {translate('screens.Roadmap.slide1-header')}
                        </Headline>
                      </View>
                      <View
                        style={{
                          flexDirection: 'column',
                          height: '100%',
                          width: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <View
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            width: '100%',
                            alignItems: 'center',
                          }}
                        >
                          <View
                            style={{
                              justifyContent: 'flex-end',
                              alignItems: 'center',
                              width: '70%',
                            }}
                          >
                            <Headline style={{ fontWeight: 'bold', fontSize: 30, zIndex: 999 }}>
                              {translate('screens.Roadmap.slide1-learnTitle')}
                            </Headline>
                            <Paragraph
                              style={{ textAlign: 'center', fontSize: 17, color: '#292929', width: '70%', zIndex: 999 }}
                            >
                              {translate('screens.Roadmap.slide1-learnText')}
                            </Paragraph>
                          </View>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: screenSize.width * 0.7,
                              height: screenSize.width * 0.7,
                            }}
                          >
                            <Image
                              style={{ width: screenSize.width * 0.7, height: screenSize.width * 0.7 }}
                              source={require('../../../assets/images/roadmap.png')}
                              resizeMode="contain"
                              resizeMethod="resize"
                            />
                          </View>
                          <View style={{ flexDirection: 'row', height: 100 }}>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                              }}
                            >
                              <View
                                style={{
                                  alignItems: 'center',
                                  justifyContent: 'flex-start',
                                  width: '85%',
                                  marginRight: 25,
                                  marginTop: -10,
                                }}
                              >
                                <Headline style={{ fontWeight: 'bold', fontSize: 30 }}>
                                  {translate('screens.Roadmap.slide1-integrateTitle')}
                                </Headline>
                                <Paragraph style={{ textAlign: 'center', fontSize: 17, color: '#292929' }}>
                                  {translate('screens.Roadmap.slide1-integrateText')}
                                </Paragraph>
                              </View>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                              }}
                            >
                              <View
                                style={{
                                  alignItems: 'center',
                                  justifyContent: 'flex-start',
                                  width: '85%',
                                  marginLeft: 25,
                                  marginTop: -10,
                                }}
                              >
                                <Headline style={{ fontWeight: 'bold', fontSize: 30 }}>
                                  {translate('screens.Roadmap.slide1-trainTitle')}
                                </Headline>
                                <Paragraph style={{ textAlign: 'center', fontSize: 17, color: '#292929' }}>
                                  {translate('screens.Roadmap.slide1-trainText')}
                                </Paragraph>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </BlurView>
              </View>
            ),
          },
          {
            content: (
              <View style={styles.carouselContainer}>
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
                    source={{
                      html: slide2(
                        translate('screens.HowItWorks.slide3-p1'),
                        translate('screens.HowItWorks.slide3-p2'),
                      ),
                    }}
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

export default RoadmapScreen;

const getStyles = () =>
  StyleSheet.create({
    carouser: {
      width: '100%',
      flexGrow: 1,
      margin: 'auto',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: 1,
    },
    container: {
      flexGrow: 1,
      margin: 'auto',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 10,
      borderRadius: 30,
      overflow: 'hidden',
      height: '100%',
      width: '100%',
    },
    slideBlurView: {
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      flexBasis: '100%',
    },
    carouselContainer: {
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      zIndex: 10,
      borderRadius: 30,
      overflow: 'hidden',
      position: 'absolute',
      left: 20,
      right: 20,
      top: 0,
      bottom: 0,
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
  });
