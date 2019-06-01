import React from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./firebaseConfig";

import "./index.css";
import App from "./App";

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById("root"));
