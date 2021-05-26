import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Color from 'color';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from 'react-native-paper';

export default ({
  selected,
  onSelected,
  delay,
  value = 0,
  color = 'white',
}) => {
  const theme = useTheme();
  const [highlight, setHighlight] = useState();
  useEffect(() => {
    if (selected) {
      setTimeout(() => {
        setHighlight(true);
        setTimeout(onSelected, 500);
      }, delay);
    } else {
      setHighlight(false);
    }
  }, [selected])
  return (
    <LinearGradient
      colors={[
        "#eef5f5",
        '#e2e9f1',
        '#e2e9f1',
        '#e2e9f1',
        '#cbdcea',
      ]}
      style={styles.rowOption}
    >
      {/* <View style={styles.rowOption}> */}
      <Text style={[styles.rowNumber, {
        color: highlight ? Color('#3D9AD5').mix(Color('#d53d4c'), value/10)   : Color('white').darken(value/10 + 0.1).toString(),
      }]}>{value}</Text>
      <Text style={styles.rowNumberSmall}>{value < 10 ? `0${value}` : value}</Text>
    {/* </View> */}
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  rowOption: {
    flex: 1,
    // borderBottomWidth: 3,
    // borderColor: 'white',
    // borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    flexWrap: 'wrap',
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 0.5,
    // maxHeight: '10%',
  },
  rowNumber: {
    position: 'absolute',
    fontSize: 120,
    fontStyle: 'italic',
    fontWeight: 'bold',
    opacity: 0.75,
  },
  rowNumberSmall: {
    fontSize: 30,
    position: 'absolute',
    left: 0,
    bottom: 0,
    color: 'white',
    fontWeight: 'bold',
  }
})