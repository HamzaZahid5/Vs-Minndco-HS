import React, { useState } from 'react'
import { LayoutRectangle, ScrollView, View, Text as NativeText } from 'react-native'
import {
  BasicScreen as Screen,
  Row,
  Input as TextInput,
  Headline,
  Paragraph,
  Button,
  Text,
  Link,
  Checkbox,
  Snackbar,
  useRobTheme,
} from '@mindcoxr/rob'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { translate } from '../../utils/localization'

const ProfileScreen = () => {
  const [buttonHeigth, setButtonHeigth] = useState(0)
  const theme = useRobTheme()

  return (
    <>
      <Formik
        initialValues={{
          name: '',
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
          qday: '',
          wlike: '',
        }}
        onSubmit={(values, actions) => {
          console.log('Form submitted')
          // actions.setSubmitting(false)
        }}
        validationSchema={getRegisterSchema()}
      >
        {({ handleChange, isSubmitting, setFieldValue, submitForm, values, errors, touched }) => {
          return (
            <>
              <Screen>
                <Row gutter={40}>
                  <Headline size="medium" weight="bold" textAlign="left">
                    Your info
                  </Headline>
                </Row>

                <Row gutter={23}>
                  <Paragraph textAlign="left" size="medium" weight="bold">
                    <NativeText style={{ color: '#000000' }}>Personal info</NativeText>
                  </Paragraph>
                  <TextInput
                    value={values.name}
                    onChangeText={handleChange('name')}
                    theme={theme}
                    error={touched.name && errors.name !== undefined}
                    label="Name"
                  />
                  <TextInput
                    value={values.lastname}
                    onChangeText={handleChange('lastname')}
                    theme={theme}
                    error={touched.lastname && errors.lastname !== undefined}
                    label="Last Name"
                  />
                  <TextInput
                    value={values.pronouns}
                    onChangeText={handleChange('pronouns')}
                    theme={theme}
                    error={touched.pronouns && errors.pronouns !== undefined}
                    label="Preferred pronouns"
                  />
                  <View style={{ height: 10 }} />
                </Row>
                <Row gutter={23}>
                  <Paragraph textAlign="left" size="medium" weight="bold">
                    <NativeText style={{ color: '#000000' }}>Contact info</NativeText>
                  </Paragraph>
                  <TextInput
                    value={values.email}
                    onChangeText={handleChange('email')}
                    theme={theme}
                    error={touched.email && errors.email !== undefined}
                    label="Email"
                  />
                  <View>
                    <Paragraph size="xsmall" textAlign="left" weight="normal">
                      Phone number
                    </Paragraph>
                    <TextInput
                      value={values.countryCode}
                      onChangeText={handleChange('countryCode')}
                      theme={theme}
                      error={touched.countryCode && errors.countryCode !== undefined}
                      label="Country code"
                    />
                  </View>
                  <TextInput
                    value={values.phoneNumber}
                    onChangeText={handleChange('phoneNumber')}
                    theme={theme}
                    error={touched.phoneNumber && errors.phoneNumber !== undefined}
                    label="Phone number"
                  />
                  <View style={{ height: 10 }} />
                </Row>
                <Row gutter={23}>
                  <Paragraph textAlign="left" size="medium" weight="bold">
                    <NativeText style={{ color: '#000000' }}>Smoking habits</NativeText>
                  </Paragraph>
                  <TextInput
                    value={values.yearsSmocking}
                    onChangeText={handleChange('yearsSmocking')}
                    theme={theme}
                    error={touched.yearsSmocking && errors.yearsSmocking !== undefined}
                    label="Years smoking"
                  />
                  <TextInput
                    value={values.product}
                    onChangeText={handleChange('product')}
                    theme={theme}
                    error={touched.product && errors.product !== undefined}
                    label="Product you smoke"
                  />
                  <TextInput
                    value={values.dailySmocking}
                    onChangeText={handleChange('dailySmocking')}
                    theme={theme}
                    error={touched.dailySmocking && errors.dailySmocking !== undefined}
                    label="Daily smoked"
                  />
                  <TextInput
                    value={values.unitPerPackage}
                    onChangeText={handleChange('unitPerPackage')}
                    theme={theme}
                    error={touched.unitPerPackage && errors.unitPerPackage !== undefined}
                    label="Unit per package"
                  />
                  <View>
                    <TextInput
                      value={values.costPerPackage}
                      onChangeText={handleChange('costPerPackage')}
                      theme={theme}
                      error={touched.costPerPackage && errors.costPerPackage !== undefined}
                      label="Cost per package"
                    />
                    <Paragraph size="xsmall" textAlign="left" weight="normal">
                      An estimate works too ;)
                    </Paragraph>
                  </View>
                  <View style={{ height: 10 }} />
                </Row>
                <Row gutter={23}>
                  <Paragraph textAlign="left" size="medium" weight="bold">
                    <NativeText style={{ color: '#000000' }}>Your goals</NativeText>
                  </Paragraph>
                  <TextInput
                    value={values.wlike}
                    onChangeText={handleChange('wlike')}
                    theme={theme}
                    error={touched.wlike && errors.wlike !== undefined}
                    label="What you'd like"
                  />
                  <TextInput
                    value={values.qday}
                    onChangeText={handleChange('qday')}
                    theme={theme}
                    error={touched.qday && errors.qday !== undefined}
                    label="Quit day"
                  />
                  <View style={{ height: 10 }} />
                </Row>
                <Row gutter={23} grow justifyContentOnGrow="flex-end">
                  <View style={{ height: buttonHeigth }} />
                </Row>
              </Screen>
              <View
                onLayout={e => !buttonHeigth && setButtonHeigth(e.nativeEvent.layout.height)}
                style={{ position: 'absolute', bottom: 20, left: 25, right: 25 }}
              >
                <Button role="primary" onPress={() => submitForm()}>
                  See what we can do
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
    lastname: Yup.string().max(50, translate('commons.messages.fieldTooLong')),
    pronouns: Yup.string().email(translate('screens.Register.error-email-invalid')),
    email: Yup.string().email(translate('screens.Register.error-email-invalid')),
    countryCode: Yup.string().email(translate('screens.Register.error-email-invalid')),
    phoneNumber: Yup.string().matches(phoneValidationRegex, translate('screens.Register.error-email-invalid')),
    yearsSmocking: Yup.number().integer(),
    product: Yup.string().max(50, translate('commons.messages.fieldTooLong')),
    dailySmocking: Yup.number().integer(),
    unitPerPackage: Yup.number().integer(),
    costPerPackage: Yup.number(),
    qday: Yup.date(),
    wlike: Yup.string().max(50, translate('commons.messages.fieldTooLong')),
  })
}

export default ProfileScreen
