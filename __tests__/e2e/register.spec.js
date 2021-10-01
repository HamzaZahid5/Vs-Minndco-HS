/* global page */
import { FirebaseSignOut } from '../config/helpers';
import config from '../config';
import {
  gotoRegisterButton,
  registerButton,
  regiterFormRPasswordError,
  regiterFormPasswordError,
  regiterFormEmailError,
  regiterFormLastnameError,
  regiterFormNameError,
  regiterFormRPasswordInput,
  regiterFormPasswordInput,
  regiterFormEmailInput,
  regiterFormLastnameInput,
  regiterFormNameInput,
  welcomeWizardStep1,
} from '../config/selectors';
const { PAGE_URL } = config;
jest.setTimeout(30000);
describe('The registratiom proccess', () => {
  const email = 'registration-test@test.com';

  beforeAll(async () => {
    await page.goto(PAGE_URL, { waitUntil: 'domcontentloaded' });
    await FirebaseSignOut();
  });
  beforeEach(async () => {
    await page.goto(PAGE_URL, { waitUntil: 'domcontentloaded' });
  });

  afterAll(async () => {
    await page.evaluateHandle(() => {
      const user = window.firebase.auth().currentUser;
      return new Promise(res => user.delete().then(res));
    });
  });

  it('Should reject registration for all fields empty', async () => {
    await page.waitForSelector(gotoRegisterButton, { visible: true });
    await page.click(gotoRegisterButton);
    await page.waitForSelector(registerButton, { visible: true });
    await page.click(registerButton);
    await page.waitForSelector(regiterFormNameError);
    await page.waitForSelector(regiterFormRPasswordError);
    await page.waitForSelector(regiterFormPasswordError);
    await page.waitForSelector(regiterFormLastnameError);
    await page.waitForSelector(regiterFormEmailError);
  });

  it('Should reject registration with an invalid email', async () => {
    await page.waitForSelector(gotoRegisterButton, { visible: true });
    await page.click(gotoRegisterButton);
    await page.waitForSelector(registerButton, { visible: true });

    await page.type(regiterFormEmailInput, 'invalidEmail');
    await page.type(regiterFormNameInput, 'test');
    await page.type(regiterFormLastnameInput, 'test');
    await page.type(regiterFormPasswordInput, 'testtest');
    await page.type(regiterFormRPasswordInput, 'testtest');

    await page.click(registerButton);
    await page.waitForSelector(regiterFormEmailError, { visible: true });
  });

  it('Should reject registration with a short password', async () => {
    await page.waitForSelector(gotoRegisterButton, { visible: true });
    await page.click(gotoRegisterButton);
    await page.waitForSelector(registerButton, { visible: true });

    await page.type(regiterFormEmailInput, 'test@test.com');
    await page.type(regiterFormNameInput, 'test');
    await page.type(regiterFormLastnameInput, 'test');
    await page.type(regiterFormPasswordInput, 'short');
    await page.type(regiterFormRPasswordInput, 'short');

    await page.click(registerButton);
    await page.waitForSelector(regiterFormPasswordError, { visible: true });
  });

  it('Should reject registration with diferent passwords', async () => {
    await page.waitForSelector(gotoRegisterButton, { visible: true });
    await page.click(gotoRegisterButton);
    await page.waitForSelector(registerButton, { visible: true });

    await page.type(regiterFormEmailInput, 'test@test.com');
    await page.type(regiterFormNameInput, 'test');
    await page.type(regiterFormLastnameInput, 'test');
    await page.type(regiterFormPasswordInput, 'MyPassword');
    await page.type(regiterFormRPasswordInput, 'MyDifferentPassword');

    await page.click(registerButton);
    await page.waitForSelector(regiterFormRPasswordError, { visible: true });
  });

  it('Should register a new user and navigate to Welcome Wizard', async () => {
    await page.waitForSelector(gotoRegisterButton, { visible: true });
    await page.click(gotoRegisterButton);
    await page.waitForSelector(registerButton, { visible: true });
    await page.type(regiterFormEmailInput, email);
    await page.type(regiterFormNameInput, 'test');
    await page.type(regiterFormLastnameInput, 'test');
    await page.type(regiterFormPasswordInput, '123456');
    await page.type(regiterFormRPasswordInput, '123456');
    await page.click(registerButton);
    await page.waitForSelector(welcomeWizardStep1);
  });
});
