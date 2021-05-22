import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import HomeScreen from './index';
// @ts-ignore
import useActivityActions from '../../appActionHooks/useActivityActions';

const Drawer = createDrawerNavigator();

const getDrawerContent = props => (
  <CustomDrawerContent {...props} />
);

export default ({ navigation }) => {
  const { updateStreak } = useActivityActions();
  const welcomeTutorial = useSelector(store => store.user.data.flags.show_basics_tutorial);
  
  useEffect(() => {
    if (welcomeTutorial) {
      navigation.navigate('Tutorial');
    }
  }, [welcomeTutorial]);

  useEffect(() => {
    updateStreak();
  }, []);

  return (
    <Drawer.Navigator
      // openByDefault
      drawerContent={getDrawerContent}
      drawerStyle={{
        width: 80,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen}   options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
};