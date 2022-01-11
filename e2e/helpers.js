export const login = async (usr, psw) => {
  await waitFor(element(by.id('login-form-username-input')))
    .toBeVisible()
    .withTimeout(2000);

  await element(by.id('login-form-username-input')).tap();
  await element(by.id('login-form-username-input')).replaceText(usr);

  await element(by.id('login-form-password-input')).tap();
  await element(by.id('login-form-password-input')).replaceText(psw);

  await element(by.id('login-form-submmit-cta')).tap();
};
