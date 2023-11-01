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
        const querySnapshot = await getDocs(query(productsTableRef, where("webpageName", "==", webpageName), orderBy("createdAt", "desc")));

        const finalData = querySnapshot.docs.map(product => ({ ...product.data(), id: product.id }));

        const date = new Date();
        addProcessStatus({ process: "GetProductsByWebpage", status: "success", date: date });

        return finalData;
    } catch (error) {
        console.error('Error al obtener productos desde Firestore:', error);

        const date = new Date();
        addProcessStatus({ process: "GetProductsByWebpage", status: "error: " + error, date: date });

        throw error; // Asegúrate de lanzar el error para que sea manejado externamente si es necesario.
    }
}

export const GetProductsByCatUid = async (uid) => {
    try {
        const productsTableRef = collection(database, `admin/data/products`);
        const querySnapshot = await getDocs(query(productsTableRef, where("categoryId", "==", uid)));

        const finalData = querySnapshot.docs.map(product => ({ ...product.data(), id: product.id }));

        const date = new Date();
        addProcessStatus({ process: "GetProductsByCatUid", status: "success", date: date });

        return finalData;
    } catch (error) {
        console.error('Error al obtener productos por categoría desde Firestore:', error);

        const date = new Date();
        addProcessStatus({ process: "GetProductsByCatUid", status: "error: " + error, date: date });

        throw error; // Asegúrate de lanzar el error para que sea manejado externamente si es necesario.
    }
}

export const GetProductByUid = async (uid) => {
    try {
        const productsTableRef = doc(database, `admin/data/products`, uid);
        const productSnapshot = await getDoc(productsTableRef);

        if (productSnapshot.exists()) {
            const productData = productSnapshot.data();

            const date = new Date();
            addProcessStatus({ process: "GetProductByUid", status: "success", date: date });

            return productData;
        } else {
            throw new Error("No existe el producto con el UID proporcionado");
        }
    } catch (error) {
        console.error('Error al obtener el producto desde Firestore:', error);

        const date = new Date();
        addProcessStatus({ process: "GetProductByUid", status: "error: " + error, date: date });

        throw error; // Asegúrate de lanzar el error para que sea manejado externamente si es necesario.
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

