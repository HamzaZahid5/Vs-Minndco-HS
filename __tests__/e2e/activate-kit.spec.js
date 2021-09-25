/* global page */
import { jsxEmptyExpression } from '@babel/types';
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

const sleep = time => new Promise((res, rej) => setTimeout(res, time));
jest.setTimeout(40000);
describe('The login', () => {
  const loginButtonSelector = Selector(['login-form-submmit-cta']);
  const homeLayoutSelector = Selector(['home-layout']);
  const openDrawerSelector = Selector(['open-drawer-button']);
  const drawerActivation = Selector(['drawer-activation-button']);
  const kitCodeInput = Selector(['kit-activation-code-input']);
  const kitCodeButton = Selector(['use-this-code-button']);
  const kitCodeText = Selector(['kit-activation-explain-text']);
  const kitCloseDialog = Selector(['kit-activation-explain-dialog-close']);
  const kitDialogButton = Selector(['kit-activation-explain-dialog-button-0']);
  const aboutVrBackButton = Selector(['back-button-about-vr']);
  const wrongCode = '123123';
  const successCode = '123456';
  const inUseCode = '111111';
  beforeAll(async done => {
    await page.goto(PAGE_URL, { waitUntil: 'domcontentloaded' });
    try {
      await page.waitForSelector(loginButtonSelector.selector, { timeout: 10000 });
    } catch (error) {
      await page.waitForSelector(homeLayoutSelector.selector);
      await page.evaluate(() => {
        return window.firebase.auth().signOut();
      });
      await page.waitForSelector(loginButtonSelector.selector, { timeout: 10000 });
    }
    await page.evaluate(
      ({ userEmail, userPassword }) => {
        return window.firebase.auth().signInWithEmailAndPassword(userEmail, userPassword);
      },
      { userEmail: 'activate-kit-test@test.com', userPassword: '123456' },
    );
    await page.waitForSelector(homeLayoutSelector.selector);
    await page.waitForSelector(openDrawerSelector.selector, { visible: true });
    await page.click(openDrawerSelector.selector);
    await page.waitForSelector(drawerActivation.selector, { visible: true });
    await page.click(drawerActivation.selector);
    done();
  });
  it('Open and close explain dialog (close button)', async done => {
    await page.waitForSelector(kitCodeText.selector, { visible: true });
    await page.click(kitCodeText.selector);
    await page.waitForSelector(kitCloseDialog.selector, { visible: true });
    await page.click(kitCloseDialog.selector);
    done();
  });
  it('Open and close explain dialog (dialog button)', async done => {
    await page.waitForSelector(kitCodeText.selector, { visible: true });
    await page.click(kitCodeText.selector);
    await page.waitForSelector(kitDialogButton.selector, { visible: true });
    await page.click(kitDialogButton.selector);
    done();
  });
  it('Wrong code inserted', async done => {
    await page.waitForSelector(kitDialogButton.selector, { hidden: true });
    await page.waitForSelector(kitCodeInput.selector, { visible: true });
    let input = await page.$(kitCodeInput.selector);
    await input.click({ clickCount: 3 });
    await input.type(wrongCode);

    page.once('dialog', async dialog => {
      await dialog.accept();
      done();
    });
    await page.waitForSelector(kitCodeButton.selector, { visible: true });
    await page.click(kitCodeButton.selector);
  });
  it('In use code inserted', async done => {
    await page.waitForSelector(kitCodeInput.selector, { visible: true });
    let input = await page.$(kitCodeInput.selector);
    await input.click({ clickCount: 3 });
    await input.type(inUseCode);

    page.once('dialog', async dialog => {
      await dialog.accept();
      done();
    });
    await page.click(kitCodeButton.selector);
  });
  it('Good code inserted', async done => {
    await page.waitForSelector(kitCodeInput.selector, { visible: true });
    let input = await page.$(kitCodeInput.selector);
    await input.click({ clickCount: 3 });
    await input.type(successCode);
    await page.click(kitCodeButton.selector);
    await page.waitForSelector(aboutVrBackButton.selector, { visible: true });
    done();
  });
  it('Back button in about-vr screen', async done => {
    await page.click(aboutVrBackButton.selector);
    await page.waitForSelector(homeLayoutSelector.selector);
    done();
  });
});
