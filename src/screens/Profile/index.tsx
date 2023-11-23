import React, { useEffect } from 'react'
import { View, Text as NativeText, Image } from 'react-native'
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
import { USER_SUPPORT_PROFILE, QUIT_DAY, STATE, TREATMENT_MODULE_AND_LEVEL } from '../../store/selectors'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../types'
import config from '../../../env'
import moment from 'moment'
import { template } from 'lodash'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { assert } from '@hapi/joi'
import { defineAnimation } from 'react-native-reanimated'
import Countdown from 'countdown'
import { isActivityDone } from '../../utils/helpers'

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
  const userState = useSelector(STATE)
  const treatmentModule = useSelector(TREATMENT_MODULE_AND_LEVEL)
  const isInAbstinence = quitDay && moment(quitDay).startOf('d') <= moment().startOf('d') && treatmentModule[0] === 3
  const dayInProfile = moment(quitDay).format(getDayRefFormat(getLocale()))
  const daysLabel = Countdown(
    moment(quitDay).toDate(),
    null,
    Countdown.YEARS | Countdown.MONTHS | Countdown.WEEKS | Countdown.DAYS,
  ).toString()
  // let textButton = isInAbstinence
  //   ? template(translate('screens.quitDay.commitmentCTA'))({
  //       dayInProfile,
  //     })
  //   : translate('screens.quitDay.stopSmokingAt') + dayInProfile + '...'

  let textButton2 = isInAbstinence
    ? template(translate('screens.quitDay.smokeFreeSince', { defaultValue: `I have been smoke free: ${daysLabel}` }))({
        daysLabel,
      })
    : translate('screens.quitDay.stopSmokingAt') + dayInProfile + '...'
  useEffect(() => {
    console.log(quitDay)
  }, [quitDay])
  console.log(`dias desde que deje: ${daysLabel}`)
  console.log(`modulo:${treatmentModule[0]}`)
  console.log(isInAbstinence)

  return (
    <>
      <Formik
        initialValues={{
          name: user.display_name,
          phoneNumber: user.phone,
          qday: quitDay,
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
        {({ handleChange, submitForm, values, errors, touched }) => {
          return (
            <>
              <Screen>
                <Row gutter={23}>
                  <Headline size="medium" weight="bold" textAlign="left">
                    {translate('screens.Profile.info')}
                  </Headline>
                </Row>
                <View style={{ backgroundColor: theme.colors.primaryPalette['500'] }}>
                  <Row gutter={20}>
                    <Paragraph textAlign="left" size="medium" weight="bold">
                      <NativeText style={{ color: '#000000' }}>{translate('screens.Profile.goals')}</NativeText>
                    </Paragraph>
                    <View>
                      <NativeText
                        style={{
                          color: '#000000',
                          marginTop: -5,
                          textAlign: 'left',
                          fontWeight: 'bold',
                          fontFamily: 'arial',
                        }}
                      >
                        {translate('screens.Profile.quitDate', {
                          defaultValue: 'Choose the date you want to become smoke-free',
                        })}
                      </NativeText>
                    </View>
                    <View style={{ backgroundColor: '#FCFCFC', borderRadius: 50 }}>
                      <Button
                        role="secondary"
                        round
                        compact
                        outline
                        onPress={() => {
                          navigation.navigate('QuitDayModalProfile')
                        }}
                      >
                        {quitDay.length === 0 ||
                        quitDay === undefined ||
                        (quitDay && moment(quitDay).startOf('d') < moment().startOf('d'))
                          ? translate('screens.quitDay.inviteUser')
                          : textButton2}
                      </Button>
                    </View>
                  </Row>
                </View>
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
                </Row>
                <Row gutter={23}>
                  <Paragraph textAlign="left" size="medium" weight="bold">
                    <NativeText style={{ color: '#000000' }}>
                      {' '}
                      {translate('screens.Profile.phone', { defaultValue: 'Phone' })}:{' '}
                      {user.isValidPhone ? (
                        <Paragraph textAlign="left" size="medium" weight="bold">
                          <NativeText style={{ color: 'green' }}>
                            {translate('screens.Profile.isValidPhone')}
                          </NativeText>
                          <Icons name="check-circle" size={15} color="green" />
                        </Paragraph>
                      ) : (
                        <Paragraph textAlign="left" size="medium" weight="bold">
                          <NativeText style={{ color: 'red' }}>
                            {translate('screens.Profile.isNotValidPhone')}
                          </NativeText>
                          <Icons name="close-circle" size={15} color="red" />
                        </Paragraph>
                      )}{' '}
                    </NativeText>
                  </Paragraph>
                  <TextInput
                    value={values.phoneNumber}
                    onChangeText={handleChange('phoneNumber')}
                    theme={theme}
                    error={touched.phoneNumber && errors.phoneNumber !== undefined}
                    label={translate('screens.Profile.phoneNumber')}
                    editable={false}
                  />
                  <Button
                    role="secondary"
                    compact
                    outline
                    onPress={() => {
                      navigation.navigate('ValidationPhone')
                    }}
                  >
                    {user.isValidPhone
                      ? translate('screens.Profile.changePhoneNumber')
                      : translate('screens.Profile.validPhoneNumber')}
                  </Button>
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
    qday: Yup.date(),
  })
}

export default ProfileScreen
