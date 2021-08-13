import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore: not implemented
import functions from '../../services/Functions';
import { CURRENT_STRESS_INPUT } from '../../store/selectors';
import { contentType } from './index';

const useAppActions = () => {
  const dispatch = useDispatch();
  const { stressLevel, triggerActivity } = useSelector(CURRENT_STRESS_INPUT);
  return {
    resetPerformedLifesaverActivity: () => {
      return dispatch({ type: 'currentStress/resetActivitiesDone' });
    },
    addPerformedLifesaverActivity: (activity: contentType) => {
      dispatch({ type: 'currentStress/addActivityDone', payload: activity.id });
      return functions().httpsCallable('saveLifesaverInteraction')({
        activity_id: activity.id,
        level: stressLevel,
        reason: triggerActivity,
        activity_type: activity.type,
      });
    },
  };
};

export default useAppActions;
