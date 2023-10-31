const { GetCategoryByUid } = require("./categories");
const { GetProductByUid } = require("./products");
import { database } from "@/lib/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { GetWebpage } from "./webpage";

export const increaseCounterForProductWatched = async (productUid) => {
    try {
        await GetProductByUid(productUid).then(async (product) => {
            const productsTableRef = doc(database, `admin/data/products`, productUid);
            const newCounter = product.watchedCounter ? (parseInt(product.watchedCounter) + 1) : 1
            await setDoc(productsTableRef, { watchedCounter: newCounter }, { merge: true })
        })
    } catch (error) {
        console.error(error);
    }
};

export const decreaseCounterForProductWatched = async (productUid) => {
    try {
        await GetProductByUid(productUid).then(async (product) => {
            const productsTableRef = doc(database, `admin/data/products`, productUid);
            const newCounter = product.watchedCounter ? (parseInt(product.watchedCounter) - 1) : 1
            await setDoc(productsTableRef, { watchedCounter: newCounter }, { merge: true })
        })
    } catch (error) {
        console.error(error);
    }
}

export const increaseCounterForCategoryWatched = async (categoryUid) => {
    try {
        await GetCategoryByUid(categoryUid).then(async (category) => {
            const categoryTableRef = doc(database, `admin/data/categories`, categoryUid);
            const newCounter = category.watchedCounter ? (parseInt(category.watchedCounter) + 1) : 1
            await setDoc(categoryTableRef, { watchedCounter: newCounter }, { merge: true })
        })
    } catch (error) {
        console.error(error);
    }
}

export const decreaseCounterForCategoryWatched = async (categoryUid) => {
    try {
        await GetCategoryByUid(categoryUid).then(async (category) => {
            const categoryTableRef = doc(database, `admin/data/categories`, categoryUid);
            const newCounter = category.watchedCounter ? (parseInt(category.watchedCounter) - 1) : 1
            await setDoc(categoryTableRef, { watchedCounter: newCounter }, { merge: true })
        })
    } catch (error) {
        console.error(error);
    }
}

export const increaseCounterForWebpageVisited = async (webpageName) => {
    try {
        await GetWebpage(webpageName).then(async (webpage) => {
            const webpageTableRef = doc(database, `admin/data/webpages`, webpageName);
            const newCounter = webpage.visitedCounter ? (parseInt(webpage.visitedCounter) + 1) : 1
            await setDoc(webpageTableRef, { visitedCounter: newCounter }, { merge: true })
        })
    } catch (error) {
        console.error(error);
    }
}

export const decreaseCounterForWebpageVisited = async (webpageName) => {
    try {
        await GetWebpage(webpageName).then(async (webpage) => {
            const webpageTableRef = doc(database, `admin/data/webpages`, webpageName);
            const newCounter = webpage.visitedCounter ? (parseInt(webpage.visitedCounter) - 1) : 1
            await setDoc(webpageTableRef, { visitedCounter: newCounter }, { merge: true })
        })
    } catch (error) {
        console.error(error);
    }
}