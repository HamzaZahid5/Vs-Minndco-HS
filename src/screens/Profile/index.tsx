import React from 'react'
import { View, Text as NativeText } from 'react-native'
import {
  BasicScreen as Screen,
  Row,
  Input as TextInput,
  Headline,
  Paragraph,
  Button,
  useRobTheme,
  Subheading,
} from '@mindcoxr/rob'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { getDayRefFormat, getLocale, translate } from '../../utils/localization'
import { updateUserProfile } from '../../services/Firestore'
import { USER_SUPPORT_PROFILE, QUIT_DAY } from '../../store/selectors'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../types'
import config from '../../../env'
import moment from 'moment'
import useChangeQuitDayInAbsPopup from '../../utils/hooks/useChangeQuitDayInAbsPopup'

const PopupContent = ({ close }: { close: () => void }) => (
  <>
    <Row gutter={10}>
      <Subheading>{translate('commons.messages.popup_title')}</Subheading>
    </Row>
    <Row grow justifyContentOnGrow="flex-start" gutter={10}>
      <Paragraph size="small" weight="normal" textAlign="left">
        {translate('commons.messages.popup_description')}
      </Paragraph>
    </Row>
    <Row>
      <Button onPress={close} round>
        {translate('commons.messages.close')}
      </Button>
    </Row>
  </>
)

const PopupContentError = ({ close }: { close: () => void }) => (
  <>
    <Row gutter={10}>
      <Subheading>{translate('commons.messages.popup_title_error')}</Subheading>
    </Row>
    <Row grow justifyContentOnGrow="flex-start" gutter={10}>
      <Paragraph size="small" weight="normal" textAlign="left">
        {translate('commons.messages.popup_description_error')}
      </Paragraph>
    </Row>
    <Row>
      <Button onPress={close} round>
        {translate('commons.messages.close')}
      </Button>
    </Row>
  </>
)

const ProfileScreen = () => {
  const theme = useRobTheme()
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const user = useSelector(USER_SUPPORT_PROFILE)
  const quitDay = useSelector(QUIT_DAY)
  const isInAbstinence = quitDay && moment(quitDay).startOf('d') < moment().startOf('d')

  let textButton =
    (isInAbstinence ? translate('screens.quitDay.stopSmokingAt') : translate('screens.quitDay.commitmentCTA')) +
    ' ' +
    moment(quitDay).format(getDayRefFormat(getLocale())) +
    '...'

  return (
    <>
      <Formik
        initialValues={{
          name: user.display_name,
          lastname: '',
          pronouns: '',
          email: '',
          countryCode: '',
          phoneNumber: '',
          yearsSmocking: '',
          product: '',
          dailySmocking: '',
          unitPerPackage: '',
          costPerPackage: '',
          qday: quitDay,
          wlike: '',
        }}
        onSubmit={async (values, actions) => {
          if (values.name.length > 2) {
            await updateUserProfile({ display_name: values.name })
            navigation.navigate('BasicModal', {
              content: PopupContent,
            })
          } else {
            navigation.navigate('BasicModal', {
              content: PopupContentError,
            })
          }
        }}
        validationSchema={getRegisterSchema()}
      >
        {({ handleChange, isSubmitting, setFieldValue, submitForm, values, errors, touched, setValues }) => {
          return (
            <>
              <Screen>
                <Row gutter={40}>
                  <Headline size="medium" weight="bold" textAlign="left">
                    {translate('screens.Profile.info')}
                  </Headline>
                </Row>

                <Row gutter={23}>
                  <Paragraph textAlign="left" size="medium" weight="bold">
                    <NativeText style={{ color: '#000000' }}> {translate('screens.Profile.personalInfo')}</NativeText>
                  </Paragraph>
                  <TextInput
                    value={values.name}
                    onChangeText={handleChange('name')}
                    theme={theme}
                    error={touched.name && errors.name !== undefined}
                    label={translate('screens.Profile.name')}
                  />
                  {/* <TextInput
                    value={values.lastname}
                    onChangeText={handleChange('lastname')}
                    theme={theme}
                    error={touched.lastname && errors.lastname !== undefined}
                    label={translate('screens.Profile.lastname')}
                  />
                  <TextInput
                    value={values.pronouns}
                    onChangeText={handleChange('pronouns')}
                    theme={theme}
                    error={touched.pronouns && errors.pronouns !== undefined}
                    label={translate('screens.Profile.pronouns')}
                  />
                  <View style={{ height: 10 }} /> */}
                </Row>
                {/* <Row gutter={23}>
                  <Paragraph textAlign="left" size="medium" weight="bold">
                    <NativeText style={{ color: '#000000' }}> {translate('screens.Profile.contact')}</NativeText>
                  </Paragraph>
                  <TextInput
                    value={values.email}
                    onChangeText={handleChange('email')}
                    theme={theme}
                    error={touched.email && errors.email !== undefined}
                    label={translate('screens.Profile.email')}
                  />
                  <View>
                    <Paragraph size="xsmall" textAlign="left" weight="normal">
                      {translate('screens.Profile.phone')}
                    </Paragraph>
                    <TextInput
                      value={values.countryCode}
                      onChangeText={handleChange('countryCode')}
                      theme={theme}
                      error={touched.countryCode && errors.countryCode !== undefined}
                      label={translate('screens.Profile.countryCode')}
                    />
                  </View>
                  <TextInput
                    value={values.phoneNumber}
                    onChangeText={handleChange('phoneNumber')}
                    theme={theme}
                    error={touched.phoneNumber && errors.phoneNumber !== undefined}
                    label={translate('screens.Profile.phoneNumber')}
                  />
                  <View style={{ height: 10 }} />
                </Row> */}
                {/* <Row gutter={23}>
                  <Paragraph textAlign="left" size="medium" weight="bold">
                    <NativeText style={{ color: '#000000' }}>{translate('screens.Profile.smokeHabits')}</NativeText>
                  </Paragraph>
                  <TextInput
                    value={values.yearsSmocking}
                    onChangeText={handleChange('yearsSmocking')}
                    theme={theme}
                    error={touched.yearsSmocking && errors.yearsSmocking !== undefined}
                    label={translate('screens.Profile.phoneNumber')}
                  />
                  <TextInput
                    value={values.product}
                    onChangeText={handleChange('product')}
                    theme={theme}
                    error={touched.product && errors.product !== undefined}
                    label={translate('screens.Profile.phoneNumber')}
                  />
                  <TextInput
                    value={values.dailySmocking}
                    onChangeText={handleChange('dailySmocking')}
                    theme={theme}
                    error={touched.dailySmocking && errors.dailySmocking !== undefined}
                    label={translate('screens.Profile.phoneNumber')}
                  />
                  <TextInput
                    value={values.unitPerPackage}
                    onChangeText={handleChange('unitPerPackage')}
                    theme={theme}
                    error={touched.unitPerPackage && errors.unitPerPackage !== undefined}
                    label={translate('screens.Profile.phoneNumber')}
                  />
                  <View>
                    <TextInput
                      value={values.costPerPackage}
                      onChangeText={handleChange('costPerPackage')}
                      theme={theme}
                      error={touched.costPerPackage && errors.costPerPackage !== undefined}
                      label={translate('screens.Profile.phoneNumber')}
                    />
                    <Paragraph size="xsmall" textAlign="left" weight="normal">
                      {translate('screens.Profile.estimate')}
                    </Paragraph>
                  </View>
                  <View style={{ height: 10 }} />
                </Row> */}
                <Row gutter={23}>
                  <Paragraph textAlign="left" size="medium" weight="bold">
                    <NativeText style={{ color: '#000000' }}>
                      {translate('screens.Profile.goals')}
                      {/* : {quitDay} */}
                    </NativeText>
                  </Paragraph>
                  {/* <TextInput
                    value={values.wlike}
                    onChangeText={handleChange('wlike')}
                    theme={theme}
                    error={touched.wlike && errors.wlike !== undefined}
                    label={translate('screens.Profile.phoneNumber')}
                  /> */}
                  {/* <TextInput
                    value={values.qday}
                    onChangeText={() => {
                      handleChange('qday')
                      setValues({
                        ...values,
                        qday: quitDay,
                      })
                    }}
                    theme={theme}
                    disabled
                    error={touched.qday && errors.qday !== undefined}
                    label={translate('screens.Profile.quitDay')}
                  /> */}
                  <Button
                    role="secondary"
                    compact
                    outline
                    onPress={() => {
                      navigation.navigate('QuitDayModalProfile')
                    }}
                  >
                    {quitDay.length === 0 ? translate('screens.quitDay.inviteUser') : textButton}
                  </Button>
                  <View style={{ height: 10 }} />
                </Row>
                <Row gutter={23}>
                  <Paragraph textAlign="left" size="medium" weight="bold">
                    <NativeText style={{ color: '#000000' }}>
                      {' '}
                      {translate('screens.Profile.app', { defaultValue: 'App info' })}
                    </NativeText>
                  </Paragraph>
                  <Row margin={10} gutter={1}>
                    <Paragraph textAlign="left" size="small" weight="normal">
                      v{config.APP_VERSION}
                    </Paragraph>
                    {/* <Paragraph textAlign="left" size="small" weight="normal">
                      {uid}
                    </Paragraph> */}
                  </Row>
                </Row>
                <Row gutter={70} />
              </Screen>
              <View style={{ position: 'absolute', bottom: 20, left: 25, right: 25 }}>
                <Button role="primary" onPress={() => submitForm()}>
                  {translate('screens.Profile.button')}
                </Button>
              </View>
            </>
          )
        }}
      </Formik>
    </>
  )
}

const phoneValidationRegex =
  /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/g

const getRegisterSchema = () => {
  return Yup.object().shape({
    name: Yup.string().max(50, translate('commons.messages.fieldTooLong')),
    // lastname: Yup.string().max(50, translate('commons.messages.fieldTooLong')),
    // pronouns: Yup.string().email(translate('screens.Register.error-email-invalid')),
    // email: Yup.string().email(translate('screens.Register.error-email-invalid')),
    // countryCode: Yup.string().email(translate('screens.Register.error-email-invalid')),
    // phoneNumber: Yup.string().matches(phoneValidationRegex, translate('screens.Register.error-email-invalid')),
    // yearsSmocking: Yup.number().integer(),
    // product: Yup.string().max(50, translate('commons.messages.fieldTooLong')),
    // dailySmocking: Yup.number().integer(),
    // unitPerPackage: Yup.number().integer(),
    // costPerPackage: Yup.number(),
    qday: Yup.date(),
    // wlike: Yup.string().max(50, translate('commons.messages.fieldTooLong')),
  })
}

export default ProfileScreen
