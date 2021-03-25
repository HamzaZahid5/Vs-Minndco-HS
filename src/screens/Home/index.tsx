import React from 'react';
// @ts-ignore
import { auth } from '../../services/Auth';
import { useSelector, useStore, useDispatch } from 'react-redux';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Props from './types';
// @ts-ignore
import HomeLayout from '../../components/HomeLayout';
import { RootState } from '../../store/reducer';

// selector
const selectLoadingFlag = (state: RootState) => state.flags.isLoading

const HomeScreen = ({ navigation }: Props) => {
  return (
    <HomeLayout withDecoration>
      <HomeLayout.TopLeft><Text>MENU</Text></HomeLayout.TopLeft>
      <HomeLayout.TopRight><Text>WIDGET</Text></HomeLayout.TopRight>
      <HomeLayout.MiddleTop><Text>TIPS</Text></HomeLayout.MiddleTop>
      <HomeLayout.MiddleCenter>
        <AnimatedCircularProgress
          size={250}
          width={10}
          fill={50}
          rotation={0}
          padding={10}
          lineCap="round"
          tintColor="#3C828C"
          backgroundColor="#F0E983"
          // onAnimationComplete={() => console.log('onAnimationComplete')}
          // renderCap={({ center }) =>
          //   progress ? (
          //     <Circle cx={center.x} cy={center.y} r="10" fill="#3C828C" />
          //   ) : null
          // }
        >
          {() => (
            <Button onPress={() => auth().signOut()}>Log out</Button>
          )}
        </AnimatedCircularProgress>
      </HomeLayout.MiddleCenter>
      <HomeLayout.BottomLeft><Text>COACH</Text></HomeLayout.BottomLeft>
      <HomeLayout.BottomRight><Text>LS</Text></HomeLayout.BottomRight>
    </HomeLayout>
  );
}

export default HomeScreen;
