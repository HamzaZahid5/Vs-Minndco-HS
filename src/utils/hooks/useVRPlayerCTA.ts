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
const callInAppBrowser = async (sessionId: string, assetUrl: string, resourceId: string) => {
  const lang = getLocale();
  const url = `https://${BASE_URL}/?lang=${lang}&video=${encodeURIComponent(assetUrl)}&sessionId=${sessionId}`;
  if (await InAppBrowser.isAvailable()) {
    AnalyticEvent('video_start', { video_type: 'vr', video_id: resourceId });
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
  resourceId: string;
  onError: (error: string) => void;
  onCancel: () => void;
  onComplete: () => void;
};

const useVRPlayerCTA = ({
  resourceId,
  onCancel = Function,
  onComplete = Function,
  onError = Function,
}: VRPlayerCTAPropType) => {
  const assetUrl = useStorageDownloadURL(resourceId) || '';
  const navigation = useNavigation();
  const browserStatus = useRef<VR_SESSIONS_STATES_TYPE>('AWAITING');
  const onCompleteWithAnalytics = () => {
    AnalyticEvent('video_end', { video_type: 'vr', video_id: resourceId });
    onComplete();
  };

  const openVRPlayerForWeb = async () => {
    const url = `https://${BASE_URL}/?video=${encodeURIComponent(assetUrl)}`;
    AnalyticEvent('video_start', { video_type: 'vr', video_id: resourceId });
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
    onCompleteWithAnalytics();
  };
  const openVRPlayerForAndroid = async () => {
    try {
      const browserLoop = async (oldSessionId?: string): Promise<void> => {
        browserStatus.current === 'AWAITING';
        const startTime = Date.now();
        let sessionId;

        if (oldSessionId) {
          sessionId = oldSessionId;
        } else {
          sessionId = await createVrSession(auth().currentUser.uid);
        }
        if (!sessionId) {
          throw 'Undefined as sessionID';
        }
        await callInAppBrowser(sessionId, assetUrl, resourceId);
        const { state, progress } = await getVrSession(sessionId);
        browserStatus.current = state;
        if (browserStatus.current === 'PERMISSIONS') {
          return await browserLoop(sessionId);
        }
        const endTime = Date.now();
        const timeDiffInMS = endTime - startTime; //TODO save in-activity time
        if (progress > env.activityCompletitionPorcentage) {
          onCompleteWithAnalytics();
        } else {
          onCancel();
        }
      };
      await browserLoop();
    } catch (error: any) {
      crashlytics().recordError(error);
      onError(error.message);
    }
  };
  const openVRPlayerForIOS = () => {
    navigation.navigate('VRMet', {
      assetUrl,
      onCancel,
      onComplete: onCompleteWithAnalytics,
    });
  };

  const pleaseWaitAndTryAgain = () => alert(translate('commons.messages.gettingContents'));

  const openVRPlayer =
    Platform.OS === 'ios'
      ? openVRPlayerForIOS
      : Platform.OS === 'android'
      ? openVRPlayerForAndroid
      : openVRPlayerForWeb;

  return assetUrl ? openVRPlayer : pleaseWaitAndTryAgain;
};
export default useVRPlayerCTA;
