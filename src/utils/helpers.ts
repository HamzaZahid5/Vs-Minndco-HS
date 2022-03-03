import moment from 'moment'
import { ProgramActivity, ProgramType } from '../../types'
// @ts-ignore: need to install types
import template from 'lodash-es/template'
import { SmokeRecordsState } from '../store/slices/smokeRecord'

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

export const unnestedProgram = (program: ProgramType) => {
  return program.modules.reduce<ProgramActivity[]>((count, m) => {
    return [
      ...count,
      ...m.levels.reduce<ProgramActivity[]>((level_count, l) => {
        return [...level_count, ...l.activities]
      }, []),
    ]
  }, [])
}

export const getAllActivities = (program: ProgramType, includeVR: boolean) => {
  const activities = unnestedProgram(program)
  const relevantActivities = includeVR ? activities : activities.filter(a => a.type !== 'vr-met')
  return relevantActivities
}

export const calculateProgressForQuitDayRevert = (progress: string[]) => {
  const hasActivitiesFromModule2 = progress.reduce((r, p) => p.includes('M2') || r, false)
  const highestModule = hasActivitiesFromModule2 ? 2 : 1
  const highestLevelOnModule = progress.reduce((r, p) => {
    const levelNum = p.includes(`M${highestModule}_`) && p.split('_')[1].replace('L', '')
    return Number(levelNum) > r ? Number(levelNum) : r
  }, 1)
  return [highestModule, highestLevelOnModule]
}
export const listOfLastXDays = (x: number) => {
  const referenceDate = moment()
  referenceDate.subtract(x, 'd')
  const result = []
  for (let i = x; i > 0; i--) {
    const dateString = referenceDate.add(1, 'd').format('YYYY-MM-DD')
    result.push(dateString)
  }
  return result
}
// formulas coming from back-end
const calculateSmokedCigarettesFromJournal = (record: SmokeRecordsState) =>
  Object.keys(record).reduce((t, d) => t + record[d], 0)
export const calculateSavedCigarettesFromJournal = (record: SmokeRecordsState, baselineIntake: number) => {
  const res = Object.keys(record).length * baselineIntake - calculateSmokedCigarettesFromJournal(record)
  return res >= 0 ? res : 0
}
