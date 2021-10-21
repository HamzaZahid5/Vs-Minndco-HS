// @ts-ignore: non-ts file
import active, { IP } from './active.env';
import packageJson from '../package.json';

type EnvConfig = {
  name: string;
  SmartlookApiKey: string;
  APP_VERSION: string;
  hostingUrl?: Record<string, unknown>;
  emulatorIp?: string;
  webVrURL: string;
};
type EnvNames = 'prod' | 'dev' | 'test';

const envs: Record<EnvNames, EnvConfig> = {
  prod: {
    name: 'production',
    SmartlookApiKey: 'ef7b65fc05cee7e87d7014619355120f7a8a47e6',
    APP_VERSION: packageJson.version,
    webVrURL: 'relief-player.web.app',
  },
  dev: {
    name: 'development',
    SmartlookApiKey: '',
    APP_VERSION: packageJson.version,
    webVrURL: 'relief-player-dev.web.app',
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
    webVrURL: '',
  },
};

export default envs[active as EnvNames];
