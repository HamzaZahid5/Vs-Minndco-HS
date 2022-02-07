import { useDispatch, useSelector } from 'react-redux';
import { CURRENT_STRESS_INPUT } from '../../store/selectors';
// import { saveStressRecord } from '../../services/Firestore';
import { options } from './index';
// @ts-ignore: not implemented
import functions from '../../services/Functions';

const useAppActions = () => {
  const dispatch = useDispatch();
  const { stressLevel } = useSelector(CURRENT_STRESS_INPUT);

  return {
    saveStressOMeter: (payload: typeof options[number], isFromReliver: boolean) => {
      isFromReliver && dispatch({ type: 'currentStress/setTriggerActivity', payload });
      // return saveStressRecord(stressLevel, payload);
      functions().httpsCallable('saveLifesaverInteraction')({
        level: stressLevel,
        reason: payload,
      });
      return true;
    },
  };
};

export default useAppActions;
