// @ts-ignore: non-ts file
import active, { IP } from './active.env'
import packageJson from '../package.json'

type EnvConfig = {
  name: string
  SmartlookApiKey: string
  APP_VERSION: string
  hostingUrl?: Record<string, unknown>
  emulatorIp?: string
  webVrURL: string
  surveys: Record<string, string>
  activityCompletitionPorcentage: number
}
type EnvNames = 'prod' | 'dev' | 'test'

const envs: Record<EnvNames, EnvConfig> = {
  prod: {
    name: 'production',
    SmartlookApiKey: 'ef7b65fc05cee7e87d7014619355120f7a8a47e6',
    APP_VERSION: packageJson.version,
    webVrURL: 'relief-player.web.app',
    surveys: {
      stressSurvey: 'https://survey.zohopublic.com/zs/zaCzbK',
      resilienceSurvey: 'https://survey.zohopublic.com/zs/8PCzC8',
      integrationSurvey: 'https://survey.zohopublic.com/zs/K8CzFN',
    },
    activityCompletitionPorcentage: 0.8,
  },
  dev: {
    name: 'development',
    SmartlookApiKey: '',
    APP_VERSION: packageJson.version,
    webVrURL: 'relief-player-dev.web.app',
    surveys: {
      stressSurvey: 'https://survey.zohopublic.com/zs/2WBUxL',
      resilienceSurvey: 'https://survey.zohopublic.com/zs/CgBUcI',
      integrationSurvey: 'https://survey.zohopublic.com/zs/AvCzF3',
    },
    activityCompletitionPorcentage: 0.05,
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
      stressSurvey: 'https://survey.zohopublic.com/zs/2WBUxL',
      resilienceSurvey: 'https://survey.zohopublic.com/zs/CgBUcI',
      integrationSurvey: 'https://survey.zohopublic.com/zs/AvCzF3',
    },
    activityCompletitionPorcentage: 0.05,
  },
}

export default envs[active as EnvNames]
