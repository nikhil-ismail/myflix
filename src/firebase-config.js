// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1FTCmmeDCrn4w01VdDhNByElVYRuhQWI",
  authDomain: "movie-rank-fe1d9.firebaseapp.com",
  projectId: "movie-rank-fe1d9",
  storageBucket: "movie-rank-fe1d9.appspot.com",
  messagingSenderId: "194207186638",
  appId: "1:194207186638:web:19126a585d384682731a9f",
  measurementId: "G-LFSCTFCWDS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
    })
    .catch((error) => {
      console.log(error);
    });
};
