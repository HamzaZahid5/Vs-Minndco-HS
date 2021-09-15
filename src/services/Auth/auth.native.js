import config from '../../../env';
import auth from '@react-native-firebase/auth';
if (config.name === 'test') {
  auth().useEmulator(`http://${config.emulatorIp}:9099`);
}
export default () => auth();
