import React from 'react';
import auth from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import Props from './types';
import { RootState } from '../../store/reducer';

// selector
const selectLoadingFlag = (state: RootState) => state.flags.isLoading

const HomeScreen = ({ navigation }: Props) => {
  const flag = useSelector(selectLoadingFlag);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>MindCo Relief Home Screen: {flag}</Text>
      <Button icon="camera" mode="contained" onPress={() => navigation.push('Registration')}>
        Press me
      </Button>
      <Text> </Text>
      <Button icon="cancel" mode="contained" onPress={() => auth().signOut()}>
        Sign Out
      </Button>
    </View>
  );
}

export default HomeScreen;
