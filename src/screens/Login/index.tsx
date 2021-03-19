import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, Linking } from 'react-native';
import auth from '@react-native-firebase/auth';
import { StackNavigationProp } from '@react-navigation/stack';
import { Surface, Title, Button, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {
//   navigateToAuth,
//   navigateToSignUp,
//   navigateToHowItWorks,
//   navigateToPasswordRecovery,
// } from './../../utils/navigationActions';
// import Firebase from './../../services/Firebase';
import LoginForm from '../../components/LoginForm';
// import { translate } from './../../utils/localization';
import BigButton from '../../components/BigButton';
import styles from './styles';
// import { connector } from '../../redux/connector';
// import theme from '../../styles/BasicNewTheme';
import FadeEffect from '../../components/FadeEffect';
import { RootStackParamList } from '../../../types';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const onMount = () => {
  // Firebase.signOutUser();
};

const formSubmitHandler = (setLoading) => async form => {
  setLoading(true);
  try {
    await auth().signInWithEmailAndPassword(form.email, form.password);
    // await Firebase.signInUser(form);
    // navigateToAuth(componentId);
  } catch (e) {
    const exp = /\[(.*?)\]/;
    const errMessage = exp.exec(e.message)[1];
    alert(`firebase.errormessages.${errMessage}`);
  }
  setLoading(false);
};

const Login = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(false);
  const [loginFormIsVisible, showLoginForm] = useState(false);
  const theme = useTheme();
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
        theme={{ colors: { surface: theme.colors.secondary } }}
      >
        <Image
          style={{ width: 85, height: 40 }}
          // source={require('./../../styles/images/flat_logo.png')}
        />
        <View
          style={{
            position: 'relative',
            height: 260,
            marginBottom: 80,
            width: '100%',
          }}
        >
          <Image
            style={{
              width: 600,
              height: 700,
              position: 'absolute',
              top: -150,
              right: -250,
            }}
            // source={require('./../../styles/images/cigarette_off.png')}
          />
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
        </View>
        <FadeEffect show={loginFormIsVisible}>
          <LoginForm onSubmit={onFormSubmit} loading={loading} />
          <View>
            <Button
              mode="default"
              uppercase={false}
              theme={{ colors: { primary: '#ffffff' } }}
              labelStyle={{
                color: theme.colors.accent,
                width: '100%',
                textDecorationLine: 'underline',
                lineHeight: 30,
              }}
              style={{ margin: 10, marginTop: -30 }}
              // onPress={() => navigateToPasswordRecovery(componentId)}
            >
              {'screens.login.forgotPassword'}
            </Button>
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
        </FadeEffect>
        <FadeEffect show={!loginFormIsVisible}>
          <View>
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

const mapStateToProp = state => ({
  locale: state.app?.locale,
});

export default Login;
