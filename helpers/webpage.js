import { database } from "@/lib/firebaseConfig";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

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

export const SaveWebPage = async (webPageData) => {
    try {
        console.log("webPageData save", webPageData)

        const usersTableRef = doc(database, `admin/data/webpages/${webPageData.name}`);
        await setDoc(usersTableRef, webPageData).then(async () => {
            console.log("listo")
        });
        console.log('Objeto guardado exitosamente en Firestore');
    } catch (error) {
        console.error('Error al guardar el objeto en Firestore:', error);
    }
};