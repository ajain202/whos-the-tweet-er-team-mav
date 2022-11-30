import {
  getRedirectResult,
  OAuthCredential,
  onAuthStateChanged,
  TwitterAuthProvider,
  User,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './components/about/about';
import Home from './components/home/home';
import Navigation from './components/navigation/navigation';
import { firebaseAuth, firestoreDB } from './firebase/firebase-client';

function App() {
  const [session, setSession] = useState<User | null>(null);
  const [oAuthCredential, setOAuthCredential] = useState<OAuthCredential | null>(null);

  useEffect(() => {
    const oAuthCredFromStorage = sessionStorage.getItem('oauth_credential');
    if (oAuthCredFromStorage) {
      setOAuthCredential(JSON.parse(oAuthCredFromStorage));
    }

    getRedirectResult(firebaseAuth)
      .then((result) => {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        if (result) {
          const user = {
            name: result?.user.displayName,
            // eslint-disable-next-line @typescript-eslint/dot-notation
            username: JSON.parse(JSON.stringify(result))['_tokenResponse']?.screenName,
            score: 0,
          };
          const userScoreRef = doc(firestoreDB, 'score', result.user.uid);
          getDoc(userScoreRef)
            .then((docSnap) => {
              if (!docSnap.exists()) {
                setDoc(userScoreRef, user);
              }
            })
            .catch(() => alert("Score card wasn't created please login again"));
          const credential = TwitterAuthProvider.credentialFromResult(result);
          setOAuthCredential(credential);
          sessionStorage.setItem('oauth_credential', JSON.stringify(credential));
        }
      })
      .catch((error) => {
        console.log(error);
      });

    onAuthStateChanged(firebaseAuth, (user) => {
      setSession(user);
    });
  }, []);

  return (
    <BrowserRouter>
      <Navigation
        session={session}
        setSession={setSession}
        setOAuthCredential={setOAuthCredential}
      />
      <Routes>
        <Route path="/" element={<Home oAuthCredential={oAuthCredential} session={session} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
