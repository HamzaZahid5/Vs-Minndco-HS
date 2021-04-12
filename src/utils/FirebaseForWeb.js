const enqueueScripts = async (scriptArrays) => {
  const promises = scriptArrays.map(scriptUri => new Promise(resolve => {
    const script = window.document.createElement('script');
    script.src = scriptUri;
    script.onload = resolve;
    window.document.head.appendChild(script);
  }));
  await Promise.all(promises);
  return true;
}

const initializeApp = () => {
  const scriptInitializeApp = window.document.createElement('script');
  scriptInitializeApp.type = 'text/javascript';
  scriptInitializeApp.innerHTML = `var firebaseConfig = {
    apiKey: "AIzaSyBm2qxdLhqZvd-xiwm6kHpv9wO6latT-pA",
    authDomain: "mindco-relief-production.firebaseapp.com",
    projectId: "mindco-relief-production",
    storageBucket: "mindco-relief-production.appspot.com",
    messagingSenderId: "856853839195",
    appId: "1:856853839195:web:a614eddbf688d4a8456e7e",
    measurementId: "G-Z62R5WRKFY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  window.firebaseInitialized();
  `;

  window.document.head.appendChild(scriptInitializeApp);
}

export default async callback => {
  await enqueueScripts([
    'https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js',
    'https://www.gstatic.com/firebasejs/8.3.1/firebase-auth.js',
    'https://www.gstatic.com/firebasejs/8.3.1/firebase-firestore.js',
    'https://www.gstatic.com/firebasejs/8.3.1/firebase-functions.js',
    // Add SDKs for Firebase products that you want to use https://firebase.google.com/docs/web/setup#available-libraries
  ]);
  // all loaded
  window.firebaseInitialized = () => callback();
  initializeApp();
}