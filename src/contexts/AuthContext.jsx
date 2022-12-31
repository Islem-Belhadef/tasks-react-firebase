// React & Router
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Firebase Config
import { auth, storage } from "../config/FirebaseClient";

// Firebase Library
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const [userLoading, setUserLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  const signup = (email, password, name, imgRef, imgState) => {
    setIsLoading(true);

    if (imgState) {
      if (imgRef.current.files[0].size < 2097152) {
        setIsLoading(true);
        const profilePictureRef = ref(storage, `profilePictures/${email}`);
        uploadBytes(profilePictureRef, imgState)
          .then((res) => {
            getDownloadURL(profilePictureRef)
              .then((url) => {
                createUserWithEmailAndPassword(auth, email, password)
                  .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                      displayName: name,
                      photoURL: url,
                    });
                    navigate("/");
                    setIsLoading(false);
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    setError(errorCode);
                    setIsLoading(false);
                  });
              })
              .catch((error) => {
                setError(error);
                setIsLoading(false);
              });
          })
          .catch((error) => {
            setError(error);
            setIsLoading(false);
          });
      } else {
        setError("Image size too big! it should be less than 2 mb");
        setIsLoading(false);
      }
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, { displayName: name })
            .then((res) => {
              navigate("/");
              setIsLoading(false);
            })
            .catch((error) => {
              const errorCode = error.code;
              setError(errorCode);
              setIsLoading(false);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          setError(errorCode);
          setIsLoading(false);
        });
    }
  };

  const login = (email, password) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/");
        setIsLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
        setIsLoading(false);
      });
  };

  const loginWithGoogle = () => {
    setIsLoading(true);

    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/");
        setIsLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        setIsLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  const resetPassword = (email) => {
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Password reset email sent!");
        setIsLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode);
        setIsLoading(false);
      });
  };

  const changeEmail = (newEmail) => {
    setIsLoading(true);
    updateEmail(user, newEmail)
      .then(() => {
        console.log("Email updated!");
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  const changePassword = (newPassword) => {
    setIsLoading(true);
    updatePassword(user, newPassword)
      .then(() => {
        console.log("Update successful.");
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setCurrentUser(user);
        setUserLoading(false);
      } else {
        setCurrentUser(null);
        setUserLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    error,
    setError,
    isLoading,
    setIsLoading,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    changeEmail,
    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!userLoading && children}
    </AuthContext.Provider>
  );
};
