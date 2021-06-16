import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import ChipButton from '../../components/ChipButton';

const NextStepButton = ({ onPress, isLast }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <ChipButton style={styles.mainStyle} labelStyle={styles.labelStyle} onPress={() => onPress()}>
      {isLast ? 'Start' : 'Next'}
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
    labelStyle: {
      // color: theme.colors.text,
      color: 'white'
    },
  });
