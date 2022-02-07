import config from '../../../env'
let bootUp = false
export default () => {
  if (config.name === 'test' && !bootUp) {
    bootUp = true
    window.firebase.auth().useEmulator(`http://${config.emulatorIp}:9099`)
  }
  return window.firebase.auth()
}
