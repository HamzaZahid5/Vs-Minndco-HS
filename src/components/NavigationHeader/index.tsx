import { Icon } from '@mindcoxr/rob'
import { useNavigation } from '@react-navigation/native'
import { StackHeaderProps } from '@react-navigation/stack'
import React, { useLayoutEffect } from 'react'
import { View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'

export type HeaderExtraProps = {
  color?: string
  onRigthPressed?: () => void
}

const NavigationHeader = ({ navigation, color, onRigthPressed }: StackHeaderProps & HeaderExtraProps) => {
  return (
    <View
      style={{
        marginVertical: 30,
        marginHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}
    >
      <TouchableRipple
        borderless
        onPress={() => navigation.goBack()}
        style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5, paddingLeft: 5, borderRadius: 16 }}
      >
        <Icon name="LeftArrow" color={color ?? '#fcfcfc'} />
      </TouchableRipple>
      <TouchableRipple
        borderless
        onPress={onRigthPressed}
        style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 16, padding: 5 }}
      >
        <Icon name="QuestionMark" color={color ?? '#fcfcfc'} />
      </TouchableRipple>
    </View>
  )
}

export const useSetHeaderProps = (extraProps: HeaderExtraProps, dependecies: any[]) => {
  const navigation = useNavigation()
  useLayoutEffect(() => {
    navigation.setOptions({
      header: (props: StackHeaderProps) => <NavigationHeader {...extraProps} {...props} />,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependecies])
}

export default NavigationHeader
