import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { activityType } from '../../../types';
// @ts-ignore: non-ts file
import GenericPageLayout from '../../components/GenericPageLayout';
// @ts-ignore: non-ts file
import ScreenDecorator from '../../components/ScreenDecorator';
import { Header as VideoHeader, Body as VideoBody } from './VideoActivity';
import { Header as AudioHeader, Body as AudioBody } from './AudioActivity';
import { Header as VRHeader, Body as VRBody } from './VRActivity';

import { Header as FormHeader, Body as FormBody } from './FormActivity';
// @ts-ignore: non-ts file
import useNavigationResetPathTo from '../../utils/hooks/useNavigationResetPathTo';
// @ts-ignore: non-ts file
import useNextActivity from '../../utils/hooks/useNextActivity';
// @ts-ignore: non-ts file
import useActivityActions from '../../appActionHooks/useActivityActions';
// @ts-ignore: non-ts file
import { formatAsset } from '../../utils/helpers';
import { USER_PROFILE } from '../../store/selectors';
import useVRPlayerCTA, { VRPlayerCTAPropType } from '../../utils/hooks/useVRPlayerCTA';
import { DefaultScreenPropType, DefaultScreenRouteType } from '../../../types';
import useStartPath from '../../utils/hooks/useStartPath';
import AnalyticEvent from '../../utils/AnalyticsEvent';
// @ts-ignore: non-ts file
import { ZOHO_SURVEYS } from '../../utils/constants';

const getWhatContentIs = (act: activityType | { type: string } = { type: '' }) => ({
  video: act.type === '2d-video',
  vr: act.type === 'vr-met',
  audio: act.type === 'audio',
  form: act.type === 'reflection',
  survey: act.type === 'survey',
});

const ActivityScreen = ({
  navigation,
  route,
}: DefaultScreenPropType<'Activity'> & DefaultScreenRouteType<'Activity'>) => {
  const { activityId } = route.params || {};
  const { nextActivity, nextActivityKey } = useNextActivity(activityId);
  const IS = getWhatContentIs(nextActivity);
  const { language, gender } = useSelector(USER_PROFILE);
  const asset = nextActivity ? formatAsset(nextActivity?.asset, language, gender) : null;
  useStartPath('daily_activity', false);
  useEffect(() => {
    const nextActivityTyped = nextActivity as activityType;
    if (!nextActivityTyped || !nextActivityTyped.type || !nextActivityTyped.id) return;
    AnalyticEvent('select_content', { content_type: nextActivityTyped.type, item_id: nextActivityTyped.id });
  }, [nextActivity]);

  const { saveActivityDone } = useActivityActions();

  const routeParams = {
    header: {
      type: IS.form || IS.survey ? 'performance' : 'rate',
      asset: nextActivity?.id,
    },
    body: {
      options: ['LearnRow', 'StatsRow', 'StressManagementRow'],
    },
  };

  const resetPathTo = useNavigationResetPathTo(navigation);

  const handleActivityComplete = (answer?: string) => {
    saveActivityDone(nextActivityKey, answer);
    resetPathTo('PathEnding', routeParams);
  };

  useEffect(() => {
    const nextActivityTyped = nextActivity as activityType;
    if (IS.survey) {
      resetPathTo('Zoho', {
        onCancel: () => {
          navigation.goBack();
        },
        onComplete: handleActivityComplete,
        zohoUrl: ZOHO_SURVEYS[nextActivityTyped.asset].url,
        customData: ZOHO_SURVEYS[nextActivityTyped.asset].customData,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextActivity, IS]);
  const openVRPlayer = useVRPlayerCTA({
    resourceId: IS.vr ? asset : '',
    onCancel: () => {
      // eslint-disable-next-line no-console
      console.log('cancel');
      navigation.goBack();
    },
    onComplete: () => {
      // eslint-disable-next-line no-console
      console.log('complete');
      handleActivityComplete();
    },
  } as VRPlayerCTAPropType);
  return (
    <ScreenDecorator>
      <GenericPageLayout
        fullScroll
        // withKeyboard={true}
        header={
          <View style={styles.hero}>
            <View style={styles.heroView}>
              {IS.video && (
                <VideoHeader title={nextActivity.name} storeAsset={asset} onComplete={handleActivityComplete} />
              )}
              {IS.vr && <VRHeader title={nextActivity.name} onPlay={openVRPlayer} />}
              {IS.audio && (
                <AudioHeader title={nextActivity.name} storeAsset={asset} onComplete={handleActivityComplete} />
              )}
              {IS.form && <FormHeader title={nextActivity.name} />}
            </View>
            <Image
              style={styles.topImage}
              source={require('../../../assets/images/header_bg_5.png')}
              resizeMode="cover"
            />
          </View>
        }
      >
        {IS.video && (
          <VideoBody type={nextActivity.type} duration={nextActivity.duration} description={nextActivity.description} />
        )}
        {IS.vr && (
          <VRBody type={nextActivity.type} duration={nextActivity.duration} description={nextActivity.description} />
        )}
        {IS.audio && (
          <AudioBody type={nextActivity.type} duration={nextActivity.duration} description={nextActivity.description} />
        )}
        {IS.form && (
          <FormBody
            type={nextActivity.type}
            duration={nextActivity.duration}
            description={nextActivity.description}
            asset={nextActivity.asset}
            onComplete={handleActivityComplete}
          />
        )}
      </GenericPageLayout>
    </ScreenDecorator>
  );
};

ActivityScreen.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default ActivityScreen;

const styles = StyleSheet.create({
  hero: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroView: { position: 'absolute' },
  topImage: {
    opacity: 0.75,
    position: 'absolute',
    zIndex: -1,
  },
});
