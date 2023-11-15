import { UserContext } from "@/context/UserContext";
import { GetCategoriesByWebpage } from "@/helpers/categories";
import { GetProductsByWebpage } from "@/helpers/products";
import { GetWebpagesByCreatedBy } from "@/helpers/webpage";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ProductAndCategories = () => {
    const { t } = useTranslation();
    const { loggedUser } = useContext(UserContext);
    const [webpagesData, setWebpagesData] = useState();
    const [pageSelected, setPageSelected] = useState();
    const [prodsDataToShow, setprodsDataToShow] = useState();
    const [mostVisitedProduct, setMostVisitedProduct] = useState();
    const [catsDataToShow, setCatsDataToShow] = useState();
    const [mostVisitedCategory, setMostVisitedCategory] = useState();

    async function downloadExcel() {
        // Tus datos como un array de objetos
        const data = [];
        const data2 = [];
        let fileName = '';
        fileName = "Reporte de usuarios"
        prodsDataToShow.map((prod) => {
            data.push({
                Nombre: prod.name,
                Contador: prod.watchedCounter
            });
        });

        catsDataToShow.map((cat) => {
            data2.push({
                Nombre: cat.name,
                Contador: cat.watchedCounter
            });
        });

        // Enviar solicitud POST a la ruta API
        const response = await fetch("/api/exportExcel", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // Convertir tus datos a JSON
        });

        if (response.status === 200) {
            // Recibir la respuesta y crear una URL para descargar el archivo
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = `${fileName}.xlsx`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } else {
            console.error("No se pudo descargar el archivo Excel.");
        }

        const response2 = await fetch("/api/exportExcel", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data2), // Convertir tus datos a JSON
        });

        if (response2.status === 200) {
            // Recibir la respuesta y crear una URL para descargar el archivo
            const blob = await response2.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = `${fileName}.xlsx`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } else {
            console.error("No se pudo descargar el archivo Excel.");
        }
    }

    useEffect(() => {
        GetWebpagesByCreatedBy(loggedUser?.uid).then(webpages => {
            setWebpagesData(webpages);
        })
    }, [loggedUser])

    useEffect(() => {
        if (pageSelected !== undefined) {
            GetProductsByWebpage(pageSelected).then(data => {
                setprodsDataToShow(data);
                if (data.length > 0) {
                    console.log(data)
                    const productWithMaxCounter = data.reduce((prev, current) => {
                        if (current.watchedCounter) {
                            return (prev.watchedCounter > current.watchedCounter) ? prev : current;
                        }
                    });
                    console.log(productWithMaxCounter)
                    setMostVisitedProduct(productWithMaxCounter);
                }
            })


            GetCategoriesByWebpage(pageSelected).then(data => {
                setCatsDataToShow(data);
                if (data.length > 0) {
                    const categoryWithMaxCounter = data.reduce((prev, current) => {
                        if (current.watchedCounter) {
                            return (prev.watchedCounter > current.watchedCounter) ? prev : current;
                        }
                    });
                    setMostVisitedCategory(categoryWithMaxCounter);
                }
            })
        }
    }, [pageSelected])


    return (
        <div className="w-full h-[calc(100vh - 20vh)] overflow-auto">
            <Head>
                <title>{t("navbar.reports")} | ArmourWeb</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/images/awLogo-nobg.png" />
            </Head>
            <p className="ml-16 mt-10 mb-3 font-bold text-2xl">{t("navbar.products-and-categories")}</p>
            <select className="ml-16 shadow border w-[20rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 rounded-[10px]" value={pageSelected} onChange={(e) => { setPageSelected(e.target.value) }}>
                <option value="None">{t("reports.select-page")}</option>
                {webpagesData?.map((webpage, i) => {
                    return (<option key={i} value={webpage?.pageUrl}>{webpage?.name}</option>)
                })}
            </select>
            <div className="flex justify-center mt-10"><button className="mx-auto w-[10rem] bg-green-500 text-white rounded-xl py-2 px-2" onClick={downloadExcel}>Descargar información</button></div>

            <div className="flex mx-auto max-w-min mt-16">
                <div className="mr-16 border border-1 border-gray-400 px-4 py-4 rounded-[10px] shadow-md min-w-[20rem]">
                    <p className="mb-4 text-center font-bold text-lg">{t("reports.products")}</p>
                    {prodsDataToShow?.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200 border border-1 border-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t("reports.name")}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t("reports.counter")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {prodsDataToShow.map((item, index) => (
                                    <tr key={"prod" + index}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{item.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{item.watchedCounter ? item.watchedCounter : 0}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center">{t("reports.no-prods")}</div>
                    )}
                    <p className="mt-6 text-center">{t("reports.most-consulted-prod")}: <span className="font-bold">{mostVisitedProduct ? mostVisitedProduct.name : ""}</span></p>
                </div>
                <div className="ml-16 border border-1 border-gray-400 px-4 py-4 rounded-[10px] shadow-md min-w-[20rem]">
                    <p className="mb-4 text-center font-bold text-lg">{t("reports.categories")}</p>
                    {catsDataToShow?.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200 border border-1 border-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t("reports.name")}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t("reports.counter")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {catsDataToShow.map((item, index) => (
                                    <tr key={"cat" + index}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{item.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{item.watchedCounter ? item.watchedCounter : 0}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center">{t("reports.no-cats")}</div>
                    )}
                    
                    <p className="mt-6 text-center">{t("reports.most-consulted-cars")}: <span className="font-bold">{mostVisitedCategory ? mostVisitedCategory.name : ""}</span></p>
                </div>
            </div>
        </div>
    )
}

export default ProductAndCategories;