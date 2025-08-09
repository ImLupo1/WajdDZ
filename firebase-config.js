const firebaseConfig = {
  apiKey: "AIzaSyAruOLmBADLDxholr9tvmvFSIwTVH5gbcE",
  authDomain: "wajddz.firebaseapp.com",
  projectId: "wajddz",
  storageBucket: "wajddz.firebasestorage.app",
  messagingSenderId: "1049758782307",
  appId: "1:1049758782307:web:87d2582b9b963d3e983956"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
