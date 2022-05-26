import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { PopupWrapper } from '@mindcoxr/rob'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { DefaultScreenRouteType, RootStackParamList } from '../../../types'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const BasicModalScreen = ({ route }: DefaultScreenRouteType<'BasicModal'>) => {
  const { content } = route.params
  // LOCAL STATE
  const [show, setShow] = useState(false)

  // HELPERS
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const closePromiseReolver = useRef(() => {
    return
  })
  // BOOT UP PANEL STATE
  useEffect(() => {
    const unsubsFocus = navigation.addListener('focus', () => {
      // delay for make the auto-open to work
      setTimeout(() => {
        setShow(true)
      }, 100)
    })
    const unsubsBlur = navigation.addListener('blur', () => {
      closePromiseReolver.current()
    })

    return () => {
      unsubsFocus()
      unsubsBlur()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View style={{ flexGrow: 1, overflow: 'hidden' }}>
      <PopupWrapper noPaddingHorizontal show={show} onClose={() => navigation.goBack()}>
        {content({
          close: () => {
            setShow(false)
            return new Promise<void>(res => {
              closePromiseReolver.current = res
            })
          },
        })}
        {/* padding bottom of the panel */}
        <View style={{ marginBottom: insets.bottom }} />
      </PopupWrapper>
    </View>
  )
}

export default BasicModalScreen
