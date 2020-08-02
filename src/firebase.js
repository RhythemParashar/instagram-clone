import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAY9UomEhXezkLovCbY9W0Ld_F8QzAjhX0",
    authDomain: "instagram-clone-react-11c06.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-11c06.firebaseio.com",
    projectId: "instagram-clone-react-11c06",
    storageBucket: "instagram-clone-react-11c06.appspot.com",
    messagingSenderId: "502699737640",
    appId: "1:502699737640:web:80e48e8fbbf27beca16b1d",
    measurementId: "G-DK5HMSGQ9Z"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };