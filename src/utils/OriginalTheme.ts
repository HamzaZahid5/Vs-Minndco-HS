import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme, configureFonts } from 'react-native-paper';
import { Theme } from 'react-native-paper/src/types';
import { Theme as NavTheme } from '@react-navigation/native';

import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import Color from 'color';

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'Graphik-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Graphik-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Graphik-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Graphik-Light',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'Graphik-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Graphik-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Graphik-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Graphik-Light',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'Graphik-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Graphik-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Graphik-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Graphik-Light',
      fontWeight: 'normal',
    },
  },
};
const MindCoReliefDefaulTheme = {
  colors: {
    primary: '#3D9AD5',
    secondary: '#2F8DCE',
    dark: Color('#31CCCC').darken(0.3).toString(),
    ligth: '#dedede',
    accent: Color('#F79337').darken(0.2).toString(),
    surface: '#31CCCC',
    notification: '#33BC7E',
    warning: '#F8BE54',
    error: '#F34C78',
    onSurface: '#3D77B0',
  },
  //@ts-ignore: unimplemented
  fonts: configureFonts(fontConfig),
  fontsHelper: {
    heading1: {
      ...PaperDefaultTheme.fonts.regular,
      fontFamily: 'Graphik-Regular',
      fontSize: 36,
      lineHeight: 42,
      minHeight: 46,
      // borderWidth: 1,
      // borderColor: 'red',
      textAlignVertical: 'bottom',
    },
    heading2: {
      ...PaperDefaultTheme.fonts.regular,
      fontFamily: 'Graphik-Regular',
      fontSize: 28,
      lineHeight: 36,
    },
    large: {
      ...PaperDefaultTheme.fonts.regular,
      fontFamily: 'Graphik-Regular',
      fontSize: 18,
      lineHeight: 23,
    },
  },
};
const MindCoReliefDarkTheme = {
  colors: {
    primary: '#3D9AD5',
    secondary: '#2F8DCE',
    dark: Color('#31CCCC').darken(0.3).toString(),
    ligth: '#dedede',
    accent: Color('#F79337').darken(0.2).toString(),
    surface: '#31CCCC',
    notification: '#33BC7E',
    warning: '#F8BE54',
    error: '#F34C78',
    onSurface: '#3D77B0',
  },
  //@ts-ignore: unimplemented
  fonts: configureFonts(fontConfig),
  fontsHelper: {
    heading1: {
      ...PaperDarkTheme.fonts.regular,
      fontFamily: 'Graphik-Regular',
      fontSize: 36,
      lineHeight: 42,
      height: 46,
      borderWidth: 1,
      borderColor: 'red',
      textAlignVertical: 'bottom',
    },
    heading2: {
      ...PaperDarkTheme.fonts.regular,
      fontFamily: 'Graphik-Regular',
      fontSize: 28,
      lineHeight: 36,
    },
    large: {
      ...PaperDarkTheme.fonts.regular,
      fontFamily: 'Graphik-Regular',
      fontSize: 18,
      lineHeight: 23,
    },
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
  fonts: {
    ...PaperDefaultTheme.fonts,
    ...MindCoReliefDefaulTheme.fonts,
  },
  fontsHelper: MindCoReliefDefaulTheme.fontsHelper,
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
  },
  fontsHelper: MindCoReliefDarkTheme.fontsHelper,
};

export type CustomThemeType = Theme &
  NavTheme & {
    colors: {
      secondary: string;
      dark: string;
      warning: string;
      ligth: string;
    };
    fonts: any;
    fontsHelper: {
      heading1: any;
      heading2: any;
      large: any;
    };
  };

export const DarkTheme: CustomThemeType = CombinedDarkTheme;
export const DefaultTheme: CustomThemeType = CombinedDefaultTheme;
