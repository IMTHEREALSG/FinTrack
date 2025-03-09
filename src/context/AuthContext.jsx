import React, { useContext, useEffect, useState } from "react";
import { auth, firestore } from "../firebase";
import { setDoc, doc,getDoc } from "firebase/firestore";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    async function signup(email, password) {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await createUserDocument(result.user);
            return result;
        } catch (error) {
            console.error("Signup error:", error);
            throw error;
        }
    }

    async function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    async function googleSignIn() {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            await createUserDocument(result.user);
            return result;
        } catch (error) {
            console.error("Google sign in error:", error);
            throw error;
        }
    }

    async function createUserDocument(user) {
        if (!user) return;

        const userRef = doc(firestore, 'users', user.uid);
        try {
            await setDoc(userRef, {
                email: user.email,
                displayName: user.displayName,
                income: {},
                expense: {},
                money: {
                    totalCard: 0,
                    totalCash: 0,
                    totalSavings: 0,
                    totalMoney: 0,
                },
                totalTax: 0,
                totalExpense: 0,
            }, { merge: true });
        } catch (error) {
            console.error("Error creating user document:", error);
            throw error;
        }
    }

    function logout() {
        return auth.signOut();
    }

    const value = {
        currentUser,
        signup,
        login,
        googleSignIn,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;