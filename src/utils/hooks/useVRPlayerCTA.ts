import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStorageDownloadURL } from './../../services/Storage';
import { useEffect, useState } from 'react';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
const BASE_URL = 'mindco-relief-support.web.app/support/vrplayer';

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

  const openVRPlayerForWeb = async () => {
    const url = `https://${BASE_URL}/?video=${encodeURIComponent(assetUrl)}`;
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
      const url = `https://${BASE_URL}/?video=${encodeURIComponent(assetUrl)}`;
      if (await InAppBrowser.isAvailable()) {
        const startTime = Date.now();
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
          // headers: {
          //   'my-custom-header': 'my custom header value',
          // },
        });

        // @TODO integrate Firebase on VR Player to communicate status through Firestore.
        // very roughly way to guess if an activity is completed or canceled.
        // more than a minute into the VR player, we considered as completed.
        const endTime = Date.now();
        const timeDiffInMS = endTime - startTime;
        const diffInMinutes = timeDiffInMS / 1000 / 60;

        if (diffInMinutes > 1) {
          onComplete();
        } else {
          onCancel();
        }
      } else {
        onError('Cannot open url');
      }
    } catch (error) {
      onError(error.message);
    }
  };
  const openVRPlayerForIOS = () => {
    navigation.navigate('VRMet', {
      assetUrl,
      onCancel,
      onComplete,
    });
  };

  const pleaseWaitAndTryAgain = () => alert('Getting contents, please try again');

  const openVRPlayer =
    Platform.OS === 'ios'
      ? openVRPlayerForIOS
      : Platform.OS === 'android'
      ? openVRPlayerForAndroid
      : openVRPlayerForWeb;

  return assetUrl ? openVRPlayer : pleaseWaitAndTryAgain;
};
export default useVRPlayerCTA;
