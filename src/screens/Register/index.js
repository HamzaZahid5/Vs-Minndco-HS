import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Linking } from 'react-native';
import { Surface, Text, Title, useTheme } from 'react-native-paper';
import { auth } from '../../services/Auth';
import functions from '../../services/Functions';
import RegisterForm from './../../components/RegisterForm';
// import RoundedBackButton from './../../components/RoundedBackButton';
// import ChipButton from './../../components/ChipButton';
// import * as RNLocalize from 'react-native-localize';
// import { navigateToAuth, navigateBack } from './../../utils/navigationActions';

const getLegalContent = () => {
  const result = [];
  let interest;
  let partial;
  const text =
    'By creating an account with Mindcotine, you accept our ${termOfUse}, ${privacyPolicy} and ${disclaimer}.';
  [interest, partial] = text.split('${termOfUse}');
  result.push(<Text key={interest}>{interest}</Text>);
  result.push(
    <Text key="link1" style={styles.hyperlink} onPress={() => Linking.openURL('https://mindcotine.com/terms-of-use')}>
      Terms of Use
    </Text>,
  );
  [interest, partial] = partial.split('${privacyPolicy}');
  result.push(<Text key={interest}>{interest}</Text>);
  result.push(
    <Text key="link2" style={styles.hyperlink} onPress={() => Linking.openURL('https://mindcotine.com/privacy-policy')}>
      Privacy Policy
    </Text>,
  );
  [interest, partial] = partial.split('${disclaimer}');
  result.push(<Text key={interest}>{interest}</Text>);
  result.push(
    <Text key="link3" style={styles.hyperlink} onPress={() => Linking.openURL('https://mindcotine.com/disclaimer')}>
      Disclaimer
    </Text>,
  );
  return result;
};
const Register = () => {
  const [busy, setBusy] = useState(false);
  const theme = useTheme();
  const onFormSubmit = async form => {
    if (!busy) {
      setBusy(true);
      // console.log(form);
      try {
        const userCredentials = await auth().createUserWithEmailAndPassword(form.email, form.password);
        form.tz_offset = new Date().getTimezoneOffset() * -60;

        delete form.password;
        delete form.confirmpassword;

        await functions().httpsCallable('registerUser')({ uid: userCredentials.user.uid, ...form });

        // navigation occurs on auth state change.
      } catch (e) {
        alert(e);

        // keep this line here to avoid update of unmounted component.
        setBusy(false);
      }
    }
  };
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.absolutScrollView}
    >
      <Surface theme={{ colors: { surface: theme.colors.secondary } }} style={styles.surface}>
        {/* <RoundedBackButton onPress={() => navigateBack(componentId)} /> */}
        <Title style={styles.title}>Sign Up</Title>
        <RegisterForm onSubmit={onFormSubmit} loading={busy} />
        <View style={styles.legalContainer}>{getLegalContent()}</View>
      </Surface>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
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
    fontSize: 40,
    lineHeight: 40,
    // fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    color: 'white',
  },
  legalContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    flex: 1,
    maxWidth: '100%',
    opacity: 0.7,
  },
  hyperlink: {
    color: '#664AB9',
    textDecorationLine: 'underline',
  },
});
