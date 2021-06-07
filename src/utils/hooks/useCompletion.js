import React, { useState, useEffect } from 'react';
import useProgram from './useProgram';
import { useSelector } from 'react-redux';
import { calculateProgramCompletion } from '../helpers';
import { PROGRESS, KIT_ACTIVATED } from '../../store/selectors';

export default () => {
  const [completion, setCompletion] = useState();
  const progress = useSelector(PROGRESS);
  const includeVR = useSelector(KIT_ACTIVATED);
  const program = useProgram();

  useEffect(() => {
    if (program) {
      setCompletion(calculateProgramCompletion(program, [...progress].pop(), includeVR));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [program, progress]);

  return completion;
};
