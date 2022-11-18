import { getRedirectResult, onAuthStateChanged, TwitterAuthProvider, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './components/about/about';
import Home from './components/home/home';
import Navigation from './components/navigation/navigation';
import firebase from './firebase-client';

function App() {
  const auth = firebase;
  const [session, setSession] = useState<User>();

  useEffect(() => {
    onAuthStateChanged(firebase, (user) => {
      if (user) {
        console.log('statechange');
        setSession(user);
      }
    });
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        if (result) {
          const credential = TwitterAuthProvider.credentialFromResult(result);
          sessionStorage.setItem('access_token', credential?.accessToken || '');
          sessionStorage.setItem('access_secret', credential?.secret || '');
        }
      })
      .catch((error) => {
        console.log('error', error);
        // ...
      });
  }, []);

  return (
    <BrowserRouter>
      <Navigation session={session} setSession={setSession} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
