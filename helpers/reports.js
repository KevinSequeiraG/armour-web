import { database, storage } from "@/lib/firebaseConfig";
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { GetWebpage } from "./webpage";
import { saveAs } from 'file-saver';
import { GetCategoryByUid } from "./categories";
import { GetProductByUid } from "./products";
import { ref, uploadString } from "firebase/storage";

export const increaseCounterForProductWatched = async (productUid) => {
    try {
        await GetProductByUid(productUid).then(async (product) => {
            const productsTableRef = doc(database, `admin/data/products`, productUid);
            const newCounter = product.watchedCounter ? (parseInt(product.watchedCounter) + 1) : 1
            await setDoc(productsTableRef, { watchedCounter: newCounter }, { merge: true }).then(() => {
                const date = new Date();
                addProcessStatus({ process: "increaseCounterForProductWatched", status: "success", date: date });
            })
        })
    } catch (error) {
        console.error(error);
        const date = new Date();
        addProcessStatus({ process: "increaseCounterForProductWatched", status: ("error:" + error), date: date });
    }
};

export const decreaseCounterForProductWatched = async (productUid) => {
    try {
        await GetProductByUid(productUid).then(async (product) => {
            const productsTableRef = doc(database, `admin/data/products`, productUid);
            const newCounter = product.watchedCounter ? (parseInt(product.watchedCounter) - 1) : 1
            await setDoc(productsTableRef, { watchedCounter: newCounter }, { merge: true }).then(() => {
                const date = new Date();
                addProcessStatus({ process: "decreaseCounterForProductWatched", status: "success", date: date });
            })
        })
    } catch (error) {
        console.error(error);
        const date = new Date();
        addProcessStatus({ process: "decreaseCounterForProductWatched", status: ("error:" + error), date: date });
    }
}

export const increaseCounterForCategoryWatched = async (categoryUid) => {
    try {
        await GetCategoryByUid(categoryUid).then(async (category) => {
            const categoryTableRef = doc(database, `admin/data/categories`, categoryUid);
            const newCounter = category.watchedCounter ? (parseInt(category.watchedCounter) + 1) : 1
            await setDoc(categoryTableRef, { watchedCounter: newCounter }, { merge: true }).then(() => {
                const date = new Date();
                addProcessStatus({ process: "increaseCounterForCategoryWatched", status: "success", date: date });
            })
        })
    } catch (error) {
        console.error(error);
        const date = new Date();
        addProcessStatus({ process: "increaseCounterForCategoryWatched", status: ("error:" + error), date: date });
    }
}

export const decreaseCounterForCategoryWatched = async (categoryUid) => {
    try {
        await GetCategoryByUid(categoryUid).then(async (category) => {
            const categoryTableRef = doc(database, `admin/data/categories`, categoryUid);
            const newCounter = category.watchedCounter ? (parseInt(category.watchedCounter) - 1) : 1
            await setDoc(categoryTableRef, { watchedCounter: newCounter }, { merge: true }).then(() => {
                const date = new Date();
                addProcessStatus({ process: "decreaseCounterForCategoryWatched", status: "success", date: date });
            })
        })
    } catch (error) {
        console.error(error);
        const date = new Date();
        addProcessStatus({ process: "decreaseCounterForCategoryWatched", status: ("error:" + error), date: date });
    }
}

export const increaseCounterForWebpageVisited = async (webpageName) => {
    try {
        await GetWebpage(webpageName).then(async (webpage) => {
            const webpageTableRef = doc(database, `admin/data/webpages`, webpageName);
            const newCounter = webpage.visitedCounter ? (parseInt(webpage.visitedCounter) + 1) : 1
            await setDoc(webpageTableRef, { visitedCounter: newCounter }, { merge: true }).then(() => {
                const date = new Date();
                addProcessStatus({ process: "increaseCounterForWebpageVisited", status: "success", date: date });
            })
        })
    } catch (error) {
        console.error(error);
        const date = new Date();
        addProcessStatus({ process: "increaseCounterForWebpageVisited", status: ("error:" + error), date: date });
    }
}

export const decreaseCounterForWebpageVisited = async (webpageName) => {
    try {
        await GetWebpage(webpageName).then(async (webpage) => {
            const webpageTableRef = doc(database, `admin/data/webpages`, webpageName);
            const newCounter = webpage.visitedCounter ? (parseInt(webpage.visitedCounter) - 1) : 1
            await setDoc(webpageTableRef, { visitedCounter: newCounter }, { merge: true }).then(() => {
                const date = new Date();
                addProcessStatus({ process: "decreaseCounterForWebpageVisited", status: "success", date: date });
            })
        })
    } catch (error) {
        console.error(error);
        const date = new Date();
        addProcessStatus({ process: "decreaseCounterForWebpageVisited", status: ("error:" + error), date: date });
    }
}

export const addProcessStatus = async (process) => {
    try {
        const loggeUserUid = window.localStorage.getItem("memory_lu");
        const dataToSave = { ...process, userUid: loggeUserUid }
        const processesCollectionRef = collection(database, 'admin/data/processes');
        await addDoc(processesCollectionRef, dataToSave);
        console.log("Documento agregado correctamente a la colección 'processes'.");
    } catch (error) {
        console.error('Error al agregar el documento a Firestore:', error);
        // Manejar el error de acuerdo a tus requerimientos
    }
}

export const downloadTableData = async (tableName) => {
    try {
        const tableRef = collection(database, `admin/data/${tableName}`);
        const querySnapshot = await getDocs(tableRef);

        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), uid: doc.id });
        });

        // Convierte los datos en formato JSON
        const jsonData = JSON.stringify(data);

        // Crea un Blob con los datos y lo descarga como un archivo JSON
        const blob = new Blob([jsonData], { type: "application/json" });
        saveAs(blob, `${tableName+" - ArmourWeb"}.json`);
    } catch (error) {
        console.error('Error al descargar la tabla:', error);
        // Maneja el error según tus necesidades
    }
};

export const uploadJsonToFirestore = async (tableName, jsonData) => {
    try {
        const tableRef = collection(database, `admin/data/${tableName}`);

        // Agregar nuevos documentos desde el archivo JSON
        for (const data of jsonData) {
            // Utiliza el campo 'uid' como identificador del documento si está presente
            const documentUid = data.uid;
            const documentRef = documentUid ? doc(tableRef, documentUid) : doc(tableRef);

            // Verificar la existencia del documento antes de agregarlo
            const documentSnapshot = await getDoc(documentRef);

            if (!documentSnapshot.exists()) {
                // Agregar el documento solo si no existe
                await setDoc(documentRef, data, { merge: true });
                console.log(`Documento con uid '${documentUid}' agregado en la colección '${tableName}'.`);
            } else {
                console.log(`Documento con uid '${documentUid}' ya existe en la colección '${tableName}', se ha ignorado.`);
            }
        }

        console.log(`Datos cargados exitosamente en la colección '${tableName}'.`);
    } catch (error) {
        console.error(`Error al cargar datos en la colección '${tableName}':`, error);
        throw error;
    }
};