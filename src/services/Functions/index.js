import config from '../../../env'
let bootUp = false
export default () => {
  if (config.name === 'test' && !bootUp) {
    bootUp = true
    window.firebase.functions().useFunctionsEmulator(`http://${config.emulatorIp}:5001`)
  }
  return window.firebase.functions()
}
