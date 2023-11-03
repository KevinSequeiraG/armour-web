import { auth, database, storage } from "@/lib/firebaseConfig";
import { applyActionCode, confirmPasswordReset, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addProcessStatus } from "./reports";

export const userAlreadyExists = async (email) => {
    let exists = false;
    let userRecord;
    try {
        await fetch("/api/userAlreadyExists", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(email),
        })
            .then(async (res) => {
                if (res.status === 200) {
                    res = await res.json();
                    exists = true;
                    userRecord = res;
                    return { userUid: userRecord, userExist: exists };
                } else {
                    exists = false;
                    userRecord = {};
                    return { userUid: null, userExist: false };
                }
            }).then(() => {
                const date = new Date();
                addProcessStatus({ process: "userAlreadyExists", status: "success", date: date });
            })
        return { userUid: userRecord, userExist: exists };
    } catch (error) {
        console.error("User no exist");
        const date = new Date();
        addProcessStatus({ process: "userAlreadyExists", status: ("error:" + error), date: date });
    }
};

export const createUserFromLogin = async (newUser) => {
    const todayDate = new Date();

    await fetch("/api/createUser", {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            newUserEmail: newUser.email.trim().toLowerCase(),
            newUserPassword: newUser.password,
            userName: newUser.name.trim().toLocaleLowerCase(),
        }),
    }).then(async (res) => {
        if (res.status === 200) {
            res = await res.json();
            //ref to insert in USERS
            const usersTableRef = doc(database, `admin/data/users/${res.uid}`);
            await setDoc(usersTableRef, {
                imageProfileUrl: "",
                name: newUser.name.trim().toLocaleLowerCase(),
                lastname: newUser.lastname.trim().toLocaleLowerCase(),
                identification: "",
                email: newUser.email.trim().toLowerCase(),
                userType: "user",
                createdAt: todayDate,
                active: true,
                phone: "",
                fb: "",
                twitter: "",
                linkedin: "",
                webpage: ""
            }).then(async () => {
                // sendFirstEmailToUser();
                // localStorage.setItem("mainEmail", mainEmail);
                // localStorage.setItem("identification", identification);
                // router.push("/preguntas");
            }).then(() => {
                const date = new Date();
                addProcessStatus({ process: "createUserFromLogin", status: "success", date: date });
            });
            return;
        } else {
            console.log(res);
        }
        return;
    }).catch((er) => {
        console.log(er);
        const date = new Date();
        addProcessStatus({ process: "createUserFromLogin", status: ("error:" + error), date: date });
    });
}
const uploadImageInDB = async (file) => {
    try {
        const storageRef = ref(storage, "images/" + file.name);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        const date = new Date();
        await addProcessStatus({ process: "uploadImageInDB", status: "success", date: date });
        return downloadURL;
    } catch (error) {
        console.error(error);
        const date = new Date();
        addProcessStatus({ process: "uploadImageInDB", status: ("error:" + error), date: date });
        return null;
    }
};

export const getUserByUid = async (uid) => {
    try {
        const userRef = doc(database, `admin/data/users/${uid}`);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
            const userData = { ...userSnapshot.data(), uid: userSnapshot.id };

            const date = new Date();
            addProcessStatus({ process: "getUserByUid", status: "success", date: date });

            return userData;
        } else {
            throw new Error("No existe el usuario con el UID proporcionado");
        }
    } catch (error) {
        console.error('Error al obtener el usuario desde Firestore:', error);

        const date = new Date();
        addProcessStatus({ process: "getUserByUid", status: "error: " + error, date: date });

        throw error; // Asegúrate de lanzar el error para que sea manejado externamente si es necesario.
    }
}


export const updateUserData = async (user) => {
    try {
        // Referencia al documento del usuario en Firestore
        const userDocRef = doc(database, `admin/data/users/${user.uid}`);
        if (!(typeof user.imageProfileUrl === 'object')) {
            user.imageProfileUrl
            const updatedData = {
                imageProfileUrl: user.imageProfileUrl,
                name: user.name.trim().toLocaleLowerCase(),
                lastname: user.lastname.trim().toLocaleLowerCase(),
                identification: user.identification || "",
                phone: user.phone || "", // Agrega el campo "phone"
                fb: user.fb || "", // Agrega el campo "fb"
                twitter: user.twitter || "", // Agrega el campo "twitter"
                linkedin: user.linkedin || "", // Agrega el campo "linkedin"
                webpage: user.webpage || "", // Agrega el campo "webpage"
            };

            // Actualiza los datos del usuario en Firestore con merge: true
            await setDoc(userDocRef, updatedData, { merge: true }).then(() => {
                const date = new Date();
                addProcessStatus({ process: "updateUserData", status: "success", date: date });
            });

        }
        if (typeof user.imageProfileUrl === 'object') {
            await uploadImageInDB(user.imageProfileUrl).then(async (imageProfileUrlInDB) => {
                const updatedData = {
                    imageProfileUrl: imageProfileUrlInDB,
                    name: user.name.trim().toLocaleLowerCase(),
                    lastname: user.lastname.trim().toLocaleLowerCase(),
                    identification: user.identification || "",
                    phone: user.phone || "", // Agrega el campo "phone"
                    fb: user.fb || "", // Agrega el campo "fb"
                    twitter: user.twitter || "", // Agrega el campo "twitter"
                    linkedin: user.linkedin || "", // Agrega el campo "linkedin"
                    webpage: user.webpage || "", // Agrega el campo "webpage"
                };

                // Actualiza los datos del usuario en Firestore con merge: true
                await setDoc(userDocRef, updatedData, { merge: true }).then(() => {
                    const date = new Date();
                    addProcessStatus({ process: "updateUserData", status: "success", date: date });
                });;

            }).then(() => {
                const date = new Date();
                addProcessStatus({ process: "updateUserData", status: "success", date: date });
            });
        }


        // Datos actualizados (incluye todos los campos)

    } catch (error) {
        console.error("Error al actualizar los datos del usuario:", error);
        const date = new Date();
        addProcessStatus({ process: "updateUserData", status: ("error:" + error), date: date });
    }
}

export const deleteMyAccount = async (uid) => {
    try {
        // Referencia al documento del usuario en Firestore
        const userDocRef = doc(database, `admin/data/users/${uid}`);

        // Datos actualizados (incluye todos los campos)
        const updatedData = {
            active: false
        };

        // Actualiza los datos del usuario en Firestore con merge: true
        await setDoc(userDocRef, updatedData, { merge: true }).then(() => {
            const date = new Date();
            addProcessStatus({ process: "deleteMyAccount", status: "success", date: date });
        });
    } catch (error) {
        console.error("Error al actualizar los datos del usuario:", error);
        const date = new Date();
        addProcessStatus({ process: "deleteMyAccount", status: ("error:" + error), date: date });
    }
}

export const sendResetEmailPassword = async (email) => {
    try {
        auth.languageCode = "es";
        var actionCodeSettings = {
            url: "http://localhost:5050/",
            handleCodeInApp: false,
        };
        await sendPasswordResetEmail(auth, email, actionCodeSettings).then(() => {
            const date = new Date();
            addProcessStatus({ process: "sendResetEmailPassword", status: "success", date: date });
        });
    } catch (error) {
        console.log(error);
        const date = new Date();
        addProcessStatus({ process: "sendResetEmailPassword", status: ("error:" + error), date: date });
    }
}

export const resetPassword = async (oobCode, newPassword) => {
    try {
        await confirmPasswordReset(auth, oobCode, newPassword).then(() => {
            const date = new Date();
            addProcessStatus({ process: "resetPassword", status: "success", date: date });
        })
    } catch (error) {
        const date = new Date();
        addProcessStatus({ process: "resetPassword", status: ("error:" + error), date: date });
        throw new Error("Error al confirmar el restablecimiento de contraseña. " + error.message);
    }
}

export const handleVerifyEmail = async (oobCode) => {
    applyActionCode(auth, oobCode)
}

export const updateEmailVerified = async (userUid) => {
    let exists = false;
    await fetch("/api/updateEmailVerified", {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userUid: userUid }),
    })
        .then((res) => {
            if (res.status === 200) {
                exists = true;
                return true;
            } else {
                exists = false;
                return false;
            }
        }).then(() => {
            const date = new Date();
            addProcessStatus({ process: "updateEmailVerified", status: "success", date: date });
        })
        .catch((error) => {
            const date = new Date();
            addProcessStatus({ process: "updateEmailVerified", status: ("error:" + error), date: date });
        });
    return exists;
};