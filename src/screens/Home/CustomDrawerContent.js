import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth } from '../../services/Auth';

const CustomDrawerItem = ({ name, icon, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{ flex: 1, marginVertical: 20 }}
  >
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Icon name={icon} size={30} />
      <Text>{name}</Text>
    </View>
  </TouchableOpacity>
);

export default (props) => {
  const { navigation } = props;
  return (
    <DrawerContentScrollView {...props}>
      <CustomDrawerItem
        onPress={() => {
          auth().signOut();
        }}
        icon="account"
        name="Profile"
      />

      <CustomDrawerItem
        onPress={() => {
          navigation.push('StressRate');
          navigation.closeDrawer();
        }}
        icon="heart-pulse"
        name="Statistics"
      />

      <CustomDrawerItem
        onPress={() => {
          navigation.push('StressRate');
          navigation.closeDrawer();
        }}
        icon="teach"
        name="How To..."
      />

      <CustomDrawerItem
        onPress={() => {
          navigation.push('StressRate');
          navigation.closeDrawer();
        }}
        icon="google-cardboard"
        name="Activation"
      />
    </DrawerContentScrollView>
  );
};
