import { clearData, createStandarUser, makeKit } from './mockToEmulators';
import { login } from './helpers';
const usr = 'kit@activation.com';
const psw = '123456';

const validId = '123123';
const invalidId = '111111';
const usedId = '123456';

describe('The reliver', () => {
  beforeAll(async () => {
    await clearData();
    await createStandarUser(usr, psw);
    await makeKit(validId);
    await makeKit(usedId, 'undefines');
    await device.launchApp({
      newInstance: true,
      delete: true,
    });
    await login(usr, psw);
    await waitFor(element(by.id('home-layout')))
      .toExist()
      .withTimeout(5000);
  });

  afterAll(async () => {
    await clearData();
  });

  it('Should click on stress rate 1, click on stress trigger 1, click on Reading activity, check if activity is loaded, and go back to home', async () => {
    await waitFor(element(by.id('reliever-button')))
      .toExist()
      .withTimeout(50000);
    await element(by.id('reliever-button')).tap();

    await waitFor(element(by.id('StressRate')))
      .toExist()
      .withTimeout(50000);
    await element(by.id('stress-rate-row-1')).tap();

    await waitFor(element(by.id('StressTrigger')))
      .toExist()
      .withTimeout(50000);
    await element(by.id('stress-trigger-1')).tap();

    await waitFor(element(by.id('StressActivityType')))
      .toExist()
      .withTimeout(50000);
    await element(by.id('stress-activity-reading')).tap();

    await waitFor(element(by.id('reliver-activity-read-carousel')))
      .toExist()
      .withTimeout(5000);

    await waitFor(element(by.id('header-back-button')).atIndex(0))
      .toExist()
      .withTimeout(5000);
    await element(by.id('header-back-button')).atIndex(0).tap();

    await waitFor(element(by.id('StressActivityType')))
      .toExist()
      .withTimeout(50000);

    await waitFor(element(by.id('header-back-button')).atIndex(0))
      .toExist()
      .withTimeout(5000);
    await element(by.id('header-back-button')).atIndex(0).tap();

    await waitFor(element(by.id('StressTrigger')))
      .toExist()
      .withTimeout(50000);

    await waitFor(element(by.id('header-back-button')).atIndex(0))
      .toExist()
      .withTimeout(5000);
    await element(by.id('header-back-button')).atIndex(0).tap();

    await waitFor(element(by.id('StressRate')))
      .toExist()
      .withTimeout(50000);

    await waitFor(element(by.id('header-back-button')).atIndex(0))
      .toExist()
      .withTimeout(5000);
    await element(by.id('header-back-button')).atIndex(0).tap();

    await waitFor(element(by.id('home-layout')))
      .toExist()
      .withTimeout(5000);
  });

  it('Should do the reliever path with a read activity, check if path ending is correct, and go to home', async () => {
    await waitFor(element(by.id('reliever-button')))
      .toExist()
      .withTimeout(50000);
    await element(by.id('reliever-button')).tap();

    await waitFor(element(by.id('StressRate')))
      .toExist()
      .withTimeout(50000);
    await element(by.id('stress-rate-row-1')).tap();

    await waitFor(element(by.id('StressTrigger')))
      .toExist()
      .withTimeout(50000);
    await element(by.id('stress-trigger-1')).tap();

    await waitFor(element(by.id('StressActivityType')))
      .toExist()
      .withTimeout(50000);
    await element(by.id('stress-activity-reading')).tap();

    await waitFor(element(by.id('reliver-activity-read-carousel')))
      .toExist()
      .withTimeout(5000);

    await waitFor(element(by.id('path-endind-button')).atIndex(0))
      .toExist()
      .withTimeout(5000);
    await element(by.id('path-endind-button')).atIndex(0).tap();

    await waitFor(element(by.id('path-endind-header-vote')).atIndex(0))
      .toExist()
      .withTimeout(5000);

    await waitFor(element(by.id('header-back-button')).atIndex(0))
      .toExist()
      .withTimeout(5000);
    await element(by.id('header-back-button')).atIndex(0).tap();

    await waitFor(element(by.id('home-layout')))
      .toExist()
      .withTimeout(5000);
  });

  it('Should do the reliever path with a guiaded activity, check if path ending is correct, and go to home', async () => {
    await waitFor(element(by.id('reliever-button')))
      .toExist()
      .withTimeout(50000);
    await element(by.id('reliever-button')).tap();

    await waitFor(element(by.id('StressRate')))
      .toExist()
      .withTimeout(50000);
    await element(by.id('stress-rate-row-1')).tap();

    await waitFor(element(by.id('StressTrigger')))
      .toExist()
      .withTimeout(50000);
    await element(by.id('stress-trigger-7')).tap();

    await waitFor(element(by.id('StressActivityType')))
      .toExist()
      .withTimeout(50000);
    await element(by.id('stress-activity-guided')).tap();

    await waitFor(element(by.id('do-activity')))
      .toExist()
      .withTimeout(5000);

    await waitFor(element(by.id('path-endind-button')).atIndex(0))
      .toExist()
      .withTimeout(5000);
    await element(by.id('path-endind-button')).atIndex(0).tap();

    await waitFor(element(by.id('path-endind-header-vote')).atIndex(0))
      .toExist()
      .withTimeout(5000);

    await waitFor(element(by.id('header-back-button')).atIndex(0))
      .toExist()
      .withTimeout(5000);
    await element(by.id('header-back-button')).atIndex(0).tap();

    await waitFor(element(by.id('home-layout')))
      .toExist()
      .withTimeout(5000);
  });

  it.skip('Should do the reliever path with a listen activity, check if path ending is correct, and go to home', async () => {
    await waitFor(element(by.id('reliever-button')))
      .toExist()
      .withTimeout(50000);
    await element(by.id('reliever-button')).tap();

    await waitFor(element(by.id('StressRate')))
      .toExist()
      .withTimeout(50000);
    await element(by.id('stress-rate-row-10')).tap();

    await waitFor(element(by.id('StressTrigger')))
      .toExist()
      .withTimeout(50000);
    await element(by.id('stress-trigger-7')).tap();

    await waitFor(element(by.id('StressActivityType')))
      .toExist()
      .withTimeout(50000);
    await element(by.id('stress-activity-audio')).tap();

    await waitFor(element(by.id('listen-activity')))
      .toExist()
      .withTimeout(5000);

    await waitFor(element(by.id('path-endind-button')).atIndex(0))
      .toExist()
      .withTimeout(5000);
    await element(by.id('path-endind-button')).atIndex(0).tap();

    await waitFor(element(by.id('path-endind-header-vote')).atIndex(0))
      .toExist()
      .withTimeout(5000);

    await waitFor(element(by.id('header-back-button')).atIndex(0))
      .toExist()
      .withTimeout(5000);
    await element(by.id('header-back-button')).atIndex(0).tap();

    await waitFor(element(by.id('home-layout')))
      .toExist()
      .withTimeout(5000);
  });
});
