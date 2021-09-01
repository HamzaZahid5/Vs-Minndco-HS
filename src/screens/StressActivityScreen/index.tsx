import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
// @ts-ignore: non-ts file
import ReadActivity from '../../components/ReadActivity';
// @ts-ignore: non-ts file
import AudioPlayer from '../../components/AudioPlayer';
// @ts-ignore: non-ts file
import BreathSync from '../../components/BreathSync';
// @ts-ignore: non-ts file
import DeepBreathSync from '../../components/DeepBreathSync';
// @ts-ignore: non-ts file
import BubbleWrapGame from '../../components/BubbleWrapGame';
// @ts-ignore: non-ts file
import ScreenDecorator from '../../components/ScreenDecorator';
// @ts-ignore: non-ts file
import StorageLoader from '../../components/StorageLoader';
import { usePathEndingBarButton } from '../PathEnding';
// @ts-ignore: non-ts file
import { LIFESAVER_READS, LIFESAVER_AUDIOS, LIFESAVER_ACTIVITIES, ACTIVITIES_TYPES } from '../../utils/constants';
import useAppActions from './actions';
// @ts-ignore: non-ts file
import useNavigationResetPathTo from '../../utils/hooks/useNavigationResetPathTo';
import { DefaultScreenRouteType, DefaultScreenPropType } from '../../../types';
import { CURRENT_STRESS_INPUT } from '../../store/selectors';
import AnalyticEvent from '../../utils/AnalyticsEvent';

export type contentType = {
  id: string;
  type: ACTIVITIES_TYPES.text | ACTIVITIES_TYPES.audio | ACTIVITIES_TYPES.activity;
} & { free?: boolean } & Record<string, unknown>;

const getContentByType = (type: string): contentType[] => {
  switch (type) {
    case 'READ':
      return LIFESAVER_READS();
    default:
    case 'LISTEN':
      return LIFESAVER_AUDIOS;
    case 'DO':
      return LIFESAVER_ACTIVITIES;
  }
};

const StressActivity = ({
  navigation,
  route,
}: DefaultScreenPropType<'StressActivityToDo'> & DefaultScreenRouteType<'StressActivityToDo'>) => {
  const [content, setContent] = useState<contentType>();
  const { type: activityType = 'DO' } = route?.params || {};
  const { resetPerformedLifesaverActivity, addPerformedLifesaverActivity } = useAppActions();
  const { activitiesDone: lifesaverActivitiesDone } = useSelector(CURRENT_STRESS_INPUT);

  const routeParams = {
    header: {
      type: 'vote',
      asset: content?.id,
    },
    body: {
      options: ['LearnRow', 'CoachRow', 'StressManagementRowAgain'],
    },
  };
  usePathEndingBarButton(navigation, { routeParams });
  const resetTo = useNavigationResetPathTo(navigation);
  const onCloseActivity = () => {
    AnalyticEvent('reliever_activity_complete');
    resetTo('PathEnding', routeParams);
  };

  useEffect(() => {
    const loadContent = async () => {
      // eslint-disable-next-line no-shadow
      const content = getContentByType(activityType);
      let availableContent = content.filter(a => !lifesaverActivitiesDone.includes(a.id));
      if (availableContent.length === 0) {
        resetPerformedLifesaverActivity();
        availableContent = content;
      }
      const nextContent = availableContent[~~(Math.random() * 10) % availableContent.length];
      addPerformedLifesaverActivity({ ...nextContent });

      setContent(nextContent);
    };
    loadContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityType]);

  return (
    <ScreenDecorator>
      {activityType === 'READ' && content && <ReadActivity content={content} onClose={onCloseActivity} />}
      {activityType === 'LISTEN' && content && (
        <StorageLoader path={content.source}>
          {(url: string) => <AudioPlayer audioURI={url} didJustFinish={onCloseActivity} />}
        </StorageLoader>
      )}

      {activityType === 'DO' && content && content.id === 'deep-breath-sync' && (
        <DeepBreathSync onClose={onCloseActivity} />
      )}
      {activityType === 'DO' && content && content.id === 'breath-sync' && <BreathSync onClose={onCloseActivity} />}
      {activityType === 'DO' && content && content.id === 'bubbles-wrapper' && (
        <BubbleWrapGame onClose={onCloseActivity} />
      )}
    </ScreenDecorator>
  );
};

StressActivity.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default StressActivity;
