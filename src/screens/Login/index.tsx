import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, Linking, Platform, Dimensions } from 'react-native';
// @ts-ignore: non-ts file
import { auth } from '../../services/Auth';
import { Surface, Title, Button, useTheme } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
    // const exp = /\[(.*?)\]/;
    // const errMessage = exp.exec(e.message)[1];
    const errMessage = e.message;
    alert(`firebase.errormessages.${errMessage}`);
    setLoading(false);
  }
};

const Login = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(false);
  const [loginFormIsVisible, showLoginForm] = useState(true);
  const theme = useTheme() as CustomThemeType;

  const onFormSubmit = formSubmitHandler(setLoading);
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      keyboardShouldPersistTaps={'handled'}
      extraHeight={190}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.absolutScrollView}
    >
      <LinearGradient colors={['#88B0E3', '#75C1E1', '#2F8DCE', '#2F8DCE']} style={{ minHeight: '100%' }}>
        <View
          style={{
            // backgroundColor: 'red',
            flex: 1,
            height: Dimensions.get('window').height * 0.33,
            width: Dimensions.get('window').width,
            position: 'absolute',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../../../assets/images/logo.png')}
            resizeMode="contain"
            style={{ height: Dimensions.get('window').height * 0.25 }}
          />
        </View>
        {false && (
          <SafeCanvas
            style={{
              display: 'none',
              backgroundColor: 'red',
              flex: 1,
              height: Dimensions.get('window').height * 0.33,
              width: Dimensions.get('window').width,
              position: 'absolute',
            }}
            shadowMap
            // invalidateFrameloop
            // pixelRatio={Dimensions.get('window').height / Dimensions.get('window').width}
            camera={{ position: [-5, 11, 20], fov: 30 }}
            concurrent
            gl={{ antialias: true }}
          >
            {/*@ts-ignore*/}
            <ambientLight intensity={1} color="#dadada" />
            {/*@ts-ignore*/}
            <mesh>
              {/*@ts-ignore*/}
              <boxBufferGeometry args={[1, 1, 1]} />
              {/*@ts-ignore*/}
              <meshStandardMaterial color={'orange'} />
              {/*@ts-ignore*/}
            </mesh>
          </SafeCanvas>
        )}

        {/* <View
          style={{
            position: 'relative',
            height: 260,
            marginBottom: 80,
            width: '100%',
          }}
        >
          <Title style={[styles.title, { marginTop: 50 }]}>
            Learn To Quit Smoking!
          </Title>
          <Button
            mode="contained"
            // onPress={() => navigateToHowItWorks(componentId)}
            uppercase={false}
            theme={{ roundness: 50, colors: { primary: theme.colors.primary } }}
            style={{
              height: 40,
              width: 200,
              justifyContent: 'center',
              paddingRight: 5,
              marginTop: 50,
            }}
            labelStyle={{
              color: 'white',
              position: 'relative',
              lineHeight: 14,
            }}
            contentStyle={{ flexDirection: 'row-reverse' }}
            icon={({ size }) => (
              <Icon
                color="white"
                name="arrow-right-drop-circle"
                size={30}
                style={{ marginLeft: -20 }}
              />
            )}
          >
            How does it work?
          </Button>
        </View> */}
        <FadeEffect show={loginFormIsVisible}>
          <View
            style={{
              flex: 1,
              width: Platform.OS === 'web' ? '100vw' : '100%',
              padding: 20,
              marginTop: '40%',
              maxWidth: '100%',
              justifyContent: 'center',
            }}
          >
            <LoginForm onSubmit={onFormSubmit} loading={loading} />
            <View>
              {/* @ts-ignore: unimplemented */}
              <BigButton
                variant="link"
                style={{ margin: 10, marginTop: -30 }}
                // onPress={() => navigateToPasswordRecovery(componentId)}
              >
                {translate('forgot password?')}
              </BigButton>
              {/* @ts-ignore: unimplemented */}
              <BigButton
                style={{
                  minWidth: '100%',
                }}
                disabled={loading}
                onPress={() => navigation.push('Registration')}
              >
                {translate('Create an account')}
              </BigButton>
            </View>
          </View>
        </FadeEffect>
        <FadeEffect show={!loginFormIsVisible}>
          <View
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: 'red',
            }}
          >
            {/* @ts-ignore: unimplemented */}
            <BigButton
              variant="accent"
              style={{
                marginTop: 80,
                minWidth: '100%',
              }}
              disabled={loading}
              onPress={() => showLoginForm(true)}
            >
              {translate('Enter')}
            </BigButton>
          </View>
          <View>
            {/* @ts-ignore: unimplemented */}
            <BigButton
              style={{
                marginTop: 20,
                minWidth: '100%',
              }}
              disabled={loading}
              onPress={() => navigation.push('Registration')}
            >
              {translate('Create an account')}
            </BigButton>
          </View>
        </FadeEffect>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default Login;
