import { CURRENT_PATH } from './../../store/selectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PathsType } from '../../../types';

const useStartPath = (newPath: PathsType, override = true, deps: any[] = []) => {
  const dispatch = useDispatch();
  const current_path = useSelector(CURRENT_PATH);
  useEffect(() => {
    if (override || current_path === null) dispatch({ type: 'flags/setCurrentPath', payload: newPath });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);
};

export default useStartPath;
