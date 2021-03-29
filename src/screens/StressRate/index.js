import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import Row from './AnimatedRateRow';

export default ({ navigation }) => {
  const theme = useTheme();
  const [selected, setSelection] = useState();
  const rate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const colorsIni = ['#2B69DA', '#31CCCC', '#37AD38', '#68C33B', '#9DDB3D', '#FBF042', '#F8BE54', '#F8BE54', '#F48568', '#F34C78'];
  const colorsEnd = ['#014BD2', '#01BFBF', '#019800', '#3CB102', '#7FCE00', '#BDE500', '#CCBC00', '#F4A414', '#F1542B', '#EC0040'];

  // useEffect(() => {
  //   navigation.push('')
  // }, [selected]);
  const onSelected = idx => {
    if (idx === selected) {
      navigation.push('StressActivity');
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      { rate.reverse().map(i => (
        <TouchableOpacity
          key={`rate_${i}`}
          onPress={() => !selected ? setSelection(i) : null}
          style={{ flex: 1 }}
        >
          <Row
            selected={selected >= i}
            delay={i * 50}
            value={i}
            color={colorsIni[i-1]}
            onSelected={() => onSelected(i)}
          />
        </TouchableOpacity>
      ))}
    </View>
  )
}