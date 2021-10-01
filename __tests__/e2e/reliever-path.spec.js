/* global page */
import config from '../config';
import { FirebaseSignOut, FirebaseSignIn } from '../config/helpers';
import {
  homeLayoutSelector,
  relieverButtonSelector,
  backButton,
  pathEndingButton,
  pathEndingVote,
  stressRateScreen,
  stressTriggerScreen,
  stressActivityTypeScreen,
  stressRateRow1,
  stressRateRow10,
  stressRateTrigger1,
  stressRateTrigger7,
  stressActivitiesRowReading,
  stressActivitiesReading,
  stressActivitiesRowGuided,
  stressActivitiesGuided,
  stressActivitiesRowAudio,
  stressActivitiesAudio,
} from '../config/selectors';
const { PAGE_URL } = config;
jest.setTimeout(30000);
describe('The reliever path', () => {
  beforeAll(async () => {
    await page.goto(PAGE_URL, { waitUntil: 'domcontentloaded' });
    await FirebaseSignOut();
    await FirebaseSignIn('kit-activated@test.com', '123456');

    await page.waitForSelector(relieverButtonSelector, { visible: true });
  });

  it('Should click on stress rate 1, click on stress trigger 1, click on Reading activity, check if activity is loaded, and go back to home', async () => {
    await page.waitForSelector(homeLayoutSelector);
    await page.waitForSelector(relieverButtonSelector, { visible: true });
    await page.click(relieverButtonSelector);

    await page.waitForSelector(stressRateScreen);
    await page.click(stressRateRow1);

    await page.waitForSelector(stressTriggerScreen);
    await page.click(stressRateTrigger1);

    await page.waitForSelector(stressActivityTypeScreen);
    await page.click(stressActivitiesRowReading);
    await page.waitForSelector(stressActivitiesReading);

    await page.waitForSelector(backButton, { visible: true });
    await page.click(backButton);

    await page.waitForSelector(stressActivityTypeScreen);
    await page.waitForSelector(backButton, { visible: true });
    await page.click(backButton);

    await page.waitForSelector(stressTriggerScreen);
    await page.waitForSelector(backButton, { visible: true });
    await page.click(backButton);

    await page.waitForSelector(stressRateScreen);
    await page.click(backButton);
    await page.waitForSelector(homeLayoutSelector);
  });

  it('Should do the reliever path with a read activity, check if path ending is correct, and go to home', async () => {
    await page.waitForSelector(relieverButtonSelector, { visible: true });
    await page.click(relieverButtonSelector);
    await page.waitForSelector(stressRateScreen);
    await page.click(stressRateRow10);
    await page.waitForSelector(stressTriggerScreen);
    await page.click(stressRateTrigger1);
    await page.waitForSelector(stressActivityTypeScreen);
    await page.click(stressActivitiesRowReading);
    await page.waitForSelector(stressActivitiesReading, { visible: true });
    await page.waitForSelector(pathEndingButton, { visible: true });
    await page.evaluate(s => document.querySelector(s).click(), pathEndingButton);
    await page.waitForSelector(pathEndingVote, { visible: true });
    await page.waitForSelector(backButton, { visible: true });
    await page.click(backButton);
    await page.waitForSelector(homeLayoutSelector);
  });

  it('Should do the reliever path with a guiaded activity, check if path ending is correct, and go to home', async () => {
    await page.waitForSelector(relieverButtonSelector, { visible: true });
    await page.click(relieverButtonSelector);
    await page.waitForSelector(stressRateScreen);
    await page.click(stressRateRow1);
    await page.waitForSelector(stressTriggerScreen);
    await page.click(stressRateTrigger7);
    await page.waitForSelector(stressActivityTypeScreen);
    await page.click(stressActivitiesRowGuided);
    await page.waitForSelector(stressActivitiesGuided, { visible: true });
    await page.waitForSelector(pathEndingButton, { visible: true });
    await page.evaluate(s => document.querySelector(s).click(), pathEndingButton);
    await page.waitForSelector(pathEndingVote, { visible: true });
    await page.waitForSelector(backButton, { visible: true });
    await page.click(backButton);
    await page.waitForSelector(homeLayoutSelector);
  });

  it('Should do the reliever path with a listen activity, check if path ending is correct, and go to home', async () => {
    await page.waitForSelector(relieverButtonSelector, { visible: true });
    await page.click(relieverButtonSelector);
    await page.waitForSelector(stressRateScreen);
    await page.click(stressRateRow1);
    await page.waitForSelector(stressTriggerScreen);
    await page.click(stressRateTrigger1);
    await page.waitForSelector(stressActivityTypeScreen);
    await page.click(stressActivitiesRowAudio);
    await page.waitForSelector(stressActivitiesAudio, { visible: true });
    await page.waitForSelector(pathEndingButton, { visible: true });
    await page.evaluate(s => document.querySelector(s).click(), pathEndingButton);
    await page.waitForSelector(pathEndingVote, { visible: true });
    await page.waitForSelector(backButton, { visible: true });
    await page.click(backButton);
    await page.waitForSelector(homeLayoutSelector);
  });
});
