import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDcrCWW9qvBXrgNb9i9bpNzAHwXybr3Mdw',
  authDomain: 'find-a-doctor-vue.firebaseapp.com',
  databaseURL:
    'https://find-a-doctor-vue-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'find-a-doctor-vue',
  storageBucket: 'find-a-doctor-vue.appspot.com',
  messagingSenderId: '932589661877',
  appId: '1:932589661877:web:20151239edba1b4e2498fc',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
