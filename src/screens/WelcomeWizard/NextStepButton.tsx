import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
// @ts-ignore: non-ts file
import ChipButton from '../../components/ChipButton';
import { CustomThemeType } from '../../utils/OriginalTheme';

const NextStepButton = ({ onPress, isLast }: { onPress: () => void; isLast?: boolean }) => {
  const theme = useTheme() as CustomThemeType;
  const styles = getStyles(theme);
  return (
    <ChipButton style={styles.mainStyle} labelStyle={styles.labelStyle} onPress={() => onPress()}>
      {isLast ? 'Start' : 'Next'}
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
    labelStyle: {
      // color: theme.colors.text,
      color: 'white',
    },
  });
