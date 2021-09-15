import active, { IP } from './active.env';
import packageJson from './../package.json';
// import akinator from './ip.env.json';
console.log('akinator says:', IP);

const envs = {
  prod: {
    name: 'production',
    SmartlookApiKey: 'ef7b65fc05cee7e87d7014619355120f7a8a47e6',
    APP_VERSION: packageJson.version,
  },
  dev: {
    name: 'development',
    SmartlookApiKey: '',
    APP_VERSION: packageJson.version,
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
  },
};

export default envs[active];
