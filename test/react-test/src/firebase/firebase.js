import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyCzan0wvkqYhMoOc0Fn-FUX1lXCwyteUKI",
  authDomain: "react-firebase-app-8e381.firebaseapp.com",
  databaseURL: "https://react-firebase-app-8e381.firebaseio.com",
  projectId: "react-firebase-app-8e381",
  storageBucket: "react-firebase-app-8e381.appspot.com",
  messagingSenderId: "354211681117",
  appId: "1:354211681117:web:abfc1cd1a0986c50ccceb4"
};

const Firebase = firebase.initializeApp(firebaseConfig)
// !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
// all calls to firebase must come after initializeApp()
// const db = firebase.firestore()
// const database = firebase.database();






export default Firebase;
