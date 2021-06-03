import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Headline, Paragraph, useTheme } from 'react-native-paper';

const HeaderStatistics = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>Keep an eye on your statistics</Headline>
      <View style={styles.main}>
        <Paragraph>They are a valuable source of personal infromation about your behavioral change.</Paragraph>
      </View>
    </View>
  );
};

export default HeaderStatistics;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      height: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 20,
    },
    main: {
      flexDirection: 'row',
    },
  });
