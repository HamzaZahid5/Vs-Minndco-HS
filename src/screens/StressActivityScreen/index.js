import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import ReadActivity from '../../components/ReadActivity';
import AudioPlayer from '../../components/AudioPlayer';
import BreathSync from '../../components/BreathSync';
import DeepBreathSync from '../../components/DeepBreathSync';
import BubbleWrapGame from '../../components/BubbleWrapGame';
import ScreenDecorator from '../../components/ScreenDecorator';
import StorageLoader from '../../components/StorageLoader';
import { usePathEndingBarButton } from '../PathEnding';
import {
  LIFESAVER_READS,
  LIFESAVER_AUDIOS,
  LIFESAVER_ACTIVITIES,
} from '../../utils/constants';
import useAppActions from "./actions";
import useNavigationResetPathTo from "../../utils/hooks/useNavigationResetPathTo";

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
  const { type: activityType = 'DO' } = route?.params || {};
  const {
    resetPerformedLifesaverActivity,
    addPerformedLifesaverActivity,
  } = useAppActions();
  const lifesaverActivitiesDone = useSelector(store => store.currentStressInput.activitiesDone);

  const routeParams = {
    header: {
      type: 'vote',
      asset: content?.id,
    },
    body: {
      options: ['LearnRow', 'CoachRow', 'StressManagementRowAgain'],
    }
  };
  usePathEndingBarButton(navigation, { routeParams });
  const resetTo = useNavigationResetPathTo(navigation);
  const onCloseActivity = () => resetTo('PathEnding', routeParams);
  
  
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

  

  return (
    <ScreenDecorator>
      {activityType === 'READ' && content && (
        <ReadActivity content={content} onClose={onCloseActivity} />
      )}
      {activityType === 'LISTEN' && content && (
        <StorageLoader path={content.source}>
          {url => (
            <AudioPlayer
              src={url}
              onClose={onCloseActivity}
            />
          )}
        </StorageLoader>
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
