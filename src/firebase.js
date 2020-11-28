// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBn7vwvpxeOSARrn6t3XXbSf5-5mSXdTQQ",
    authDomain: "awards-81ab2.firebaseapp.com",
    databaseURL: "https://awards-81ab2.firebaseio.com",
    projectId: "awards-81ab2",
    storageBucket: "awards-81ab2.appspot.com",
    messagingSenderId: "271658650788",
    appId: "1:271658650788:web:82422b7cc9b9c5aefdaa31",
    measurementId: "G-T21792DTCE"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };