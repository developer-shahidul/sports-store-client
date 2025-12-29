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
  // console.log(user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const createSignInUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user); // ✅ save user
        setLoading(false); // ✅ stop loading
        return result;
      })
      .catch((error) => {
        setLoading(false);
        throw error;
      });
  };

  const logInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user); // ✅ save user
        setLoading(false); // ✅ stop loading
        return result;
      })
      .catch((error) => {
        setLoading(false);
        throw error;
      });
  };

  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
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
