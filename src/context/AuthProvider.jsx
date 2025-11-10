import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase.config";
import { useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";

const AuthProvider = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(user);
  const SignUpWithEmailPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  const SignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const UpdateUser = (userInfo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, userInfo);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (CurrentUser) => {
      console.log(CurrentUser);
      setUser(CurrentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const SignOut = () => {
    return signOut(auth);
  };

  const userInfo = {
    SignUpWithEmailPassword,
    SignIn,
    SignOut,
    UpdateUser,
    loading,
    user,
    signInWithGoogle,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
