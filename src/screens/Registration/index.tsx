import React, { useState } from 'react'
import { View, StyleSheet, Linking, StyleProp, TextStyle, Platform, useWindowDimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Localization from 'expo-localization'
import { Formik } from 'formik'
import * as Yup from 'yup'
import crashlytics from '../../services/Crashlytics'
// @ts-ignore: non-ts file
import { auth } from '../../services/Auth'
// @ts-ignore: non-ts file
import functions from '../../services/Functions'
// @ts-ignore: non-ts file
import RegisterForm from './../../components/RegisterForm'

import {
  BasicScreen,
  Row,
  Input,
  Headline,
  Paragraph,
  Button,
  Text,
  Link,
  Checkbox,
  Snackbar,
  useRobTheme,
} from '@mindcoxr/rob'
import Blob from '../../../assets/SVG/Blob'
import { translate, getLocale } from '../../utils/localization'
import { legalUrl } from '../../utils/config'
import config from './../../../env'
import { useNavigation } from '@react-navigation/native'

type formikValueType = {
  name: string
  lastname: string
  password?: string
  confirmpassword?: string
  email: string
}

const Registration = () => {
  const navigation = useNavigation()
  const [busy, setBusy] = useState(false)
  const [errorToShow, setErrorToShow] = useState<string | undefined>()
  const onFormSubmit = async (form: { name: string; lastname: string; email: string; password: string }) => {
    if (!busy) {
      setBusy(true)
      try {
        const userCredentials = await auth().createUserWithEmailAndPassword(form.email, form.password)

        const userData = {
          name: form.name,
          lastname: form.lastname,
          email: form.email,
          language: getLocale(),
          app_version: config.APP_VERSION,
          tz: Localization.timezone,
          tz_offset: new Date().getTimezoneOffset() * -60,
          platform: `${Platform.OS}(${Platform.Version})`,
        }
        await functions().httpsCallable('registerUser')({ uid: userCredentials.user.uid, ...userData })

        // navigation occurs on auth state change.
      } catch (e) {
        crashlytics().recordError()

        // keep this line here to avoid update of unmounted component.
        setBusy(false)
      }
    }
  }
  // only for typescript error on Snackbar and Input requiring theme prop
  const theme = useRobTheme()
  return (
    <BasicScreen>
      <KeyboardAwareScrollView enableOnAndroid extraHeight={140} contentContainerStyle={{ flexGrow: 1 }}>
        <Snackbar
          theme={theme}
          visible={typeof errorToShow === 'string'}
          variant="danger"
          onDismiss={() => setErrorToShow(undefined)}
        >
          {errorToShow}
        </Snackbar>
        <Blob style={{ position: 'absolute', bottom: '16%', right: 0, opacity: 0.7 }} />
        <Row gutter={15}>
          <Headline size="huge" weight="bold">
            {translate('screens.Registration.headline')}
          </Headline>
          <Paragraph size="small" weight="normal">
            {translate('screens.Registration.subheading')}
          </Paragraph>
        </Row>
        <Formik
          initialValues={{
            name: '',
            lastname: '',
            email: '',
            password: '',
            terms: false,
          }}
          onSubmit={(values, actions) => {
            onFormSubmit(values)
            // actions.setSubmitting(false)
          }}
          validationSchema={getRegisterSchema()}
        >
          {({ handleChange, isSubmitting, setFieldValue, submitForm, values, errors, touched }) => {
            const errorKeys = Object.keys(errors)
            if (touched.terms && errorKeys.length === 1 && errorKeys.includes('terms')) {
              setErrorToShow(errors.terms)
            }
            return (
              <>
                <Row gutter={22}>
                  <Input
                    theme={theme}
                    value={values.name}
                    label={translate('screens.Registration.field-name')}
                    onChangeText={handleChange('name')}
                    error={touched.name && errors.name !== undefined}
                  />
                  <Input
                    theme={theme}
                    value={values.lastname}
                    label={translate('screens.Registration.field-lastname')}
                    onChangeText={handleChange('lastname')}
                    error={touched.lastname && errors.lastname !== undefined}
                  />
                  <Input
                    theme={theme}
                    value={values.email}
                    label={translate('screens.Registration.field-email')}
                    onChangeText={handleChange('email')}
                    error={touched.email && errors.email !== undefined}
                  />
                  <View>
                    <Input
                      theme={theme}
                      value={values.password}
                      password
                      label={translate('screens.Registration.field-passoword')}
                      onChangeText={handleChange('password')}
                      error={touched.password && errors.password !== undefined}
                    />
                    <View style={{ marginTop: 9 }}>
                      <Text weight="regular">{translate('screens.Registration.password-hint')}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Checkbox onPress={() => setFieldValue('terms', !values.terms)} checked={values.terms} />
                    <View style={{ marginLeft: 19 }}>
                      <Paragraph size="small" weight="normal">
                        {translate('screens.Registration.legal-acceptance-text')}{' '}
                        <Link href={legalUrl}>{translate('screens.Registration.legal-link-text')}</Link>
                      </Paragraph>
                    </View>
                  </View>
                </Row>
                <Row gutter={10} grow justifyContentOnGrow="flex-end">
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                      <Button role="secondary" onPress={() => navigation.goBack()}>
                        {translate('screens.Registration.cancel-button')}
                      </Button>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Button role="primary" onPress={submitForm} disabled={busy}>
                        {translate('screens.Registration.confirm-button')}
                      </Button>
                    </View>
                  </View>
                </Row>
              </>
            )
          }}
        </Formik>
      </KeyboardAwareScrollView>
    </BasicScreen>
  )
}

// defered to let translations to boot up
const getRegisterSchema = () => {
  return Yup.object().shape({
    name: Yup.string()
      .max(50, translate('commons.messages.fieldTooLong'))
      .required(translate('commons.messages.fieldRequired')),
    lastname: Yup.string().max(50, translate('commons.messages.fieldTooLong')),
    // .required(translate('commons.messages.fieldRequired')),
    password: Yup.string()
      .min(6, translate('screens.Register.error-password-short'))
      .required(translate('commons.messages.fieldRequired')),
    email: Yup.string()
      .email(translate('screens.Register.error-email-invalid'))
      .required(translate('commons.messages.fieldRequired')),
    terms: Yup.bool().oneOf([true], translate('screens.Register.accept_terms')),
  })
}

export default Registration
