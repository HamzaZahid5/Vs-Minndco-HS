import { Headline, Icon } from '@mindcoxr/rob'
import { useNavigation } from '@react-navigation/native'
import { StackHeaderProps } from '@react-navigation/stack'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'

export type HeaderExtraProps = {
  color?: string
  onRigthPressed?: () => void
  routeName?: string
  backgroundColor?: string
  height?: string
  contentAtBottom?: boolean
}

const NavigationHeader = ({
  navigation,
  color,
  onRigthPressed,
  routeName,
  backgroundColor,
  height,
  contentAtBottom,
}: StackHeaderProps & HeaderExtraProps) => {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => setShow(false))
    const unsubscribeFocus = navigation.addListener('focus', () => setShow(true))

    return () => {
      unsubscribeBlur()
      unsubscribeFocus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (!show) return null
  return (
    <View
      style={[
        {
          paddingHorizontal: 25,
          paddingTop: contentAtBottom ? 51 : 30,
          paddingBottom: contentAtBottom ? 17 : 30,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        },
        height !== undefined && { height: 0 },
        backgroundColor !== undefined && { backgroundColor },
      ]}
    >
      <TouchableRipple
        borderless
        onPress={() => navigation.goBack()}
        style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5, paddingLeft: 5, borderRadius: 16 }}
      >
        <Icon name="LeftArrow" color={color ?? '#fcfcfc'} />
      </TouchableRipple>
      {routeName !== undefined && (
        <Headline size="small" textAlign="center" weight="bold">
          {routeName}
        </Headline>
      )}
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
