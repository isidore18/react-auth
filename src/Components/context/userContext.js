import React, { createContext, useState, useEffect } from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../../firebase-config';

export const UserContext = createContext();

export function UserContextProvider(props) {

    const [currentUser, setCurrentUser] = useState();
    const [loadingData, setLoadingData] = useState(true);

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser);
            setLoadingData(false);
        })

        return unsubscribe;
    }, [])



    // modals

    const [modalState, setModalState] = useState({
        signUpModal: false,
        signInModal: false
    })

    const toggleModals = modal => {
        if (modal === 'signIn') {
            setModalState({
                signUpModal: false,
                signInModal: true
            })
        }
        if (modal === 'signUp') {
            setModalState({
                signUpModal: true,
                signInModal: false
            })
        }
        if (modal === 'close') {
            setModalState({
                signUpModal: false,
                signInModal: false
            })
        }
    }

    return (
        <UserContext.Provider value={{ modalState, toggleModals, signUp, currentUser, signIn }}>
            {!loadingData && props.children}
        </UserContext.Provider>
    )
}