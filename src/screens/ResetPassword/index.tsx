import React, { useState } from 'react';
import { View, Image, Platform, useWindowDimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
// @ts-ignore: non-ts file
import template from 'lodash.template';
import crashlytics from '../../services/Crashlytics';
// @ts-ignore: non-ts file
import { auth } from '../../services/Auth';
import { getLocale } from '../../utils/localization';
import { translate } from '../../utils/localization';
import ResetPasswordForm, { ResetPasswordFormValues } from '../../components/ResetPasswordForm';
import FadeEffect from '../../components/FadeEffect';
import Props from './types';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  surface: {
    flex: 1,
    elevation: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  absolutScrollView: {
    width: '100%',
    minHeight: '100%',
  },
  title: {
    fontSize: 40,
    lineHeight: 40,
    marginBottom: 20,
    marginTop: 20,
    color: 'white',
  },
});

const formSubmitHandler = (setLoading: (val: boolean) => void) => async (form: ResetPasswordFormValues) => {
  setLoading(true);
  try {
    auth().languageCode = getLocale();
    await auth().sendPasswordResetEmail(form.email);

    alert(
      template(translate('screens.ResetPassword.success'))({
        email: form.email,
      }),
    );
  } catch (e: any) {
    crashlytics().recordError(e);
    const errMessage = e.message;
    alert(`firebase.errormessages.${errMessage}`);
    setLoading(false);
  }
};

const ResetPassword = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(false);
  const [resetFormIsVisible, showResetForm] = useState(true);
  const { width, height } = useWindowDimensions();

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
      <LinearGradient
        colors={['#88B0E3', '#75C1E1', '#2F8DCE', '#2F8DCE']}
        style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minHeight: '100%' }}
      >
        <View
          style={{
            flex: 1,
            height: height * 0.33,
            width,
            position: 'absolute',
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
        <FadeEffect show={resetFormIsVisible}>
          <View
            style={{
              flex: 1,
              width: Platform.OS === 'web' ? '100vw' : '100%',
              padding: 20,
              marginTop: 0,
              maxWidth: '100%',
              justifyContent: 'center',
            }}
          >
            <ResetPasswordForm
              onSubmit={async (form: ResetPasswordFormValues) => {
                await onFormSubmit(form);
                navigation.goBack();
              }}
              loading={loading}
            />
          </View>
        </FadeEffect>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default ResetPassword;
