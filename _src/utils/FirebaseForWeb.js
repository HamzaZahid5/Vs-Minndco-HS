import serviceKeys from '../../web/google-services.json';
const enqueueScripts = async scriptArrays => {
  const injectScript = scriptUri =>
    new Promise(resolve => {
      const script = window.document.createElement('script');
      script.src = scriptUri;
      script.onload = () => {
        // eslint-disable-next-line no-console
        console.log('injecting', scriptUri);
        resolve();
      };
      window.document.head.appendChild(script);
    });
  await scriptArrays.reduce(async (previousPromise, nextScript) => {
    await previousPromise;
    return injectScript(nextScript);
  }, Promise.resolve());

  return true;

  // const promises = scriptArrays.map(scriptUri => new Promise(resolve => {
  //   const script = window.document.createElement('script');
  //   script.src = scriptUri;
  //   script.onload = resolve;
  //   window.document.head.appendChild(script);
  // }));
  // await Promise.all(promises);
  // return true;
};

const initializeApp = () => {
  const scriptInitializeApp = window.document.createElement('script');
  scriptInitializeApp.type = 'text/javascript';
  scriptInitializeApp.innerHTML = `var firebaseConfig = ${JSON.stringify(serviceKeys)};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  window.firebaseInitialized();
  `;

  window.document.head.appendChild(scriptInitializeApp);
};

export default async callback => {
  await enqueueScripts([
    'https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js',
    'https://www.gstatic.com/firebasejs/8.9.1/firebase-auth.js',
    'https://www.gstatic.com/firebasejs/8.9.1/firebase-firestore.js',
    'https://www.gstatic.com/firebasejs/8.9.1/firebase-functions.js',
    'https://www.gstatic.com/firebasejs/8.9.1/firebase-analytics.js',
    'https://www.gstatic.com/firebasejs/8.9.1/firebase-storage.js',
    // Add SDKs for Firebase products that you want to use https://firebase.google.com/docs/web/setup#available-libraries
  ]);
  // all loaded
  window.firebaseInitialized = () => callback();
  initializeApp();
};
