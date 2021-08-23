import { useState, useEffect } from 'react';
import useProgram from './useProgram';
import { useSelector } from 'react-redux';
import { findNextActivity, getAllActivities, buildActivityKey } from '../helpers';
import { PROGRESS, KIT_ACTIVATED, TREATMENT_MODULE_AND_LEVEL } from '../../store/selectors';

export default fixedActivityId => {
  // STATE
  const [nextActivity, setNextActivity] = useState();
  const [nextActivityKey, setNextActivityKey] = useState();
  const [isLastActivity, setIsLastActivity] = useState();

  // REDUX SELECTORS
  const progress = useSelector(PROGRESS);
  const includeVR = useSelector(KIT_ACTIVATED);
  const [mId, lId] = useSelector(TREATMENT_MODULE_AND_LEVEL);

  // PROGRAM
  const program = useProgram();

  useEffect(() => {
    if (program && progress) {
      let nextActivityItem = fixedActivityId
        ? getAllActivities(program, includeVR).find(a => a.id === fixedActivityId)
        : findNextActivity(program, [...progress].pop(), includeVR);
      if (!fixedActivityId) {
        setIsLastActivity(nextActivityItem.isLastActivity);
        nextActivityItem = nextActivityItem.nextActivity;
      }
      setNextActivity(nextActivityItem);
      setNextActivityKey(buildActivityKey(mId, lId, nextActivityItem.id));
    }
  }, [program, progress, includeVR, mId, lId, fixedActivityId]);

  return { nextActivity, nextActivityKey, isLastActivity };
};
