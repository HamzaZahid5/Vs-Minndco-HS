import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, Image, useWindowDimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
//import useOrientation from '../../utils/hooks/useOrientation';

// import { connector } from './../../redux/connector';
// import theme from './../../styles/ColoredTheme';
import styles from './styles.js';
// import useOrientation from '../../hooks/useOrientation';

const TopLeft = ({ children }) => <>{children}</>;
TopLeft.propTypes = { children: PropTypes.element };
const TopCenter = ({ children }) => <>{children}</>;
TopCenter.propTypes = { children: PropTypes.element };
const TopRight = ({ children }) => <>{children}</>;
TopRight.propTypes = { children: PropTypes.element };
const MiddleTop = ({ children }) => <>{children}</>;
MiddleTop.propTypes = { children: PropTypes.element };
const MiddleCenter = ({ children }) => <>{children}</>;
MiddleCenter.propTypes = { children: PropTypes.element };
const MiddleBottom = ({ children }) => <>{children}</>;
MiddleBottom.propTypes = { children: PropTypes.element };
const BottomLeft = ({ children }) => <>{children}</>;
BottomLeft.propTypes = { children: PropTypes.element };
const BottomCenter = ({ children }) => <>{children}</>;
BottomCenter.propTypes = { children: PropTypes.element };
const BottomRight = ({ children }) => <>{children}</>;
BottomRight.propTypes = { children: PropTypes.element };

const HomeLayout = ({ children, rowTopStyle, rowBottomStyle, debug = false, withDecoration }) => {
  const theme = useTheme();
  // const orientation = useOrientation();
  // const webViewRef = useRef();
  const { height, width } = useWindowDimensions();

  const TopLeftChildren = [];
  const TopCenterChildren = [];
  const TopRightChildren = [];
  const MiddleTopChildren = [];
  const MiddleCenterChildren = [];
  const MiddleBottomChildren = [];
  const BottomLeftChildren = [];
  const BottomCenterChildren = [];
  const BottomRightChildren = [];
  const otherChildren = [];
  React.Children.forEach(children, ch => {
    switch (ch.type) {
      // eslint-disable-next-line prettier/prettier
      case (<TopLeft />).type:
        TopLeftChildren.push(ch);
        break;
      // eslint-disable-next-line prettier/prettier
      case (<TopCenter />).type:
        TopCenterChildren.push(ch);
        break;
      // eslint-disable-next-line prettier/prettier
      case (<TopRight />).type:
        TopRightChildren.push(ch);
        break;
      // eslint-disable-next-line prettier/prettier
      case (<MiddleTop />).type:
        MiddleTopChildren.push(ch);
        break;
      // eslint-disable-next-line prettier/prettier
      case (<MiddleCenter />).type:
        MiddleCenterChildren.push(ch);
        break;
      // eslint-disable-next-line prettier/prettier
      case (<MiddleBottom />).type:
        MiddleBottomChildren.push(ch);
        break;
      // eslint-disable-next-line prettier/prettier
      case (<BottomLeft />).type:
        BottomLeftChildren.push(ch);
        break;
      // eslint-disable-next-line prettier/prettier
      case (<BottomCenter />).type:
        BottomCenterChildren.push(ch);
        break;
      // eslint-disable-next-line prettier/prettier
      case (<BottomRight />).type:
        BottomRightChildren.push(ch);
        break;
      default:
        otherChildren.push(ch);
    }
  });

  return (
    <View style={styles.container} testID="home-layout">
      <LinearGradient
        // colors={[
        //   theme.colors.primary,
        //   theme.colors.secondary,
        //   '#7AC6C6',
        // ]}
        colors={['#88B0E3', '#75C1E1', '#2F8DCE', '#2F8DCE']}
        style={styles.gradient}
      >
        {/* <Image
          source={require('./../../styles/images/home_bg.png')}
          style={[
            styles.backgroundStyle,
            { bottom: orientation === 'LANDSCAPE' ? 0 : 80 },
          ]}
        /> */}
        {withDecoration && (
          <View
            style={{
              // flex: 1,
              // flexGrow: 1,
              position: 'absolute',
              // top: -100,
              zIndex: 0,
              // margin: -10
              width: width + 20,
              height: height + 10,
              alignContent: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Image
              source={require('../../../assets/images/home_bg.png')}
              style={{
                // backgroundColor: '#f00a',
                width: width,
                height: width * 2,
                opacity: 0.75,
                // marginBottom: 50,
              }}
              resizeMode="cover"
            />
            {/* 3D animation here */}
          </View>
        )}
        <SafeAreaView style={{ flex: 1 }}>
          <View style={[styles.rowTop, rowTopStyle]}>
            <View style={[styles.topLeft, debug ? styles.debugRed : null]}>{TopLeftChildren}</View>
            <View style={[styles.topCenter, debug ? styles.debugGreen : null]}>{TopCenterChildren}</View>
            <View style={[styles.topRight, debug ? styles.debugBlue : null]}>{TopRightChildren}</View>
          </View>
          <View
            style={[
              styles.rowCenter,
              // Platform.OS === 'android' && orientation === 'LANDSCAPE'
              // ? styles.rowCenterAsRow
              // : null,
            ]}
          >
            <View style={[styles.flexCenterContent, debug ? styles.debugBlue : null]}>{MiddleTopChildren}</View>
            <View style={[styles.centeredContent, debug ? styles.debugRed : null]}>
              {MiddleCenterChildren}
              {otherChildren}
            </View>
            <View style={[styles.flexStartContent, debug ? styles.debugGreen : null]}>{MiddleBottomChildren}</View>
          </View>
          <View style={[styles.rowBottom, rowBottomStyle]}>
            <View style={[styles.bottomLeft, debug ? styles.debugGreen : null]}>{BottomLeftChildren}</View>
            <View style={[styles.bottomCenter, debug ? styles.debugBlue : null]}>{BottomCenterChildren}</View>
            <View style={[styles.bottomRight, debug ? styles.debugRed : null]}>{BottomRightChildren}</View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

HomeLayout.TopLeft = TopLeft;
HomeLayout.TopCenter = TopCenter;
HomeLayout.TopRight = TopRight;
HomeLayout.MiddleTop = MiddleTop;
HomeLayout.MiddleCenter = MiddleCenter;
HomeLayout.MiddleBottom = MiddleBottom;
HomeLayout.BottomLeft = BottomLeft;
HomeLayout.BottomCenter = BottomCenter;
HomeLayout.BottomRight = BottomRight;

HomeLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  rowTopStyle: PropTypes.object,
  rowBottomStyle: PropTypes.object,
  debug: PropTypes.bool,
  withDecoration: PropTypes.bool,
};
// const mapStateToProp = state => ({
//   new_smoke_record: state.app?.newSmokeRecordFlag,
// });
export default HomeLayout;
