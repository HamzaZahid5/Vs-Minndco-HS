import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import GenericPageLayout from '../../components/GenericPageLayout';

import ScreenDecorator from '../../components/ScreenDecorator';
import { Header as VideoHeader, Body as VideoBody } from './VideoActivity';
import { Header as AudioHeader, Body as AudioBody } from './AudioActivity';
import { Header as VRHeader, Body as VRBody } from './VRActivity';
import { Header as FormHeader, Body as FormBody } from './FormActivity';
import useNavigationResetPathTo from '../../utils/hooks/useNavigationResetPathTo';
import useNextActivity from '../../utils/hooks/useNextActivity';
import useActivityActions from '../../appActionHooks/useActivityActions';
import { formatAsset } from '../../utils/helpers';
import { USER_PROFILE } from '../../store/selectors';
import useVRPlayerCTA from '../../utils/hooks/useVRPlayerCTA';

const getWhatContentIs = (act = {}) => ({
  video: act.type === '2d-video',
  vr: act.type === 'vr-met',
  audio: act.type === 'audio',
  form: act.type === 'reflection',
});

const ActivityScreen = ({ navigation, route }) => {
  const { activityId } = route.params || {};
  const [nextActivity, nextActivityKey] = useNextActivity(activityId);
  const IS = getWhatContentIs(nextActivity);
  const { language, gender } = useSelector(USER_PROFILE);
  const asset = nextActivity ? formatAsset(nextActivity?.asset, language, gender) : null;

  const { saveActivityDone } = useActivityActions();

  const routeParams = {
    header: {
      type: IS.form ? 'performance' : 'rate',
      asset: nextActivity?.id,
    },
    body: {
      options: ['LearnRow', 'StatsRow', 'StressManagementRow'],
    },
  };
  const resetPathTo = useNavigationResetPathTo(navigation);

  const handleActivityComplete = answer => {
    saveActivityDone(nextActivityKey, answer);
    resetPathTo('PathEnding', routeParams);
  };

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
  });
  return (
    <ScreenDecorator>
      <GenericPageLayout
        fullScroll
        // withKeyboard={true}
        header={
          <View style={styles.hero}>
            <View style={{ position: 'absolute' }}>
              {IS.video && (
                <VideoHeader title={nextActivity.name} storeAsset={asset} onComplete={handleActivityComplete} />
              )}
              {IS.vr && <VRHeader title={nextActivity.name} id={'some_id'} onPlay={openVRPlayer} />}
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
  topImage: {
    opacity: 0.75,
    position: 'absolute',
    zIndex: -1,
  },
});
