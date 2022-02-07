import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Title, useTheme } from 'react-native-paper';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Circle } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// @ts-ignore: non-ts file
import { getIconByActivityType } from '../../utils/helpers';
// import FadeEffect from '../../components/FadeEffect';
// import theme from '../../styles/ColoredTheme';
import { activityTypesType } from '../../../types';
import { CustomThemeType } from '../../utils/OriginalTheme';

type propType = {
  title?: string;
  type?: activityTypesType | 'star';
  instructionsText?: string;
  informativeText?: string;
  progress: number;
  onPress?: () => void;
};

const CircularContent = ({
  title,
  type,
  instructionsText,
  informativeText,
  progress = 0,
  onPress = Function,
}: propType) => {
  const theme = useTheme() as CustomThemeType;
  const styles = getStyles(theme);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{ zIndex: 10 }}>
      <View style={styles.container}>
        <AnimatedCircularProgress
          size={250}
          width={10}
          fill={progress}
          rotation={0}
          padding={10}
          lineCap="round"
          tintColor={theme.colors.secondary}
          backgroundColor="#F0E983"
          // onAnimationComplete={() => console.log('onAnimationComplete')}
          renderCap={({ center }) =>
            progress ? <Circle cx={center.x} cy={center.y} r="10" fill={theme.colors.secondary} /> : null
          }
        >
          {() => (
            <View style={styles.innerContainer}>
              <View style={styles.flexEndContent}>
                <Text style={styles.nextUpText}>{instructionsText}</Text>
              </View>
              <View style={styles.centeredContent}>
                <Title style={styles.activityTitle}>{title}</Title>
              </View>
              <View style={styles.flexStartContent}>
                {type && <Icon name={getIconByActivityType(type)} size={80} color={theme.colors.secondary} />}
              </View>
            </View>
          )}
        </AnimatedCircularProgress>
        <View style={styles.background} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.infoText]}>{informativeText}</Text>
      </View>
    </TouchableOpacity>
  );
};

CircularContent.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  instructionsText: PropTypes.string,
  informativeText: PropTypes.string,
  progress: PropTypes.number,
  onPress: PropTypes.func,
};

export default CircularContent;

const getStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    container: {
      width: 250,
      height: 250,
      borderRadius: 150,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 10,
      borderColor: 'transparent',
    },
    innerContainer: {
      flexBasis: '100%',
      padding: 20,
      alignItems: 'center',
    },
    background: {
      position: 'absolute',
      backgroundColor: '#FFFBC6',
      width: 240,
      height: 240,
      borderRadius: 150,
      zIndex: -1,
    },
    circleContentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: '#f00a',
    },
    nextUpText: {
      color: '#3C828C',
      alignSelf: 'flex-start',
      textAlign: 'center',
    },
    centeredContent: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -25,
    },
    flexStartContent: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      flex: 1,
    },
    flexEndContent: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    activityTitle: {
      textAlign: 'center',
      fontSize: 20,
      paddingHorizontal: 5,
    },
    infoContainer: {
      width: 250,
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoText: {
      color: theme.colors.placeholder,
      textAlign: 'center',
      margin: 5,
    },
  });
