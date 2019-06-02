import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./firebaseConfig";

const app = firebase.initializeApp(firebaseConfig);

export default app;

export const Timestamp = firebase.firestore.Timestamp;
