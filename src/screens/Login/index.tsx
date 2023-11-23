import React, { useState } from 'react'
import { View } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import crashlytics from '../../services/Crashlytics'
import { auth } from '../../services/Auth'
import { translate } from '../../utils/localization'
import {
  BasicScreen as Screen,
  Row,
  Input,
  Headline,
  Paragraph,
  Button,
  Link,
  PopupWrapper,
  Subheading,
  useRobTheme,
} from '@mindcoxr/rob'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RootStackParamList } from '../../../types'
import Blob from '../../../assets/SVG/Blob'
import functions from '../../services/Functions'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../../../assets/SVG/Logo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator } from 'react-native-paper'

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>()
  const [errorPopup, setErrorPopup] = useState(false)
  const [errorLoginText, setErrorLoginText] = useState('')
  const [loading, setLoading] = useState(false)
  const isOpenForiOS = errorPopup

  const onFormSubmit = async (form: { email: string; password: string }) => {
    setLoading(true)
    try {
      // Try to login to local server
      await auth().signInWithEmailAndPassword(form.email.trim(), form.password)
    } catch (localError) {
      try {
        const error = localError as { code: string }

        // only on user-not-found we handle the error, otherwise we throw it
        if (error.code !== 'auth/user-not-found') {
          throw error
        }

        // handling error, attempt remote login (against Mindco Health server)
        const { data: result } = await functions().httpsCallable('remoteLogin')({
          email: form.email,
          password: form.password,
        })

        // on success we authenticate user we given JWT
        if (result.success) {
          await auth().signInWithCustomToken(result.jwt)
          await AsyncStorage.setItem('userToken', JSON.stringify(result.jwt))
        } else {
          throw { code: result.error }
        }
      } catch (jwtError) {
        const error = jwtError as { code: string }
        // @ts-ignore expect no param but requires 1
        crashlytics().recordError(error)
        setErrorLoginText(translate(`firebase.errormessages.${error.code}`))
        setErrorPopup(true)
        setLoading(false)
      }
    }
  }

  // only for typescript error on Snackbar and Input requiring theme prop
  const theme = useRobTheme()

  return (
    <View style={{ flexGrow: 1, overflow: 'hidden' }}>
      <SafeAreaView style={{ flex: 1 }}>
        {loading ? (
          <View
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <ActivityIndicator />
          </View>
        ) : (
          <Screen bounces={isOpenForiOS}>
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps="always"
              enableOnAndroid
              extraHeight={140}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <Row>
                <Logo />
              </Row>
              <Blob style={{ position: 'absolute', top: '16%', right: 0, opacity: 0.7 }} />
              <Row gutter={15}>
                <Headline size="huge" weight="bold">
                  {translate('screens.Login.heading')}
                </Headline>
                <Paragraph size="small" weight="normal">
                  {translate('screens.Login.subheading')}
                </Paragraph>
              </Row>
              <View style={{ height: 30 }} />
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                onSubmit={values => {
                  onFormSubmit(values)
                  // actions.setSubmitting(false)
                }}
                validationSchema={getRegisterSchema()}
              >
                {({ handleChange, submitForm, values, errors, touched }) => {
                  return (
                    <>
                      <Row gutter={22} grow justifyContentOnGrow="flex-end">
                        <Input
                          theme={theme}
                          value={values.email}
                          label={translate('screens.Login.email-address')}
                          onChangeText={handleChange('email')}
                          error={touched.email && errors.email !== undefined}
                        />
                        <Input
                          theme={theme}
                          value={values.password}
                          password
                          label={translate('screens.Login.password')}
                          onChangeText={handleChange('password')}
                          error={touched.password && errors.password !== undefined}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                          <View style={{ marginTop: 15 }}>
                            <Paragraph size="small">
                              <Link href="" onPress={() => navigation.navigate('ForgotPassword')}>
                                {translate('screens.Login.forgot-password')}
                              </Link>
                            </Paragraph>
                          </View>
                        </View>
                      </Row>
                      <Row gutter={10} justifyContentOnGrow="flex-end">
                        <View style={{ flexDirection: 'row' }}>
                          <View style={{ flex: 1 }}>
                            <Button role="secondary" onPress={() => navigation.goBack()}>
                              {translate('commons.messages.back')}
                            </Button>
                          </View>
                          <View style={{ flex: 1 }}>
                            <Button role="primary" onPress={submitForm} disabled={loading}>
                              {translate('screens.Login.sign-in')}
                            </Button>
                          </View>
                        </View>
                      </Row>
                      <Row gutter={10} justifyContentOnGrow="flex-end">
                        <View style={{ flex: 1 }}>
                          <Button role="secondary" outline onPress={() => navigation.navigate('Registration')}>
                            {translate('screens.Login.register')}
                          </Button>
                        </View>
                      </Row>
                    </>
                  )
                }}
              </Formik>
            </KeyboardAwareScrollView>
          </Screen>
        )}
      </SafeAreaView>
      <PopupWrapper show={errorPopup} onClose={() => setErrorPopup(false)}>
        <Row gutter={10}>
          <Subheading>{translate('commons.messages.genericInternalError')}</Subheading>
        </Row>
        <Row grow justifyContentOnGrow="flex-start" gutter={10}>
          <Paragraph size="xsmall" weight="normal" textAlign="center">
            {errorLoginText || '\n\n\n'}
          </Paragraph>
        </Row>
        <Row gutter={10}>
          <Button
            outline
            onPress={() => {
              setErrorPopup(false)
            }}
          >
            {translate('commons.messages.close')}
          </Button>
        </Row>
      </PopupWrapper>
    </View>
  )
}

// defered to let translations to boot up
const getRegisterSchema = () => {
  return Yup.object().shape({
    password: Yup.string()
      .min(6, translate('screens.Register.error-password-short'))
      .required(translate('commons.messages.fieldRequired')),
    email: Yup.string()
      .email(translate('screens.Register.error-email-invalid'))
      .required(translate('commons.messages.fieldRequired')),
  })
}

export default LoginScreen
