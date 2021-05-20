import { useDispatch, useSelector } from 'react-redux';
import { saveActivityDone as saveActivityDoneIntoDB } from '../services/Firestore';
import functions from '../services/Functions';
import { TREATMENT_MODULE_AND_LEVEL } from '../store/selectors';
import { buildActivityKey, getModuleNumberFromKey, getLevelNumberFromKey } from '../utils/helpers';
import useNextActivity from '../utils/hooks/useNextActivity';

const useActivityActions = () => {
  // const dispatch = useDispatch();
  const [nextActivity] = useNextActivity();
  return {
    saveActivityDone: async (activityKey, answer = '') => {
      const treatment_module = getModuleNumberFromKey(activityKey);
      const treatment_level = getLevelNumberFromKey(activityKey);

      await saveActivityDoneIntoDB({
        treatment_module,
        treatment_level,
        activityKey,
      });
      await functions().httpsCallable('logActivityDone')({
        activity: nextActivity,
        activityKey,
        answer,
      });
      return true;
    },
  };
};

export default useActivityActions;
