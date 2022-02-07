import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import {
  saveActivityDone as saveActivityDoneIntoDB,
  resetUserStreak as resetUserStreakIntoDB,
  getFirestoreTimestamp,
  updateActivityCounter,
} from '../services/Firestore';
import functions from '../services/Functions';
import { LAST_ACTIVITY_AT, ACTIVITY_DAYS_IN_A_ROW } from '../store/selectors';
import { getModuleNumberFromKey, getLevelNumberFromKey } from '../utils/helpers';
import useNextActivity from '../utils/hooks/useNextActivity';

const getTypeByCategory = category => {
  switch (category) {
    case 'education':
      return 'learning';
    case 'relaxation':
    case 'mindfulness':
    case 'cbt-reflection':
      return 'practical';
    default:
      return '';
  }
};

const useActivityActions = () => {
  // const dispatch = useDispatch();
  const { nextActivity } = useNextActivity();
  const lastActivityDate = useSelector(LAST_ACTIVITY_AT);
  const streakCount = useSelector(ACTIVITY_DAYS_IN_A_ROW);
  const dispatch = useDispatch();

  const lastActivityAt = moment(lastActivityDate).format('YYYY-MM-DD');
  const lastActivityNotToday = lastActivityAt !== moment().format('YYYY-MM-DD');
  const lastActivityNotYesterday = lastActivityAt !== moment().subtract(1, 'd').format('YYYY-MM-DD');

  const streakLost = () => lastActivityNotToday && lastActivityNotYesterday;
  // only matter if is not another activity in the same day, all other cases increment the streak.
  // we don't care about streak lost since that happens when login
  const isConsecutiveDay = () => lastActivityNotToday;

  return {
    saveActivityDone: async (activityKey, answer = '') => {
      //Dispatch here, so when the PathEnding screen is loaded, useTodaysActivityDone have the correct date.
      dispatch({ type: 'user/setLastActivityAt', payload: { date: getFirestoreTimestamp(), key: activityKey } });

      const treatment_module = getModuleNumberFromKey(activityKey);
      const treatment_level = getLevelNumberFromKey(activityKey);
      const from = 'program';

      await saveActivityDoneIntoDB({
        treatment_module,
        treatment_level,
        activityKey,
        streak: isConsecutiveDay() ? streakCount + 1 : streakCount,
      });

      await functions().httpsCallable('logActivityDone')({
        activity: nextActivity,
        activityKey,
        answer,
        from,
      });

      const category = getTypeByCategory(nextActivity.category);
      if (category) {
        await updateActivityCounter(category);
      }

      return true;
    },
    updateStreak: async () => {
      if (streakLost()) {
        resetUserStreakIntoDB();
      }
    },
  };
};

export default useActivityActions;
