import React from 'react'
import { View, Text as NativeText, TouchableOpacity } from 'react-native'
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer'
import { Button, Icon, Paragraph, Row, Subheading, useRobTheme, ButtonSubVariant } from '@mindcoxr/rob'
import { IconNamesTypes } from '@mindcoxr/rob/dist/typescript/components/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../types'
import Logo from '../../../assets/SVG/Logo'
import { HAS_VIEWER, IS_PREMIUM } from '../../store/selectors'
import { translate } from '../../utils/localization'
import { auth } from '../../services/Auth'
import { activateKit } from '../../services/Firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
  const StackNavigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const dispatch = useDispatch()

  const theme = useRobTheme()
  const isPremium = useSelector(IS_PREMIUM)
  const hasViewer = useSelector(HAS_VIEWER)

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ paddingHorizontal: 26, paddingVertical: 46 }}>
        <View style={{ marginBottom: 50, marginLeft: 34 - 26 }}>
          <Logo />
        </View>
        <CustomDrawerItem
          onPress={() => {
            StackNavigation.navigate('Profile')
            navigation.closeDrawer()
          }}
          icon="TwoPeople"
          name={translate('screens.Drawer.profile', { defaultValue: 'Profile' })}
          color={theme.colors.monochrome.offBlack}
          testID="drawer-profile"
        />
        {/* {!isPremium && (
          <CustomDrawerItem
            onPress={() => {
              // auth().signOut();
              navigation.navigate('KitActivation')
              navigation.closeDrawer()
            }}
            icon="Code"
            name={translate('screens.Drawer.activate_by_code', { defaultValue: 'Redeem code' })}
            color={theme.colors.monochrome.offBlack}
            testID="drawer-profile"
          />
        )} */}
        {/* {hasViewer && ( */}
          <CustomDrawerItem
            onPress={() => {
              StackNavigation.navigate('KitWelcome')
              navigation.closeDrawer()
            }}
            icon="VR"
            name={translate('screens.Drawer.vr_basics', { defaultValue: 'VR Basics' })}
            color={theme.colors.monochrome.offBlack}
            testID="drawer-profile"
          />
        {/* )} */}
        {/* {!hasViewer && isPremium && (
          <CustomDrawerItem
            onPress={() => {
              activateKit()
              StackNavigation.navigate('KitWelcome')
              navigation.closeDrawer()
            }}
            icon="VR"
            name={translate('screens.Drawer.kit_received', { defaultValue: "I've received my kit" })}
            color={theme.colors.monochrome.offBlack}
            testID="drawer-profile"
          />
        )} */}
        <CustomDrawerItem
          onPress={() => {
            const PopupContent = ({ close }: { close: () => Promise<void> }) => (
              <>
                <Row gutter={10}>
                  <Subheading>
                    {translate('screens.Drawer.sign_out_title', { defaultValue: "You'll be signed out" })}
                  </Subheading>
                </Row>
                <Row grow justifyContentOnGrow="flex-start" gutter={10}>
                  <Paragraph size="xsmall" weight="normal" textAlign="center">
                    {translate('screens.Drawer.sign_out_description', {
                      defaultValue: "Next time you open the app you'll be required to sign in again.",
                    })}
                  </Paragraph>
                </Row>
                <Row>
                  <Button
                    onPress={async () => {
                      await close()
                      await auth().signOut()
                      await AsyncStorage.removeItem('userToken')
                      dispatch({type: "smokeRecord/clearSmokesByDay"})
                    }}
                    subVariant={ButtonSubVariant.danger}
                  >
                    {translate('screens.Drawer.sign_out_CTA_yes', { defaultValue: 'Yes, sign out' })}
                  </Button>
                  <Button role="secondary" onPress={close}>
                    {translate('screens.Drawer.sign_out_CTA_no', { defaultValue: 'Keep me signed in' })}
                  </Button>
                </Row>
              </>
            )
            navigation.navigate('BasicModal', {
              content: PopupContent,
            })
            navigation.closeDrawer()
          }}
          icon="LogOutCircle"
          name={translate('screens.Drawer.sign_out_menuOption', { defaultValue: 'Sign out' })}
          color={theme.colors.monochrome.offBlack}
          testID="drawer-profile"
        />
      </View>
    </DrawerContentScrollView>
  )
}

export default CustomDrawerContent
