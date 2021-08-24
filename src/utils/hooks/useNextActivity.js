import { useState, useEffect } from 'react';
import useProgram from './useProgram';
import { useSelector } from 'react-redux';
import { findNextActivity, getAllActivities, buildActivityKey } from '../helpers';
import { PROGRESS, KIT_ACTIVATED, TREATMENT_MODULE_AND_LEVEL } from '../../store/selectors';

export default fixedActivityId => {
  // STATE
  const [nextActivityInState, setNextActivity] = useState();
  const [nextActivityKey, setNextActivityKey] = useState();
  const [isLastActivityInState, setIsLastActivity] = useState();

  // REDUX SELECTORS
  const progress = useSelector(PROGRESS);
  const includeVR = useSelector(KIT_ACTIVATED);
  const [mId, lId] = useSelector(TREATMENT_MODULE_AND_LEVEL);

  // PROGRAM
  const program = useProgram();

  useEffect(() => {
    if (program && progress) {
      let { nextActivity, isLastActivity } = fixedActivityId
        ? getAllActivities(program, includeVR)
            .map((act, i, allAct) =>
              i === allAct.length - 1
                ? { nextActivity: act, isLastActivity: true }
                : { nextActivity: act, isLastActivity: false },
            )
            .find(a => a.nextActivity.id === fixedActivityId)
        : findNextActivity(program, [...progress].pop(), includeVR);

      setIsLastActivity(isLastActivity);
      setNextActivity(nextActivity);
      setNextActivityKey(buildActivityKey(mId, lId, nextActivity.id));
    }
  }, [program, progress, includeVR, mId, lId, fixedActivityId]);

  return { nextActivityInState, nextActivityKey, isLastActivityInState };
};
