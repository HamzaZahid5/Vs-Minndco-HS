import config from '../../../env'
let bootUp = false
const defFunction = () => {
  if (config.name === 'test' && !bootUp) {
    bootUp = true
    window.firebase.firestore().useEmulator(config.emulatorIp, 8080)
  }
  return window.firebase.firestore()
}
Object.defineProperty(defFunction, 'FieldValue', { get: () => window.firebase.firestore.FieldValue })
Object.defineProperty(defFunction, 'Timestamp', { get: () => window.firebase.firestore.Timestamp })

export default defFunction
