import { useEffect } from 'react';
import './App.css';
import { TwitterAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import About from './components/about';
import firebase from './firebaseClient';

function App() {
  // const [session, setSession] = useState<any>();

  const loginSubmit = () => {
    const provider = new TwitterAuthProvider();
    const auth = getAuth(firebase);
    auth.languageCode = 'it';
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        const credential = TwitterAuthProvider.credentialFromResult(result);
        console.log('credential.accessToken', credential?.accessToken);
        console.log('credential.secret', credential?.secret);
        // The signed-in user info.
        console.log('result.user', result.user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const { email } = error.customData;
        // The AuthCredential type that was used.
        const credential = TwitterAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <>
      <About />
      <div className="ms-auto" style={{ display: 'flex' }}>
        <li className="nav-item ms-auto">
          <button
            type="button"
            className="btn btn-primary m-1"
            id="loginSubmit"
            onClick={() => loginSubmit()}
          >
            Login
          </button>
        </li>
      </div>
    </>
  );
}

export default App;
