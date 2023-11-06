import React from 'react'
import { createDrawerNavigator, DrawerContentComponentProps, DrawerNavigationProp } from '@react-navigation/drawer'
import CustomDrawerContent from './CustomDrawerContent'
import TabsHomeScreen from '../TabsNavigator'

export type DrawerParamList = {
  DrawerHome: undefined
}

export type HomeScreenDrawerNavigationProp = DrawerNavigationProp<DrawerParamList, 'DrawerHome'>

const Drawer = createDrawerNavigator<DrawerParamList>()

const getDrawerContent = (props: DrawerContentComponentProps) => <CustomDrawerContent {...props} />

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator useLegacyImplementation={true}
      // openByDefault
      initialRouteName="DrawerHome"
      drawerContent={getDrawerContent}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fcfcfc',
        },
        lazy: false,
      }}
    >
      <Drawer.Screen name="DrawerHome" component={TabsHomeScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator

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
