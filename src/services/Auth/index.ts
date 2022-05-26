import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useState, useEffect } from 'react'
import { useSelector, useStore, useDispatch } from 'react-redux'
// @ts-ignore non ts file
import authentication from './auth'

export const auth = authentication

export const useAuth = () => {
  const [userToken, setUserToken] = useState<FirebaseAuthTypes.User | undefined | null>()

  useEffect(() => {
    const unsubscribe = authentication().onAuthStateChanged(async (authCredentials: FirebaseAuthTypes.User) => {
      if (authCredentials) {
        setUserToken(authCredentials)
      } else {
        setUserToken(null)
      }
    })

    return () => {
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return userToken
}
