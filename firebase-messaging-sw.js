importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig={
  apiKey: "AIzaSyCZTkj_qmfvP6bwQSDG6TyUPkcmdLXCLfc",
  authDomain: "bb-sitter-app.firebaseapp.com",
  projectId: "bb-sitter-app",
  storageBucket: "bb-sitter-app.appspot.com",
  messagingSenderId: "1052906398986",
  appId: "1:1052906398986:web:8cb042fd7f0de4a4ea46f3",
  measurementId: "G-PW6B8N7RBL"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});