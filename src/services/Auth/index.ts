import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
// @ts-ignore non ts file
import authentication from './auth'

export const auth = authentication

export const useAuth = () => {
  const [userToken, setUserToken] = useState<FirebaseAuthTypes.User | undefined | null>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchUserToken = async () => {
      try {
        const userTokenString = await AsyncStorage.getItem('userToken')
        if (userTokenString) {
          const userToken = JSON.parse(userTokenString)
          setUserToken(userToken)
        }
      } catch (error) {
        console.log('Error fetching user token from async storage', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserToken()

    const unsubscribe = authentication().onAuthStateChanged(async (authCredentials: FirebaseAuthTypes.User) => {
      if (authCredentials) {
        setUserToken(authCredentials)
        await AsyncStorage.setItem('userToken', JSON.stringify(authCredentials))
      } else {
        setUserToken(null)
        await AsyncStorage.removeItem('userToken')
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return { userToken, isLoading }
}
