import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import ChipButton from '../../components/ChipButton';

const NextStepButton = ({ onPress, text, accent }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <ChipButton
      style={[styles.mainStyle, accent ? styles.accent : null]}
      labelStyle={styles.labelStyle}
      onPress={onPress}
    >
      {text}
    </ChipButton>
  );
};
export default NextStepButton;

const getStyles = theme =>
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
