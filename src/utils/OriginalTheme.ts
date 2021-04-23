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
import Color from 'color';

const MindCoReliefDefaulTheme = {
  colors: {
    primary: '#3D9AD5',
    secondary: '#31CCCC',
    dark: Color('#31CCCC').darken(0.3).toString(),
    accent: '#F79337',
    surface: '#31CCCC',
    notification: '#33BC7E',
    warning: '#F8BE54',
    error: '#F34C78',
    onSurface: '#3D77B0',
  },
  fonts: {
    heading1: {
      ...PaperDefaultTheme.fonts.regular,
      fontSize: 36,
      lineHeight: 43,
    },
    heading2: {
      ...PaperDefaultTheme.fonts.regular,
      fontSize: 28,
      lineHeight: 36,
    },
    large: {
      ...PaperDefaultTheme.fonts.regular,
      fontSize: 18,
      lineHeight: 23,
    },
  }
};
const MindCoReliefDarkTheme = {
  colors: {
    primary: '#3D9AD5',
    secondary: '#31CCCC',
    dark: Color('#31CCCC').darken(0.3).toString(),
    warning: '#ff0000',
    surface: '#31CCCC',
  },
  fonts: {
    heading1: {
      ...PaperDarkTheme.fonts.regular,
      fontSize: 36,
      lineHeight: 43,
    },
    heading2: {
      ...PaperDarkTheme.fonts.regular,
      fontSize: 28,
      lineHeight: 36,
    },
    large: {
      ...PaperDarkTheme.fonts.regular,
      fontSize: 18,
      lineHeight: 23,
    },
  }
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
  fonts: {
    ...PaperDefaultTheme.fonts,
    ...MindCoReliefDefaulTheme.fonts,
  }
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
  fonts: {
    ...PaperDarkTheme.fonts,
    ...MindCoReliefDarkTheme.fonts,
  }
};

export type CustomThemeType = Theme & NavTheme & {
  colors: {
    secondary: string,
    dark: string,
    warning: string,
  },
  fonts: {
    heading1: any,
    heading2: any,
    large: any,
  }
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