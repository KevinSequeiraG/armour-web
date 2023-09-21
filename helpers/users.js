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
            }).then(async () => {
                // sendFirstEmailToUser();
                // localStorage.setItem("mainEmail", mainEmail);
                // localStorage.setItem("identification", identification);
                // router.push("/preguntas");
            });
            return;
        } else{
            console.log(res);
        }
        return;
    }).catch((er) => {
        console.log(er);
    });
}
