import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import HomeScreen from './index';
// @ts-ignore: unimplemented
import useActivityActions from '../../appActionHooks/useActivityActions';

const Drawer = createDrawerNavigator();

const getDrawerContent = props => <CustomDrawerContent {...props} />;

const DrawerNavigator = ({ navigation }) => {
  const { updateStreak } = useActivityActions();
  const welcomeTutorial = useSelector(store => store.user.data.flags.show_basics_tutorial);

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
        width: 80,
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
