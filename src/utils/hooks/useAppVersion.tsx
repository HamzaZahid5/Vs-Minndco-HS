import React, { useEffect } from 'react'
import axios from 'axios'
import { Platform } from 'react-native'
import { useDispatch } from 'react-redux'
import pkg from '../../../package.json'
import { RootStackParamList } from '../../../types'
import { StackNavigationProp } from '@react-navigation/stack'

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
      console.log({ latestVersion })
      const currentVersion = pkg.version
      console.log({ currentVersion })
      if (latestVersion !== currentVersion) {
        // mostrar mensaje de actualización
        dispatch({ type: 'user/setShowNeedUpdate', payload: true })
        setTimeout(() => {
          navigation && navigation.navigate('UpdateApp')
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
            navigation && navigation.navigate('UpdateApp')
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
