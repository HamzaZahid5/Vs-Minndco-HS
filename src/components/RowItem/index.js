import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Color from 'color';
import { LinearGradient } from 'expo-linear-gradient';

export default ({ title, text, onPress, reverse }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed
            ? 0.5
            : 1
        },
        {
          width: '100%',
          alignItems: 'center',
        }
        // styles.rowContainer
      ]}
      onPress={onPress}
    >
      <LinearGradient
        colors={[
          "#eef5f5",
          '#e2e9f1',
          '#e2e9f1',
          '#e2e9f1',
          '#cbdcea',
        ]}
        style={styles.rowContainer}
      >
        <View style={[styles.rowMainContent, reverse ? styles.rowReverse : null]}>
          { !!title && <Text style={styles.bodyRowTitle}>{title}</Text>}
          { !!text && <Text style={styles.bodyRowText}>{text}</Text>}
        </View>
        <View style={styles.rowVerticalDivider} />
        <View style={styles.rowActionContent}>
          <Icon name="play" size={30} color="#e2e9f1" style={styles.rowIcon} />
        </View>
      </LinearGradient>
    </Pressable>
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
    ...theme.fonts.large,
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
    borderLeftColor: "#c5ccd4",
    borderRightColor: "#e8f1fa",
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
