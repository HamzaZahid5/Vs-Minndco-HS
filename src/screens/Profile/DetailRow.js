import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Paragraph, useTheme } from 'react-native-paper';

const DetailRow = ({ text, label }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  {
    /* EMAIL */
  }
  return (
    <View style={styles.itemRow}>
      <View style={[styles.itemRowTitle]}>
        <Icon
          // color={theme.colors.dark}
          name="email"
          size={20}
          style={styles.itemRowIcon}
        />
        <Paragraph theme={{ colors: { text: theme.colors.dark } }} style={styles.itemRowLabel}>
          {label}
        </Paragraph>
      </View>
      <View style={[styles.itemRowValue]}>
        <Paragraph theme={{ colors: { text: theme.colors.text } }}>{text}</Paragraph>
      </View>
    </View>
  );
};

DetailRow.propTypes = {
  text: PropTypes.string,
  label: PropTypes.string,
};

export default DetailRow;

const getStyles = theme =>
  StyleSheet.create({
    itemRow: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.dark,
      minHeight: 60,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: 500,
      paddingHorizontal: 10,
      flexWrap: 'wrap',
      // borderWidth: 1,
      // borderColor: 'green',
    },
    itemRowTitle: {
      flexDirection: 'row',
      height: '100%',
      alignItems: 'center',
      // borderWidth: 1,
      // borderColor: 'red',
    },
    itemRowIcon: {
      marginRight: 10,
    },
    itemRowLabel: {
      marginRight: 10,
    },
    itemRowValue: {
      textAlign: 'right',
      margin: 'auto',
    },
  });
