import * as firebase from "firebase/app"
import "firebase/auth"
import { browserLocalPersistence, browserSessionPersistence, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId:process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// })


const app = firebase.initializeApp({
  apiKey: "AIzaSyCvcQ274lOwLkk5A4KhevVUAQ5IJbWeHas",
  authDomain: "fir-test-project-24acd.firebaseapp.com",
  projectId: "fir-test-project-24acd",
  storageBucket: "fir-test-project-24acd.appspot.com",
  messagingSenderId: "130897641072",
  appId: "1:130897641072:web:559ba1feee38478244beb5",
  measurementId:"G-6M73VJRV3M",
})

export const auth = getAuth(app)
auth.setPersistence(browserLocalPersistence)
export default app

export const googleProvider = new GoogleAuthProvider()

export const getCurrentUser = () => {
    auth.onAuthStateChanged(function(user) {
    return user
  });
}
export const signInWithGoogle = () => {
    var res =  auth.setPersistence( browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return signInWithPopup(auth,provider)
  })
  .catch((error) => {
    // Handle Errors here.
    return Promise.reject(error)
  });
  return res
}