import messaging from '@react-native-firebase/messaging';
// @ts-ignore: non-ts file
import { updateDeviceInfo } from './../services/Firestore';
import { isArray, isObject } from 'lodash';

const handle = () => {
  const setToken = (token: Array<string> | string | undefined) => {
    const safeToken = isArray(token) ? token.join('') : isObject(token) ? Object.values(token).join('') : token;
    updateDeviceInfo({ token: safeToken });
  };

  messaging().onTokenRefresh(async fcmToken => {
    setToken(fcmToken);
  });
  const pushNotifRegister = async () => {
    let token;
    const hasPermissions = await messaging().hasPermission();
    if (hasPermissions) {
      token = await messaging().getToken();
    } else {
      const authorizationStatus = await messaging().requestPermission({ alert: true, sound: true, provisional: true });
      if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        token = await messaging().getToken();
      } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
        // eslint-disable-next-line no-console
        console.log('User has provisional notification permissions.');
      } else {
        // eslint-disable-next-line no-console
        console.log('User has notification permissions disabled');
      }
    }
    setToken(token);
  };
  pushNotifRegister();
};

export default handle;
