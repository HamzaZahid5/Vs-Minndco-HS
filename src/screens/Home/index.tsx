import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';

function HomeScreen() {
  const flag = useSelector(state => state.flags.isLoading);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>MindCo Relief Home Screen: {flag}</Text>
    </View>
  );
}

export default HomeScreen;
