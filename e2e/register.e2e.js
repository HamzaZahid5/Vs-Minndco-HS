import { clearData } from './mockToEmulators';

function makeid(length, useMin = false) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  if (useMin) characters = 'abcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

describe('The register', () => {
  beforeAll(async () => {
    await clearData();
    await device.launchApp({
      newInstance: true,
      delete: true,
    });
    await waitFor(element(by.id('go-to-registration-button')))
      .toBeVisible()
      .withTimeout(2000);
    await element(by.id('go-to-registration-button')).tap();
    await waitFor(element(by.id('register-button')))
      .toBeVisible()
      .withTimeout(2000);
  });

  afterAll(async () => {
    await clearData();
  });

  it('Should reject registration for all fields empty', async () => {
    await element(by.id('register-button')).tap();

    await waitFor(element(by.id('error-helper').withAncestor(by.id('input-component-register-form-name-input'))))
      .toBeVisible()
      .withTimeout(200);
    await waitFor(element(by.id('error-helper').withAncestor(by.id('input-component-register-form-rpassword-input'))))
      .toBeVisible()
      .withTimeout(200);
    await waitFor(element(by.id('error-helper').withAncestor(by.id('input-component-register-form-password-input'))))
      .toBeVisible()
      .withTimeout(200);
    await waitFor(element(by.id('error-helper').withAncestor(by.id('input-component-register-form-email-input'))))
      .toBeVisible()
      .withTimeout(200);
    await waitFor(element(by.id('error-helper').withAncestor(by.id('input-component-register-form-lastname-input'))))
      .toBeVisible()
      .withTimeout(200);
  });

  it('Should reject registration with an invalid email', async () => {
    await element(by.id('register-form-email-input')).replaceText('invalidEmail');
    await element(by.id('register-form-lastname-input')).replaceText('test');
    await element(by.id('register-form-name-input')).replaceText('test');
    await element(by.id('register-form-rpassword-input')).replaceText('testtest');
    await element(by.id('register-form-password-input')).replaceText('testtest');

    await element(by.id('register-button')).tap();
    await waitFor(element(by.id('error-helper').withAncestor(by.id('input-component-register-form-email-input'))))
      .toBeVisible()
      .withTimeout(200);
  });

  it('Should reject registration with a short password', async () => {
    await element(by.id('register-form-email-input')).replaceText('test@test.com');
    await element(by.id('register-form-lastname-input')).replaceText('test');
    await element(by.id('register-form-name-input')).replaceText('test');
    await element(by.id('register-form-rpassword-input')).replaceText('test');
    await element(by.id('register-form-password-input')).replaceText('test');

    await element(by.id('register-button')).tap();
    await waitFor(element(by.id('error-helper').withAncestor(by.id('input-component-register-form-password-input'))))
      .toBeVisible()
      .withTimeout(200);
  });

  it('Should reject registration with diferent passwords', async () => {
    await element(by.id('register-form-email-input')).replaceText('test@test.com');
    await element(by.id('register-form-lastname-input')).replaceText('test');
    await element(by.id('register-form-name-input')).replaceText('test');
    await element(by.id('register-form-rpassword-input')).replaceText('testtest');
    await element(by.id('register-form-password-input')).replaceText('testtesttest');

    await element(by.id('register-button')).tap();
    await waitFor(element(by.id('error-helper').withAncestor(by.id('input-component-register-form-password-input'))))
      .toBeVisible()
      .withTimeout(200);
  });

  it('Should register a new user and navigate to Welcome Wizard', async () => {
    await element(by.id('register-form-email-input')).replaceText(`${makeid(5)}@${makeid(5, true)}.${makeid(3, true)}`);
    await element(by.id('register-form-lastname-input')).replaceText('test');
    await element(by.id('register-form-name-input')).replaceText('test');
    await element(by.id('register-form-rpassword-input')).replaceText('testtest');
    await element(by.id('register-form-password-input')).replaceText('testtest');

    await element(by.id('register-button')).tap();
    await waitFor(element(by.id('welcome-wizard-step-1')))
      .toBeVisible()
      .withTimeout(200);
  });
});
