import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
  const kitId = useSelector(store => store.user.data.kit_id) || "";
  const kitActivated = kitId.length > 0;
  return (
    <DrawerContentScrollView {...props}>

      <CustomDrawerItem
        onPress={() => {
          navigation.push('Modal');
          navigation.closeDrawer();
        }}
        icon="teach"
        name="Learning"
        color={theme.colors.dark}
      />
      
      <CustomDrawerItem
        onPress={() => {
          // auth().signOut();
          navigation.push('Profile');
          navigation.closeDrawer();
        }}
        icon="account"
        name="Profile"
        color={theme.colors.dark}
      />

      <CustomDrawerItem
        onPress={() => {
          navigation.push('Statistics');
          navigation.closeDrawer();
        }}
        icon="heart-pulse"
        name="Statistics"
        color={theme.colors.dark}
      />

      { !kitActivated && (
        <CustomDrawerItem
          onPress={() => {
            navigation.push('KitActivation');
            navigation.closeDrawer();
          }}
          icon="google-cardboard"
          name="Activation"
          color={theme.colors.dark}
        />
      )}
      { kitActivated && (
        <CustomDrawerItem
          onPress={() => {
            navigation.push('AboutVR');
            navigation.closeDrawer();
          }}
          icon="google-cardboard"
          name="About VR"
          color={theme.colors.dark}
        />
      )}
    </DrawerContentScrollView>
  );
};
