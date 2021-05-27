import { TIPS_VR, TIPS_VIDEO, TIPS_AUDIO } from './constants'
export const isFunction = f => typeof f === 'function';

export const getTipsByActivityType = type => {
  return {
    'vr-met': TIPS_VR,
    '2d-video': TIPS_VIDEO,
    audio: TIPS_AUDIO,
  }[type];
};

export const getIconByActivityType = type => {
  switch (type) {
    case 'vr-met':
      return 'google-cardboard';
    case 'reflection':
      return 'pencil';
    case '2d-video':
      return 'video';
    case 'audio':
      return 'headphones';
    default:
      return 'star';
  }
};

// PROGRAM HELPERS
export const buildActivityKey = (mId, lId, aId) => `M${mId}_L${lId}_${aId}`;
export const getModuleFromKey = (key = '') => key.split('_')[0];
export const getModuleNumberFromKey = (key = '') =>
  Number(getModuleFromKey(key).replace('M', ''));

export const getLevelFromKey = (key = '') => key.split('_')[1];
export const getLevelNumberFromKey = (key = '') =>
  Number(getLevelFromKey(key).replace('L', ''));

export const getActivityFromKey = (key = '') => {
  // support for _ (underscore) into activity id
  // eslint-disable-next-line no-unused-vars
  const [_moduleId, _levelId, ...activityKey] = key.split('_');
  return activityKey.join('_');
};

// returns index of given activity into deep flatten array of activities, considering VR filter.
export const getActivityPositionByKey = (program, key, includeVR) => {
  const activities = getAllActivities(program, includeVR);
  const activityId = getActivityFromKey(key);
  const index = activities.findIndex(a => a.id === activityId);
  return index;
}

// all activities (no level, no module) with VR filter
export const getAllActivities = (program, includeVR) => {
  const activities = unnestedProgram(program);
  const relevantActivities = includeVR ? activities : activities.filter(a => a.type !== 'vr-met');
  return relevantActivities;
}

// deep flat activities (no level, no module)
export const unnestedProgram = program => {
  return program.modules.reduce((count, m) => {
    return [...count, ...m.levels.reduce((level_count, l) => {
      return [...level_count, ...l.activities];
    }, [])];
  }, []);
}

// returns next activity based on program and last activity into progress.
export const findNextActivity = (program, maxProgressKey = '', includeVR) => {
  const activities = getAllActivities(program, includeVR);
  if (!maxProgressKey) {
    return activities[0];
  }

  const currentActIndex = getActivityPositionByKey(program, maxProgressKey, includeVR);
  // return next or last if theres no more activities to do.
  return activities[currentActIndex + 1] || activities[currentActIndex];
}

// calculates completion percentage for program, based on last activity into progress.
export const calculateProgramCompletion = (program, maxProgressKey, includeVR) => {
  const totalActivities = getAllActivities(program, includeVR).length;
  const currentActivityPosition = getActivityPositionByKey(program, maxProgressKey, includeVR);
  const activitiesDone = currentActivityPosition + 1;
  const progress = activitiesDone * 100 / totalActivities;
  return Math.round(progress*100)/100;
}