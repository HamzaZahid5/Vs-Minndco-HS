import React from 'react';
// import { useSelector, useStore, useDispatch } from 'react-redux';
import { Text, StyleSheet } from 'react-native';
import Props from './types';
// @ts-ignore: non-ts file
import HomeLayout from '../../components/HomeLayout';
// @ts-ignore: non-ts file
import MenuButton from '../../components/MenuHandlerButton';
// @ts-ignore: non-ts file
import FABButton from '../../components/MindCoFABButton';
// @ts-ignore: non-ts file
import CircularContent from './CircularContent';
// @ts-ignore: non-ts file
import GoalWidget from '../../containers/GoalWidget';
// @ts-ignore: non-ts file
import FadeEffect from '../../components/FadeEffect';
// @ts-ignore: non-ts file
import Tips from './Tips';
// @ts-ignore: non-ts file
import useTodaysActivityDone from '../../utils/hooks/useTodaysActivityDone';
// @ts-ignore: non-ts file
import useNextActivity from '../../utils/hooks/useNextActivity';
// @ts-ignore: non-ts file
import useCompletion from '../../utils/hooks/useCompletion';
import { HAS_COUCH_MESSAGES } from '../../store/selectors';
import { useSelector } from 'react-redux';

const HomeScreen = ({ navigation }: Props) => {
  const [nextActivity] = useNextActivity();
  const progress = useCompletion();
  const todaysActivityDone = useTodaysActivityDone();
  const hasCouchMessage = useSelector(HAS_COUCH_MESSAGES);
  // const nextActivity = {
  //   id: 'body-scan',
  //   name: '',
  //   type: '2d-video',
  //   description: '',
  //   duration: 10,
  //   asset: '',
  //   category: 'mindfulness',
  // };
  // // alert(JSON.stringify(nextActivity));
  // const progress = 50;
  // const todaysActivityDone = false;
  return (
    <HomeLayout withDecoration={true}>
      <HomeLayout.TopLeft>
        <MenuButton onPress={() => navigation.openDrawer()} />
      </HomeLayout.TopLeft>
      <HomeLayout.TopRight>{/* <GoalWidget /> */}</HomeLayout.TopRight>
      <HomeLayout.MiddleTop>{/* <Tips /> */}</HomeLayout.MiddleTop>
      <HomeLayout.MiddleCenter>
        {/* <FadeEffect show={typeof nextActivity === 'object'}> */}
        {typeof nextActivity === 'object' ? (
          <CircularContent
            title={nextActivity?.name}
            informativeText={nextActivity ? 'Tap the circle for your next activity' : ' '}
            type={nextActivity?.type}
            instructionsText={nextActivity ? (todaysActivityDone ? "Tomorrow's activity" : "Today's activity") : ''}
            progress={progress}
            onPress={() => navigation.push('Activity')}
          />
        ) : null}
        {/* </FadeEffect> */}
      </HomeLayout.MiddleCenter>
      <HomeLayout.BottomLeft>
        <FABButton
          icon="account-heart"
          informativeText="Coach"
          onPress={() => navigation.push('Support')}
          showAlert={hasCouchMessage}
        />
      </HomeLayout.BottomLeft>
      <HomeLayout.BottomRight>
        <FABButton icon="head-check" informativeText="Reliever" onPress={() => navigation.push('StressRate')} />
      </HomeLayout.BottomRight>
    </HomeLayout>
  );
};

export default HomeScreen;
