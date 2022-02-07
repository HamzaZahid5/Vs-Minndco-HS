import functions from '@react-native-firebase/functions'
import config from '../../../env'
if (config.name === 'test') {
  functions().useFunctionsEmulator(`http://${config.emulatorIp}:5001`)
}
export default () => functions()
