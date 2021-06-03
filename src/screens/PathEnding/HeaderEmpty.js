import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const HeaderEmpty = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return <View style={styles.container} />;
};

export default HeaderEmpty;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      height: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    main: {
      flexDirection: 'row',
    },
  });
