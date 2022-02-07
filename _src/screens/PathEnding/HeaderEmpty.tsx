import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const HeaderEmpty = () => {
  const styles = getStyles();
  return (
    <View style={styles.container} testID="path-endind-header-empty">
      <Image style={styles.topImage} source={require('../../../assets/images/blank_header_1.png')} />
    </View>
  );
};

export default HeaderEmpty;

const getStyles = () =>
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
