import React from 'react';
import { useTheme } from 'react-native-paper';
import { View, Text } from 'react-native';
import { CustomThemeType, DefaultTheme } from './OriginalTheme';

const getComponent = (id: string, val: string) => (
  <View key={id}>
    <Text style={{ color: val }}>{id}</Text>
  </View>
);
const inspect = (theme: CustomThemeType, pre = '') => {
  const retVal: Array<any> = [];
  Object.keys(theme).forEach(k => {
    // @ts-ignore: unimplemented
    const el = theme[k];
    if (typeof el === 'object') {
      inspect(el, k);
    } else {
      retVal.push(getComponent(pre + '_' + k, el));
    }
  });
  return retVal;
};
const ThemeInspector = () => {
  const theme = DefaultTheme;
  // console.log(theme);
  // @ts-ignore: unimplemented
  const config = inspect(theme.colors);

  return <View style={{ backgroundColor: 'gray' }}>{config}</View>;
};

export default ThemeInspector;
