import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import template from 'lodash.template';

import GenericPageLayout from '../../components/GenericPageLayout';

import ScreenDecorator from '../../components/ScreenDecorator';
import { Header as VideoHeader, Body as VideoBody } from './VideoActivity';
import { Header as AudioHeader, Body as AudioBody } from './AudioActivity';
import { Header as VRHeader, Body as VRBody } from './VRActivity';
import { Header as FormHeader, Body as FormBody } from './FormActivity';
import useNavigationResetPathTo from '../../utils/hooks/useNavigationResetPathTo';
import useNextActivity from '../../utils/hooks/useNextActivity';
import useActivityActions from '../../appActionHooks/useActivityActions';

const getWhatContentIs = (act = {}) => ({
  video: act.type === '2d-video',
  vr: act.type === 'vr-met',
  audio: act.type === 'audio',
  form: act.type === 'reflection',
});

const ActivityScreen = ({ navigation }) => {
  const [nextActivity, nextActivityKey] = useNextActivity();

  const { saveActivityDone } = useActivityActions();
  const IS = getWhatContentIs(nextActivity);

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
  return (
    <ScreenDecorator>
      <GenericPageLayout
        fullScroll
        // withKeyboard={true}
        header={
          <View style={styles.hero}>
            {IS.video && (
              <VideoHeader
                title={nextActivity.name}
                storeAsset={template(nextActivity.asset)({ language: 'EN' })}
                onComplete={handleActivityComplete}
              />
            )}
            {IS.vr && (
              <VRHeader
                title={nextActivity.name}
                id={'some_id'}
                onPlay={() =>
                  navigation.push('VRMet', {
                    activityKey: nextActivityKey,
                  })
                }
              />
            )}
            {IS.audio && (
              <AudioHeader
                title={nextActivity.name}
                storeAsset={template(nextActivity.asset)({ language: 'EN' })}
                onComplete={handleActivityComplete}
              />
            )}
            {IS.form && <FormHeader title={nextActivity.name} />}
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
};

export default ActivityScreen;

const styles = StyleSheet.create({
  hero: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
