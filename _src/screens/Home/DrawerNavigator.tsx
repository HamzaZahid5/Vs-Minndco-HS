import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerNavigationProp } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import HomeScreen from './index';
// @ts-ignore: unimplemented
import useActivityActions from '../../appActionHooks/useActivityActions';
import useOrientation from '../../utils/hooks/useOrientation';
import { HomeScreenNavigationProp } from './types';
// @ts-ignore: non-ts file
import HomeLayout from './../../components/HomeLayout';
// @ts-ignore: non-ts file
import { ZOHO_SURVEYS } from './../../utils/constants';
import { ONBOARDING_COMPLETE, SHOW_BASIC_TUTORIAL } from './../../store/selectors';
type DrawerParamList = {
  Home: undefined;
};

export type HomeScreenDrawerNavigationProp = DrawerNavigationProp<DrawerParamList, 'Home'>;

const Drawer = createDrawerNavigator<DrawerParamList>();

const getDrawerContent = (props: DrawerContentComponentProps) => <CustomDrawerContent {...props} />;

const DrawerNavigator = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  const { updateStreak } = useActivityActions();
  const welcomeTutorial = useSelector(SHOW_BASIC_TUTORIAL);
  const onBoardingComplete = useSelector(ONBOARDING_COMPLETE);
  const [loadingTutorial, setLoadingTutorial] = useState<boolean>(true);
  const orientation = useOrientation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (welcomeTutorial !== undefined) {
      if (!onBoardingComplete) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Zoho',
              params: {
                onComplete: () => {
                  dispatch({ type: 'user/onBoardingComplete' });
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }],
                  });
                },
                onCancel: () => navigation.goBack(),
                zohoUrl: ZOHO_SURVEYS.onboardingSurvey.url,
                customData: ZOHO_SURVEYS.onboardingSurvey.customData,
              },
            },
          ],
        });
      } else if (welcomeTutorial === true) navigation.navigate('Tutorial');
      else setLoadingTutorial(false); // Render screen only when tutorial was loaded and doesn't have to be done.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [welcomeTutorial, onBoardingComplete]);

  useEffect(() => {
    updateStreak();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return loadingTutorial ? (
    <HomeLayout /> /*Render a void HomeLayout if it is loading*/
  ) : (
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

/*
container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  */
