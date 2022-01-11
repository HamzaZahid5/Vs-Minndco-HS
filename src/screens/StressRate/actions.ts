import { useDispatch, useSelector } from 'react-redux';
import { CURRENT_STRESS_INPUT } from '../../store/selectors';
// import { saveStressRecord } from '../../services/Firestore';
// @ts-ignore: not implemented
import functions from '../../services/Functions';

const useAppActions = () => {
  const dispatch = useDispatch();
  const { triggerActivity } = useSelector(CURRENT_STRESS_INPUT);

  return {
    saveStressOMeter: (payload: number, isFromReliver: boolean) => {
      isFromReliver && dispatch({ type: 'currentStress/setStressLevel', payload });
      // return saveStressRecord(stressLevel, payload);
      functions().httpsCallable('saveLifesaverInteraction')({
        level: payload,
        reason: triggerActivity,
      });
      return true;
    },
  };
};

export default useAppActions;
