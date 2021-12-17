import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// Initialize Firebase

const firebaseConfig = {
  apiKey: "AIzaSyDbcJf8YpB5H7I6kWbC5FGeZt7KAybr1LU",
  authDomain: "signal-clone-29aa7.firebaseapp.com",
  projectId: "signal-clone-29aa7",
  storageBucket: "signal-clone-29aa7.appspot.com",
  messagingSenderId: "83622478359",
  appId: "1:83622478359:web:40e236eb15fbde704bd252",
  measurementId: "G-15KBMFZJ0B"
};

const firebaseApp =firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db,auth}
