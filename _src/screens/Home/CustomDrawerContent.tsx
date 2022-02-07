import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import { KIT_ACTIVATED } from '../../store/selectors';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { HomeScreenNavigationProp } from './types';
import { HomeScreenDrawerNavigationProp } from './DrawerNavigator';
import { useNavigation } from '@react-navigation/native';
import { translate } from '../../utils/localization';

type CustomDrawerItemPropType = {
  name: string;
  icon: string;
  color: string;
  onPress: () => void;
  testID?: string;
};

const CustomDrawerItem = ({ name, icon, color, onPress, testID }: CustomDrawerItemPropType) => (
  <TouchableOpacity
    testID={testID ? testID + '-button' : 'undefined-drawer-button'}
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
      <Text style={{ color, textAlign: 'center' }}>{name}</Text>
    </View>
  </TouchableOpacity>
);

CustomDrawerItem.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func,
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  // In order to typecheck is needed to use useNavigation, because if navigation field inside prop is used,
  // it is assumes as be only a drawer navigator
  //const navigation = useNavigation<HomeScreenNavigationProp & HomeScreenDrawerNavigationProp>();
  const { navigation } = props;
  const theme = useTheme() as CustomThemeType;
  const kitActivated = useSelector(KIT_ACTIVATED);
  return (
    <DrawerContentScrollView {...props}>
      <CustomDrawerItem
        onPress={() => {
          // auth().signOut();
          navigation.navigate('Profile');
          navigation.closeDrawer();
        }}
        icon="account"
        name={translate('screens.Home.profile')}
        color={theme.colors.secondary}
        testID="drawer-profile"
      />

      <CustomDrawerItem
        onPress={() => {
          navigation.navigate('Library');
          navigation.closeDrawer();
        }}
        icon="teach"
        name={translate('screens.Home.learning')}
        color={theme.colors.secondary}
        testID="drawer-library"
      />

      <CustomDrawerItem
        onPress={() => {
          navigation.navigate('Statistics');
          navigation.closeDrawer();
        }}
        icon="heart-pulse"
        name={translate('screens.Home.statistics')}
        color={theme.colors.secondary}
        testID="drawer-statistics"
      />

      <CustomDrawerItem
        onPress={() => {
          navigation.navigate('Roadmap');
          navigation.closeDrawer();
        }}
        icon="map"
        name={translate('screens.Home.roadmap')}
        color={theme.colors.secondary}
        testID="drawer-roadmap"
      />

      {!kitActivated && (
        <CustomDrawerItem
          onPress={() => {
            navigation.navigate('KitActivation');
            navigation.closeDrawer();
          }}
          icon="google-cardboard"
          name={translate('screens.Home.activation')}
          color={theme.colors.secondary}
          testID="drawer-activation"
        />
      )}
      {kitActivated && (
        <CustomDrawerItem
          onPress={() => {
            navigation.navigate('AboutVR');
            navigation.closeDrawer();
          }}
          icon="google-cardboard"
          name={translate('screens.Home.about-vr')}
          color={theme.colors.secondary}
          testID="drawer-about-vr"
        />
      )}
    </DrawerContentScrollView>
  );
};

CustomDrawerContent.propTypes = {
  navigation: PropTypes.object,
};

export default CustomDrawerContent;
