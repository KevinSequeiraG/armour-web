import { database } from "@/lib/firebaseConfig";
import { collection, doc, getDoc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addProcessStatus } from "./reports";

export const GetWebpage = async (webpageName) => {
    try {
        const collectionRef = collection(database, "admin/data/webpages"); // Obtener una referencia a la colección
        const docRef = doc(collectionRef, webpageName); // Construir la referencia al documento
        const docSnap = await getDoc(docRef).then(() => {
            const date = new Date();
            addProcessStatus({ process: "GetWebpage", status: "success", date: date });
        });

        if (docSnap.exists()) {
            const data = docSnap.data();
            return data;
        }
    } catch (error) {
        console.error("Error al obtener el documento:", error);
        const date = new Date();
        addProcessStatus({ process: "GetWebpage", status: ("error:" + error), date: date });
    }
}

export const getAllWebpages = async () => {
    try {
        const collectionRef = collection(database, "admin/data/webpages"); // Obtener una referencia a la colección
        const q = query(collectionRef); // Obtener todos los documentos de la colección
        const querySnapshot = await getDocs(q).then(() => {
            const date = new Date();
            addProcessStatus({ process: "getAllWebpages", status: "success", date: date });
        }); // Obtener el snapshot de la consulta

        const webpages = [];
        querySnapshot.forEach((doc) => {
            webpages.push(doc.data());
        });

        return webpages;
    } catch (error) {
        console.error("Error al obtener los documentos:", error);
        const date = new Date();
        addProcessStatus({ process: "getAllWebpages", status: ("error:" + error), date: date });
        return []; // Devolver un array vacío en caso de error
    }
};

export const GetWebpagesByCreatedBy = async (userUid) => {
    try {
        const collectionRef = collection(database, "admin/data/webpages"); // Obtener una referencia a la colección
        const q = query(
            collectionRef,
            where("createdBy", "==", userUid),
            where("active", "==", true),
            orderBy("createdAt", "desc")
        ); // Construir la referencia al documento
        return await getDocs(q).then(response => {
            const resp = []
            response.docs.map(data => {
                resp.push(data.data())
            })
            return resp;
        }).then(() => {
            const date = new Date();
            addProcessStatus({ process: "GetWebpagesByCreatedBy", status: "success", date: date });
        });
    } catch (error) {
        const date = new Date();
        addProcessStatus({ process: "GetWebpagesByCreatedBy", status: ("error:" + error), date: date });
        console.error("Error al obtener el documento:", error);
    }
}

//Coverts imageUrl to blob
const uploadImageToFirebaseStorage = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `images/${Date.now()}.png`);
    await uploadBytes(storageRef, blob);

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
};

//update all images url's in firebase storage url's
const processAndUploadWebPageImages = async (webPageData) => {
    const newWebPageData = { ...webPageData };

    if (!newWebPageData?.createdAt) newWebPageData.createdAt = new Date();

    newWebPageData.active = true;

    if (webPageData?.logo?.includes("https://firebasestorage")) {
        newWebPageData.logo = webPageData?.logo;
    } else {
        newWebPageData.logo = webPageData?.logo ? await uploadImageToFirebaseStorage(webPageData?.logo) : "";
    }

    if (webPageData?.navbar?.backgroundImage && webPageData?.navbar?.backgroundImage?.includes("https://firebasestorage")) {
        newWebPageData.navbar.backgroundImage = webPageData?.navbar?.backgroundImage;
    } else {
        newWebPageData.navbar.backgroundImage = webPageData?.navbar?.backgroundImage && webPageData?.navbar?.backgroundImage.length > 10 ? await uploadImageToFirebaseStorage(webPageData?.navbar?.backgroundImage) : "";
    }

    newWebPageData.pages = await Promise.all(
        webPageData?.pages?.map(async (page) => {
            return {
                ...page,
                bgImage: page?.bgImage ? page?.bgImage?.includes("https://firebasestorage") ? page?.bgImage : await uploadImageToFirebaseStorage(page?.bgImage) : "",
                sections: await Promise.all(
                    page?.sections?.map(async (section) => {
                        if (section?.type === 'image')
                            return { ...section, imageUrl: section?.imageUrl ? section?.imageUrl?.includes("https://firebasestorage") ? section?.imageUrl : await uploadImageToFirebaseStorage(section?.imageUrl) : "" };

                        return section;
                    })
                )
            };
        })
    );

    return newWebPageData;
};

export const SaveWebPage = async (webPageData, loggedUserUid) => {
    try {
        const dataToSave = { ...webPageData, createdBy: loggedUserUid }
        const updatedWebPageData = await processAndUploadWebPageImages(dataToSave);
        const usersTableRef = doc(database, `admin/data/webpages/${webPageData?.pageUrl}`);
        await setDoc(usersTableRef, updatedWebPageData, { merge: true }).then(async () => {
            console.log("listo")
        }).then(() => {
            const date = new Date();
            addProcessStatus({ process: "SaveWebPage", status: "success", date: date });
        });
    } catch (error) {
        const date = new Date();
        addProcessStatus({ process: "SaveWebPage", status: ("error:" + error), date: date });
        console.error('Error al guardar el objeto en Firestore:', error);
    }
};

export const GetWebpageExists = async (webpageName) => {
    try {
        const collectionRef = collection(database, "admin/data/webpages");
        const docRef = doc(collectionRef, webpageName);
        const docSnap = await getDoc(docRef).then(() => {
            const date = new Date();
            addProcessStatus({ process: "GetWebpageExists", status: "success", date: date });
        });

        return docSnap.exists()
    } catch (error) {
        const date = new Date();
        addProcessStatus({ process: "GetWebpageExists", status: ("error:" + error), date: date });
        console.error("Error al obtener el documento:", error);
    }
}

export const deleteWebpage = async (uid) => {
    try {
        const userDocRef = doc(database, `admin/data/webpages/${uid}`);

        const updatedData = { active: false };

        await setDoc(userDocRef, updatedData, { merge: true }).then(() => {
            const date = new Date();
            addProcessStatus({ process: "deleteWebpage", status: "success", date: date });
        });
    } catch (error) {
        const date = new Date();
        addProcessStatus({ process: "deleteWebpage", status: ("error:" + error), date: date });
        console.error("Error al actualizar los datos del usuario:", error);
    }
}