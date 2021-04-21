import React from 'react';
import VRPlayer from '../../components/VRPlayer';

export default () => (
  <VRPlayer
    url="https://firebasestorage.googleapis.com/v0/b/mindcotine-v4-production.appspot.com/o/content%2Fvr_demo_EN.mp4?alt=media&token=261b21d5-73e5-403d-9d64-79046fd3b4c7"
    onExit={console.log}
    onFinish={console.log}
  />
);
