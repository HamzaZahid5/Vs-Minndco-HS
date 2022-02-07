import React, { useState } from 'react';
import { View, StyleSheet, Linking, StyleProp, TextStyle, Platform, useWindowDimensions } from 'react-native';
import { Surface, Text, Title, useTheme } from 'react-native-paper';
import * as Localization from 'expo-localization';
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
import config from './../../../env';

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
      try {
        const userCredentials = await auth().createUserWithEmailAndPassword(form.email, form.password);
        form.tz_offset = new Date().getTimezoneOffset() * -60;

        delete form.password;
        delete form.confirmpassword;
        const complementaryInfo = {
          language: getLocale(),
          app_version: config.APP_VERSION,
          tz: Localization.timezone,
          tz_offset: new Date().getTimezoneOffset() * -60,
          platform: `${Platform.OS}(${Platform.Version})`,
        };
        await functions().httpsCallable('registerUser')({ uid: userCredentials.user.uid, ...form, complementaryInfo });

        // navigation occurs on auth state change.
      } catch (e) {
        crashlytics().recordError(e);

        // keep this line here to avoid update of unmounted component.
        setBusy(false);
      }
    }
  };
  return (
    <KeyboardAwareScrollView enableOnAndroid contentInsetAdjustmentBehavior="automatic" extraHeight={250}>
      <Surface theme={{ colors: { surface: theme.colors.secondary } }} style={{ ...styles.surface }}>
        <Title style={styles.title}>{translate('screens.Register.main-title')}</Title>
        <RegisterForm onSubmit={onFormSubmit} loading={busy} />
        <View style={styles.legalContainer}>{getLegalContent(styles)}</View>
      </Surface>
    </KeyboardAwareScrollView>
  );
};

export default Register;

const getStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    absolutScrollView: {
      width: '100%',
      height: '100%',
    },
    surface: {
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
