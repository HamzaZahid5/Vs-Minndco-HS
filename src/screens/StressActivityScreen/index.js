import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReadActivity from '../../components/ReadActivity';
import AudioPlayer from '../../components/AudioPlayer';
import BreathSync from '../../components/BreathSync';
import DeepBreathSync from '../../components/DeepBreathSync';
import BubbleWrapGame from '../../components/BubbleWrapGame';
import ScreenDecorator from '../../components/ScreenDecorator';
import {
  LIFESAVER_READS,
  LIFESAVER_AUDIOS,
  LIFESAVER_ACTIVITIES,
} from '../../utils/constants';
import useAppActions from "./actions";

const getContentByType = (type) => {
  switch (type) {
    case 'READ':
      return LIFESAVER_READS;
    default:
    case 'LISTEN':
      return LIFESAVER_AUDIOS;
    case 'DO':
      return LIFESAVER_ACTIVITIES;
  }
};

export default ({ navigation, route }) => {
  const [content, setContent] = useState();
  const { type: activityType = '' } = route?.params || {};
  const {
    resetPerformedLifesaverActivity,
    addPerformedLifesaverActivity,
  } = useAppActions();
  const lifesaverActivitiesDone = useSelector(store => store.currentStressInput.activitiesDone);
  
  useEffect(() => {
    const loadContent = async () => {
      const content = getContentByType(activityType);
      let availableContent = content.filter(a => !lifesaverActivitiesDone.includes(a.id));
      if (availableContent.length === 0) {
        resetPerformedLifesaverActivity();
        availableContent = content;
      }
      const nextContent = availableContent[~~(Math.random() * 10) % availableContent.length];
      addPerformedLifesaverActivity({ ...nextContent });
      
      setContent(nextContent);
    }
    loadContent();
  },[]);

  const onCloseActivity = () => navigation.popToTop();

  return (
    <ScreenDecorator>
      {activityType === 'READ' && content && (
        <ReadActivity content={content} onClose={onCloseActivity} />
      )}
      {activityType === 'LISTEN' && content && (
        <AudioPlayer
          src="https://firebasestorage.googleapis.com/v0/b/mindcotine-v4-production.appspot.com/o/lifesaver%2FAudio_VAS_1_EN.mp3?alt=media&token=59841ed4-446e-4b0f-b168-e0a1f3f1f938"
          // storagePath={content.source}
          onClose={onCloseActivity}
        />
      )}

      {activityType === 'DO' &&
        content &&
        content.id === 'deep-breath-sync' && (
          <DeepBreathSync onClose={onCloseActivity} />
        )}
      {activityType === 'DO' && content && content.id === 'breath-sync' && (
        <BreathSync onClose={onCloseActivity} />
      )}
      {activityType === 'DO' && content && content.id === 'bubbles-wrapper' && (
        <BubbleWrapGame onClose={onCloseActivity} />
      )}
    </ScreenDecorator>
  )
}
