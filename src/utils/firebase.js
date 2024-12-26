// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,FacebookAuthProvider, GithubAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCiS2LWWlAXr-sY-FPsMwxCX3pyd5ECc2M",
    authDomain: "sample-ab56a.firebaseapp.com",
    projectId: "sample-ab56a",
    storageBucket: "sample-ab56a.appspot.com",
    messagingSenderId: "901866096960",
    appId: "1:901866096960:web:bb3fb18e2b74e1ac3292a5",
    measurementId: "G-2JNX0JQ25R",
    clientId:"901866096960-m3efuc9m3qetk4s29e4ipu4um49h2unv.apps.googleusercontent.com"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();
const ghProvider = new GithubAuthProvider();

export { auth, googleProvider,fbProvider,ghProvider, app as default };

