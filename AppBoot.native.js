import 'react-native-gesture-handler';
// import { registerRootComponent } from 'expo';
import Smartlook from 'smartlook-react-native-wrapper';
import { AppRegistry, Platform, UIManager } from 'react-native';
import env from './env'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
if (env.name === 'production') Smartlook.setupAndStartRecording(env.SmartlookApiKey); //Should use env
import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
// registerRootComponent(App);
export default () => AppRegistry.registerComponent('main', () => App);
