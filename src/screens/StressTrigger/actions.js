import { useDispatch, useSelector } from 'react-redux';
import { saveStressRecord } from '../../services/Firestore';

const useAppActions = () => {
  const dispatch = useDispatch();
  const stressLevel = useSelector(store => store.currentStressInput.stressLevel);
  
  return {
    saveStressOMeter: payload => {
      dispatch({ type: 'currentStress/setTriggerActivity', payload });
      return saveStressRecord(stressLevel, payload);
    },
  };
};

export default useAppActions;
