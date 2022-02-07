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
import { DefaultScreenRouteType, DefaultScreenPropType, activityTypesType, ContentTypesType } from '../../../types';
import { CURRENT_STRESS_INPUT } from '../../store/selectors';
import AnalyticEvent from '../../utils/AnalyticsEvent';
import useSetDefaultBackOnPress from '../../utils/hooks/useSetDefaultBackOnPress';
import { getLocale } from '../../utils/localization';
import { View } from 'react-native';

export type contentType = {
  id: string;
  type: ContentTypesType;
} & { free?: boolean } & Record<string, unknown>;

const getContentByType = (type: string): contentType[] => {
  switch (type) {
    case 'READ':
      return LIFESAVER_READS();
    default:
    case 'LISTEN':
      return LIFESAVER_AUDIOS(getLocale());
    case 'DO':
      return LIFESAVER_ACTIVITIES;
  }
};

const StressActivity = ({
  navigation,
  route,
}: DefaultScreenPropType<'StressActivityToDo'> & DefaultScreenRouteType<'StressActivityToDo'>) => {
  const [content, setContent] = useState<contentType>();
  const { type: activityType = 'DO', selectedContent } = route?.params || {};
  const { resetPerformedLifesaverActivity, addPerformedLifesaverActivity } = useAppActions();
  const { activitiesDone: lifesaverActivitiesDone } = useSelector(CURRENT_STRESS_INPUT);
  const routeParams = {
    header: {
      type: 'vote',
      asset: content?.id,
    },
    body: {
      options: route.params.isFromPlayground
        ? ['PlaygroundRow', 'LearnRow', 'CoachRow']
        : ['LearnRow', 'CoachRow', 'StressManagementRowAgain'],
    },
  };
  usePathEndingBarButton(navigation, { routeParams }, () => {
    if (activityType === 'READ') AnalyticEvent('ui_nav_close_btn_read_act');
  });
  useSetDefaultBackOnPress(navigation, defaultOnPress => () => {
    AnalyticEvent('reliever_activity_drop');
    if (defaultOnPress) defaultOnPress();
  });
  const resetTo = useNavigationResetPathTo(navigation);
  const onCloseActivity = () => {
    AnalyticEvent('reliever_activity_complete');
    resetTo('PathEnding', routeParams);
  };
  useEffect(() => {
    if (content) {
      AnalyticEvent('select_content', { content_type: content.type, item_id: content.id });
    }
  }, [content]);
  useEffect(() => {
    const loadContent = async () => {
      // eslint-disable-next-line no-shadow
      let nextContent;
      if (selectedContent) {
        nextContent = { ...selectedContent };
      } else {
        const content = getContentByType(activityType);
        let availableContent = content.filter(a => !lifesaverActivitiesDone.includes(a.id));
        if (availableContent.length === 0) {
          resetPerformedLifesaverActivity();
          availableContent = content;
        }
        nextContent = availableContent[~~(Math.random() * 10) % availableContent.length];
      }
      addPerformedLifesaverActivity({ ...nextContent }, route.params.isFromPlayground);

      setContent(nextContent);
    };
    loadContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityType]);

  return (
    <ScreenDecorator>
      {activityType === 'READ' && content && (
        <>
          {/*Using for detox to recognize testID*/}
          <View testID="reliver-activity-read-carousel" />
          <ReadActivity content={content} onClose={onCloseActivity} />
        </>
      )}
      {activityType === 'LISTEN' && content && (
        <View testID="listen-activity" style={{ flexBasis: '100%' }}>
          <StorageLoader path={content.source}>
            {(url: string) => <AudioPlayer audioURI={url} didJustFinish={onCloseActivity} testID="listen-activity" />}
          </StorageLoader>
        </View>
      )}

      {activityType === 'DO' && content && content.id === 'deep-breath-sync' && (
        <DeepBreathSync testID="do-activity" onClose={onCloseActivity} />
      )}
      {activityType === 'DO' && content && content.id === 'breath-sync' && (
        <BreathSync testID="do-activity" onClose={onCloseActivity} />
      )}
      {activityType === 'DO' && content && content.id === 'bubbles-wrapper' && (
        <BubbleWrapGame testID="do-activity" onClose={onCloseActivity} />
      )}
    </ScreenDecorator>
  );
};

StressActivity.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default StressActivity;
