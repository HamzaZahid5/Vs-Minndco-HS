import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from 'color';

const GoalWidget = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      {/* <Text>Next goal:</Text> */}
      <View style={styles.iconContainer}>
        <Icon name="circle" size={30} color="#F0E983" />
        <Icon style={styles.iconShadow} name="circle" size={30} color="#B49B64" />
        <Icon style={styles.iconCurrencySign} name="star" size={20} color="#B49B64" />
      </View>
      <View style={styles.background}>
        <Text style={styles.text}>{"Today's goal: 1 activity"}</Text>
      </View>
    </View>
  );
};

export default GoalWidget;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginVertical: 10,
      // flexWrap: 'wrap',
      // width: '100%',
    },
    iconContainer: {
      zIndex: 10,
      marginRight: -20,
      marginTop: -2,
    },
    iconShadow: {
      position: 'absolute',
      zIndex: -1,
      top: 2,
    },
    iconCurrencySign: {
      position: 'absolute',
      // zIndex: -1,
      top: '15%',
      left: '15%',
    },
    background: {
      height: 23,
      paddingLeft: 25,
      paddingRight: 10,
      borderRadius: 12,
      backgroundColor: Color(theme.colors.secondary).darken(0).alpha(0.5).toString(),
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    text: {
      ...theme.fonts.light,
      color: theme.colors.placeholder,
    },
  });
