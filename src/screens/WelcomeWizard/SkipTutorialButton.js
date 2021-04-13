import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import ChipButton from '../../components/ChipButton';

const SkipTutorialButton = ({ onPress }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <ChipButton style={styles.linkStyle} labelStyle={styles.labelStyle} onPress={() => onPress()}>
      Skip
    </ChipButton>
  );
};
export default SkipTutorialButton;

const getStyles = theme => StyleSheet.create({
  labelStyle: {
    color: theme.colors.placeholder,
  },
  linkStyle: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    width: 'auto',
  },
});
