import { database } from "@/lib/firebaseConfig";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const GetWebpage = async (webpageName) => {
    try {
        const collectionRef = collection(database, "admin/data/webpages"); // Obtener una referencia a la colección
        const docRef = doc(collectionRef, webpageName); // Construir la referencia al documento
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("Datos del documento:", data);
            return data;
        } else {
            console.log("El documento no existe.");
        }
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

    newWebPageData.logo = webPageData?.logo ? await uploadImageToFirebaseStorage(webPageData?.logo) : "";

    newWebPageData.navbar.backgroundImage = webPageData?.navbar?.backgroundImage?.length > 10 ? await uploadImageToFirebaseStorage(webPageData?.navbar?.backgroundImage) : "";

    newWebPageData.pages = await Promise.all(
        webPageData?.pages?.map(async (page) => {
            return {
                ...page,
                bgImage: page?.bgImage ? await uploadImageToFirebaseStorage(page?.bgImage) : "",
                sections: await Promise.all(
                    page?.sections?.map(async (section) => {
                        if (section?.type === 'image')
                            return { ...section, imageUrl: section?.imageUrl ? await uploadImageToFirebaseStorage(section?.imageUrl) : "" };

                        return section;
                    })
                )
            };
        })
    );

    return newWebPageData;
};

export const SaveWebPage = async (webPageData) => {
    try {
        const updatedWebPageData = await processAndUploadWebPageImages(webPageData);

        const usersTableRef = doc(database, `admin/data/webpages/${webPageData?.name}`);
        await setDoc(usersTableRef, updatedWebPageData).then(async () => {
            console.log("listo")
        });
        console.log('Objeto guardado exitosamente en Firestore');
    } catch (error) {
        console.error('Error al guardar el objeto en Firestore:', error);
    }
};