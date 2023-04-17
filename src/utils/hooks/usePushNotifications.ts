import { useEffect, useState } from 'react'
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging'

export default function usePushNotifications() {
  const [message, setMessage] = useState<FirebaseMessagingTypes.RemoteMessage | null>()
  useEffect(() => {
    const onNotificationListener = messaging().onNotificationOpenedApp(remoteMessage => {
      // WORKS ONLY ON IOS 14
      // app opens from PN (from QUIT state).
      setMessage(remoteMessage)
    })

    // Do nothing if app is in foreground
    // On notification received with app in foreground
    const onMessageListener = messaging().onMessage(remoteMessage => {
      // PN is not displayed by OS, silent PN received.
      // TEST OK ON ANDROID
      // TEST OK ON IOS 14
      setMessage(remoteMessage)
    })

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // PN received on background
      setMessage(remoteMessage)
    })

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          // app opens from PN
          // TEST OK ON ANDROID
          setMessage(remoteMessage)
        } else {
          // update only on undefined messge, otherwise we'll overwrite a valid remote message
          if (!message) {
            setMessage(null)
          }
        }
      })

    return () => {
      onNotificationListener()
      onMessageListener()
    }
  }, [message])

  return message
}
