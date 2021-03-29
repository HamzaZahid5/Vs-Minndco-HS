import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Color from 'color';

export default ({
  selected,
  onSelected,
  delay,
  value = 0,
  color = 'white',
}) => {
  const [highlight, setHighlight] = useState();
  useEffect(() => {
    if (selected) {
      setTimeout(() => {
        setHighlight(true);
        setTimeout(onSelected, 500);
      }, delay);
    }
  }, [selected])
  return (
    <View style={styles.rowOption}>
      <Text style={[styles.rowNumber, {
        color: highlight ? color : Color('white').darken(value/10).toString(),
      }]}>{value}</Text>
      <Text style={styles.rowNumberSmall}>{value < 10 ? `0${value}` : value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rowOption: {
    flex: 1,
    borderBottomWidth: 3,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    flexWrap: 'wrap',
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