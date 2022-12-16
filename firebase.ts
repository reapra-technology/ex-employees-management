import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyDp3WfaQMqEYGHmszyuitgaoLQTEcrjt9M",
  authDomain: "ex-employees-management.firebaseapp.com",
  projectId: "ex-employees-management",
  storageBucket: "ex-employees-management.appspot.com",
  messagingSenderId: "877826282480",
  appId: "1:877826282480:web:883d565b7bfda938890335"
};

const app = initializeApp(firebaseConfig);
initializeFirestore(app, {
  ignoreUndefinedProperties: true,
})

export const db = getFirestore();

export default app;