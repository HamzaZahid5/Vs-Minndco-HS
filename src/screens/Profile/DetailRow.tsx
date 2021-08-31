import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Paragraph, useTheme } from 'react-native-paper';
import { CustomThemeType } from '../../utils/OriginalTheme';

const DetailRow = ({ text, label }: { text: string; label: string }) => {
  const theme = useTheme() as CustomThemeType;
  const styles = getStyles(theme);
  return (
    <View style={styles.itemRow}>
      <View style={[styles.itemRowTitle]}>
        <Icon
          // color={theme.colors.dark}
          name="email"
          size={20}
          style={styles.itemRowIcon}
          color={theme.colors.ligth}
        />
        <Paragraph style={styles.itemRowLabel}>{label}</Paragraph>
      </View>
      <View style={[styles.itemRowValue]}>
        <Paragraph style={styles.itemRowValueParagraph}>{text}</Paragraph>
      </View>
    </View>
  );
};

DetailRow.propTypes = {
  text: PropTypes.string,
  label: PropTypes.string,
};

export default DetailRow;

const getStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    itemRow: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.ligth,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: 500,
      paddingHorizontal: 10,
      flexWrap: 'wrap',
      flexBasis: '100%',
    },
    itemRowTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      flexGrow: 1,
    },
    itemRowIcon: {
      marginRight: 10,
    },
    itemRowLabel: {
      marginRight: 10,
      color: theme.colors.ligth,
    },
    itemRowValue: {
      textAlign: 'right',
      margin: 'auto',
      alignItems: 'flex-end',
      flexGrow: 1,
    },
    itemRowValueParagraph: {
      color: theme.colors.ligth,
    },
  });
