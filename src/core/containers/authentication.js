import {useEffect, useState} from "react";
import {createContainer} from "unstated-next";

import Firebase from "../services/firebase";

function useAuthentication() {
    const [initialized, setInitialized] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const signIn = (email, password) => {
        setLoading(true);
        Firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => {
                setErrorMessage(error.message);
            })
            .finally(() => setLoading(false));
    };
    const signUp = (email, password) => {
        setLoading(true);
        Firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => setErrorMessage(null))
            .catch(error => {
                setErrorMessage(error.message);
            })
            .finally(() => setLoading(false));
    };
    const signOut = () => {
        setLoading(true);
        Firebase.auth()
            .signOut()
            .then(() => setErrorMessage(null))
            .catch(error => {
                setErrorMessage(error.message);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (initialized) {
            return;
        }

        Firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);

            if (!initialized) {
                setInitialized(true);
            }
        });
    });

    return {initialized, loading, user, errorMessage, signIn, signUp, signOut};
}

const Authentication = createContainer(useAuthentication);

export default Authentication;

