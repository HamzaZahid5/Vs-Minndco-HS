import React, { useEffect, useState } from 'react'
import LoadingComponent from './LoadingComponent'
import ErrorComponent from './ErrorComponent'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import firestore, { useFirestoreListener } from '../../services/Firestore'
import { ActivityIndicator, View } from 'react-native'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

interface ActivityComponentProps {
  userToken: FirebaseAuthTypes.User | null | undefined
  navigatorRef: any
  auth: () => { signOut: () => void }
  translate: (key: string, options?: { defaultValue: string }) => string
  userData: Record<string, unknown> | null | undefined
  store: any
}

const ActivityComponent: React.FC<ActivityComponentProps> = ({
  userToken,
  navigatorRef,
  auth,
  translate,
  userData,
  store,
}) => {
  const userId = userToken?.uid ?? ''
  const [loading, setLoading] = useState(true)
  const [showButtonBack, setShowButtonBack] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleBackPress = () => {
    auth().signOut()
    if (navigatorRef?.current) {
      navigatorRef.current.navigate('Landing')
    }
  }
  const snapshotData = useFirestoreListener('users', userId)

  useEffect(() => {
    return () => {}
  }, [userData])

  useEffect(() => {
    setLoading(true)

    if (snapshotData) {
      setHasError(true)
      auth().signOut()
      if (navigatorRef?.current) {
        navigatorRef.current.navigate('Landing')
      }
      setLoading(false)
    } else {
      userId &&
        firestore()
          .collection('users')
          .doc(userId)
          .onSnapshot((docSnapshot: FirebaseFirestoreTypes.DocumentSnapshot) => {
            console.log('No user found - search with webhook')
            if (docSnapshot?.data()) {
              const userDataSnap = docSnapshot?.data()
              store.dispatch({ type: 'user/setUser', payload: userDataSnap })
            } else {
              setHasError(true)
            }
            setLoading(false)
          })
    }
  }, [userToken, auth, navigatorRef, userId, store])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowButtonBack(true)
    }, 7000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return <LoadingComponent showButtonBack={showButtonBack} onBackPress={handleBackPress} translate={translate} />
}

export default ActivityComponent
