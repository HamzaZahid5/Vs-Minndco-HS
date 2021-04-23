import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth } from '../../services/Auth';
import { useTheme } from 'react-native-paper';

const CustomDrawerItem = ({ name, icon, color, onPress }) => (
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
      <Icon name={icon} size={30} color={color} />
      <Text style={{ color }}>{name}</Text>
    </View>
  </TouchableOpacity>
);

export default (props) => {
  const { navigation } = props;
  const theme = useTheme();
  return (
    <DrawerContentScrollView {...props}>
      <CustomDrawerItem
        onPress={() => {
          auth().signOut();
        }}
        icon="account"
        name="Profile"
        color={theme.colors.dark}
      />

      <CustomDrawerItem
        onPress={() => {
          navigation.push('PathEnding');
          navigation.closeDrawer();
        }}
        icon="heart-pulse"
        name="Statistics"
        color={theme.colors.dark}
      />

      <CustomDrawerItem
        onPress={() => {
          navigation.push('Modal');
          navigation.closeDrawer();
        }}
        icon="teach"
        name="How To..."
        color={theme.colors.dark}
      />

      <CustomDrawerItem
        onPress={() => {
          navigation.push('KitActivation');
          navigation.closeDrawer();
        }}
        icon="google-cardboard"
        name="Activation"
        color={theme.colors.dark}
      />
    </DrawerContentScrollView>
  );
};
