import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image } from 'react-native';
import { TextInput, Headline, useTheme, Paragraph } from 'react-native-paper';
import crashlytics from '../../services/Crashlytics';
// @ts-ignore: non-ts file
import { getKitById, burnCode } from '../../services/Firestore';
import BigButton from '../../components/BigButton';
// @ts-ignore: non-ts file
import GenericPageLayout from './../../components/GenericPageLayout';
// import OnboardingParagraph from '../../components/OnboardingParagraph';
// import OnboardingTitle from '../../components/OnboardingTitle';
// import Firebase from './../../services/Firebase';
// import { connector } from './../../redux/connector';
// @ts-ignore: non-ts file
import DefaultDialog from './../../components/DefaultDialog';
// @ts-ignore: non-ts file
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
import { DefaultScreenPropType } from '../../../types';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { FLAGS } from '../../store/selectors';
import { translate } from '../../utils/localization';
import useStartPath from '../../utils/hooks/useStartPath';
// @ts-ignore: non-ts file
import useNavigationResetPathTo from '../../utils/hooks/useNavigationResetPathTo';

const validate = async (code: string) => {
  const kitDoc = await getKitById(code);
  if (!kitDoc.exists) {
    return [false, translate('screens.KitActivation.invalid-activation-code')];
  }
  // eslint-disable-next-line no-alert, curly
  if (kitDoc.data().used_by) {
    return [false, translate('screens.KitActivation.code-already-in-use')];
  }

  return [true];
};

const CodeForm = ({ onSubmit, isLoading }: { onSubmit: (code: string) => void; isLoading: boolean }) => {
  const [code, setCode] = useState('');
  const theme = useTheme() as CustomThemeType;
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
          label={translate('screens.KitActivation.code')}
          returnKeyType="done"
          value={code}
          //type="flat"
          onChangeText={text => setCode(text)}
          keyboardType="number-pad"
          dense={false}
          testID="kit-activation-code-input"
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
          testID="use-this-code-button"
        >
          {translate('screens.KitActivation.use-this-code')}
        </BigButton>
      </View>
    </>
  );
};

CodeForm.propTypes = {
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
};

const KitActivation = ({ navigation }: DefaultScreenPropType<'KitActivation'>) => {
  const theme = useTheme() as CustomThemeType;
  const styles = getStyles(theme);
  const inputRef = useRef();
  const { isLoading } = useSelector(FLAGS);
  const dispatch = useDispatch();
  useStartPath('kit_activation');

  const [helpVisible, setHelpVisible] = useState<boolean>();
  const resetPathTo = useNavigationResetPathTo(navigation);

  const helpImageSrc =
    'https://firebasestorage.googleapis.com/v0/b/mindcotine-v4-production.appspot.com/o/images%2Factivation_code_scheme_en.png?alt=media&token=52c9d0e1-a105-4b61-bcf7-c04b25aa1e3f';

  const onFormSubmit = async (code: string) => {
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
        crashlytics().recordError(e);
      }
    }
    dispatch({ type: 'flags/setIsLoading', payload: -1 });
  };
  const nextStep = () => {
    resetPathTo('AboutVR');
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
              <Headline style={styles.headline}>{translate('screens.KitActivation.activate-your-kit')}</Headline>
              <View testID="kit-activation-explain-text">
                <Paragraph style={styles.description}>
                  {translate('screens.KitActivation.insert-the-activation-code-printed-in-your-box-')}
                  {
                    <Text key="link1" style={styles.hyperlink} onPress={() => setHelpVisible(true)}>
                      {translate('screens.KitActivation.where-is-the-code')}
                    </Text>
                  }
                </Paragraph>
              </View>
            </View>
          </View>
        }
      >
        {/*<View style={styles.contentWrapper}> This style does not exist*/}

        <View style={{ width: '100%', marginTop: 40, alignItems: 'center', zIndex: 0 }}>
          <CodeForm onSubmit={onFormSubmit} isLoading={isLoading !== 0 ? true : false} />
        </View>
      </GenericPageLayout>
      <DefaultDialog
        show={helpVisible}
        icon="google-cardboard"
        onClose={() => setHelpVisible(false)}
        onButtonPress={() => {
          setHelpVisible(false);
        }}
        testID="kit-activation-explain-dialog"
        title={translate('screens.KitActivation.where-is-the-code-info')}
        content={
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={styles.image}
            source={{
              uri: helpImageSrc,
            }}
            resizeMode="contain"
          />
        }
        buttons={[
          {
            label: translate('screens.KitActivation.close'),
          },
        ]}
      />
    </ScreenDecorator>
  );
};

KitActivation.propTypes = {
  navigation: PropTypes.object,
};

export default KitActivation;

const getStyles = (theme: CustomThemeType) =>
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
    image: {
      width: '100%',
      height: 200,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
    },
  });
