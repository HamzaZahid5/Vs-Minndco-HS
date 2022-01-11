import template from 'lodash-es/template';
import { TIPS_VR, TIPS_VIDEO, TIPS_AUDIO } from './constants';
export const isFunction = f => typeof f === 'function';

export const getTipsByActivityType = type => {
  return {
    'vr-met': TIPS_VR(),
    '2d-video': TIPS_VIDEO(),
    audio: TIPS_AUDIO(),
  }[type];
};

export const getIconByActivityType = type => {
  switch (type) {
    case 'vr-met':
      return 'google-cardboard';
    case 'survey':
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

export const range = (min, max) => Math.random() * (max - min) + min;

// PROGRAM HELPERS
export const buildActivityKey = (mId, lId, aId) => `M${mId}_L${lId}_${aId}`;
export const explodeActivityKey = activityKey => ({
  moduleId: getModuleNumberFromKey(activityKey),
  levelId: getLevelNumberFromKey(activityKey),
  activityId: getActivityIdFromKey(activityKey),
});
export const getModuleFromKey = (key = '') => key.split('_')[0];
export const getModuleNumberFromKey = (key = '') => Number(getModuleFromKey(key).replace('M', ''));
export const formatAsset = (assetTemplate, language, gender) =>
  template(assetTemplate)({ language: language.toUpperCase(), gender: gender.toUpperCase() });

export const getLevelFromKey = (key = '') => key.split('_')[1];
export const getLevelNumberFromKey = (key = '') => Number(getLevelFromKey(key).replace('L', ''));

export const getActivityIdFromKey = (key = '') => {
  // support for _ (underscore) into activity id
  const activityKeyChunks = key.split('_').slice(2);
  return activityKeyChunks.join('_');
};

export const getActivityFromKey = (program, activityKey) => {
  const { moduleId, levelId, activityId } = explodeActivityKey(activityKey);
  return program.modules
    .find(m => m.id === moduleId)
    .levels.find(l => l.id === levelId)
    .activities.find(a => a.id === activityId);
};

// returns index of given activity into deep flatten array of activities, considering VR filter.
export const getActivityPositionByKey = (program, key, includeVR) => {
  const activities = getAllActivitiesKey(program, includeVR);
  const index = activities.findIndex(a => a === key);
  return index;
};

// all activities (no level, no module) with VR filter
export const getAllActivities = (program, includeVR) => {
  const activities = unnestedProgram(program);
  const relevantActivities = includeVR ? activities : activities.filter(a => a.type !== 'vr-met');
  return relevantActivities;
};

export const getAllActivitiesKey = (program, includeVR) => {
  //  enhanced activitiy = activity + module id + level id
  const enhancedActivities = program.modules.reduce((allActivities, m) => {
    return [
      ...allActivities,
      ...m.levels.reduce((allLevelActivities, l) => {
        return [...allLevelActivities, ...l.activities.map(activity => ({ activity, level: l.id, module: m.id }))];
      }, []),
    ];
  }, []);
  const relevantActivities = includeVR
    ? enhancedActivities
    : enhancedActivities.filter(ea => ea.activity.type !== 'vr-met');
  return relevantActivities.map(({ activity, module, level }) => buildActivityKey(module, level, activity.id));
};

// deep flat activities (no level, no module)
export const unnestedProgram = program => {
  return program.modules.reduce((count, m) => {
    return [
      ...count,
      ...m.levels.reduce((level_count, l) => {
        return [...level_count, ...l.activities];
      }, []),
    ];
  }, []);
};

// returns next activity based on program and last activity into progress.
export const findNextActivity = (program, maxProgressKey = '', includeVR) => {
  const activities = getAllActivities(program, includeVR);
  const currentActIndex = getActivityPositionByKey(program, maxProgressKey, includeVR);
  const nextActivityIndex = currentActIndex + 1;
  // return next or last if theres no more activities to do.
  return {
    nextActivity: activities[nextActivityIndex] || activities[currentActIndex],
    isLastActivity: activities.length === nextActivityIndex + 1,
  };
};

// calculates completion percentage for program, based on last activity into progress.
export const calculateProgramCompletion = (program, maxProgressKey, includeVR) => {
  if (!maxProgressKey) return 0; // No key means the first activity

  const levelActivities =
    program.modules[getModuleNumberFromKey(maxProgressKey) - 1].levels[getLevelNumberFromKey(maxProgressKey) - 1]
      .activities;
  let levelActivitiesIds = levelActivities;
  if (!includeVR) {
    levelActivitiesIds = levelActivities.filter(a => a.type !== 'vr-met');
  }
  levelActivitiesIds = levelActivitiesIds.map(act => act.id);
  const currentIdIndex = levelActivitiesIds.indexOf(getActivityIdFromKey(maxProgressKey));
  const progress = (currentIdIndex + 1) / levelActivitiesIds.length;
  return Math.round(progress * 100);
};

export const filterActivitiesByCategory = (program, category, includeVR = false) => {
  const totalActivities = getAllActivities(program, includeVR);
  return totalActivities.filter(a => a.category === category);
};
