import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Color from 'color';

export default ({ title, text, onPress, reverse }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <TouchableOpacity style={[styles.rowContainer]} onPress={onPress}>
      <View style={[styles.rowMainContent, reverse ? styles.rowReverse : null]}>
        { !!title && <Text style={styles.bodyRowTitle}>{title}</Text>}
        { !!text && <Text style={styles.bodyRowText}>{text}</Text>}
      </View>
      <View style={styles.rowVerticalDivider} />
      <View style={styles.rowActionContent}>
        <Icon name="play" size={30} color={Color(theme.colors.secondary).lighten(0.5).toString()} style={styles.rowIcon} />
      </View>
    </TouchableOpacity>
  );
};

const getStyles = theme => StyleSheet.create({
  rowContainer: {
    width: '100%',
    margin: 1,
    borderRadius: 15,
    alignItems: 'center',
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: Color(theme.colors.secondary).lighten(0.5).toString(),
  },
  rowMainContent: {
    flex: 1,
    // backgroundColor: '#f00a',
    paddingLeft: 20,
    paddingVertical: 20,
  },
  rowReverse: {
    flexDirection: 'column-reverse',
  },
  bodyRowTitle: {
    ...theme.fonts.large,
    // margin: 10,
  },
  bodyRowText: {
    ...theme.fonts.light,
    // margin: 10,
  },
  rowVerticalDivider: {
    height: '70%',
    width: 1,
    borderLeftWidth: 1,
    borderColor: theme.colors.secondary,
  },
  rowIcon: {
    margin: 20,
    backgroundColor: theme.colors.secondary,
    padding: 5,
    // borderWidth: 1,
    borderColor: 'green',
    borderRadius: 20,
    overflow: 'hidden',
  },
});
