import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD5y2HHOIsCi4IAxsGM-hzzi4whqlhhFQ0",
    authDomain: "image-community-907bf.firebaseapp.com",
    projectId: "image-community-907bf",
    storageBucket: "image-community-907bf.appspot.com",
    messagingSenderId: "812570812848",
    appId: "1:812570812848:web:343a914bf52ace67b83675",
    measurementId: "G-06BWK62S5V",
  };

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, apiKey, firestore };
