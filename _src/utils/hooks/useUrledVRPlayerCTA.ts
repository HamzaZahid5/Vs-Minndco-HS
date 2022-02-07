/* eslint-disable no-console */
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStorageDownloadURL } from './../../services/Storage';
import crashlytics from '../../services/Crashlytics';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { getLocale, translate } from '../localization';
import AnalyticEvent from '../AnalyticsEvent';
import env from '../../../env';
import { VR_SESSIONS_STATES_TYPE } from '../../../types';
import { useRef } from 'react';
// @ts-ignore: non-ts file
import { createVrSession, getVrSession } from '../../services/Firestore';
// @ts-ignore: non-ts file
import { auth } from '../../services/Auth';
const BASE_URL = `${env.webVrURL}`;

//const browserLoop = async (onComplete: () => void, onCancel: () => void, onError: () => void, resourceId: string) => {
const callInAppBrowser = async (assetUrl: string) => {
  const url = `https://${BASE_URL}/${assetUrl}/?lang=${getLocale()}`;
  if (await InAppBrowser.isAvailable()) {
    await InAppBrowser.open(url, {
      // iOS Properties
      dismissButtonStyle: 'close',
      preferredBarTintColor: '#453AA4',
      preferredControlTintColor: 'white',
      readerMode: false,
      animated: true,
      modalPresentationStyle: 'overFullScreen',
      modalTransitionStyle: 'coverVertical',
      modalEnabled: true,
      enableBarCollapsing: true,
      ephemeralWebSession: false,
      // Android Properties
      showTitle: true,
      toolbarColor: '#6200EE',
      secondaryToolbarColor: 'black',
      enableUrlBarHiding: true,
      enableDefaultShare: false,
      forceCloseOnRedirection: true,
    });
  } else {
    throw 'Browser not available';
  }
};

export type VRPlayerCTAPropType = {
  openUrl: string;
  onError: (error: string) => void;
  onCancel: () => void;
  onComplete: () => void;
};

const useUrledVRPlayerCTA = ({
  openUrl = '',
  onCancel = Function,
  onComplete = Function,
  onError = Function,
}: VRPlayerCTAPropType) => {
  const navigation = useNavigation();
  const browserStatus = useRef<VR_SESSIONS_STATES_TYPE>('AWAITING');

  const openVRPlayerForWeb = async () => {
    const url = `https://${BASE_URL}/${openUrl}/?lang=${getLocale()}`;
    await (() =>
      // if user returns to this tab we consider the player as closed
      // thus, we resolve promise when visibility state returns to "visible"
      new Promise(res => {
        const resolve = res;
        window.document.addEventListener('visibilitychange', ev => {
          if (document.visibilityState === 'visible') {
            resolve(true);
          }
        });
        window.open(url, '_blank')?.focus();
      }))();

    // by default, after interact with player we consider the activity as done
    onComplete();
  };
  const openVRPlayerForAndroid = async () => {
    try {
      const browserLoop = async (): Promise<void> => {
        await callInAppBrowser(openUrl);
        onComplete();
      };
      await browserLoop();
    } catch (error: any) {
      crashlytics().recordError(error);
      onError(error.message);
    }
  };
  const openVRPlayerForIOS = () => {
    navigation.navigate('VRMet', {
      assetUrl: openUrl,
      onCancel,
      onComplete,
      useUrl: true,
    });
  };

  const pleaseWaitAndTryAgain = () => alert(translate('commons.messages.gettingContents'));

  const openVRPlayer =
    Platform.OS === 'ios'
      ? openVRPlayerForIOS
      : Platform.OS === 'android'
      ? openVRPlayerForAndroid
      : openVRPlayerForWeb;

  return openVRPlayer;
};
export default useUrledVRPlayerCTA;
