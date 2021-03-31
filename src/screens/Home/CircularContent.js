import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Title, useTheme } from 'react-native-paper';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Circle } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getIconByActivityType } from '../../utils/helpers';
// import FadeEffect from '../../components/FadeEffect';
// import theme from '../../styles/ColoredTheme';

const CircularContent = ({
  title,
  type,
  instructionsText,
  informativeText,
  progress = 0,
  onPress,
}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{ zIndex: 10 }}
    >
      <View style={styles.container}>
        <AnimatedCircularProgress
          size={250}
          width={10}
          fill={progress}
          rotation={0}
          padding={10}
          lineCap="round"
          tintColor="#3C828C"
          backgroundColor="#F0E983"
          // onAnimationComplete={() => console.log('onAnimationComplete')}
          renderCap={({ center }) =>
            progress ? (
              <Circle cx={center.x} cy={center.y} r="10" fill="#3C828C" />
            ) : null
          }
        >
          {() => (
            <>
              <View style={styles.flexEndContent}>
                <Text style={styles.nextUpText}>{instructionsText}</Text>
              </View>
              <View style={styles.centeredContent}>
                <Title style={styles.activityTitle}>{title}</Title>
              </View>
              <View style={styles.flexStartContent}>
                <Icon
                  name={getIconByActivityType(type)}
                  size={80}
                  color="#3C828C"
                />
              </View>
            </>
          )}
        </AnimatedCircularProgress>
        <View style={styles.background} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.infoText, { color: theme.colors.primary }]}>{informativeText}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CircularContent;

const styles = StyleSheet.create({
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
    // color: theme.customs.colors.Green,
    textAlign: 'center',
    margin: 5,
  },
});
