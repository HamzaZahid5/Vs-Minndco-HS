import React, { useEffect } from 'react';
import { DefaultScreenPropType, DefaultScreenRouteType } from '../../../types';
import LoadingScreen from '../Loading';
import useUrledVRPlayerCTA from '../../utils/hooks/useUrledVRPlayerCTA';
// @ts-ignore: non-ts file
import useNavigationResetPathTo from '../../utils/hooks/useNavigationResetPathTo';

const routeParams = {
  header: {
    type: 'statistics',
  },
  body: {
    options: ['PlaygroundRow', 'LearnRow', 'CoachRow'],
  },
};

const VRPlaygroundActivity = ({
  navigation,
  route,
}: DefaultScreenRouteType<'VRPlaygroundActivity'> & DefaultScreenPropType<'VRPlaygroundActivity'>) => {
  const resetTo = useNavigationResetPathTo(navigation);
  const callBrowser = useUrledVRPlayerCTA({
    openUrl: route.params.url,
    onCancel: () => {
      resetTo('Playground');
    },
    onComplete: () => {
      resetTo('PathEnding', routeParams);
    },
    onError: () => {
      resetTo('Playground');
    },
  });
  useEffect(() => {
    callBrowser();
  }, [callBrowser]);
  return <LoadingScreen />;
};

export default VRPlaygroundActivity;
