import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAS1-9L2Zixdmu9omEEBhLh2M2ex6uJcvA",
    authDomain: "ti-react-native.firebaseapp.com",
    projectId: "ti-react-native",
    storageBucket: "ti-react-native.appspot.com",
    messagingSenderId: "340936361656",
    appId: "1:340936361656:web:8a9b1894040f6057b2164d"
};  

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();