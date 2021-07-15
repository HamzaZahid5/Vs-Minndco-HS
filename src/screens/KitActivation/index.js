import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput, Headline, useTheme, Paragraph } from 'react-native-paper';
import analytics from '../../services/Analytics';
import { getKitById, burnCode } from '../../services/Firestore';
import BigButton from '../../components/BigButton';
import GenericPageLayout from './../../components/GenericPageLayout';
// import OnboardingParagraph from '../../components/OnboardingParagraph';
// import OnboardingTitle from '../../components/OnboardingTitle';
// import Firebase from './../../services/Firebase';
// import { connector } from './../../redux/connector';
import DefaultDialog from './../../components/DefaultDialog';
import ScreenDecorator from '../../components/ScreenDecorator';
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
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

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

const CodeForm = ({ onSubmit, isLoading }) => {
  const [code, setCode] = useState('');
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <>
      <View style={[styles.row, { alignItems: 'center' }]}>
        <TextInput
          theme={{
            roundness: 0,
            colors: {
              background: 'transparent',
              text: 'white',
              placeholder: Color(theme.colors.placeholder).alpha(0.5).toString(),
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
          returnKeyType="done"
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
          disabled={isLoading}
          onPress={() => onSubmit(code)}
        >
          Use this code
        </BigButton>
      </View>
    </>
  );
};

CodeForm.propTypes = {
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
};

const KitActivation = ({ navigation }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const inputRef = useRef();
  const isLoading = useSelector(store => store.flags.isloading);
  const dispatch = useDispatch();

  const [helpVisible, setHelpVisible] = useState();

  const helpImageSrc =
    'https://firebasestorage.googleapis.com/v0/b/mindcotine-v4-production.appspot.com/o/images%2Factivation_code_scheme_en.png?alt=media&token=52c9d0e1-a105-4b61-bcf7-c04b25aa1e3f';

  const onFormSubmit = async code => {
    dispatch({ type: 'flags/setIsLoading', payload: 1 });
    const [valid, codeErr] = await validate(code);
    if (valid !== true) {
      // eslint-disable-next-line no-alert
      alert(codeErr);
    } else {
      try {
        await burnCode(code);
        // analytics().logEvent(ANALYTICS_EVENTS.FUNNEL_KIT_ACTIVATION);
        nextStep();
      } catch (e) {
        alert(e);
        // alert('Something went wrong using this code. Please contact support.');
      }
    }
    dispatch({ type: 'flags/setIsLoading', payload: -1 });
  };
  const nextStep = () => {
    navigation.navigate('AboutVR');
    // navigateToKITWelcome(componentId);
  };
  return (
    <ScreenDecorator>
      <GenericPageLayout
        // onClose={() => navigateToHome(componentId)}
        fullScroll
        withKeyboard
        header={
          <View style={styles.hero}>
            <View style={styles.heroContent}>
              <Headline style={styles.headline}>Activate your KIT</Headline>
              <Paragraph style={styles.description}>
                Insert the ACTIVATION CODE printed in your box.{' '}
                {
                  <Text key="link1" style={styles.hyperlink} onPress={() => setHelpVisible(true)}>
                    Where is the code?
                  </Text>
                }
              </Paragraph>
            </View>
          </View>
        }
      >
        <View style={styles.contentWrapper}>
          <View style={{ width: '100%', marginTop: 40, alignItems: 'center' }}>
            <CodeForm onSubmit={onFormSubmit} isLoading={isLoading} />
          </View>
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
        </View>
      </GenericPageLayout>
    </ScreenDecorator>
  );
};

KitActivation.propTypes = {
  navigation: PropTypes.object,
};

export default KitActivation;

const getStyles = theme =>
  StyleSheet.create({
    hero: {
      height: '100%',
      justifyContent: 'center',
    },
    heroContent: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    description: {
      margin: 30,
    },
    headline: {
      ...theme.fonts.headline3,
      // fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },
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
      // fontWeight: 'bold',
      marginBottom: 20,
    },
    hyperlink: {
      fontSize: 14,
      color: '#664AB9',
      textDecorationLine: 'underline',
    },
  });
