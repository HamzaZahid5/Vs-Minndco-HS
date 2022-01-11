import { clearData, createStandarUser } from './mockToEmulators';

const usr = 'test@emulator.com';
const psw = '123456';

describe('The login', () => {
  beforeAll(async () => {
    await clearData();
    await createStandarUser(usr, psw);
    await device.launchApp({
      newInstance: true,
      delete: true,
    });
  });

  afterAll(async () => {
    await clearData();
  });

  it('should reject login with empty credentials', async () => {
    await waitFor(element(by.id('login-form-username-input')))
      .toBeVisible()
      .withTimeout(2000);
    // click workaround
    await element(by.id('login-form-submmit-cta')).tap();
    await waitFor(element(by.id('error-helper').withAncestor(by.id('input-component-login-form-username-input'))))
      .toBeVisible()
      .withTimeout(200);
    await waitFor(element(by.id('error-helper').withAncestor(by.id('input-component-login-form-password-input'))))
      .toBeVisible()
      .withTimeout(200);
  });

  it('should reject login with wrong credentials', async () => {
    const usr = 'fake@fake.com';
    const psw = '123456';
    await waitFor(element(by.id('login-form-username-input')))
      .toBeVisible()
      .withTimeout(2000);

    await element(by.id('login-form-username-input')).tap();
    await element(by.id('login-form-username-input')).replaceText(usr);

    await element(by.id('login-form-password-input')).tap();
    await element(by.id('login-form-password-input')).replaceText(psw);

    await element(by.id('login-form-submmit-cta')).tap();
    await waitFor(element(by.text('OK')))
      .toBeVisible()
      .withTimeout(200);
    await element(by.text('OK')).tap();
  });

  it('should log in a valid credentials', async () => {
    await waitFor(element(by.id('login-form-username-input')))
      .toBeVisible()
      .withTimeout(2000);

    await element(by.id('login-form-username-input')).tap();
    await element(by.id('login-form-username-input')).replaceText(usr);

    await element(by.id('login-form-password-input')).tap();
    await element(by.id('login-form-password-input')).replaceText(psw);

    await element(by.id('login-form-submmit-cta')).tap();
    await waitFor(element(by.id('home-layout')))
      .toExist()
      .withTimeout(5000);
  });
});
