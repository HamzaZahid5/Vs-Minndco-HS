import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Color from 'color';
import { LinearGradient } from 'expo-linear-gradient';

const RowItem = ({ title, text, onPress, reverse, locked, testID }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const lockedColor = Color(theme.colors.backdrop).alpha(0.3).toString();
  const gradient = locked ? [lockedColor, lockedColor] : ['#eef5f5', '#e2e9f1', '#e2e9f1', '#e2e9f1', '#cbdcea'];
  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
        {
          width: '100%',
          alignItems: 'center',
        },
        // styles.rowContainer
      ]}
      onPress={locked ? null : onPress}
      testID={testID ?? `stress-triger-${title}`}
    >
      <LinearGradient colors={gradient} style={styles.rowContainer}>
        <View style={[styles.rowMainContent, reverse ? styles.rowReverse : null]}>
          {!!title && <Text style={styles.bodyRowTitle}>{title}</Text>}
          {!!text && <Text style={styles.bodyRowText}>{text}</Text>}
        </View>
        <View style={[styles.rowVerticalDivider, locked ? styles.lockedDivider : null]} />
        <View style={styles.rowActionContent}>
          <Icon
            name={locked ? 'star' : 'play'}
            size={30}
            color={locked ? lockedColor : '#e2e9f1'}
            style={[styles.rowIcon, locked ? styles.iconLocked : null]}
          />
        </View>
      </LinearGradient>
    </Pressable>
  );
};

RowItem.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  onPress: PropTypes.func,
  reverse: PropTypes.bool,
  locked: PropTypes.bool,
  testID: PropTypes.string,
};
export default RowItem;

const getStyles = theme =>
  StyleSheet.create({
    rowContainer: {
      width: '100%',
      margin: 1,
      borderRadius: 15,
      alignItems: 'center',
      overflow: 'hidden',
      flexDirection: 'row',
      // backgroundColor: Color(theme.colors.secondary).lighten(0.5).toString(),
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
      ...theme.fontsHelper.large,
      // margin: 10,
    },
    bodyRowText: {
      ...theme.fonts.light,
      // margin: 10,
    },
    rowVerticalDivider: {
      height: '70%',
      width: 2,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderLeftColor: '#c5ccd4',
      borderRightColor: '#e8f1fa',
    },
    lockedDivider: {
      borderLeftColor: Color('#333333').alpha(0.3).toString(),
      borderRightColor: Color('#333333').alpha(0.3).toString(),
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
    iconLocked: {
      opacity: 0.3,
    },
  });
