import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput, Surface, useTheme, Paragraph } from 'react-native-paper';
import analytics from '../../services/Analytics';
import { getKitById, burnCode } from '../../services/Firestore';
import BigButton from '../../components/BigButton';
// import OnboardingParagraph from '../../components/OnboardingParagraph';
// import OnboardingTitle from '../../components/OnboardingTitle';
// import Firebase from './../../services/Firebase';
// import { connector } from './../../redux/connector';
import DefaultDialog from './../../components/DefaultDialog';
// import { getLocale } from '../../utils/localization';
// import {
//   navigateToKITWelcome,
//   navigateBack,
//   navigateToGetLicense,
//   navigateToSupport,
// } from '../../utils/navigationActions';
// import RoundedBackButton from '../../components/RoundedBackButton';
// import to from 'await-to-js';
import Color from 'color';
import { ANALYTICS_EVENTS } from '../../utils/constants';
import { useDispatch } from 'react-redux';

const validate = async code => {
  const kitDoc = await getKitById(code);
  if (!kitDoc.exists) {
    return [false, 'Invalid activation code'];
  }
  // eslint-disable-next-line no-alert, curly
  if (kitDoc.data().used_by) {
    return [false, 'Code already in use'];
  }

  return [true];
};

const KitActivation = ({
  isLoading,
  isGympassUser,
  callOrigin,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const [helpVisible, setHelpVisible] = useState();

  const helpImageSrc =
    'https://firebasestorage.googleapis.com/v0/b/mindcotine-v4-production.appspot.com/o/images%2Factivation_code_scheme_en.png?alt=media&token=52c9d0e1-a105-4b61-bcf7-c04b25aa1e3f';

  const onFormSubmit = async () => {
    dispatch({ type: 'flags/setIsLoading', payload: 1 })
    const [valid, codeErr] = await validate(code);
    if (valid !== true) {
      // eslint-disable-next-line no-alert
      alert(codeErr);
    } else {
      try {
        await burnCode(code);
        analytics().logEvent(ANALYTICS_EVENTS.FUNNEL_KIT_ACTIVATION);
        nextStep();
      } catch(e) {
        alert(e);
        // alert('Something went wrong using this code. Please contact support.');
      }
    }
    dispatch({ type: 'flags/setIsLoading', payload: -1 })
  };
  const nextStep = () => {
    navigation.navigate('Main');
    // navigateToKITWelcome(componentId);
  };
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps={'handled'}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles.absolutScrollView}
        keyboardShouldPersistTaps={'handled'}
      >
        <Surface
          theme={{ colors: { surface: 'transparent' } }}
          style={styles.surface}
        >
          {/* <RoundedBackButton
            onPress={() => {
              navigateBack(componentId);
            }}
          /> */}
          <View
            style={[styles.row, { alignItems: 'center', marginBottom: 30 }]}
          >
            {/* <Image
              style={{
                marginTop: -10,
                height: 150,
              }}
              resizeMode="contain"
              source={require('./../../styles/images/kit_diagonal.png')}
            /> */}
          </View>
          <View style={[styles.row, { marginBottom: 0 }]}>
            <Paragraph style={styles.title}>
              Activate your KIT
            </Paragraph>
            <Paragraph>
              Insert the ACTIVATION CODE printed in your box.
              {' '}
              {
                <Text
                  key="link1"
                  style={styles.hyperlink}
                  onPress={() => setHelpVisible(true)}
                >
                  Where is the code?
                </Text>
              }
            </Paragraph>
          </View>
          <View style={[styles.row, { alignItems: 'center' }]}>
            <TextInput
              theme={{
                roundness: 0,
                colors: {
                  background: 'transparent',
                  text: 'white',
                  placeholder: Color(theme.colors.placeholder)
                    .alpha(0.5)
                    .toString(),
                },
              }}
              style={{
                fontSize: 40,
                width: '100%',
                marginBottom: 30,
                display: 'flex',
              }}
              returnKeyLabel="submit"
              label="CODE"
              value={code}
              type="flat"
              onChangeText={text => setCode(text)}
              keyboardType="number-pad"
              dense={false}
            />
          </View>
          <View style={[styles.row, { alignItems: 'center' }]}>
            {/* <RoundedNextButton
              onPress={onFormSubmit}
              disabled={isLoading || code.length < 3}
            /> */}
            <BigButton
              style={{
                marginBottom: 20,
              }}
              disabled={isLoading || code.length < 3}
              onPress={onFormSubmit}
            >
              Use this code
            </BigButton>
            <View style={{ marginTop: 34, alignItems: 'center', display: 'none' }}>
              <Paragraph style={{ textAlign: 'center' }}>
                Don't you have your MindCotine KIT?
              </Paragraph>
              <BigButton
                style={{ width: 250 }}
                variant="accent"
                onPress={() => {
                  if (isGympassUser) {
                    // GYMPASS FLOW
                    navigateToSupport(componentId);
                  } else {
                    // REGULAR FLOW:
                    callOrigin === 'GetLicense'
                      ? // coming from GetLicense? go back
                        navigateBack(componentId)
                      : // coming from elsewhere? got to GetLicense
                        navigateToGetLicense(componentId, {
                          callOrigin: 'KitActivation',
                        });
                  }
                }}
                disabled={isLoading}
              >
                Get it NOW!
              </BigButton>
            </View>
          </View>
        </Surface>
      </ScrollView>
      <DefaultDialog
        show={helpVisible}
        icon="google-cardboard"
        onClose={() => setHelpVisible(false)}
        onButtonPress={() => {
          setHelpVisible(false);
        }}
        title="Open you box and look into the back cover for the code as the following image."
        content={
          <Image
            style={{
              width: '100%',
              height: 200,
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
            }}
            source={{
              uri: helpImageSrc,
            }}
            resizeMode="contain"
          />
        }
        buttons={[
          {
            label: 'Close',
          },
        ]}
      />
    </KeyboardAwareScrollView>
  );
};

export default KitActivation;

const getStyles = theme => StyleSheet.create({
  absolutScrollView: {
    // borderWidth: 1, borderColor: 'red',
    width: '100%',
    minHeight: '100%',
  },
  surface: {
    // borderWidth: 1, borderColor: 'lime',
    padding: 30,
    minHeight: '100%',
    elevation: 0,
  },
  row: {
    // borderWidth: 1, borderColor: 'red',
    margin: 0,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 40,
    lineHeight: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  hyperlink: {
    fontSize: 14,
    color: '#664AB9',
    textDecorationLine: 'underline',
  },
});
