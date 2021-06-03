import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';

const CustomDrawerItem = ({ name, icon, color, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ flex: 1, marginVertical: 20 }}>
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

CustomDrawerItem.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func,
};

const CustomDrawerContent = props => {
  const { navigation } = props;
  const theme = useTheme();
  const kitId = useSelector(store => store.user.data.kit_id) || '';
  const kitActivated = kitId.length > 0;
  return (
    <DrawerContentScrollView {...props}>
      <CustomDrawerItem
        onPress={() => {
          navigation.push('Library');
          navigation.closeDrawer();
        }}
        icon="teach"
        name="Learning"
        color={theme.colors.secondary}
      />

      <CustomDrawerItem
        onPress={() => {
          // auth().signOut();
          navigation.push('Profile');
          navigation.closeDrawer();
        }}
        icon="account"
        name="Profile"
        color={theme.colors.secondary}
      />

      <CustomDrawerItem
        onPress={() => {
          navigation.push('Statistics');
          navigation.closeDrawer();
        }}
        icon="heart-pulse"
        name="Statistics"
        color={theme.colors.secondary}
      />

      {!kitActivated && (
        <CustomDrawerItem
          onPress={() => {
            navigation.push('KitActivation');
            navigation.closeDrawer();
          }}
          icon="google-cardboard"
          name="Activation"
          color={theme.colors.secondary}
        />
      )}
      {kitActivated && (
        <CustomDrawerItem
          onPress={() => {
            navigation.push('AboutVR');
            navigation.closeDrawer();
          }}
          icon="google-cardboard"
          name="About VR"
          color={theme.colors.secondary}
        />
      )}
    </DrawerContentScrollView>
  );
};

CustomDrawerContent.propTypes = {
  navigation: PropTypes.object,
};

export default CustomDrawerContent;
