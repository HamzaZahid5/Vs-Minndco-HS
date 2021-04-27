import active from './active.env';
import packageJson from './../package.json';
const envs = {
  prod: {
    name: 'production',
    APP_VERSION: packageJson.version,
  },
  dev: {
    name: 'development',
    APP_VERSION: packageJson.version,
  },
};

// alert(envs[active].DEV_API);
export default envs[active];
