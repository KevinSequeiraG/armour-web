import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { auth, database } from '@/lib/firebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const router = useRouter();
  const [loggedUser, setLoggedUser] = useState(null);

  function Login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const databaseRef = doc(database, `event+/data/users/${currentUser.uid}`);
        const codeData = getDoc(databaseRef);
        codeData.then((user) => {
          const loggedUser = user.data();
          setLoggedUser(loggedUser);
          localStorage.setItem('storage_loggedUser', JSON.stringify(loggedUser));
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   if (router.route != "/login" && localStorage.getItem('storage_loggedUser') != null) {
  //     const loggedUserMemory = JSON.parse(localStorage.getItem('storage_loggedUser'));
  //     setUser(loggedUserMemory);
  //   } else if (router.route != "/login" && !router.route.includes("recoverPassword"))
  //     router.push("/login");
  // }, []);

  return (
    <UserContext.Provider value={{ loggedUser, Login }}>
      {children}
    </UserContext.Provider>
  );
};
