/**
 * FORM FOR SIGN IN SCREEN. THE VERY FIRST OF ALL SCREENS.
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Surface,
  TextInput,
  HelperText,
} from 'react-native-paper';
import BigButton from '../BigButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
// @ts-ignore
import TextInputStyled from  '../TextInputStyled';
// import { translate } from './../../utils/localization';

export interface LoginFormValues {
   email: string;
   password: string;
 }

const getLogInSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .email('commons.messages.invalidEmail')
      .required('commons.messages.fieldRequired'),
    password: Yup.string().required(
      'commons.messages.fieldRequired',
    ),
  });
type Props = {
  onSubmit: (values: LoginFormValues) => void;
  loading: boolean;
}

const LoginForm = ({ onSubmit, loading }:Props) => {
  const _onSubmit = (values: LoginFormValues, actions: any) => {
    onSubmit(values);
    actions.setSubmitting(false);
  };
  const initialValues: LoginFormValues = { email: '', password: ''};
  return (
    <Surface
      style={styles.surface}
      theme={{ colors: { surface: 'transparent' } }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => _onSubmit(values, actions)}
        validationSchema={getLogInSchema()}
        validateOnChange={true}
      >
        {({
          handleChange,
          isSubmitting,
          submitForm,
          values,
          errors,
          touched,
        }) => {
          return (
            <React.Fragment>
              <View style={styles.rowForm}>
                <View
                  style={{ flex: 1, width: '100%', flexDirection: 'column' }}
                >
                  <TextInputStyled
                    error={touched.email !== undefined && Boolean(errors.email)}
                    label={'screens.login.formFieldUser'}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    textContentType="username"
                    autoCompleteType="email"
                    keyboardType="email-address"
                  />
                </View>
              </View>
              <View style={styles.rowForm}>
                <View
                  style={{ flex: 1, width: '100%', flexDirection: 'column' }}
                >
                  <TextInputStyled
                    error={touched.password !== undefined && Boolean(errors.password)}
                    label={'screens.login.formFieldPassword'}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    textContentType="password"
                    autoCompleteType="password"
                    secureTextEntry
                  />
                </View>
              </View>
              <BigButton
                variant="accent"
                style={{
                  marginTop: 40,
                  minWidth: '100%',
                }}
                loading={isSubmitting || loading}
                disabled={isSubmitting || loading}
                onPress={submitForm}
              >
                {'screens.login.singInButton'}
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
