import React from 'react';
import {View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

export default ({ onVote }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <Text>Congratulations!</Text>
      <View style={styles.main}>
        <Text>VR videos are now part of the main program among other activities.</Text>
      </View>
    </View>
  )
}

const getStyles = theme => StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  main: {
    flexDirection: 'row',
  },
});
