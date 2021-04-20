import React from 'react';
import { View, StyleSheet } from 'react-native';
import Carousel from '../Carousel';

export default () => {
  return (
    <View style={styles.container}>
      <Carousel
        style='slide'
        items={[{
          title: 'Welcome, swipe to continue.',
        }, {
          title: 'About feature X.',
        }, {
          title: 'About feature Y.',
        }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    // borderWidth: 1,
    borderColor: 'peru',
  },
});