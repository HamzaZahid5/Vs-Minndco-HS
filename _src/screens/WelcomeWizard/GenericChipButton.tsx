import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
// @ts-ignore: non-ts file
import ChipButton from '../../components/ChipButton';
import { CustomThemeType } from '../../utils/OriginalTheme';

const NextStepButton = ({
  onPress,
  text,
  accent,
  testID,
}: {
  onPress: () => void;
  text: string;
  accent?: boolean;
  testID?: string;
}) => {
  const theme = useTheme() as CustomThemeType;
  const styles = getStyles(theme);
  return (
    <ChipButton
      style={[styles.mainStyle, accent ? styles.accent : null]}
      labelStyle={styles.labelStyle}
      onPress={onPress}
      testID={testID}
    >
      {text}
    </ChipButton>
  );
};
export default NextStepButton;

const getStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    mainStyle: {
      backgroundColor: theme.colors.secondary,
      width: 'auto',
    },
    accent: {
      backgroundColor: theme.colors.accent,
    },
    labelStyle: {
      color: 'white', // theme.colors.text,
    },
  });
