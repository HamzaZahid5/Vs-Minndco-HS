import active from './active.env';
import packageJson from './../package.json';
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
};

// alert(envs[active].DEV_API);
export default envs[active];
