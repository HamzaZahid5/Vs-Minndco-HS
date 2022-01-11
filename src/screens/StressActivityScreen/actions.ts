import { useDispatch, useSelector } from 'react-redux';
import { activityOrigin } from '../../../types';
// @ts-ignore: not implemented
import functions from '../../services/Functions';
import { CURRENT_STRESS_INPUT } from '../../store/selectors';
import { contentType } from './index';
// @ts-ignore: non-ts file
import { updateActivityCounter } from '../../services/Firestore';

const useAppActions = () => {
  const dispatch = useDispatch();
  const { stressLevel, triggerActivity } = useSelector(CURRENT_STRESS_INPUT);
  return {
    resetPerformedLifesaverActivity: () => {
      return dispatch({ type: 'currentStress/resetActivitiesDone' });
    },
    addPerformedLifesaverActivity: async (activity: contentType, isFromPlayground?: boolean) => {
      const from: activityOrigin = 'lifesaver';
      if (activity?.category) {
        await updateActivityCounter(activity.category);
      }

      functions().httpsCallable('logActivityDone')({
        activity: activity,
        activityKey: '',
        from,
      });

      dispatch({ type: 'currentStress/addActivityDone', payload: activity.id });
      if (isFromPlayground) return;
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
