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
                lastName: newUser.lastName.trim().toLocaleLowerCase(),
                identification: "",
                email: newUser.email.trim().toLowerCase(),
                userType: "user",
                superAdmin: false,
                createdAt: todayDate,
                active: true
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

        // Datos actualizados (incluye solo los campos que deseas actualizar)
        const updatedData = {
            imageProfileUrl: user.imageProfileUrl || "", // Mantén los valores existentes o proporciona valores predeterminados si es necesario
            name: user.name.trim().toLocaleLowerCase(),
            lastName: user.lastName.trim().toLocaleLowerCase(),
            identification: user.identification || "",
            email: user.email.trim().toLowerCase(),
            userType: user.userType || "user", // Valor predeterminado si no se proporciona
            superAdmin: user.superAdmin || false, // Valor predeterminado si no se proporciona
            createdAt: user.createdAt || new Date(), // Fecha actual si no se proporciona
            active: user.active || true, // Valor predeterminado si no se proporciona
            // Agrega otros campos que desees actualizar
        };

        // Actualiza los datos del usuario en Firestore con merge: true
        await setDoc(userDocRef, updatedData, { merge: true });

        console.log("Datos de usuario actualizados con éxito");
    } catch (error) {
        console.error("Error al actualizar los datos del usuario:", error);
    }
}

