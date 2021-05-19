import React, { useState, useEffect } from 'react';
import useProgram from './useProgram';
import { useSelector } from 'react-redux';
import { findNextActivity } from '../helpers';
import { PROGRESS, KIT_ACTIVATED } from '../../store/selectors';

export default () => {
  const [nextActivity, setNextActivity] = useState();
  const progress = useSelector(PROGRESS);
  const includeVR = useSelector(KIT_ACTIVATED);
  const program  = useProgram();

  useEffect(() => {
    if (program) {
      setNextActivity(findNextActivity(program, [...progress].pop(), includeVR));
    }
  }, [program, progress, includeVR]);

  return nextActivity;
}