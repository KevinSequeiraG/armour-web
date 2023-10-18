import { database } from "@/lib/firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const SaveCategory = async (category) => {
    try {
        const imageUrl = await uploadImageToFirebaseStorage(category.image)
        const categoriesTableRef = collection(database, `admin/data/categories`);

        const catToSave = { ...category, image: imageUrl }
        console.log("catToSave", catToSave)
        await addDoc(categoriesTableRef, catToSave).then(async () => {
            console.log("new category")
        });
    } catch (error) {
        console.error('Error al guardar el objeto en Firestore:', error);
    }
}

export const GetCategoriesByWebpage = async (webpageName) => {
    try {
        const categoriesTableRef = collection(database, `admin/data/categories`);
        const q = query(categoriesTableRef, where("webpageName", "==", webpageName))

        return await getDocs(q).then(response => {
            let finalData = []
            response.docs.map(category => {
                finalData.push({ ...category.data(), id: category.id })
            })
            return finalData;
        }
        );
    } catch (error) {
        console.error('Error al guardar el objeto en Firestore:', error);
    }
}

export const GetCategoryByUid = async (uid) => {
    try {
        const categoriesTableRef = doc(database, `admin/data/categories`, uid);
        return await getDoc(categoriesTableRef).then(category => {
            console.log(category.data())
            return category.data();
        })
    } catch (error) {
        console.error('Error al traer el objeto en Firestore:', error);
    }
}

export const EditCategoryByUid = async (uid, data) => {
    try {
        const categoriesTableRef = doc(database, `admin/data/categories`, uid);
        if (!data.image.includes("https://firebasestorage")) {
            const imageUrl = await uploadImageToFirebaseStorage(data.image)
            data.image = imageUrl
        }
        await setDoc(categoriesTableRef, data)
    } catch (error) {
        console.error('Error al guardar el objeto en Firestore:', error);
    }
}

export const DeleteCategoryByUid = async (uid) => {
    try {
        const categoriesTableRef = doc(database, `admin/data/categories`, uid);
        await deleteDoc(categoriesTableRef)
    } catch (error) {
        console.error('Error al guardar el objeto en Firestore:', error);
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

