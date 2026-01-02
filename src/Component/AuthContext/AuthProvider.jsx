import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../../firebase.init";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // প্রথমে true রাখো — auth state চেক হওয়া পর্যন্ত লোডিং

  // onAuthStateChanged — ইউজারের স্টেট চেক করবে
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // চেক শেষ, লোডিং বন্ধ
      console.log("Auth state changed:", currentUser?.email || "No user");
    });

    return () => unsubscribe(); // cleanup
  }, []);

  // Sign Up
  const createSignInUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).finally(() => {
      setLoading(false); // সাকসেস বা ফেল, লোডিং বন্ধ
    });
  };

  // Sign In
  const logInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() => {
      setLoading(false);
    });
  };

  // Log Out
  const logOutUser = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        setUser(null); // ম্যানুয়ালি null করো (কখনো কখনো onAuthStateChanged দেরি করে)
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const userInfo = {
    user,
    loading,
    createSignInUser,
    logInUser,
    logOutUser,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
