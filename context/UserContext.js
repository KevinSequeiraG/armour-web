import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';

import { doc, getDoc } from "firebase/firestore";
import { auth, database } from '@/lib/firebaseConfig';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const router = useRouter();
  const [loggedUser, setLoggedUser] = useState(null);

  function Login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const sendUserEmailVerification = async () => {
    const user = auth.currentUser;
    try {
      await sendEmailVerification(user)
    } catch (error) {
      console.log(error)
    }

  }

  const UpdateUser = async (userUid) => {
    try {
      const databaseRef = doc(database, `admin/data/users/${userUid}`);
      await getDoc(databaseRef).then((doc) => {
        let data = doc.data();
        data.uid = doc.id
        sessionStorage.setItem('storage_loggedUser', JSON.stringify(data));
        setLoggedUser(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.route != "/login" && sessionStorage.getItem('storage_loggedUser') != null) {
      const loggedUserMemory = JSON.parse(sessionStorage.getItem('storage_loggedUser'));
      setLoggedUser(loggedUserMemory);
    } else if (router.route != "/login" && !router.route.includes("userAction") && !router.route.includes("aw") && !router.route.includes("sendEmailPassword"))
      router.push("/login");
  }, [router.route]);

  return (
    <UserContext.Provider value={{ loggedUser, Login, UpdateUser, sendUserEmailVerification }}>
      {children}
    </UserContext.Provider>
  );
};