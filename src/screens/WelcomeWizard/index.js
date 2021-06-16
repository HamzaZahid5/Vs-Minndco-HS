import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BackHandler, StyleSheet } from 'react-native';
import { useSelector, useStore, useDispatch } from 'react-redux';
import { updateBasicTutorialCompleted } from '../../services/Firestore';
import analytics from '../../services/Analytics';
import HomeLayout from './../../components/HomeLayout';
import Step1 from './Step1';
import Step2 from './Step2';
// import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step6No from './Step6-no';
import Step6Yes from './Step6-yes';

// import Firebase from '../../services/Firebase';
import { ANALYTICS_EVENTS } from '../../utils/constants';
import useNavigationResetPathTo from '../../utils/hooks/useNavigationResetPathTo';

const WelcomeWizard = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentStep = useSelector(state => state.tutorials.welcome_tutorial_current_step);
  const resetTo = useNavigationResetPathTo();

  function nextStep(step) {
    dispatch({ type: 'tutorials/setWelcomeTutorialStep', payload: step || currentStep + 1 });
    // actions.moveTutorialToStep(step || currentStep + 1);
    analytics().logEvent('basic_wizard_next_step');
  }
  function finishWizard(navigateTo) {
    updateBasicTutorialCompleted();
    dispatch({ type: 'tutorials/finishWelcomeTutorialStep' });
    // actions.finishTutorial();
    analytics().logEvent('basic_wizard_finish');
    if (currentStep >= 7) {
      analytics().logEvent(ANALYTICS_EVENTS.FUNNEL_WIZARD_FINISH);
    } else {
      analytics().logEvent(ANALYTICS_EVENTS.FUNNEL_WIZARD_ABORT);
    }

    if (navigateTo === 'KitActivation') {
      resetTo(navigateTo);
    } else {
      navigation.navigate(navigateTo || 'Main');
    }
  }
  function backPressed() {
    finishWizard();
    return true;
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
        <Step1 next={nextStep} end={finishWizard} message="Let's take one step at a time together, shall we?" />
      )}
      {currentStep === 2 && (
        <Step2
          next={nextStep}
          end={finishWizard}
          message={
            'You are not alone! Access to chat with your Coach by clicking the botton-left action.\nGet guidance and advises from profesionals.\nIf you have new messages from your Coach, a red dot will alert you about it.'
          }
        />
      )}
      {/* {currentStep === 3 && (
        <Step3
          next={nextStep}
          end={finishWizard}
          message="screens.basicsTutorial.moneySavedMessage"
        />
      )} */}
      {currentStep === 3 && (
        <Step4
          next={nextStep}
          end={finishWizard}
          message={
            'When you notice a craving is creeping in and your mind starts to stress you - come here right away, I got you!\nThis is your reliever. I´ll help you curb that urge with different activities!'
          }
        />
      )}
      {currentStep === 4 && (
        <Step5
          next={nextStep}
          end={finishWizard}
          message={
            'Your daily training is the most important part of this program. I suggest you practice one activity per day, every day!\nA playlist of VR and audiovisual short exercises to get you ready to manage the stress episodes!'
          }
        />
      )}
      {currentStep === 5 && (
        <Step6
          next={nextStep}
          end={finishWizard}
          message={"Now, let's talk about VR\n\nDo you have your MindCo Relief Kit in your hands?"}
        />
      )}
      {currentStep === 7 && (
        <Step6No
          end={finishWizard}
          message={
            'Ok, no problem.\nOnce you have it, you will activate it by opening the app, accessing the left panel and selecting the last option as is shown in the following picture.'
          }
          isLast
        />
      )}
      {currentStep === 8 && (
        <Step6Yes
          end={() => finishWizard('KitActivation')}
          message={
            'Great!\nTake the Kit, open it and look into the inner side of the cover. Find the Activation Code in the upper left corner.\nFollow the image below for orientation.'
          }
          isLast
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
