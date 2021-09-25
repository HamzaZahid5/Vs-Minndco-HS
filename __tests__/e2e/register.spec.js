/* global page */
import config from '../config';
const { PAGE_URL } = config;

class SelectorClass {
  constructor(selectors) {
    if (selectors) this.selectors = [...selectors];
    else this.selectors = [];
  }
  // Getter
  get selector() {
    return this.selectors.reduce((selector, current, i) => {
      let newSelector = selector;
      if (i !== 0) newSelector += ' > ';
      newSelector += `[data-testid="${current}"]`;
      return newSelector;
    }, '');
  }

  getSelectorLevel(level) {
    return this.selectors.reduce((selector, current, i) => {
      if (level && level > i) return selector;
      let newSelector = selector;
      if (i !== 0) newSelector += ' > ';
      newSelector += `[data-testid="${current}"]`;
      return newSelector;
    }, '');
  }
}
const Selector = arg => new SelectorClass(arg);

const makeEmail = length => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

jest.setTimeout(20000);
describe('The app', () => {
  const gotoRegisterButton = Selector(['go-to-registration-button']);
  const registerButton = Selector(['register-button']);
  const regiterFormRPassword = Selector(['input-component-register-form-rpassword-input', 'error-helper']);
  const regiterFormPassword = Selector(['input-component-register-form-password-input', 'error-helper']);
  const regiterFormEmail = Selector(['input-component-register-form-email-input', 'error-helper']);
  const regiterFormLastname = Selector(['input-component-register-form-lastname-input', 'error-helper']);
  const regiterFormName = Selector(['input-component-register-form-name-input', 'error-helper']);
  const regiterFormRPasswordInput = Selector(['register-form-rpassword-input']);
  const regiterFormPasswordInput = Selector(['register-form-password-input']);
  const regiterFormEmailInput = Selector(['register-form-email-input']);
  const regiterFormLastnameInput = Selector(['register-form-lastname-input']);
  const regiterFormNameInput = Selector(['register-form-name-input']);
  const welcomeWizardStep1 = Selector(['welcome-wizard-step-1']);

  beforeEach(async () => {
    await page.goto(PAGE_URL, { waitUntil: 'domcontentloaded' });
  });

  it('Should require fields', async done => {
    await page.waitForSelector(gotoRegisterButton.selector, { visible: true });
    await page.click(gotoRegisterButton.selector);
    await page.waitForSelector(registerButton.selector, { visible: true });
    await page.click(registerButton.selector);
    await page.waitForSelector(regiterFormName.selector);
    await page.waitForSelector(regiterFormRPassword.selector);
    await page.waitForSelector(regiterFormPassword.selector);
    await page.waitForSelector(regiterFormLastname.selector);
    await page.waitForSelector(regiterFormEmail.selector);
    done();
  });

  it('Should enter valid email', async done => {
    await page.waitForSelector(gotoRegisterButton.selector, { visible: true });
    await page.click(gotoRegisterButton.selector);
    await page.waitForSelector(registerButton.selector, { visible: true });

    await page.type(regiterFormEmailInput.selector, 'test');
    await page.type(regiterFormNameInput.selector, 'test');
    await page.type(regiterFormLastnameInput.selector, 'test');
    await page.type(regiterFormPasswordInput.selector, 'testtest');
    await page.type(regiterFormRPasswordInput.selector, 'testtest');

    await page.click(registerButton.selector);
    await page.waitForSelector(regiterFormEmail.selector, { visible: true });
    const emailElement = await page.$(regiterFormEmail.selector);
    await expect(emailElement).toMatch('Invalid email');
    done();
  });

  it('Should enter valid password', async done => {
    await page.waitForSelector(gotoRegisterButton.selector, { visible: true });
    await page.click(gotoRegisterButton.selector);
    await page.waitForSelector(registerButton.selector, { visible: true });

    await page.type(regiterFormEmailInput.selector, 'test@test.com');
    await page.type(regiterFormNameInput.selector, 'test');
    await page.type(regiterFormLastnameInput.selector, 'test');
    await page.type(regiterFormPasswordInput.selector, 'test');
    await page.type(regiterFormRPasswordInput.selector, 'test');

    await page.click(registerButton.selector);
    await page.waitForSelector(regiterFormPassword.selector, { visible: true });
    const passwordElement = await page.$(regiterFormPassword.selector);
    await expect(passwordElement).toMatch('Password too short');
    done();
  });

  it('Password must match', async done => {
    await page.waitForSelector(gotoRegisterButton.selector, { visible: true });
    await page.click(gotoRegisterButton.selector);
    await page.waitForSelector(registerButton.selector, { visible: true });

    await page.type(regiterFormEmailInput.selector, 'test@test.com');
    await page.type(regiterFormNameInput.selector, 'test');
    await page.type(regiterFormLastnameInput.selector, 'test');
    await page.type(regiterFormPasswordInput.selector, 'testtest');
    await page.type(regiterFormRPasswordInput.selector, 'test');

    await page.click(registerButton.selector);
    await page.waitForSelector(regiterFormRPassword.selector, { visible: true });
    const rpasswordElement = await page.$(regiterFormRPassword.selector);
    await expect(rpasswordElement).toMatch('Password do not match');
    done();
  });

  it('Registration complete', async done => {
    jest.setTimeout(10000);
    await page.waitForSelector(gotoRegisterButton.selector, { visible: true });
    await page.click(gotoRegisterButton.selector);
    await page.waitForSelector(registerButton.selector, { visible: true });
    const email = `${makeEmail(8)}@test.com`;
    await page.type(regiterFormEmailInput.selector, email);
    await page.type(regiterFormNameInput.selector, 'test');
    await page.type(regiterFormLastnameInput.selector, 'test');
    await page.type(regiterFormPasswordInput.selector, 'testtest');
    await page.type(regiterFormRPasswordInput.selector, 'testtest');

    await page.click(registerButton.selector);
    await page.waitForSelector(welcomeWizardStep1.selector);
    done();
  });
});
