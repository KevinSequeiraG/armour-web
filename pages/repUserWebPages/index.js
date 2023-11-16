import { UserContext } from "@/context/UserContext";
import { GetWebpagesByCreatedBy } from "@/helpers/webpage";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const UserWebPages = () => {
    const { t } = useTranslation();
    const { loggedUser } = useContext(UserContext);
    const [webpageData, setWebpageData] = useState([]);

    const formatCreatedAt = (createdAt) => {
        const unixTime = createdAt.seconds;
        const milliseconds = createdAt.nanoseconds / 1000000;
        const date = new Date(unixTime * 1000 + milliseconds);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ajusta para que siempre tenga dos dígitos
        const day = date.getDate().toString().padStart(2, '0'); // Ajusta para que siempre tenga dos dígitos
        return `${day}-${month}-${year}`; // Formato YYYY-MM-DD
    };

    async function downloadExcel() {
        // Tus datos como un array de objetos
        const data = [];
        let fileName = '';
        fileName = "Reporte de usuarios"
        webpageData.map((webpage) => {
            data.push({
                Nombre: webpage.name,
                Contador: webpage.visitedCounter,
                FechaCreacion: formatCreatedAt(webpage.createdAt),
                URL: `https://armour-web.vercel.app/aw/${webpage.pageUrl}`,
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
    }

    useEffect(() => {
        if (loggedUser) {
            GetWebpagesByCreatedBy(loggedUser?.uid).then((data) => {
                setWebpageData(data)
            })
        }
    }, [loggedUser])

    return (
        <div className="">
            <Head>
                <title>{t("navbar.reports")} | ArmourWeb</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/images/awLogo-nobg.png" />
            </Head>
            <p className="font-bold text-2xl text-center mt-10">{t("navbar.pages-created")}</p>
            <div className="flex justify-end"><button className="mr-8 bg-green-500 text-white rounded-[10px] shadow-md hover:bg-green-700 py-2 px-4" onClick={downloadExcel}>{t("reports.download-report")}</button></div>
            <div className="container mt-8">
                <table className="mx-auto rounded-[10px] overflow-hidden shadow-md">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">{t("reports.webpagename")}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">{t("reports.link")}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Logo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">{t("reports.visitors")}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">{t("reports.creation-date")}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-center">
                        {webpageData.map((item, index) => (
                            <tr className="bg-gray-500 text-white" key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap mx-auto">
                                    <a href={`https://armour-web.vercel.app/aw/${item.pageUrl}`} target="_blank" rel="noopener noreferrer" className="text-white cursor-pointer hover:underline">
                                        https://armour-web.vercel.app/aw/{item.pageUrl}
                                    </a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.logo && <img src={item.logo} alt={item.name} className="h-8 w-8 object-contain	" />}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.visitedCounter ? item.visitedCounter : 0}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{formatCreatedAt(item.createdAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserWebPages;