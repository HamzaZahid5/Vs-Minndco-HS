import React from 'react';
import { Button, Pressable, Text, View } from 'react-native';
import useNavigationResetPathTo from '../../utils/hooks/useNavigationResetPathTo';
import useActivityActions from '../../appActionHooks/useActivityActions';
// import VRPlayer from '../../components/VRPlayer';

export default ({ navigation, route }) => {
  
  const { activityKey } = route.params;
  
  const resetPathTo = useNavigationResetPathTo(navigation);
  
  const { saveActivityDone } = useActivityActions();
  
  const onCompleteActivity = () => {
    saveActivityDone(activityKey);
    resetPathTo('PathEnding');
  };

  return (
    <View>
      <Text>VR Met Screen</Text>
      <Text>VR player is not yet implemented. Please press the blue button to continue.</Text>
      <Button onPress={onCompleteActivity} title="complete this activity (only for devel)"/>
    </View>
  // <VRPlayer
  //   url="https://firebasestorage.googleapis.com/v0/b/mindcotine-v4-production.appspot.com/o/content%2Fvr_demo_EN.mp4?alt=media&token=261b21d5-73e5-403d-9d64-79046fd3b4c7"
  //   onExit={console.log}
  //   onFinish={console.log}
  // />
  );
};
