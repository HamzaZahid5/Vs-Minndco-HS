import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerNavigationProp } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import HomeScreen from './index';
// @ts-ignore: unimplemented
import useActivityActions from '../../appActionHooks/useActivityActions';
import useOrientation from '../../utils/hooks/useOrientation';
import { HomeScreenNavigationProp } from './types';
import { SHOW_BASIC_TUTORIAL } from './../../store/selectors';
type DrawerParamList = {
  Home: undefined;
};

export type HomeScreenDrawerNavigationProp = DrawerNavigationProp<DrawerParamList, 'Home'>;

const Drawer = createDrawerNavigator<DrawerParamList>();

const getDrawerContent = (props: DrawerContentComponentProps) => <CustomDrawerContent {...props} />;

const DrawerNavigator = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  const { updateStreak } = useActivityActions();
  const welcomeTutorial = useSelector(SHOW_BASIC_TUTORIAL);
  const orientation = useOrientation();

  useEffect(() => {
    if (welcomeTutorial) {
      navigation.navigate('Tutorial');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [welcomeTutorial]);

  useEffect(() => {
    updateStreak();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Drawer.Navigator
      // openByDefault
      drawerContent={getDrawerContent}
      drawerStyle={{
        width: orientation === 'PORTRAIT' ? 80 : 160,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
};
DrawerNavigator.propTypes = {
  navigation: PropTypes.object,
};
export default DrawerNavigator;
