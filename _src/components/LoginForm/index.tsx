/**
 * FORM FOR SIGN IN SCREEN. THE VERY FIRST OF ALL SCREENS.
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, TextInput, HelperText } from 'react-native-paper';
import BigButton from '../BigButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
// @ts-ignore: not implemented
import TextInputStyled from '../TextInputStyled';
import { translate } from '../../utils/localization';

export interface LoginFormValues {
  email: string;
  password: string;
}

const getLogInSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .email(translate('commons.messages.invalidEmail'))
      .required(translate('commons.messages.fieldRequired')),
    password: Yup.string().required(translate('commons.messages.fieldRequired')),
  });
type Props = {
  onSubmit: (values: LoginFormValues) => void;
  loading: boolean;
};

const LoginForm = ({ onSubmit, loading }: Props) => {
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
        validateOnChange={true}
      >
        {({ handleChange, isSubmitting, submitForm, values, errors, touched }) => {
          return (
            <React.Fragment>
              <View style={styles.rowForm}>
                <TextInputStyled
                  error={touched.email && Boolean(errors.email)}
                  label={translate('screens.Login.email-address')}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  textContentType="username"
                  autoCompleteType="email"
                  keyboardType="email-address"
                  testID="login-form-username-input"
                />
              </View>
              <View style={styles.rowForm}>
                <TextInputStyled
                  error={touched.password && Boolean(errors.password)}
                  label={translate('screens.Login.password')}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  textContentType="password"
                  autoCompleteType="password"
                  secureTextEntry
                  testID="login-form-password-input"
                />
              </View>
              {/* @ts-ignore: not implemented */}
              <BigButton
                variant="accent"
                style={{
                  marginTop: '10%',
                  minWidth: '100%',
                }}
                loading={isSubmitting || loading}
                disabled={isSubmitting || loading}
                onPress={submitForm}
                testID="login-form-submmit-cta"
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
  },
  rowForm: {
    // borderWidth: 1,
    // borderColor: 'red',
    flexDirection: 'row',
    margin: 0,
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
});
