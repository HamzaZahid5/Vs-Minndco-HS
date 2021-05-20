import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';

import GenericPageLayout from '../../components/GenericPageLayout';

import ScreenDecorator from '../../components/ScreenDecorator';
import { header as VideoHeader, body as VideoBody } from './VideoActivity'
import { header as AudioHeader, body as AudioBody } from './AudioActivity'
import { header as VRHeader, body as VRBody } from './VRActivity'
import { header as FormHeader, body as FormBody } from './FormActivity'
import useNavigationResetPathTo from '../../utils/hooks/useNavigationResetPathTo';
import useNextActivity from '../../utils/hooks/useNextActivity';
import useActivityActions from '../../appActionHooks/useActivityActions';

const getWhatContentIs = (act = {}) => ({
  video: act.type === '2d-video',
  vr: act.type === 'vr-met',
  audio: act.type === 'audio',
  form: act.type === 'reflection',
});

export default ({ navigation }) => {
  const [nextActivity, nextActivityKey] = useNextActivity();
  
  const { saveActivityDone } = useActivityActions();

  const resetPathTo = useNavigationResetPathTo(navigation);

  const IS = getWhatContentIs(nextActivity);

  const handleFormComplete = answer => {
    saveActivityDone(nextActivityKey, answer);
    resetPathTo('PathEnding');
  };
  return (
    <ScreenDecorator>
      <GenericPageLayout
        fullScroll
        // withKeyboard={true}
        header={
          <View style={styles.hero}>
            { IS.video && (
              <VideoHeader onFinish={() => navigation.dispatch(StackActions.replace('PathEnding'))}/>
            )}
            { IS.vr && (
              <VRHeader
                title={nextActivity.name}
                id={'some_id'}
                onPlay={() => navigation.push('VRMet', {
                  activityKey: nextActivityKey,
                })}
              />
            )}
            { IS.audio && (
              <AudioHeader onFinish={() => navigation.dispatch(StackActions.replace('PathEnding'))}/>
            )}
            { IS.form && (
              <FormHeader
                title={nextActivity.name}
              />
            )}
          </View>
        }
      >
        { IS.video && (
          <VideoBody />
        )}
        { IS.vr && (
          <VRBody
            type={nextActivity.type}
            duration={nextActivity.duration}
            description={nextActivity.description}
          />
        )}
        { IS.audio && (
          <AudioBody />
        )}
        { IS.form && (
          <FormBody
            type={nextActivity.type}
            duration={nextActivity.duration}
            description={nextActivity.description}
            asset={nextActivity.asset}
            onComplete={handleFormComplete}
          />
        )}
        
      </GenericPageLayout>
    </ScreenDecorator>
  );
};

const styles = StyleSheet.create({
  hero: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
