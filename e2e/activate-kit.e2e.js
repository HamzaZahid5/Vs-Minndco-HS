import { clearData, createStandarUser, makeKit } from './mockToEmulators';
import { login } from './helpers';
const usr = 'kit@activation.com';
const psw = '123456';

const validId = '123123';
const invalidId = '111111';
const usedId = '123456';

describe('The kit activation', () => {
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

    await waitFor(element(by.id('open-drawer-button')))
      .toExist()
      .withTimeout(200);
    await element(by.id('open-drawer-button')).tap();

    await waitFor(element(by.id('drawer-activation-button')))
      .toExist()
      .withTimeout(1000);
    await element(by.id('drawer-activation-button')).tap();
    await waitFor(element(by.id('kit-activation-code-input')))
      .toExist()
      .withTimeout(2000);
  });

  afterAll(async () => {
    await clearData();
  });

  it('should open and close explain dialog using the close button (upper rigth cross)', async () => {
    await waitFor(element(by.id('kit-activation-explain-text')))
      .toExist()
      .withTimeout(50000);
    await element(by.id('kit-activation-explain-text')).tap({ x: 80, y: 40 });
    await waitFor(element(by.id('kit-activation-explain-dialog-close')))
      .toExist()
      .withTimeout(1000);
    await element(by.id('kit-activation-explain-dialog-close')).tap();
    await waitFor(element(by.id('kit-activation-code-input')))
      .toBeVisible()
      .withTimeout(200);
  });

  it('Open and close explain dialog using dialog close button', async () => {
    await waitFor(element(by.id('kit-activation-explain-text')))
      .toExist()
      .withTimeout(50000);
    await element(by.id('kit-activation-explain-text')).tap({ x: 80, y: 40 });
    await waitFor(element(by.id('kit-activation-explain-dialog-button-0')))
      .toExist()
      .withTimeout(1000);

    await element(by.id('kit-activation-explain-dialog-button-0')).tap();
    await waitFor(element(by.id('kit-activation-code-input')))
      .toBeVisible()
      .withTimeout(200);
  });

  it('Should insert a wrong code and the activation should fail', async () => {
    await waitFor(element(by.id('kit-activation-code-input')))
      .toExist()
      .withTimeout(50000);
    await element(by.id('kit-activation-code-input')).replaceText('111111');
    await element(by.id('use-this-code-button')).tap();

    await waitFor(element(by.text('OK')))
      .toBeVisible()
      .withTimeout(200);
    await element(by.text('OK')).tap();
    await waitFor(element(by.id('kit-activation-code-input')))
      .toBeVisible()
      .withTimeout(200);
  });

  it('Should insert an in use code code and the activation should fail', async () => {
    await waitFor(element(by.id('kit-activation-code-input')))
      .toExist()
      .withTimeout(50000);
    await element(by.id('kit-activation-code-input')).replaceText(usedId);
    await element(by.id('use-this-code-button')).tap();

    await waitFor(element(by.text('OK')))
      .toBeVisible()
      .withTimeout(200);
    await element(by.text('OK')).tap();
    await waitFor(element(by.id('kit-activation-code-input')))
      .toBeVisible()
      .withTimeout(200);
  });

  it('Should insert a valid code and the activation should pass', async () => {
    await waitFor(element(by.id('kit-activation-code-input')))
      .toExist()
      .withTimeout(50000);
    await element(by.id('kit-activation-code-input')).replaceText(validId);
    await element(by.id('use-this-code-button')).tap();
    await waitFor(element(by.id('about-vr-screen')))
      .toBeVisible()
      .withTimeout(2000);
  });
});
