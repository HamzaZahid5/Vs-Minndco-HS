import { useEffect, useRef, useState } from 'react'
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'

async function registerForPushNotificationsAsync() {
  let token
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    console.log({existingStatus})
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
    console.log({token})
  } else {
    alert('Must use physical device for Push Notifications')
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  return token
}

export default function usePushNotifications() {
  const [message, setMessage] = useState<FirebaseMessagingTypes.RemoteMessage | null>()

  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState<Notifications.Notification | null>(null)
  const notificationListener = useRef<any>()
  const responseListener = useRef<any>()

  useEffect(() => {
    const onNotificationListener = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log({ remoteMessage })
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
      console.log('Hey')
      console.log('Message handled in the background!', remoteMessage)
      setMessage(remoteMessage)
    })

    const checkTokenValidity = async () => {
      const currentToken = await messaging().getToken()
      const isTokenValid = messaging().isDeviceRegisteredForRemoteMessages
      if (!isTokenValid) {
        await messaging().registerDeviceForRemoteMessages()
      }

      console.log('Current token:', currentToken)
      console.log('Is token valid?', isTokenValid)
    }

    checkTokenValidity()

    // messaging().deleteToken()

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

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    })

    registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token))

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification)
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response)
    })

    return () => {
      onNotificationListener()
      onMessageListener()
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [message])

  return message
}
