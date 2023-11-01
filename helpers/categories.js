import { database } from "@/lib/firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addProcessStatus } from "./reports";

export const SaveCategory = async (category) => {
    try {
        const imageUrl = category?.image ? await uploadImageToFirebaseStorage(category?.image) : ""
        const categoriesTableRef = collection(database, `admin/data/categories`);

        const catToSave = { ...category, image: imageUrl }
        await addDoc(categoriesTableRef, catToSave).then(() => {
            const date = new Date();
            addProcessStatus({ process: "SaveCategory", status: "success", date: date });
        })
    } catch (error) {
        console.error('Error al guardar el objeto en Firestore:', error);
        const date = new Date();
        addProcessStatus({ process: "SaveCategory", status: ("error:" + error), date: date });
    }
}

export const GetCategoriesByWebpage = async (webpageName) => {
    try {
        const categoriesTableRef = collection(database, `admin/data/categories`);
        const q = query(categoriesTableRef, where("webpageName", "==", webpageName), orderBy("createdAt", "desc"));

        const response = await getDocs(q);
        const finalData = response.docs.map(category => ({ ...category.data(), id: category.id }));
        console.log("finalData", finalData);

        const date = new Date();
        addProcessStatus({ process: "GetCategoriesByWebpage", status: "success", date: date });
        return finalData;
    } catch (error) {
        console.error('Error al obtener categorías desde Firestore:', error);
        addProcessStatus({ process: "GetCategoriesByWebpage", status: ("error:" + error), date: date });
        throw error;
    }
}

export const GetCategoryByUid = async (uid) => {
    try {
        const categoriesTableRef = doc(database, `admin/data/categories`, uid);
        return await getDoc(categoriesTableRef).then(category => {
            return category.data();
        }).then(() => {
            const date = new Date();
            addProcessStatus({ process: "GetCategoryByUid", status: "success", date: date });
        })
    } catch (error) {
        console.error('Error al traer el objeto en Firestore:', error);
        const date = new Date();
        addProcessStatus({ process: "GetCategoryByUid", status: ("error:" + error), date: date });
    }
}

export const EditCategoryByUid = async (uid, data) => {
    try {
        const categoriesTableRef = doc(database, `admin/data/categories`, uid);
        if (!data.image.includes("https://firebasestorage")) {
            const imageUrl = data?.image ? await uploadImageToFirebaseStorage(data?.image) : ""
            data.image = imageUrl
        }
        await setDoc(categoriesTableRef, data, { merge: true }).then(() => {
            const date = new Date();
            addProcessStatus({ process: "EditCategoryByUid", status: "success", date: date });
        })
    } catch (error) {
        console.error('Error al guardar el objeto en Firestore:', error);
        const date = new Date();
        addProcessStatus({ process: "EditCategoryByUid", status: ("error:" + error), date: date });
    }
}

export const DeleteCategoryByUid = async (uid) => {
    try {
        const categoriesTableRef = doc(database, `admin/data/categories`, uid);
        await deleteDoc(categoriesTableRef).then(() => {
            const date = new Date();
            addProcessStatus({ process: "DeleteCategoryByUid", status: "success", date: date });
        })
    } catch (error) {
        console.error('Error al guardar el objeto en Firestore:', error);
        const date = new Date();
        addProcessStatus({ process: "DeleteCategoryByUid", status: ("error:" + error), date: date });
    }
}

const uploadImageToFirebaseStorage = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `images/${Date.now()}.png`);
    await uploadBytes(storageRef, blob);

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
};

