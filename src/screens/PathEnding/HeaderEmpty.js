import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const HeaderEmpty = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <Image style={styles.topImage} source={require('../../../assets/images/blank_header_1.png')} />
    </View>
  );
};

export default HeaderEmpty;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      height: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      // marginBottom: 10,
    },
    main: {
      flexDirection: 'row',
    },
    topImage: {
      // borderWidth: 1,
      // borderColor: 'red',
    },
  });
