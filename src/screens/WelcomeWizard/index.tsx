import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// @ts-ignore: non-ts file
import { updateBasicTutorialCompleted } from '../../services/Firestore';
// @ts-ignore: non-ts file
import HomeLayout from './../../components/HomeLayout';
import Step1 from './Step1';
import Step2 from './Step2';
// import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step6No from './Step6-no';
import Step6Yes from './Step6-yes';
// @ts-ignore: non-ts file
import useNavigationResetPathTo from '../../utils/hooks/useNavigationResetPathTo';
import { DefaultScreenPropType, RootStackParamList } from '../../../types';
import { TUTORIALS_STATE } from '../../store/selectors';
import { translate } from '../../utils/localization';
import AnalyticEvent from '../../utils/AnalyticsEvent';

const WelcomeWizard = ({ navigation }: DefaultScreenPropType<'Tutorial'>) => {
  const dispatch = useDispatch();
  const { welcome_tutorial_current_step: currentStep } = useSelector(TUTORIALS_STATE);
  const resetTo = useNavigationResetPathTo(navigation);

  function nextStep(step?: number) {
    dispatch({ type: 'tutorials/setWelcomeTutorialStep', payload: step || currentStep + 1 });
  }
  function finishWizard(navigateTo?: keyof RootStackParamList) {
    updateBasicTutorialCompleted();
    dispatch({ type: 'tutorials/finishWelcomeTutorialStep' });
    dispatch({ type: 'user/tutorialDone' });
    // actions.finishTutorial();
    if (currentStep >= 7) {
      AnalyticEvent('tutorial_complete');
    } else {
      AnalyticEvent('tutorial_drop', { step: currentStep });
    }

    if (navigateTo === 'KitActivation') {
      resetTo(navigateTo);
    } else {
      navigation.navigate('Main'); // Navigate to main.
    }
  }
  useEffect(() => {
    setTimeout(nextStep, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   const screenEventListenerAppear = Navigation.events().registerComponentDidAppearListener(
  //     ({ componentId: eventComponentId }) => {
  //       if (eventComponentId === componentId) {
  //         setTimeout(nextStep, 1000);
  //       }
  //     },
  //   );
  //   BackHandler.addEventListener('hardwareBackPress', backPressed);
  //   return () => {
  //     screenEventListenerAppear.remove();
  //     BackHandler.removeEventListener('hardwareBackPress', backPressed);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // useEffect(() => {
  //   Navigation.mergeOptions(componentId, {
  //     animations: {
  //       pop: {
  //         content: {
  //           enabled: true,
  //           alpha: {
  //             from: 1,
  //             to: 0,
  //             duration: 400,
  //             startDelay: 100,
  //             interpolation: 'accelerate',
  //           },
  //         },
  //       },
  //     },
  //   });
  // }, [componentId]);
  return (
    <>
      {currentStep === 0 && <HomeLayout rowTopStyle={styles.rowTop} rowBottomStyle={styles.rowBottom} />}
      {currentStep === 1 && (
        <Step1 next={nextStep} end={finishWizard} message={translate('screens.WelcomeWizard.text-step1')} />
      )}
      {currentStep === 2 && (
        <Step2 next={nextStep} end={finishWizard} message={translate('screens.WelcomeWizard.text-step2')} />
      )}
      {/* {currentStep === 3 && (
        <Step3
          next={nextStep}
          end={finishWizard}
          message="screens.basicsTutorial.moneySavedMessage"
        />
      )} */}
      {currentStep === 3 && (
        <Step4 next={nextStep} end={finishWizard} message={translate('screens.WelcomeWizard.text-step4')} />
      )}
      {currentStep === 4 && (
        <Step5 next={nextStep} end={finishWizard} message={translate('screens.WelcomeWizard.text-step5')} />
      )}
      {currentStep === 5 && <Step6 next={nextStep} message={translate('screens.WelcomeWizard.text-step6')} />}
      {currentStep === 7 && <Step6No end={finishWizard} message={translate('screens.WelcomeWizard.text-step6no')} />}
      {currentStep === 8 && (
        <Step6Yes
          end={() => finishWizard('KitActivation')}
          message={translate('screens.WelcomeWizard.text-step6yes')}
        />
      )}
    </>
  );
};

WelcomeWizard.propTypes = {
  navigation: PropTypes.object,
};

export default WelcomeWizard;

const styles = StyleSheet.create({
  rowTop: {
    height: 60,
  },
  rowBottom: {
    minHeight: 96,
  },
});
