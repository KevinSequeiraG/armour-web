import { database } from "@/lib/firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addProcessStatus } from "./reports";

export const SaveProduct = async (product) => {
    try {
        const imageUrl = product?.image ? await uploadImageToFirebaseStorage(product.image) : "";
        const productsTableRef = collection(database, `admin/data/products`);

        const catToSave = { ...product, image: imageUrl }
        await addDoc(productsTableRef, catToSave).then(() => {
            const date = new Date();
            addProcessStatus({ process: "SaveProduct", status: "success", date: date });
        })
    } catch (error) {
        console.error('Error al guardar el objeto en Firestore:', error);
        const date = new Date();
        addProcessStatus({ process: "SaveProduct", status: ("error:" + error), date: date });
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
        ).then(() => {
            const date = new Date();
            addProcessStatus({ process: "GetProductsByWebpage", status: "success", date: date });
        });
    } catch (error) {
        console.error('Error al guardar el objeto en Firestore:', error);
        const date = new Date();
        addProcessStatus({ process: "GetProductsByWebpage", status: ("error:" + error), date: date });
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
        ).then(() => {
            const date = new Date();
            addProcessStatus({ process: "GetProductsByCatUid", status: "success", date: date });
        });
    } catch (error) {
        console.error('Error al guardar el objeto en Firestore:', error);
        const date = new Date();
        addProcessStatus({ process: "GetProductsByCatUid", status: ("error:" + error), date: date });
    }
}

export const GetProductByUid = async (uid) => {
    try {
        const productsTableRef = doc(database, `admin/data/products`, uid);
        return await getDoc(productsTableRef).then(response => {
            return response.data()
        }
        ).then(() => {
            const date = new Date();
            addProcessStatus({ process: "GetProductByUid", status: "success", date: date });
        });
    } catch (error) {
        console.error('Error al guardar el objeto en Firestore:', error);
        const date = new Date();
        addProcessStatus({ process: "GetProductByUid", status: ("error:" + error), date: date });
    }
}

export const EditProductByUid = async (uid, data) => {
    try {
        const productsTableRef = doc(database, `admin/data/products`, uid);
        if (!data.image.includes("https://firebasestorage")) {
            const imageUrl = data?.image ? await uploadImageToFirebaseStorage(data.image) : ""
            data.image = imageUrl
        }
        await setDoc(productsTableRef, data, { merge: true }).then(() => {
            const date = new Date();
            addProcessStatus({ process: "EditProductByUid", status: "success", date: date });
        })
    } catch (error) {
        console.error('Error al guardar el objeto en Firestore:', error);
        const date = new Date();
        addProcessStatus({ process: "EditProductByUid", status: ("error:" + error), date: date });
    }
}

export const DeleteProductByUid = async (uid) => {
    try {
        const productsTableRef = doc(database, `admin/data/products`, uid);
        await deleteDoc(productsTableRef).then(() => {
            const date = new Date();
            addProcessStatus({ process: "DeleteProductByUid", status: "success", date: date });
        })
    } catch (error) {
        console.error('Error al guardar el objeto en Firestore:', error);
        const date = new Date();
        addProcessStatus({ process: "DeleteProductByUid", status: ("error:" + error), date: date });
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

