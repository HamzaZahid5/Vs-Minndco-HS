/* eslint-disable no-console */
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Props from './types';
// @ts-ignore: non-ts file
import HomeLayout from '../../components/HomeLayout';
// @ts-ignore: non-ts file
import MenuButton from '../../components/MenuHandlerButton';
// @ts-ignore: non-ts file
import FABButton from '../../components/MindCoFABButton';
import CircularContent from './CircularContent';
// @ts-ignore: non-ts file
import GoalWidget from '../../containers/GoalWidget';
// @ts-ignore: non-ts file
import FadeEffect from '../../components/FadeEffect';
import Tips from './Tips';
// @ts-ignore: non-ts file
import useTodaysActivityDone from '../../utils/hooks/useTodaysActivityDone';
// @ts-ignore: non-ts file
import useNextActivity from '../../utils/hooks/useNextActivity';
// @ts-ignore: non-ts file
import useCompletion from '../../utils/hooks/useCompletion';

import { USER_SUPPORT_PROFILE } from '../../store/selectors';
import { useSelector } from 'react-redux';
import { translate } from '../../utils/localization';

const HomeScreen = ({ navigation }: Props) => {
  const { nextActivity, isLastActivity } = useNextActivity();
  const progress = useCompletion();
  const todaysActivityDone = useTodaysActivityDone();
  const { has_coach_messages: hasCouchMessage } = useSelector(USER_SUPPORT_PROFILE);

  return (
    <HomeLayout withDecoration={true}>
      <HomeLayout.TopLeft>
        <MenuButton onPress={() => navigation.openDrawer()} />
      </HomeLayout.TopLeft>
      <HomeLayout.TopRight>{/* <GoalWidget /> */}</HomeLayout.TopRight>
      <HomeLayout.MiddleTop>{/* <Tips /> */}</HomeLayout.MiddleTop>
      <HomeLayout.MiddleCenter>
        {/* we wait for isLastActivity hook to resolve in order to fade-in the circle */}
        <FadeEffect show={isLastActivity !== undefined}>
          {progress === 100 ? (
            <CircularContent
              title={translate('screens.Home.program-comple-title')}
              informativeText={translate('screens.Home.program-complete-information')}
              type={'star'}
              instructionsText={translate('screens.Home.program-complete-instruction')}
              progress={progress}
              onPress={() => navigation.navigate('Library')}
            />
          ) : (
            <CircularContent
              title={nextActivity?.name}
              informativeText={nextActivity ? translate('screens.Home.tap-circle') : ' '}
              type={nextActivity?.type}
              instructionsText={
                nextActivity
                  ? todaysActivityDone
                    ? translate('screens.Home.tomorrows-activity')
                    : translate('screens.Home.todays-activity')
                  : ''
              }
              progress={progress}
              onPress={() => navigation.navigate('Activity')}
            />
          )}
        </FadeEffect>
        {/* </FadeEffect> */}
      </HomeLayout.MiddleCenter>
      <HomeLayout.BottomLeft>
        <FABButton
          icon="account-heart"
          informativeText={translate('screens.Home.coach')}
          onPress={() => navigation.navigate('Support')}
          showAlert={hasCouchMessage}
        />
      </HomeLayout.BottomLeft>
      <HomeLayout.BottomRight>
        <FABButton
          icon="head-check"
          informativeText={translate('screens.Home.reliever')}
          onPress={() => navigation.navigate('StressRate')}
        />
      </HomeLayout.BottomRight>
    </HomeLayout>
  );
};

export default HomeScreen;
