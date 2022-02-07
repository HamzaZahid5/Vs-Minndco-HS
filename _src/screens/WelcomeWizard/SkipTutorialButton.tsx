import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
// @ts-ignore: non-ts file
import ChipButton from '../../components/ChipButton';
import { translate } from '../../utils/localization';
import { CustomThemeType } from '../../utils/OriginalTheme';

const SkipTutorialButton = ({ onPress, testID }: { onPress: () => void; testID?: string }) => {
  const theme = useTheme() as CustomThemeType;
  const styles = getStyles(theme);
  return (
    <ChipButton style={styles.linkStyle} labelStyle={styles.labelStyle} onPress={() => onPress()} testID={testID}>
      {translate('commons.general.skip')}
    </ChipButton>
  );
};
export default SkipTutorialButton;

const getStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    labelStyle: {
      color: theme.colors.placeholder,
    },
    linkStyle: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      width: 'auto',
    },
  });
