// @ts-ignore: non-ts file
import active, { IP } from './active.env'
import packageJson from '../package.json'
import { Platform } from 'react-native'

type EnvConfig = {
  name: string
  SmartlookApiKey: string
  APP_VERSION: string
  hostingUrl?: Record<string, unknown>
  emulatorIp?: string
  webVrURL: string
  surveys: Record<string, string>
  activityCompletitionPorcentage: number
  healthUrl: string
}
type EnvNames = 'prod' | 'dev' | 'test'

const envs: Record<EnvNames, EnvConfig> = {
  prod: {
    name: 'production',
    SmartlookApiKey: 'ef7b65fc05cee7e87d7014619355120f7a8a47e6',
    APP_VERSION: packageJson.version,
    webVrURL: Platform.OS === "android" ? 'mindco-vr-player-v5.web.app' : 'mindcotine-player.web.app',
    surveys: {
      stressSurvey: 'https://survey.zohopublic.com/zs/zaCzbK',
      resilienceSurvey: 'https://survey.zohopublic.com/zs/8PCzC8',
      integrationSurvey: 'https://survey.zohopublic.com/zs/K8CzFN',
    },
    activityCompletitionPorcentage: 0.8,
    healthUrl: 'app.mindco.health',
  },
  dev: {
    name: 'development',
    SmartlookApiKey: '',
    APP_VERSION: packageJson.version,
    webVrURL: Platform.OS === "android" ? 'mindco-vr-player-v5-dev.web.app': 'mindcotine-player-dev.web.app',
    surveys: {
      stressSurvey: 'https://survey.zohopublic.com/zs/VJBqI3',
      resilienceSurvey: 'https://survey.zohopublic.com/zs/6MBqrr',
      integrationSurvey: 'https://survey.zohopublic.com/zs/AvCzF3',
    },
    activityCompletitionPorcentage: 0.05,
    healthUrl: 'app.mindco.health',
  },
  test: {
    name: 'test',
    SmartlookApiKey: '',
    APP_VERSION: packageJson.version,
    hostingUrl: {
      WebVRiOS: 'mindco-web-vr-player-ios-dev.web.app',
      AppSupport: 'mindco-relief-support-dev.web.app',
    },
    emulatorIp: IP,
    webVrURL: 'relief-player-dev.web.app',
    surveys: {
      stressSurvey: 'https://survey.zohopublic.com/zs/VJBqI3',
      resilienceSurvey: 'https://survey.zohopublic.com/zs/6MBqrr',
      integrationSurvey: 'https://survey.zohopublic.com/zs/AvCzF3',
    },
    activityCompletitionPorcentage: 0.05,
    healthUrl: 'app.mindco.health',
  },
}

export default envs[active as EnvNames]
