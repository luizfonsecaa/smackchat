//Firebaaase app (the core Firebase SDK) is always required and 
//must be listed firt
import * as firebase from "firebase/app"

//Add the firebase products that you want to use
import "firebase/auth"
import "firebase/database"

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC_yUg89NgnRKiVtoxw_jYSx5UNZDCz944",
  authDomain: "smackchat-1e18a.firebaseapp.com",
  databaseURL: "https://smackchat-1e18a.firebaseio.com",
  projectId: "smackchat-1e18a",
  storageBucket: "smackchat-1e18a.appspot.com",
  messagingSenderId: "273975592653",
  appId: "1:273975592653:web:1d2e67ae78912482e10b84"
};
// Initialize Firebase
let firebaseApp  = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth()
let firebaseDb   = firebaseApp.database()

export { firebaseAuth, firebaseDb }

