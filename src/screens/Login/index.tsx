import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, Linking } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Surface, Title, Button, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
// @ts-ignore
import styles from './styles';

const onMount = () => {
  // Firebase.signOutUser();
};

const formSubmitHandler = (setLoading:(val: boolean) => void) => async (form: LoginFormValues) => {
  setLoading(true);
  try {
    await auth().signInWithEmailAndPassword(form.email, form.password);
    // await Firebase.signInUser(form);
    // navigateToAuth(componentId);
  } catch (e) {
    const exp = /\[(.*?)\]/;
    // @ts-ignore
    const errMessage = exp.exec(e.message)[1];
    alert(`firebase.errormessages.${errMessage}`);
  }
  setLoading(false);
};

const Login = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(false);
  const [loginFormIsVisible, showLoginForm] = useState(true);
  const theme = useTheme() as CustomThemeType;
  useEffect(onMount, []);

  const onFormSubmit = formSubmitHandler(setLoading);
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps={'handled'}
      style={styles.absolutScrollView}
    >
      <Surface
        style={styles.surface}
      >
        <SafeCanvas
          style={{ backgroundColor: "red", flex: 1, maxHeight: 100, display: 'none' }}
          shadowMap
          // invalidateFrameloop
          // pixelRatio={Dimensions.get('window').height / Dimensions.get('window').width}
          camera={{ position: [-5, 11, 20], fov: 30 }}
          concurrent
          gl={{ antialias: true }}
        >
          {/*@ts-ignore*/}
          <ambientLight intensity={1} color="#dadada"/>
          {/*@ts-ignore*/}
          <mesh>
            {/*@ts-ignore*/}
            <boxBufferGeometry args={[1, 1, 1]} />
            {/*@ts-ignore*/}
            <meshStandardMaterial color={'orange'} />
            {/*@ts-ignore*/}
          </mesh>
        </SafeCanvas>
        
        {/* <View
          style={{
            position: 'relative',
            height: 260,
            marginBottom: 80,
            width: '100%',
          }}
        >
          <Title style={[styles.title, { marginTop: 50 }]}>
            {'screens.login.title'}
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
            {'screens.login.howWorksButton'}
          </Button>
        </View> */}
        <FadeEffect show={loginFormIsVisible}>
          <View style={{
            flex: 1,
            maxWidth: '100%',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: 'red',
          }}>
            <LoginForm onSubmit={onFormSubmit} loading={loading} />
            <View>
              <BigButton
                variant="link"
                style={{ margin: 10, marginTop: -30 }}
                // onPress={() => navigateToPasswordRecovery(componentId)}
              >
                {'screens.login.forgotPassword'}
              </BigButton>
              <BigButton
                style={{
                  minWidth: '100%',
                }}
                disabled={loading}
                onPress={() => navigation.push('Registration')}
              >
                {'screens.login.signUpButton'}
              </BigButton>
            </View>
          </View>
        </FadeEffect>
        <FadeEffect show={!loginFormIsVisible}>
          <View style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: 'red',
          }}>
            <BigButton
              variant="accent"
              style={{
                marginTop: 80,
                minWidth: '100%',
              }}
              disabled={loading}
              onPress={() => showLoginForm(true)}
            >
              {'screens.login.enterButton'}
            </BigButton>
          </View>
          <View>
            <BigButton
              style={{
                marginTop: 20,
                minWidth: '100%',
              }}
              disabled={loading}
              onPress={() => navigation.push('Registration')}
            >
              {'screens.login.signUpButton'}
            </BigButton>
          </View>
        </FadeEffect>
      </Surface>
    </ScrollView>
  );
};

export default Login;
