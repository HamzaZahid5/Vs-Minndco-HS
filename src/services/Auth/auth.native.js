/* eslint-disable no-console */
import config from '../../../env'
import auth from '@react-native-firebase/auth'

// Verifica si config existe antes de intentar acceder a sus propiedades
const configName = config?.name ?? 'defaultName'
const emulatorIp = config?.emulatorIp ?? 'defaultIp'
console.log(configName, emulatorIp)

try {
  // Solo intenta usar el emulador si el nombre de la configuración es 'test'
  if (configName === 'test') {
    auth().useEmulator(`http://${emulatorIp}:9099`)
  }
} catch (error) {
  // Maneja cualquier error que pueda ocurrir cuando se intenta usar el emulador
  console.error('Failed to use emulator:', error.message)
}

export default () => auth()