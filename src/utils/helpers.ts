import { ProgramActivity, ProgramType } from '../../types'
// @ts-ignore: need to install types
import template from 'lodash-es/template'

export const getModuleFromKey = (key = '') => key.split('_')[0]
export const getModuleNumberFromKey = (key = '') => Number(getModuleFromKey(key).replace('M', ''))

export const getLevelFromKey = (key = '') => key.split('_')[1]
export const getLevelNumberFromKey = (key = '') => Number(getLevelFromKey(key).replace('L', ''))

export const getActivityIdFromKey = (key = '') => {
  // support for _ (underscore) into activity id
  const activityKeyChunks = key.split('_').slice(2)
  return activityKeyChunks.join('_')
}

export const explodeActivityKey = (activityKey: string) => ({
  moduleId: getModuleNumberFromKey(activityKey),
  levelId: getLevelNumberFromKey(activityKey),
  activityId: getActivityIdFromKey(activityKey),
})

export const getActivityFromKey = (program: ProgramType, activityKey: string) => {
  const { moduleId, levelId, activityId } = explodeActivityKey(activityKey)
  return program.modules
    .find(m => m.id === moduleId)
    ?.levels.find(l => l.id === levelId)
    ?.activities.find(a => a.id === activityId)
}

export const buildActivityKey = (mId: number, lId: number, aId: string) => `M${mId}_L${lId}_${aId}`

export const getAllActivitiesKey = (program: ProgramType, includeVR: boolean) => {
  //  enhanced activitiy = activity + module id + level id
  const enhancedActivities = program.modules.reduce<{ activity: ProgramActivity; level: number; module: number }[]>(
    (allActivities, m) => {
      return [
        ...allActivities,
        ...m.levels.reduce<{ activity: ProgramActivity; level: number; module: number }[]>((allLevelActivities, l) => {
          return [...allLevelActivities, ...l.activities.map(activity => ({ activity, level: l.id, module: m.id }))]
        }, []),
      ]
    },
    [],
  )

  const relevantActivities = includeVR
    ? enhancedActivities
    : enhancedActivities.filter(ea => ea.activity.type !== 'vr-met')
  return relevantActivities.map(({ activity, module, level }) => buildActivityKey(module, level, activity.id))
}

export const formatAsset = (assetTemplate: string, language: string, gender: string) =>
  template(assetTemplate)({ language: language.toUpperCase(), gender: gender.toUpperCase() }) as string
