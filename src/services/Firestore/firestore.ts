import firestore from '@react-native-firebase/firestore'
import config from '../../../env'
if (config.name === 'test') {
  firestore().useEmulator(config.emulatorIp || '', 8080)
}
export default firestore
