import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Carousel from '../Carousel';

export default ({ content }) => {
  console.log(content)
  return (
    <Carousel
      items={content.pages.map(page => ({
        title: content.title,
        content: (
          <View style={{ flex: 1, height: '100%' }}>
            <Text>{page}</Text>
          </View>
        )
      }))}
    />
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