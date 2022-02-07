import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, useWindowDimensions } from 'react-native';
import Color from 'color';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform } from 'react-native';

const AnimatedRateRow = ({
  selected,
  onSelected,
  delay,
  value = 0,
  testID,
}: {
  selected: boolean;
  onSelected: () => void;
  delay: number;
  value: number;
  testID?: string;
}) => {
  const [highlight, setHighlight] = useState<boolean>();
  const { height } = useWindowDimensions();
  const styles = getStyles(height);
  useEffect(() => {
    if (selected) {
      setTimeout(() => {
        setHighlight(true);
        setTimeout(onSelected, 500);
      }, delay);
    } else {
      setHighlight(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);
  return (
    <LinearGradient
      colors={['#eef5f5', '#e2e9f1', '#e2e9f1', '#e2e9f1', '#cbdcea']}
      style={styles.rowOption}
      testID={testID ?? `stress-rate-row-${value}`}
    >
      {/* <View style={styles.rowOption}> */}
      <Text
        style={[
          styles.rowNumber,
          {
            color: highlight
              ? Color('#3D9AD5')
                  .mix(Color('#d53d4c'), value / 10)
                  .toString()
              : Color('white')
                  .darken(value / 10 + 0.1)
                  .toString(),
          },
        ]}
      >
        {value}
      </Text>
      {/* <Text style={styles.rowNumberSmall}>{value < 10 ? `0${value}` : value}</Text> */}
      {/* </View> */}
    </LinearGradient>
  );
};

AnimatedRateRow.propTypes = {
  selected: PropTypes.bool,
  onSelected: PropTypes.func,
  delay: PropTypes.number,
  value: PropTypes.number,
};

export default AnimatedRateRow;

const getStyles = (windowsHeight: number) =>
  StyleSheet.create({
    rowOption: {
      flex: 1,
      justifyContent: 'center',
      overflow: 'hidden',
      borderRadius: 10,
      marginHorizontal: 5,
      marginVertical: 0.5,
    },
    rowNumber: {
      fontFamily: 'Graphik-Regular',
      // position: 'absolute',
      fontSize: (windowsHeight / 10) * 1.4,
      lineHeight: (windowsHeight / 10) * (Platform.OS === 'ios' ? 1.2 : 1.6),
      // fontWeight: 'bold',
      opacity: 0.75,
      // backgroundColor: '#f00a',
      textAlign: 'center',
    },
    rowNumberSmall: {
      fontSize: 30,
      position: 'absolute',
      right: 0,
      bottom: 0,
      color: 'white',
      // fontWeight: 'bold',
    },
  });
