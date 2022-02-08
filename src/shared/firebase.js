import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// firebase에서 프로젝트 생성 시 생기는 firebaseConfig 그대로 복사하기
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
const storage = firebase.storage();

export { auth, apiKey, firestore, storage };
