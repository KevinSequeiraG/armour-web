import { database } from "@/lib/firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const SaveProduct = async (product) => {
    try {
        const imageUrl = product?.image ? await uploadImageToFirebaseStorage(product.image) : "";
        const productsTableRef = collection(database, `admin/data/products`);

        const catToSave = { ...product, image: imageUrl }
        await addDoc(productsTableRef, catToSave)
    } catch (error) {
        console.error('Error al guardar el objeto en Firestore:', error);
    }
}

export const GetProductsByWebpage = async (webpageName) => {
    try {
        const productsTableRef = collection(database, `admin/data/products`);
        const q = query(productsTableRef, where("webpageName", "==", webpageName), orderBy("createdAt", "desc"))

        return await getDocs(q).then(response => {
            let finalData = []
            response.docs.map(product => {
                finalData.push({ ...product.data(), id: product.id })
            })
            return finalData;
        }
        );
    } catch (error) {
        console.error('Error al guardar el objeto en Firestore:', error);
    }
}

export const GetProductsByCatUid = async (uid) => {
    try {
        const productsTableRef = collection(database, `admin/data/products`);
        const q = query(productsTableRef, where("categoryId", "==", uid))

        return await getDocs(q).then(response => {
            let finalData = []
            response.docs.map(product => {
                finalData.push({ ...product.data(), id: product.id })
            })
            return finalData;
        }
        );
    } catch (error) {
        console.error('Error al guardar el objeto en Firestore:', error);
    }
}

export const GetProductByUid = async (uid) => {
    try {
        const productsTableRef = doc(database, `admin/data/products`, uid);
        return await getDoc(productsTableRef).then(response => {
            return response.data()
        }
        );
    } catch (error) {
        console.error('Error al guardar el objeto en Firestore:', error);
    }
}

export const EditProductByUid = async (uid, data) => {
    try {
        const productsTableRef = doc(database, `admin/data/products`, uid);
        if (!data.image.includes("https://firebasestorage")) {
            const imageUrl = data?.image ? await uploadImageToFirebaseStorage(data.image) : ""
            data.image = imageUrl
        }
        await setDoc(productsTableRef, data, { merge: true })
    } catch (error) {
        console.error('Error al guardar el objeto en Firestore:', error);
    }
}

export const DeleteProductByUid = async (uid) => {
    try {
        const productsTableRef = doc(database, `admin/data/products`, uid);
        await deleteDoc(productsTableRef)
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

