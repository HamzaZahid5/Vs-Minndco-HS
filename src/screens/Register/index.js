import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Linking } from 'react-native';
import {
  Surface,
  Text,
  Title,
  withTheme,
} from 'react-native-paper';
// import Firebase from './../../services/Firebase';
import RegisterForm from './../../components/RegisterForm';
// import RoundedBackButton from './../../components/RoundedBackButton';
// import ChipButton from './../../components/ChipButton';
// import * as RNLocalize from 'react-native-localize';
// import { navigateToAuth, navigateBack } from './../../utils/navigationActions';

const getLegalContent = () => {
  const result = [];
  let interest;
  let partial;
  const text = 'screens.register.${termOfUse}, ${privacyPolicy} & ${disclaimer} legalText';
  [interest, partial] = text.split('${termOfUse}');
  result.push(<Text key={interest}>{interest}</Text>);
  result.push(
    <Text
      key="link1"
      style={styles.hyperlink}
      onPress={() => Linking.openURL('https://mindcotine.com/terms-of-use')}
    >
      {'screens.register.termOfUse'}
    </Text>,
  );
  [interest, partial] = partial.split('${privacyPolicy}');
  result.push(<Text key={interest}>{interest}</Text>);
  result.push(
    <Text
      key="link2"
      style={styles.hyperlink}
      onPress={() => Linking.openURL('https://mindcotine.com/privacy-policy')}
    >
      {'screens.register.privacyPolicy'}
    </Text>,
  );
  [interest, partial] = partial.split('${disclaimer}');
  result.push(<Text key={interest}>{interest}</Text>);
  result.push(
    <Text
      key="link3"
      style={styles.hyperlink}
      onPress={() => Linking.openURL('https://mindcotine.com/disclaimer')}
    >
      {'screens.register.disclaimer'}
    </Text>,
  );
  return result;
};
export default withTheme(({ componentId, theme }) => {
  const [busy, setBusy] = useState(false);
  const onFormSubmit = async form => {
    if (!busy) {
      setBusy(true);
      // console.log(form);
      try {
        // @TODO move it to redux action
        // const userCredentials = await Firebase.createUser(form);
        // await Firebase.signInUser(form); // needed to write users collection
        // // complement form
        // form.tz = RNLocalize.getTimeZone();
        // form.tz_offset = new Date().getTimezoneOffset() * -60;
        // await Firebase.registerUser({ uid: userCredentials.user.uid, ...form });
        // =============================

        // navigateToAuth(componentId);
      } catch (e) {
        alert(e);
      }
      setBusy(false);
    }
  };
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.absolutScrollView}
    >
      <Surface
        theme={{ colors: { surface: theme.colors.secondary } }}
        style={styles.surface}
      >
        {/* <RoundedBackButton onPress={() => navigateBack(componentId)} /> */}
        <Title style={styles.title}>
          {'screens.register.title'}
        </Title>
        <RegisterForm onSubmit={onFormSubmit} loading={busy} />
        <View style={styles.legalContainer}>{getLegalContent()}</View>
      </Surface>
    </ScrollView>
  );
});

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
    fontWeight: 'bold',
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
