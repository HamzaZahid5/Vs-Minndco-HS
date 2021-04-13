import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import ChipButton from '../../components/ChipButton';

const NextStepButton = ({ onPress, text }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <ChipButton
      style={styles.mainStyle}
      labelStyle={styles.labelStyle}
      onPress={onPress}
    >
      {text}
    </ChipButton>
  );
};
export default NextStepButton;

const getStyles = theme => StyleSheet.create({
  mainStyle: {
    backgroundColor: theme.colors.surface,
    width: 'auto',
  },
  labelStyle: {
    color: theme.colors.text,
  },
});
