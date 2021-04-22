import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Color from 'color';

export default () => {
  const theme = useTheme();
  console.log(theme);
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        If you ever feel the urge of stress, tap the button in the bottom righ corner.
      </Text>
    </View>
  )
}

const getStyles = theme => StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: Color(theme.colors.secondary).darken(0).alpha(0.5).toString(), //theme.colors.secondary,
    marginHorizontal: 20,
    maxWidth: 300,
    padding: 10,
  },
  text: {
    ...theme.fonts.light,
    color: theme.colors.placeholder
  }
});
