import React from 'react'
import { View, Text as NativeText, TouchableOpacity } from 'react-native'
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer'
import { Icon, Paragraph, useRobTheme } from '@mindcoxr/rob'
import { IconNamesTypes } from '@mindcoxr/rob/dist/typescript/components/Icon'
import Logo from '../../../assets/SVG/Logo'
import { useSelector } from 'react-redux'
import { IS_PREMIUM } from '../../store/selectors'

type CustomDrawerItemPropType = {
  name: string
  icon: IconNamesTypes
  color: string
  onPress: () => void
  testID?: string
}

const CustomDrawerItem = ({ name, icon, onPress, testID, color }: CustomDrawerItemPropType) => (
  <TouchableOpacity
    testID={testID ? testID + '-button' : 'undefined-drawer-button'}
    onPress={onPress}
    style={{ borderRadius: 30, marginVertical: 35 }}
  >
    <View
      style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <Icon name={icon} size={30} color={color} />
      <View style={{ marginLeft: 22 }}>
        <Paragraph size="small" weight="normal" textAlign="left">
          <NativeText style={{ color }}>{name} </NativeText>
        </Paragraph>
      </View>
    </View>
  </TouchableOpacity>
)

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { navigation } = props
  const isPremium = useSelector(IS_PREMIUM)
  const theme = useRobTheme()
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ paddingHorizontal: 26, paddingVertical: 46 }}>
        <View style={{ marginBottom: 50, marginLeft: 34 - 26 }}>
          <Logo />
        </View>
        <CustomDrawerItem
          onPress={() => {
            // auth().signOut();
            navigation.navigate('Profile')
            navigation.closeDrawer()
          }}
          icon="VR"
          name={'Profile'}
          color={theme.colors.monochrome.offBlack}
          testID="drawer-profile"
        />
        <CustomDrawerItem
          onPress={() => {
            // auth().signOut();
            navigation.navigate('Profile')
            navigation.closeDrawer()
          }}
          icon="VR"
          name={'Settings'}
          color={theme.colors.monochrome.offBlack}
          testID="drawer-profile"
        />
        <CustomDrawerItem
          onPress={() => {
            // auth().signOut();
            navigation.navigate('Profile')
            navigation.closeDrawer()
          }}
          icon="VR"
          name={'Learn the basics'}
          color={theme.colors.monochrome.offBlack}
          testID="drawer-profile"
        />
        {!isPremium && (
          <CustomDrawerItem
            onPress={() => {
              // auth().signOut();
              navigation.navigate('KitActivation')
              navigation.closeDrawer()
            }}
            icon="Code"
            name={'Redeem code'}
            color={theme.colors.monochrome.offBlack}
            testID="drawer-profile"
          />
        )}
      </View>
    </DrawerContentScrollView>
  )
}

export default CustomDrawerContent
