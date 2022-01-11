import { clearData, createStandarUser, patchUser } from './mockToEmulators';
import { login } from './helpers';
const usr = 'test-tutorial@emulator.com';
const psw = '123456';
let guid = '';

const sleep = t => new Promise(res => setTimeout(res, t));

const setShowBasicTutorial = uid =>
  patchUser(
    uid,
    {
      flags: {
        mapValue: {
          fields: {
            show_basics_tutorial: {
              booleanValue: true,
            },
            has_coach_messages: {
              booleanValue: false,
            },
            show_welcome_message_on_chat: {
              booleanValue: false,
            },
          },
        },
      },
    },
    ['flags'],
  );

describe('The welcome wizard', () => {
  beforeEach(async () => {
    await clearData();
    guid = await createStandarUser(usr, psw);
    await setShowBasicTutorial(guid);
    await device.launchApp({
      newInstance: true,
      delete: true,
    });
    await login(usr, psw);
    await waitFor(element(by.id('step-1-skip')))
      .toExist()
      .withTimeout(5000);
    //await device.reloadReactNative();
  });

  it('should skip tutorial', async () => {
    await waitFor(element(by.id('step-1-skip')))
      .toExist()
      .withTimeout(10000);
    await element(by.id('step-1-skip')).tap();
    await waitFor(element(by.id('home-layout')))
      .toExist()
      .withTimeout(1000);
  });

  it('should go all the way to kit activation', async () => {
    await waitFor(element(by.id('step-1-ok')))
      .toExist()
      .withTimeout(10000);
    await element(by.id('step-1-ok')).tap();

    await waitFor(element(by.id('step-2-ok')))
      .toExist()
      .withTimeout(5000);
    await element(by.id('step-2-ok')).tap();

    await waitFor(element(by.id('step-4-ok')))
      .toExist()
      .withTimeout(5000);
    await element(by.id('step-4-ok')).tap();

    await waitFor(element(by.id('step-5-ok')))
      .toExist()
      .withTimeout(5000);
    await element(by.id('step-5-ok')).tap();

    await waitFor(element(by.id('step-6-yes')))
      .toExist()
      .withTimeout(5000);
    await element(by.id('step-6-yes')).tap();

    await waitFor(element(by.id('step-6-yes-activate')))
      .toExist()
      .withTimeout(5000);
    await element(by.id('step-6-yes-activate')).tap();

    await waitFor(element(by.id('use-this-code-button')))
      .toExist()
      .withTimeout(5000);
  });

  it('should go all the way without kit', async () => {
    await waitFor(element(by.id('step-1-ok')))
      .toExist()
      .withTimeout(10000);
    await element(by.id('step-1-ok')).tap();

    await waitFor(element(by.id('step-2-ok')))
      .toExist()
      .withTimeout(5000);
    await element(by.id('step-2-ok')).tap();

    await waitFor(element(by.id('step-4-ok')))
      .toExist()
      .withTimeout(5000);
    await element(by.id('step-4-ok')).tap();

    await waitFor(element(by.id('step-5-ok')))
      .toExist()
      .withTimeout(5000);
    await element(by.id('step-5-ok')).tap();

    await waitFor(element(by.id('step-6-no')))
      .toExist()
      .withTimeout(5000);
    await element(by.id('step-6-no')).tap();

    await waitFor(element(by.id('step-6-no-start')))
      .toExist()
      .withTimeout(5000);
    await element(by.id('step-6-no-start')).tap();

    await waitFor(element(by.id('home-layout')))
      .toExist()
      .withTimeout(5000);
  });
});
