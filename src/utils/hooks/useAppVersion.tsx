import React, { useEffect } from 'react'
import axios from 'axios'
import { Linking, Platform } from 'react-native'
import { Button, Paragraph, Row, Subheading } from '@mindcoxr/rob'
import { useDispatch } from 'react-redux'
import pkg from '../../../package.json'
import { RootStackParamList } from '../../../types'
import { translate } from '../localization'
import { StackNavigationProp } from '@react-navigation/stack'

// const openStore = () => {
//   if (Platform.OS === 'ios') {
//     const link = 'itms-apps://apps.apple.com/us/app/mindcotine/id1506021271'
//     Linking.canOpenURL(link)
//       .then(supported => {
//         supported && Linking.openURL(link)
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   } else {
//     const linkPlayStore = 'https://play.google.com/store/apps/details?id=com.habitfly.mindcotine&hl=es_419'
//     Linking.canOpenURL(linkPlayStore)
//       .then(supported => {
//         supported && Linking.openURL(linkPlayStore)
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }
// }

// const PopupContent = ({ close }: { close: () => Promise<void> }) => {
//   return (
//     <>
//       <Row gutter={2}>
//         <Subheading>{translate('screens.UpdateScreen.title')}</Subheading>
//       </Row>
//       <Row grow justifyContentOnGrow="flex-start" gutter={10}>
//         <Paragraph size="medium" weight="normal" textAlign="left">
//           {translate('screens.UpdateScreen.description')}
//         </Paragraph>
//       </Row>
//       <Row gutter={10} grow justifyContentOnGrow="flex-end">
//         <Button
//           role="primary"
//           compact
//           onPress={async () => {
//             await close()
//             openStore()
//           }}
//         >
//           {translate('screens.UpdateScreen.confirm')}
//         </Button>
//         <Button
//           role="secondary"
//           compact
//           outline
//           onPress={async () => {
//             await close()
//           }}
//         >
//           {translate('screens.UpdateScreen.later')}
//         </Button>
//       </Row>
//     </>
//   )
// }

const versionsInStore = async (
  appId: string,
  packageName: string,
  dispatch: ReturnType<typeof useDispatch>,
  navigation: StackNavigationProp<RootStackParamList>,
) => {
  try {
    if (Platform.OS === 'ios') {
      const response = await axios.get(`https://itunes.apple.com/lookup?id=${appId}`)
      const latestVersion = response.data.results[0].version
      const currentVersion = pkg.version
      if (latestVersion !== currentVersion) {
        // mostrar mensaje de actualización
        dispatch({ type: 'user/setShowNeedUpdate', payload: true })
        setTimeout(() => {
          navigation &&
            navigation.navigate('UpdateApp')
        }, 100)
      }
    } else if (Platform.OS === 'android') {
      const response = await axios.get(`https://play.google.com/store/apps/details?id=${packageName}`)
      const regex = /\[\[\[['"]((\d+\.)+\d+)['"]\]\],/
      const match = response.data.match(regex)
      if (match) {
        const latestVersion = match[1]
        const currentVersion = pkg.version
        if (latestVersion !== currentVersion) {
          // mostrar mensaje de actualización
          dispatch({ type: 'user/setShowNeedUpdate', payload: true })
          setTimeout(() => {
            navigation &&
              navigation.navigate('UpdateApp')
          }, 100)
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const useAppVersion = (navigation: StackNavigationProp<RootStackParamList>) => {
  const dispatch = useDispatch()
  useEffect(() => {
    versionsInStore('1506021271', 'com.habitfly.mindcotine', dispatch, navigation)
  }, [])
}

export default useAppVersion
