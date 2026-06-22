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
import axios from "axios";

const AuthProvider = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role,setRole] = useState('');
  const [userData,setUserData]=useState(null);
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
      setUser(CurrentUser);
      // If user logs out or no user is found, stop loading immediately
      if (!CurrentUser) {
        setRole('');
        setUserData(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Only fetch role if we actually have a logged-in user with an email
    if (user?.email) {
      axios.get(`http://localhost:3000/users/role?email=${user.email}`)
        .then((res) => {
          setUserData(res.data);
          setRole(res.data?.role || '');
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch user role:", err);
          setLoading(false);
        });
    }
  }, [user?.email]);

 
  



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
    role,
    userData
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
