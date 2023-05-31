import moment from 'moment'
import { ProgramActivity, ProgramType } from '../../types'
// @ts-ignore: need to install types
import template from 'lodash-es/template'
import { SmokeRecordsState } from '../store/slices/smokeRecord'
import { Platform } from 'react-native'
import {
  PERMISSIONS,
  RESULTS,
  check,
  checkNotifications,
  request,
  requestNotifications,
} from 'react-native-permissions'

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

  // const relevantActivities = includeVR
  //   ? enhancedActivities
  //   : enhancedActivities.filter(ea => ea.activity.type !== 'vr-met')
  const relevantActivities = enhancedActivities
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
  // const relevantActivities = includeVR ? activities : activities.filter(a => a.type !== 'vr-met')
  const relevantActivities = activities
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

export const calculateProgressForQuitDayCongratulated = (progress: string[]) => {
  const highestModule = 3
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
export const calculateSmokedCigarettesFromJournal = (record: SmokeRecordsState) =>
  Object.keys(record).reduce((t, d) => t + record[d], 0)
export const calculateSavedCigarettesFromJournal = (record: SmokeRecordsState, baselineIntake: number) => {
  const res = Object.keys(record).length * baselineIntake - calculateSmokedCigarettesFromJournal(record)
  return res >= 0 ? res : 0
}

enum KEYS {
  NAV = 'nav',
  AUTH = 'auth',
  SIGNIN_CODE = 'signin',
}

const HEALTH_DL_PATH = 'https://app.mindco.health/dl'

export const parseRawDeepLink = (url: string) => {
  // since RN do not have built-in URL methods, we parse url by RegExp (I don't want to add a lib for this)
  const queryString = url.replace(new RegExp(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/), '$7')
  const deepLink = queryString.match(new RegExp(/link=([^&]*)/))
  return deepLink![1]
}

export const parseDeepLink = (deepLink: string) => {
  const isDLNextGeneration = deepLink.includes(HEALTH_DL_PATH)
  const command = deepLink.replace(HEALTH_DL_PATH, '') || ''
  const isNavCommand = command.startsWith(`/${KEYS.NAV}/`)
  const isAuthCommand = command.startsWith(`/${KEYS.AUTH}/`)
  const isSignInCommand = command.startsWith(`/${KEYS.SIGNIN_CODE}/`)

  const INTENT_KEY = isAuthCommand ? KEYS.AUTH : isSignInCommand ? KEYS.SIGNIN_CODE : isNavCommand ? KEYS.NAV : ''

  return {
    isNextGen: isDLNextGeneration,
    // command is [INTENT_KEY]/[value], somthing like:
    // nav/Profile
    // signin/[enrollment id]
    // auth/[JWT]
    command: command.replace(new RegExp(`^(.*?)/${INTENT_KEY}/`), `${INTENT_KEY}/`),
  }
}
export const parseCommand = (command: string) => {
  const isAuth = command.startsWith(`${KEYS.AUTH}/`)
  const isSignInCode = command.startsWith(`${KEYS.SIGNIN_CODE}/`)
  const isNav = command.startsWith(`${KEYS.NAV}/`)

  const INTENT_KEY = isAuth ? KEYS.AUTH : isSignInCode ? KEYS.SIGNIN_CODE : isNav ? KEYS.NAV : ''

  // removes intent key from command and gets only the value (screen name, jwt or enrollment id)
  const value = command.replace(new RegExp(`(^.*)${INTENT_KEY}/`), '')

  return { isAuth, isSignInCode, isNav, value }
}

export const isActivityDone = (activityKey: string, progress: string[]) => progress.includes(activityKey)

export const getAspectRatio = (sizeX: number, sizeY: number) => {
  let min = sizeX
  let max = sizeY
  if (min > max) {
    min = sizeY
    max = sizeX
  }
  return max / min
}

export const getRealWidth = (inches: number, sizeX: number, sizeY: number) => {
  const ar = getAspectRatio(sizeX, sizeY)
  const widthFactor = Math.sqrt(ar ** 2 + 1)
  // factor 2.54 converts inch to cm
  return (2.54 * inches) / widthFactor
}

export const getRealHeight = (inches: number, sizeX: number, sizeY: number) => {
  const ar = getAspectRatio(sizeX, sizeY)
  const width = getRealWidth(inches, sizeX, sizeY)
  return ar * width
}

// calculates completion percentage for program, based on last activity into progress.
export const calculateProgramCompletion = (program: ProgramType, progressArray: string[], includeVR?: boolean) => {
  const allActKeys = getAllActivitiesKey(program, !!includeVR)
  const firstNonCompletedIndex = allActKeys.findIndex(aKey => !progressArray.includes(aKey))

  //All activities was done
  if (firstNonCompletedIndex === -1) {
    return 100
  }

  if (firstNonCompletedIndex === 0) {
    return 0
  }

  const maxProgressKey = allActKeys[firstNonCompletedIndex - 1]
  const currentIdIndex = allActKeys.indexOf(maxProgressKey)
  const progress = (currentIdIndex + 1) / allActKeys.length
  return Math.round(progress * 100)
}

export const checkNotificationPermission = async () => {
  let resultAndroid
  let resultIOS

  if (Platform.OS === 'android') {
    resultAndroid = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
  } else if (Platform.OS === 'ios') {
    resultIOS = await checkNotifications()
  }

  if (Platform.OS === 'android' && resultAndroid === RESULTS.GRANTED) {
    console.log('Permission granted ANDROID')
  } else if (Platform.OS === 'ios' && resultIOS?.status === 'granted') {
    console.log('Permission granted IOS')
  } else {
    requestNotificationPermission()
  }
}

const requestNotificationPermission = async () => {
  let resultAndroid
  let resultIOS

  if (Platform.OS === 'android') {
    resultAndroid = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
  } else if (Platform.OS === 'ios') {
    resultIOS = await requestNotifications(['alert', 'badge', 'sound'])
  }

  if (Platform.OS === 'android' && resultAndroid === RESULTS.GRANTED) {
    console.log('Permission granted ANDROID')
  } else if (Platform.OS === 'ios' && resultIOS?.status === 'granted') {
    console.log('Permission granted IOS')
  }
}
