import React from 'react';
// import { useSelector, useStore, useDispatch } from 'react-redux';
import { Text } from 'react-native';
import Props from './types';
// @ts-ignore
import HomeLayout from '../../components/HomeLayout';
// @ts-ignore
import MenuButton from '../../components/MenuHandlerButton';
// @ts-ignore
import FABButton from '../../components/MindCoFABButton';
// @ts-ignore
import CircularContent from './CircularContent';
// @ts-ignore
import GoalWidget from '../../containers/GoalWidget';
// @ts-ignore
import Tips from './Tips';
import { RootState } from '../../store/reducer';

// selector
const selectLoadingFlag = (state: RootState) => state.flags.isLoading

const HomeScreen = ({ navigation }: Props) => {
  return (
    <HomeLayout withDecoration>
      <HomeLayout.TopLeft>
        <MenuButton onPress={() => navigation.openDrawer()}/>
      </HomeLayout.TopLeft>
      <HomeLayout.TopRight>
        <GoalWidget />
      </HomeLayout.TopRight>
      <HomeLayout.MiddleTop>
        <Tips />
      </HomeLayout.MiddleTop>
      <HomeLayout.MiddleCenter>
        <CircularContent
          title="Title"
          informativeText="Info"
          type="vr-met"
          instructionsText="instructions"
          progress={50}
          onPress={() => navigation.push('Activity')}
        />
      </HomeLayout.MiddleCenter>
      <HomeLayout.BottomLeft>
        <FABButton icon="account-heart" onPress={() => navigation.push('Support')}/>
      </HomeLayout.BottomLeft>
      <HomeLayout.BottomRight>
        <FABButton icon="head-check" onPress={() => navigation.push('StressRate')}/>
      </HomeLayout.BottomRight>
    </HomeLayout>
  );
}

export default HomeScreen;
