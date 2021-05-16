import { useDispatch, useSelector } from 'react-redux';
import functions from '../../services/Functions';

const useAppActions = () => {
  const dispatch = useDispatch();
  const { stressLevel, triggerActivity } = useSelector(state => state.currentStressInput);
  return {
    resetPerformedLifesaverActivity: () => {
      return dispatch({ type: 'currentStress/resetActivitiesDone' });
    },
    addPerformedLifesaverActivity: activity => {
      dispatch({ type: 'currentStress/addActivityDone', payload: activity.id });
      return functions().httpsCallable('saveLifesaverInteraction')({
        activity_id: activity.id,
        level: stressLevel,
        reason: triggerActivity,
      });
    },
  };
};

export default useAppActions;
