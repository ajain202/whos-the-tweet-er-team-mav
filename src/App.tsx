import {
  getRedirectResult,
  OAuthCredential,
  onAuthStateChanged,
  TwitterAuthProvider,
  User,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './components/about/about';
import Home from './components/home/home';
import Navigation from './components/navigation/navigation';
import { firebaseAuth } from './firebase/firebase-client';

function App() {
  const [session, setSession] = useState<User | null>(null);
  const [oAuthCredential, setOAuthCredential] = useState<OAuthCredential | null>(null);

  useEffect(() => {
    const oAuthCredFromStorage = localStorage.getItem('oauth_credential');
    if (oAuthCredFromStorage) {
      setOAuthCredential(JSON.parse(oAuthCredFromStorage));
    }

    getRedirectResult(firebaseAuth)
      .then((result) => {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        if (result) {
          const credential = TwitterAuthProvider.credentialFromResult(result);
          setOAuthCredential(credential);
          localStorage.setItem('oauth_credential', JSON.stringify(credential));
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
