/* global page assert*/
import config from '../config';
import { FirebaseSignOut, FirebaseSignIn, FirebaseUserUpdate } from '../config/helpers';
import {
  kitActivationScreenSelector,
  tutorialFirstStepSelector,
  tutorialFifthStepSelector,
  skipTutorialButtonSelector,
  nextTutorialButtonSelector,
  iHaveKitButtonSelector,
  activateKitButtonSelector,
} from '../config/selectors';

const { PAGE_URL } = config;

jest.setTimeout(30000);

describe('The Welcome tutorial', () => {
  const userEmail = 'test-tutorial@emulator.com';
  const userPassword = '123456';

  beforeAll(async () => {
    await page.goto(PAGE_URL, { waitUntil: 'domcontentloaded' });

    await FirebaseSignOut();

    await FirebaseSignIn(userEmail, userPassword);
  });
  beforeEach(async () => {
    // flag to show tutorial
    await FirebaseUserUpdate({ 'flags.show_basics_tutorial': true });

    await page.waitForSelector(tutorialFirstStepSelector);
  });

  it('should skip tutorial', async () => {
    await page.waitForSelector(skipTutorialButtonSelector);
    // click workaround
    await page.evaluate(s => document.querySelector(s).click(), skipTutorialButtonSelector);
    await page.waitForSelector(skipTutorialButtonSelector, { hidden: true });
  });

  it('should go all the way to kit activation', async () => {
    await page.waitForSelector(nextTutorialButtonSelector);
    let isStep5 = false;
    // clicks NEXT until step 5
    while (!isStep5) {
      // click workaround
      await page.evaluate(s => document.querySelector(s).click(), nextTutorialButtonSelector);
      // wait for disappear
      await page.waitForSelector(nextTutorialButtonSelector, { hidden: true });
      // wait for next step button to appear
      await page.waitForSelector(nextTutorialButtonSelector);
      isStep5 = await page.evaluate(s => document.querySelectorAll(s).length !== 0, tutorialFifthStepSelector);
    }
    // clicks one more NEXT to step 6.
    // click workaround
    await page.evaluate(s => document.querySelector(s).click(), nextTutorialButtonSelector);

    // now in step 6, CTAs are YES / NO buttons and there isn't any NEXT button.
    await page.waitForSelector(iHaveKitButtonSelector);
    // click workaround
    await page.evaluate(s => document.querySelector(s).click(), iHaveKitButtonSelector);
    await page.waitForSelector(iHaveKitButtonSelector, { hidden: true });

    // into step 6-yes we click a CTA to navigate to Kit Activation screen.
    await page.waitForSelector(activateKitButtonSelector);
    // click workaround
    await page.evaluate(s => document.querySelector(s).click(), activateKitButtonSelector);

    await page.waitForSelector(kitActivationScreenSelector);
  });
});
