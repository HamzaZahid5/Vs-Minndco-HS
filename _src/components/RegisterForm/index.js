/**
 * SIGN UP FORM WITH MULTIPLE FIELDS, THE LARGER FORM IN THE APP.
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TextInputMask } from 'react-native';
import { Surface, Subheading, Button, withTheme, Text, RadioButton, HelperText } from 'react-native-paper';
import TextInputStyled from './../TextInputStyled';
// import PhoneNumberInput from './../PhoneNumberInput';
import BigButton from './../BigButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { translate } from '../../utils/localization';

Yup.addMethod(Yup.string, 'complianceE146', function (onErrorMessage) {
  const message = onErrorMessage;
  return this.test('complianceE146', message, function (value) {
    const { path, createError } = this;
    // [value] - value of the property being tested
    // [path]  - property name,
    return /^\+[1-9]\d{10,14}$/.test(value) || createError({ path, message });
  });
});
// defered to let translations to boot up
const getRegisterSchema = () => {
  return Yup.object().shape({
    name: Yup.string()
      .max(50, translate('commons.messages.fieldTooLong'))
      .required(translate('commons.messages.fieldRequired')),
    lastname: Yup.string()
      .max(50, translate('commons.messages.fieldTooLong'))
      .required(translate('commons.messages.fieldRequired')),
    password: Yup.string()
      .min(6, translate('screens.Register.error-password-short'))
      .required(translate('commons.messages.fieldRequired')),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref('password'), null], translate('screens.Register.error-password-missmatch'))
      .required(translate('screens.Register.error-password-missmatch')),
    email: Yup.string()
      .email(translate('screens.Register.error-email-invalid'))
      .required(translate('commons.messages.fieldRequired')),
  });
};

const RegisterForm = ({ theme, onSubmit, loading }) => {
  const _onSubmit = (values, actions) => {
    onSubmit(values);
    actions.setSubmitting(false);
  };
  return (
    <Surface style={styles.surface} theme={{ colors: { surface: 'transparent' } }}>
      <Formik
        initialValues={{
          name: '',
          lastname: '',
          password: '',
          confirmpassword: '',
          // phone: '',
          email: '',
          // gender: 'f',
          // country: 'US', // it is set on phone selection
        }}
        onSubmit={(values, actions) => _onSubmit(values, actions)}
        validationSchema={getRegisterSchema()}
      >
        {({ handleChange, isSubmitting, submitForm, values, errors, touched }) => (
          <React.Fragment>
            <View style={styles.rowForm} key="row1">
              <TextInputStyled
                style={{
                  flex: 1,
                  marginRight: 10,
                  // borderWidth: 1,
                  // borderColor: 'green',
                }}
                label={translate('screens.Register.name')}
                value={values.name}
                type="flat"
                onChangeText={handleChange('name')}
                error={touched.name !== undefined && errors.name ? errors.name : null}
                testID="register-form-name-input"
              />
              <TextInputStyled
                style={{
                  flex: 1,
                  marginLeft: 10,
                  // borderWidth: 1,
                  // borderColor: 'green',
                }}
                label={translate('screens.Register.last-name')}
                value={values.lastname}
                type="flat"
                testID="register-form-lastname-input"
                onChangeText={handleChange('lastname')}
                error={touched.lastname !== undefined && errors.lastname ? errors.lastname : null}
              />
            </View>
            <View style={styles.rowForm} key="row5">
              <TextInputStyled
                style={{ flex: 1 }}
                label={translate('screens.Register.email-address')}
                value={values.email}
                type="flat"
                testID="register-form-email-input"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                error={touched.email !== undefined && errors.email ? errors.email : null}
              />
            </View>

            <View style={styles.rowForm} key="row2">
              <TextInputStyled
                style={{ flex: 1 }}
                label={translate('screens.Register.password')}
                value={values.password}
                type="flat"
                testID="register-form-password-input"
                onChangeText={handleChange('password')}
                secureTextEntry
                textContentType="newPassword"
                error={touched.password !== undefined && errors.password ? errors.password : null}
              />
            </View>
            <View style={styles.rowForm} key="row3">
              <TextInputStyled
                style={{ flex: 1 }}
                label={translate('screens.Register.repeat-password')}
                value={values.confirmpassword}
                type="flat"
                testID="register-form-rpassword-input"
                onChangeText={handleChange('confirmpassword')}
                secureTextEntry
                error={touched.confirmpassword !== undefined && errors.confirmpassword ? errors.confirmpassword : null}
              />
            </View>

            <BigButton
              key="submitBtn"
              style={{
                marginTop: 40,
                minWidth: '100%',
              }}
              loading={loading}
              disabled={loading}
              onPress={submitForm}
              testID="register-button"
            >
              {translate('screens.Register.create-account')}
            </BigButton>
          </React.Fragment>
        )}
      </Formik>
    </Surface>
  );
};

RegisterForm.propTypes = {
  theme: PropTypes.object,
  onSubmit: PropTypes.bool,
  loading: PropTypes.bool,
};

export default withTheme(RegisterForm);

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
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginVertical: 50,
  },
  rowFormRadios: {
    // borderWidth: 1,
    // borderColor: 'red',
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
    height: 70,
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
});
