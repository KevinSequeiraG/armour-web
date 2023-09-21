import { database } from "@/lib/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

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
            })
        return { userUid: userRecord, userExist: exists };
    } catch (error) {
        console.error("User no exist");
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
            });
            return;
        } else {
            console.log(res);
        }
        return;
    }).catch((er) => {
        console.log(er);
    });
}

export const updateUserData = async (user) => {
    try {
        // Referencia al documento del usuario en Firestore
        const userDocRef = doc(database, `admin/data/users/${user.uid}`);

        // Datos actualizados (incluye todos los campos)
        const updatedData = {
            imageProfileUrl: "",
            name: user.name.trim().toLocaleLowerCase(),
            lastname: user.lastname.trim().toLocaleLowerCase(),
            identification: "",
            phone: user.phone || "", // Agrega el campo "phone"
            fb: user.fb || "", // Agrega el campo "fb"
            twitter: user.twitter || "", // Agrega el campo "twitter"
            linkedin: user.linkedin || "", // Agrega el campo "linkedin"
            webpage: user.webpage || "", // Agrega el campo "webpage"
        };

        // Actualiza los datos del usuario en Firestore con merge: true
        await setDoc(userDocRef, updatedData, { merge: true });

        console.log("Datos de usuario actualizados con éxito");
    } catch (error) {
        console.error("Error al actualizar los datos del usuario:", error);
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
        await setDoc(userDocRef, updatedData, { merge: true });

        console.log("Datos de usuario actualizados con éxito");
    } catch (error) {
        console.error("Error al actualizar los datos del usuario:", error);
    }
}