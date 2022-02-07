import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
// @ts-ignore: non-ts file
import ChipButton from '../../components/ChipButton';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { translate } from '../../utils/localization';

const NextStepButton = ({ onPress, isLast, testID }: { onPress: () => void; isLast?: boolean; testID?: string }) => {
  const theme = useTheme() as CustomThemeType;
  const styles = getStyles(theme);
  return (
    <ChipButton style={styles.mainStyle} labelStyle={styles.labelStyle} onPress={() => onPress()} testID={testID}>
      {isLast ? translate('commons.general.start') : translate('commons.general.next')}
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
