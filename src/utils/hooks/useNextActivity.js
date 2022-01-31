import { useState, useEffect } from 'react';
import useProgram from './useProgram';
import { useSelector } from 'react-redux';
import { getActivityFromKey, getAllActivitiesKey } from '../helpers';
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
      const allActivityKeys = getAllActivitiesKey(program, includeVR);
      const lastCompletedActivity = [...progress].pop();
      const lastCompletedIndex = allActivityKeys.findIndex(aKey => aKey === lastCompletedActivity);
      // when we got a fixed activity id it doesn't matter if the activity is repeated into another
      // module or level. The first match we find into array of activities key is enough to let the
      // user to perform that activity again.
      const fixedActivityIndex = allActivityKeys.findIndex(aKey => aKey.includes(fixedActivityId));
      // if fixed act id, fixed activity index, otherwise the next index from last completed act.
      const activityIndex = fixedActivityId ? fixedActivityIndex : lastCompletedIndex + 1;

      // if exists, the activity key by index, otherwise the last activity key.
      const nextActKey = allActivityKeys[activityIndex] || [...allActivityKeys].pop();
      // if fixed activity id, it will be the last activity when index + 1 is equal to array length.
      // if next activity is the last one, index plus 1 it will be equal to array length.
      // if next activity is unexistent (current activity was the last one), act index plus one will be greather than array length.
      const isLastActivity = allActivityKeys.length <= activityIndex + 1;
      const nextActivity = getActivityFromKey(program, nextActKey);

      setIsLastActivity(isLastActivity);
      setNextActivity(nextActivity);
      setNextActivityKey(nextActKey);
    }
  }, [program, progress, includeVR, mId, lId, fixedActivityId]);
  return { nextActivity: nextActivityInState, nextActivityKey, isLastActivity: isLastActivityInState };
};
