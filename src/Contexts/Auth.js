import React, { useContext, useState, useEffect } from "react"
import { auth, googleProvider } from "@/firebase"
import { browserLocalPersistence, browserSessionPersistence, signInWithPopup } from "firebase/auth"
import ApiClient from "@/ApiClient"

const AuthContext = React.createContext()



export function AuthProvider({ children }) {
  
  const [currentUser, setCurrentUser] = useState()
  const [apiClient, setApiClient] = useState(new ApiClient())
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  var signInWithGoogle = () => {
    var res =  auth.setPersistence( browserLocalPersistence)
                .then(() => {
                    // Existing and future Auth states are now persisted in the current
                    // session only. Closing the window would clear any existing state even
                    // if a user forgets to sign out.
                    // ...
                    // New sign-in will be persisted with session persistence.
                    return signInWithPopup(auth,googleProvider)
                })
                .catch((error) => {
                    // Handle Errors here.
                    return Promise.reject(error)
                });

  return res
}

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      var client = new ApiClient(user)
      setApiClient(client)
      setLoading(false)
    })

    return unsubscribe
  }, []);

  const value = {
    currentUser,
    apiClient,
    setApiClient,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    signInWithGoogle,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}