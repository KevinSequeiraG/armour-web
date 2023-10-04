import { database } from "@/lib/firebaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";

export const GetWebpage = async (webpageName) => {
    try {
        console.log(1)
        const collectionRef = collection(database, "admin/data/webpages"); // Obtener una referencia a la colección
        const docRef = doc(collectionRef, webpageName); // Construir la referencia al documento
        console.log(2)
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("Datos del documento:", data);
        } else {
            console.log("El documento no existe.");
        }
    } catch (error) {
        console.error("Error al obtener el documento:", error);
    }
}