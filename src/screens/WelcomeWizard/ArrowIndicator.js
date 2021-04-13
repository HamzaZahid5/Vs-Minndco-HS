import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import Color from 'color';

const ArrowIndicator = ({ name = 'reply' }) => {
  const theme = useTheme();
  return (
    <Icon
      style={[styles.glow, {
        textShadowColor: Color(theme.colors.primary)
        .alpha(0.75)
        .toString(),
      }]}
      name={name}
      size={100}
      color={theme.colors.primary}
    />
  );
};

export default ArrowIndicator;
const styles = StyleSheet.create({
  glow: {
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 15,
  },
});
