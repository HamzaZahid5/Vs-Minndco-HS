import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import { Theme } from "react-native-paper/src/types";
import { Theme as NavTheme } from '@react-navigation/native';

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

const MindCoReliefDefaulTheme = {
  colors: {
    primary: 'pink',
    secondary: '',
  },
};
const MindCoReliefDarkTheme = {
  colors: {
    primary: '#3D9AD5',
    secondary: '#31CCCC',
  },
};

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  ...MindCoReliefDefaulTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    ...MindCoReliefDefaulTheme.colors,
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  ...MindCoReliefDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    ...MindCoReliefDarkTheme.colors,
  },
};

export type CustomThemeType = Theme & NavTheme & {
  colors: {
    secondary: string,
  };
};

export const DarkTheme:CustomThemeType = CombinedDarkTheme;
export const DefaultTheme:CustomThemeType = CombinedDefaultTheme;

// dark: false,
//   roundness: 4,
//   colors: {
//     primary: '#6200ee',
//     accent: '#03dac4',
//     background: '#f6f6f6',
//     surface: white,
//     error: '#B00020',
//     text: black,
//     onBackground: '#000000',
//     onSurface: '#000000',
//     disabled: color(black).alpha(0.26).rgb().string(),
//     placeholder: color(black).alpha(0.54).rgb().string(),
//     backdrop: color(black).alpha(0.5).rgb().string(),
//     notification: pinkA400,
//   },