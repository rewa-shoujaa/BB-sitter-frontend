import * as firebase from 'firebase/app'; 
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/storage';
import "firebase/messaging";
import dotenv from 'dotenv';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCZTkj_qmfvP6bwQSDG6TyUPkcmdLXCLfc",
    authDomain: "bb-sitter-app.firebaseapp.com",
    projectId: "bb-sitter-app",
    storageBucket: "bb-sitter-app.appspot.com",
    messagingSenderId: "1052906398986",
    appId: "1:1052906398986:web:8cb042fd7f0de4a4ea46f3",
    measurementId: "G-PW6B8N7RBL"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const messaging = firebase.messaging();


const publicKey= process.env.REACT_APP_VAPID_KEY;
console.log(publicKey);

export const getToken = async (setTokenFound) => {
  let currentToken = "";

  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
    if (currentToken) {
      setTokenFound(true);
      console.log(publicKey);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }

  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });