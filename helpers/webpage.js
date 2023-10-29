import { database } from "@/lib/firebaseConfig";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const GetWebpage = async (webpageName) => {
    try {
        const collectionRef = collection(database, "admin/data/webpages"); // Obtener una referencia a la colección
        const docRef = doc(collectionRef, webpageName); // Construir la referencia al documento
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return data;
        }
    } catch (error) {
        console.error("Error al obtener el documento:", error);
    }
}

export const GetWebpagesByCreatedBy = async (userUid) => {
    try {
        const collectionRef = collection(database, "admin/data/webpages"); // Obtener una referencia a la colección
        const q = query(
            collectionRef,
            where("createdBy", "==", userUid)
        ); // Construir la referencia al documento
        return await getDocs(q).then(response => {
            const resp = []
            response.docs.map(data => {
                resp.push(data.data())
            })
            return resp;
        });
    } catch (error) {
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

    newWebPageData.createdAt = new Date();

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
        console.log(webPageData)
        const dataToSave = { ...webPageData, createdBy: loggedUserUid }
        const updatedWebPageData = await processAndUploadWebPageImages(dataToSave);
        const usersTableRef = doc(database, `admin/data/webpages/${webPageData?.pageUrl}`);
        await setDoc(usersTableRef, updatedWebPageData, { merge: true }).then(async () => {
            console.log("listo")
        });
        console.log('Objeto guardado exitosamente en Firestore');
    } catch (error) {
        console.error('Error al guardar el objeto en Firestore:', error);
    }
};

export const GetWebpageExists = async (webpageName) => {
    try {
        const collectionRef = collection(database, "admin/data/webpages");
        const docRef = doc(collectionRef, webpageName);
        const docSnap = await getDoc(docRef);

        return docSnap.exists()
    } catch (error) {
        console.error("Error al obtener el documento:", error);
    }
}