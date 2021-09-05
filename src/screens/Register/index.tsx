import React, { useState } from 'react';
import { View, StyleSheet, Linking, StyleProp, TextStyle } from 'react-native';
import { Surface, Text, Title, useTheme } from 'react-native-paper';
import crashlytics from '../../services/Crashlytics';
// @ts-ignore: non-ts file
import { auth } from '../../services/Auth';
// @ts-ignore: non-ts file
import functions from '../../services/Functions';
// @ts-ignore: non-ts file
import RegisterForm from './../../components/RegisterForm';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { translate, getLocale } from '../../utils/localization';

type formikValueType = {
  name: string;
  lastname: string;
  password?: string;
  confirmpassword?: string;
  email: string;
};

const getLegalContent = (styles: Record<string, StyleProp<TextStyle>>) => {
  const result = [];
  let interest;
  let partial;
  const text = translate('screens.Register.terms-of-use-label');
  [interest, partial] = text.split('${termOfUse}');
  result.push(<Text key={interest}>{interest}</Text>);
  result.push(
    <Text key="link1" style={styles.hyperlink} onPress={() => Linking.openURL('https://mindcotine.com/terms-of-use')}>
      {translate('screens.Register.terms-of-use')}
    </Text>,
  );
  [interest, partial] = partial.split('${privacyPolicy}');
  result.push(<Text key={interest}>{interest}</Text>);
  result.push(
    <Text key="link2" style={styles.hyperlink} onPress={() => Linking.openURL('https://mindcotine.com/privacy-policy')}>
      {translate('screens.Register.privacy-policy')}
    </Text>,
  );
  return result;
};
const Register = () => {
  const [busy, setBusy] = useState(false);
  const theme = useTheme() as CustomThemeType;
  const styles = getStyles(theme);
  const onFormSubmit = async (form: formikValueType & { tz_offset: number }) => {
    if (!busy) {
      setBusy(true);
      // console.log(form);
      try {
        const userCredentials = await auth().createUserWithEmailAndPassword(form.email, form.password);
        form.tz_offset = new Date().getTimezoneOffset() * -60;

        delete form.password;
        delete form.confirmpassword;
        const language = getLocale();
        await functions().httpsCallable('registerUser')({ uid: userCredentials.user.uid, ...form, language });

        // navigation occurs on auth state change.
      } catch (e) {
        crashlytics().recordError(e);

        // keep this line here to avoid update of unmounted component.
        setBusy(false);
      }
    }
  };
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps={'handled'}
      extraScrollHeight={160}
      contentContainerStyle={styles.KeyboardAwareScrollStyle}
    >
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles.absolutScrollView}
      > */}
      <Surface theme={{ colors: { surface: theme.colors.secondary } }} style={styles.surface}>
        {/* <RoundedBackButton onPress={() => navigateBack(componentId)} /> */}
        <Title style={styles.title}>{translate('screens.Register.main-title')}</Title>
        <RegisterForm onSubmit={onFormSubmit} loading={busy} />
        <View style={styles.legalContainer}>{getLegalContent(styles)}</View>
      </Surface>
      {/* </ScrollView> */}
    </KeyboardAwareScrollView>
  );
};

export default Register;

const getStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    absolutScrollView: {
      // borderWidth: 1, borderColor: 'red',
      width: '100%',
      height: '100%',
    },
    surface: {
      // borderWidth: 1, borderColor: 'red',
      padding: 30,
      minHeight: '100%',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      elevation: 0,
    },
    title: {
      fontFamily: 'Graphik-Regular',
      fontSize: 40,
      lineHeight: 45,
      // fontWeight: 'bold',
      marginBottom: 20,
      marginTop: 20,
      color: 'white',
      alignSelf: 'center',
    },
    legalContainer: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      flex: 1,
      maxWidth: '100%',
      opacity: 0.7,
    },
    hyperlink: {
      color: theme.colors.placeholder,
      textDecorationLine: 'underline',
    },
    KeyboardAwareScrollStyle: { flexGrow: 1 },
  });
