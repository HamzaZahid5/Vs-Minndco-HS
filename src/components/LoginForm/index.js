/**
 * FORM FOR SIGN IN SCREEN. THE VERY FIRST OF ALL SCREENS.
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Surface,
  TextInput,
  HelperText,
  Button,
  withTheme,
} from 'react-native-paper';
import BigButton from './../BigButton';
// import { translate } from './../../utils/localization';
import { Formik } from 'formik';
import * as Yup from 'yup';

const getLogInSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .email('commons.messages.invalidEmail')
      .required('commons.messages.fieldRequired'),
    password: Yup.string().required(
      'commons.messages.fieldRequired',
    ),
  });
const LoginForm = ({ theme, onSubmit, loading }) => {
  const _onSubmit = (values, actions) => {
    onSubmit(values);
    actions.setSubmitting(false);
  };
  return (
    <Surface
      style={styles.surface}
      theme={{ colors: { surface: 'transparent' } }}
    >
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, actions) => _onSubmit(values, actions)}
        validationSchema={getLogInSchema()}
        validateOnChange={true}
      >
        {({
          handleChange,
          isSubmitting,
          handleSubmit,
          values,
          errors,
          touched,
        }) => {
          return (
            <React.Fragment>
              <View style={styles.rowForm}>
                <View
                  style={{ felx: 1, width: '100%', flexDirection: 'column' }}
                >
                  <TextInput
                    theme={{
                      roundness: 0,
                      colors: {
                        background: 'transparent',
                        text: 'white',
                        placeholder: 'gray',
                      },
                    }}
                    error={touched.email !== undefined && errors.email}
                    style={{ flex: 1 }}
                    label={'screens.login.formFieldUser'}
                    value={values.email}
                    type="flat"
                    onChangeText={handleChange('email')}
                    textContentType="username"
                    autoCompleteType="email"
                    selectionColor="white"
                    keyboardType="email-address"
                    underlineColor='gray'
                  />
                  <HelperText
                    type="error"
                    visible={touched.email !== undefined && errors.email}
                  >
                    {errors.email}
                  </HelperText>
                </View>
              </View>
              <View style={styles.rowForm}>
                <View
                  style={{ felx: 1, width: '100%', flexDirection: 'column' }}
                >
                  <TextInput
                    theme={{
                      roundness: 0,
                      colors: {
                        background: 'transparent',
                        text: 'white',
                        placeholder: 'gray',
                      },
                    }}
                    error={touched.password !== undefined && errors.password}
                    style={{ flex: 1 }}
                    label={'screens.login.formFieldPassword'}
                    value={values.password}
                    type="flat"
                    onChangeText={handleChange('password')}
                    textContentType="password"
                    autoCompleteType="password"
                    secureTextEntry
                    selectionColor="white"
                    underlineColor={'gray'}
                  />
                  <HelperText
                    type="error"
                    visible={touched.password !== undefined && errors.password}
                  >
                    {errors.password}
                  </HelperText>
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
                onPress={handleSubmit}
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

export default withTheme(LoginForm);

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
