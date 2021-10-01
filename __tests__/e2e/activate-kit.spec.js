/* global page */
import { FirebaseSignOut, FirebaseSignIn } from '../config/helpers';
import config from '../config';
import {
  loginButtonSelector,
  homeLayoutSelector,
  openDrawerSelector,
  drawerActivation,
  kitCodeInput,
  kitCodeButton,
  kitCodeText,
  kitCloseDialog,
  kitDialogButton,
  aboutVrBackButton,
} from '../config/selectors';
const { PAGE_URL } = config;

jest.setTimeout(40000);
describe('The kit activation proccess', () => {

  const wrongCode = '123123';
  const successCode = '123456';
  const inUseCode = '111111';
  beforeAll(async done => {
    await page.goto(PAGE_URL, { waitUntil: 'domcontentloaded' });
    await FirebaseSignOut();
    await FirebaseSignIn('activate-kit-test@test.com', '123456');
    await page.waitForSelector(openDrawerSelector, { visible: true });
    await page.click(openDrawerSelector);
    await page.waitForSelector(drawerActivation, { visible: true });
    await page.click(drawerActivation);
    done();
  });

  afterAll(async done => {
    await page.evaluateHandle(kitCode => {
      const uid = window.firebase.auth().currentUser.uid;
      const db = window.firebase.firestore();
      const fp = db
        .collection('kits')
        .doc(kitCode)
        .set({
          group: 'test',
        })
        .then(
          db.collection('users').doc(uid).update({
            kit_id: '',
          }),
        );
      const sp = new Promise(res => {
        setTimeout(res, 5000);
        let changes = 0;
        db.collection('users')
          .doc(uid)
          .onSnapshot(() => {
            changes += 1;
            db.collection('users')
              .doc(uid)
              .update({
                kit_id: '',
              })
              .then(() => {
                if (changes > 2) res();
              });
          });
      });
      return Promise.all([fp, sp]);
    }, successCode);
    done();
  });

  it('Open and close explain dialog using the close button (upper rigth cross)', async done => {
    await page.waitForSelector(kitCodeText, { visible: true });
    await page.click(kitCodeText);
    await page.waitForSelector(kitCloseDialog, { visible: true });
    await page.click(kitCloseDialog);
    done();
  });
  it('Open and close explain dialog using dialog close button', async done => {
    await page.waitForSelector(kitCodeText, { visible: true });
    await page.click(kitCodeText);
    await page.waitForSelector(kitDialogButton, { visible: true });
    await page.click(kitDialogButton);
    done();
  });
  it('Should insert a wrong code and the activation should fail', async done => {
    await page.waitForSelector(kitDialogButton, { hidden: true });
    await page.waitForSelector(kitCodeInput, { visible: true });
    let input = await page.$(kitCodeInput);
    await input.click({ clickCount: 3 });
    await input.type(wrongCode);

    page.once('dialog', async dialog => {
      await dialog.accept();
      done();
    });
    await page.waitForSelector(kitCodeButton, { visible: true });
    await page.click(kitCodeButton);
  });
  it('Should insert an in use code and the activation should fail', async done => {
    await page.waitForSelector(kitCodeInput, { visible: true });
    let input = await page.$(kitCodeInput);
    await input.click({ clickCount: 3 });
    await input.type(inUseCode);

    page.once('dialog', async dialog => {
      await dialog.accept();
      done();
    });
    await page.click(kitCodeButton);
  });
  it('Should insert a good code and the activation should pass correctly', async done => {
    await page.waitForSelector(kitCodeInput, { visible: true });
    let input = await page.$(kitCodeInput);
    await input.click({ clickCount: 3 });
    await input.type(successCode);
    await page.click(kitCodeButton);
    await page.waitForSelector(aboutVrBackButton, { visible: true });
    done();
  });
  it('Press the back button in about-vr screen and should navigate to home', async done => {
    await page.click(aboutVrBackButton);
    await page.waitForSelector(homeLayoutSelector);
    done();
  });
});
