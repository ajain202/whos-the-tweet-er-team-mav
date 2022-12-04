import { OAuthCredential, onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
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
    const oAuthCredFromStorage = sessionStorage.getItem('oauth_credential');
    if (oAuthCredFromStorage) {
      setOAuthCredential(JSON.parse(oAuthCredFromStorage));
    }

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
      <Toaster
        toastOptions={{
          duration: 2500,
        }}
      />
    </BrowserRouter>
  );
}

export default App;
