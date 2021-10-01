/* global page */
import config from '../config';
import { FirebaseSignOut } from '../config/helpers';
import {
  loginButtonSelector,
  homeLayoutSelector,
  usernameInputSelector,
  usernameErrorSelector,
  passwordInputSelector,
  passwordErrorSelector,
} from '../config/selectors';

const { PAGE_URL } = config;
jest.setTimeout(30000);
describe('The login', () => {
  beforeAll(async () => {
    await page.goto(PAGE_URL, { waitUntil: 'domcontentloaded' });
  });
  beforeEach(async () => {
    await FirebaseSignOut();
  });

  it('should reject login with empty credentials', async () => {
    await page.waitForSelector(loginButtonSelector);
    // click workaround
    await page.evaluate(s => document.querySelector(s).click(), loginButtonSelector);
    await page.waitForSelector(usernameErrorSelector);
    await page.waitForSelector(passwordErrorSelector);
  });

  it('should reject login with wrong credentials', async done => {
    await page.waitForSelector(usernameInputSelector);
    await page.type(usernameInputSelector, 'fake@fake.com');
    await page.type(passwordInputSelector, 'fake');
    page.on('dialog', async dialog => {
      await dialog.accept();
      done();
    });
    // click workaround
    await page.evaluate(s => document.querySelector(s).click(), loginButtonSelector);
  });

  it('should log in a valid credentials', async () => {
    const usr = 'test@emulator.com';
    const psw = '123456';
    await page.waitForSelector(usernameInputSelector);

    let input = await page.$(usernameInputSelector);
    await input.click({ clickCount: 3 });
    await input.type(usr);

    input = await page.$(passwordInputSelector);
    await input.click({ clickCount: 3 });
    await input.type(psw);

    // click workaround
    await page.evaluate(s => document.querySelector(s).click(), loginButtonSelector);
    await page.waitForSelector(homeLayoutSelector);
  });
});
