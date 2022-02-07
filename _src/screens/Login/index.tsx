import React, { useState } from 'react';
import { View, Image, Platform, useWindowDimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import crashlytics from '../../services/Crashlytics';
// @ts-ignore: non-ts file
import { auth } from '../../services/Auth';
import { translate } from '../../utils/localization';

// import {
//   navigateToAuth,
//   navigateToSignUp,
//   navigateToHowItWorks,
//   navigateToPasswordRecovery,
// } from './../../utils/navigationActions';
// import Firebase from './../../services/Firebase';
import LoginForm, { LoginFormValues } from '../../components/LoginForm';
// import { translate } from './../../utils/localization';
import BigButton from '../../components/BigButton';
import { CustomThemeType } from './../../utils/OriginalTheme';
// import { connector } from '../../redux/connector';
// import theme from '../../styles/BasicNewTheme';
import FadeEffect from '../../components/FadeEffect';
import SafeCanvas from '../../components/SafeCanvas';
import Props from './types';
// @ts-ignore: non-ts file
import styles from './styles';

const onMount = () => {
  // Firebase.signOutUser();
};

const formSubmitHandler = (setLoading: (val: boolean) => void) => async (form: LoginFormValues) => {
  setLoading(true);
  try {
    await auth().signInWithEmailAndPassword(form.email, form.password);
    // await Firebase.signInUser(form);
    // navigateToAuth(componentId);
  } catch (e) {
    crashlytics().recordError(e);
    const errMessage = e.message;
    alert(`firebase.errormessages.${errMessage}`);
    setLoading(false);
  }
};

const Login = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(false);
  const [loginFormIsVisible, showLoginForm] = useState(true);
  const theme = useTheme() as CustomThemeType;
  const { width, height } = useWindowDimensions();
  const onFormSubmit = formSubmitHandler(setLoading);
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      keyboardShouldPersistTaps={'handled'}
      extraHeight={250}
      contentContainerStyle={{ height }}
    >
      <LinearGradient colors={['#88B0E3', '#75C1E1', '#2F8DCE', '#2F8DCE']} style={{ height }}>
        <View
          style={{
            height: height * 0.33,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../../../assets/images/logo.png')}
            resizeMode="contain"
            style={{ height: height * 0.25 }}
          />
        </View>
        <FadeEffect show={loginFormIsVisible}>
          <View
            style={{
              width: Platform.OS === 'web' ? '100vw' : '100%',
              padding: 20,
              maxWidth: '100%',
              justifyContent: 'center',
            }}
            testID="welcome"
          >
            <LoginForm onSubmit={onFormSubmit} loading={loading} />
            <View>
              {/* @ts-ignore: unimplemented */}
              <BigButton
                variant="link"
                style={{ margin: 10, marginTop: -30 }}
                onPress={() => navigation.navigate('ResetPassword')}
              >
                {translate('screens.Login.forgot-password')}
              </BigButton>
              {/* @ts-ignore: unimplemented */}
              <BigButton
                style={{
                  minWidth: '100%',
                }}
                disabled={loading}
                onPress={() => navigation.navigate('Registration')}
                testID="go-to-registration-button"
              >
                {translate('screens.Login.create-an-account')}
              </BigButton>
            </View>
          </View>
        </FadeEffect>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default Login;
