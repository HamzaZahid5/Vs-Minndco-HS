/**
 * FORM FOR SIGN IN SCREEN. THE VERY FIRST OF ALL SCREENS.
 */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, TextInput, HelperText } from 'react-native-paper';
import BigButton from '../BigButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
// @ts-ignore: not implemented
import TextInputStyled from '../TextInputStyled';
import { translate } from '../../utils/localization';
// import { translate } from './../../utils/localization';

export interface LoginFormValues {
  email: string;
  password: string;
}

const getLogInSchema = () =>
  Yup.object().shape({
    email: Yup.string().email('commons.messages.invalidEmail').required('commons.messages.fieldRequired'),
    password: Yup.string().required('commons.messages.fieldRequired'),
  });
type Props = {
  onSubmit: (values: LoginFormValues) => void;
  loading: boolean;
};

const LoginForm = ({ onSubmit, loading }: Props) => {
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const _onSubmit = (values: LoginFormValues, actions: any) => {
    onSubmit(values);
    actions.setSubmitting(false);
  };
  const initialValues: LoginFormValues = { email: '', password: '' };
  return (
    <Surface style={styles.surface} theme={{ colors: { surface: 'transparent' } }}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => _onSubmit(values, actions)}
        validationSchema={getLogInSchema()}
      >
        {({ handleChange, isSubmitting, submitForm, values, errors, touched, validateField, validateForm }) => {
          return (
            <React.Fragment>
              <View style={styles.rowForm}>
                <View style={{ flex: 1, width: '100%', flexDirection: 'column' }}>
                  <TextInputStyled
                    error={values.email.length > 0 && Boolean(errors.email)}
                    label={translate('screens.Login.email-address')}
                    value={values.email}
                    onChangeText={(e: string | React.ChangeEvent) => {
                      handleChange('email')(e);
                      validateField('email');
                    }}
                    textContentType="username"
                    autoCompleteType="email"
                    keyboardType="email-address"
                  />
                </View>
              </View>
              <View style={styles.rowForm}>
                <View style={{ flex: 1, width: '100%', flexDirection: 'column' }}>
                  <TextInputStyled
                    error={isPasswordEmpty || (values.password.length > 0 && Boolean(errors.password))}
                    label={translate('screens.Login.password')}
                    value={values.password}
                    onChangeText={(e: string) => {
                      if (e.length === 0) {
                        setIsPasswordEmpty(true);
                      } else if (isPasswordEmpty) {
                        setIsPasswordEmpty(false);
                      }
                      handleChange('password')(e);
                      validateField('password');
                    }}
                    textContentType="password"
                    autoCompleteType="password"
                    secureTextEntry
                  />
                </View>
              </View>
              {/* @ts-ignore: not implemented */}
              <BigButton
                variant="accent"
                style={{
                  marginTop: 40,
                  minWidth: '100%',
                }}
                loading={isSubmitting || loading}
                disabled={isSubmitting || loading}
                onPress={() => {
                  if (values.password.length === 0) {
                    setIsPasswordEmpty(true);
                    return;
                  }
                  validateForm().then(submitForm);
                }}
              >
                {translate('screens.Login.sign-in')}
              </BigButton>
            </React.Fragment>
          );
        }}
      </Formik>
    </Surface>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  surface: {
    width: '100%',
    elevation: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  rowForm: {
    // borderWidth: 1,
    // borderColor: 'red',
    flexDirection: 'row',
    margin: 0,
    width: '100%',
    marginBottom: 10,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
});
