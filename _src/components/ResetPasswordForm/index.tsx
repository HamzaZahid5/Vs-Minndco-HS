import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface } from 'react-native-paper';
import BigButton from '../BigButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
// @ts-ignore: not implemented
import TextInputStyled from '../TextInputStyled';
import { translate } from '../../utils/localization';

export interface ResetPasswordFormValues {
  email: string;
}

const getResetPasswordSchema = () =>
  Yup.object().shape({
    email: Yup.string().email('commons.messages.invalidEmail').required('commons.messages.fieldRequired'),
  });
type Props = {
  onSubmit: (values: ResetPasswordFormValues) => void;
  loading: boolean;
};

const ResetPasswordForm = ({ onSubmit, loading }: Props) => {
  const _onSubmit = (values: ResetPasswordFormValues, actions: any) => {
    onSubmit(values);
    actions.setSubmitting(false);
  };
  const initialValues: ResetPasswordFormValues = { email: '' };
  return (
    <Surface style={styles.surface} theme={{ colors: { surface: 'transparent' } }}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => _onSubmit(values, actions)}
        validationSchema={getResetPasswordSchema()}
        validateOnChange={true}
      >
        {({ handleChange, isSubmitting, submitForm, values, errors, touched }) => {
          return (
            <React.Fragment>
              <View style={styles.rowForm}>
                <View style={{ flex: 1, width: '100%', flexDirection: 'column' }}>
                  <TextInputStyled
                    error={touched.email && Boolean(errors.email)}
                    label={translate('screens.ResetPassword.email-address')}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    textContentType="username"
                    autoCompleteType="email"
                    keyboardType="email-address"
                  />
                </View>
              </View>
              <BigButton
                variant="accent"
                style={{
                  marginTop: 0,
                  minWidth: '100%',
                }}
                loading={isSubmitting || loading}
                disabled={isSubmitting || loading}
                onPress={submitForm}
              >
                {translate('screens.ResetPassword.reset-password')}
              </BigButton>
            </React.Fragment>
          );
        }}
      </Formik>
    </Surface>
  );
};

export default ResetPasswordForm;

const styles = StyleSheet.create({
  surface: {
    width: '100%',
    elevation: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  rowForm: {
    flexDirection: 'row',
    margin: 0,
    width: '100%',
    marginBottom: 10,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
});
