import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCbz-ms0K00z_qxitt59zD20YI1o-RndQY',
  authDomain: 'templater-311906.firebaseapp.com',
  projectId: 'templater-311906',
  storageBucket: 'templater-311906.appspot.com',
  messagingSenderId: '204685686946',
  appId: '1:204685686946:web:60e5d3186bad800d2d7ffb',
  measurementId: 'G-JKKCKTPLGQ',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();
const firestore = firebase.firestore();

export { storage, firestore };
