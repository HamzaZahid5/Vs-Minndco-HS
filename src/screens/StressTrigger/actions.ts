import { useDispatch } from 'react-redux';
// import { saveStressRecord } from '../../services/Firestore';
import { options } from './index';

const useAppActions = () => {
  const dispatch = useDispatch();

  return {
    saveStressOMeter: (payload: typeof options[number]) => {
      dispatch({ type: 'currentStress/setTriggerActivity', payload });
      // return saveStressRecord(stressLevel, payload);
      return true;
    },
  };
};

export default useAppActions;
