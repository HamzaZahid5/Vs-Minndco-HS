/* global page */
import { loginButtonSelector, homeLayoutSelector } from './selectors';
const FirebaseSignOut = async () => {
  const r = await racePromises([
    page.waitForSelector(loginButtonSelector, { timeout: 5000 }).catch(() => false),
    page.waitForSelector(homeLayoutSelector, { timeout: 5000 }).catch(() => false),
  ]);

  if (r === 1) {
    await page.evaluate(() => {
      window.firebase.auth().signOut();
    });
    await page.waitForSelector(loginButtonSelector);
  }
};

const FirebaseSignIn = async (userEmail, userPassword) => {
  // mock login
  await page.evaluate(
    ({ userEmail: email, userPassword: password }) => {
      return window.firebase.auth().signInWithEmailAndPassword(email, password);
    },
    { userEmail, userPassword },
  );
  await page.waitForSelector(homeLayoutSelector);
};

const FirebaseUserUpdate = async update => {
  await page.evaluate(data => {
    return window.firebase.firestore().collection('users').doc(window.firebase.auth().currentUser.uid).update(data);
  }, update);
};

async function racePromises(promises) {
  const wrappedPromises = [];
  promises.map((promise, index) => {
    wrappedPromises.push(
      new Promise(resolve => {
        promise.then(() => {
          resolve(index);
        });
      }),
    );
  });
  return Promise.race(wrappedPromises);
}
module.exports = {
  FirebaseSignOut,
  FirebaseSignIn,
  FirebaseUserUpdate,
};
