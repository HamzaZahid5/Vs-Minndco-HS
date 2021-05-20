import { useState, useEffect } from 'react';
import useProgram from './useProgram';
import { useSelector } from 'react-redux';
import { findNextActivity, buildActivityKey } from '../helpers';
import { PROGRESS, KIT_ACTIVATED, TREATMENT_MODULE_AND_LEVEL } from '../../store/selectors';

export default () => {
  // STATE
  const [nextActivity, setNextActivity] = useState();
  const [nextActivityKey, setNextActivityKey] = useState();
  
  // REDUX SELECTORS
  const progress = useSelector(PROGRESS);
  const includeVR = useSelector(KIT_ACTIVATED);
  const [mId, lId] = useSelector(TREATMENT_MODULE_AND_LEVEL);
  
  // PROGRAM
  const program  = useProgram();

  useEffect(() => {
    if (program) {
      const nextActivity = findNextActivity(program, [...progress].pop(), includeVR);
      setNextActivity(nextActivity);
      setNextActivityKey(buildActivityKey(mId, lId, nextActivity.id));
    }
  }, [program, progress, includeVR, mId, lId]);

  return [nextActivity, nextActivityKey];
}