import { initializeApp } from 'firebase/app';
import { getAuth, browserSessionPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// web app's firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// initialize firebase
const firebase = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebase);
firebaseAuth.setPersistence(browserSessionPersistence);
const firestoreDB = getFirestore(firebase);

export { firebaseAuth, firestoreDB };
