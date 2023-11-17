import { UserContext } from "@/context/UserContext";
import { getUserByUid } from "@/helpers/users";
import { getAllWebpages } from "@/helpers/webpage";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const AdminWebPages = () => {
    const { t } = useTranslation();
    const { loggedUser } = useContext(UserContext);
    const [webpageData, setWebpageData] = useState([]);
    const [webpageDataNoFilter, setWebpageDataNoFilter] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [clearFilter, setClearFilter] = useState(false);

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
        fileName = t("reports.report-general-pages")
        webpageData?.map((webpage) => {
            data.push({
                Nombre: webpage.name,
                Visitantes: webpage.visitedCounter,
                FechaCreacion: formatCreatedAt(webpage.createdAt),
                URL: webpage.pageUrl,
                Usuario: webpage.userName
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

    const getUserName = async (userId) => {
        try {
            const user = await getUserByUid(userId);
            return (user?.name + " " + user?.lastname)
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            return "Desconocido"; // En caso de error, regresa un valor predeterminado
        }
    };

    useEffect(() => {
        if (loggedUser) {
            setStartDate("");
            setEndDate("");
            getAllWebpages().then(async (data) => {
                const updatedData = await Promise.all(data.map(async (item) => {
                    const userName = await getUserName(item.createdBy);
                    return { ...item, userName };
                }));
                setWebpageData(updatedData);
                setWebpageDataNoFilter(updatedData)
            });
        }
    }, [loggedUser, clearFilter]);

    const applyDateFilter = () => {
        if (!startDate || !endDate) {
            toast.info("Debe seleccionar las fechas")
            return
        }

        const normalizeDate = (dateString) => {
            const [year, month, day] = dateString.split("-").map(num => parseInt(num, 10));
            // Crear una nueva fecha usando el constructor de Date que toma año, mes, día
            // Los meses en JavaScript son de 0 a 11, por lo que se resta 1 al mes
            const date = new Date(year, month - 1, day);
            date.setHours(0, 0, 0, 0); // Establece la hora a medianoche
            return date;
        };

        const normalizedStartDate = normalizeDate(startDate);
        const normalizedEndDate = normalizeDate(endDate);

        if (normalizedEndDate < normalizedStartDate) {
            toast.info("La fecha final debe ser mayor")
            return;
        };

        const filteredData = webpageDataNoFilter.filter(item => {
            const itemDateSeconds = item.createdAt.seconds;
            const itemDate = new Date(itemDateSeconds * 1000);
            itemDate.setHours(0, 0, 0, 0); // Normalizar la fecha de creación del elemento

            return itemDate >= normalizedStartDate && itemDate <= normalizedEndDate;
        });

        setWebpageData(filteredData);
    };

    return (
        <div className="">
            <Head>
                <title>{t("navbar.reports")} | ArmourWeb</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/images/awLogo-nobg.png" />
            </Head>
            <p className="font-bold text-2xl text-center mt-10">{t("navbar.pages-created")}</p>
            <div className="flex items-center justify-between mx-14 mt-8">
                <div className="space-x-5 flex items-end">

                    <div className="">
                        <p>{t("reports.report-start-date")}</p>
                        <input
                            className="bg-[#f5f5f5] py-2 px-3 rounded-[10px] border-2 border-[#E9E9E9] cursor-pointer"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>{t("reports.report-end-date")}</p>
                        <input
                            className="bg-[#f5f5f5] py-2 px-3 rounded-[10px] border-2 border-[#E9E9E9] cursor-pointer"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <button onClick={applyDateFilter} className="mb-1 bg-gray-600 text-white px-3 py-1 rounded-[5px] font-medium hover:bg-gray-500">{t("reports.report-filter")}</button>
                    <button onClick={() => setClearFilter(!clearFilter)} className="mb-1 bg-gray-500 text-white px-2 py-1 rounded-[5px] font-medium hover:bg-gray-400">{t("reports.report-clear-filter")}</button>
                </div>
                <div className="flex justify-end"><button className="bg-green-500 text-white rounded-[10px] shadow-md hover:bg-green-700 py-2 px-4" onClick={downloadExcel}>{t("reports.download-report")}</button></div>
            </div>
            <div className="container mt-10">

                <table className="mx-auto rounded-[10px] overflow-hidden shadow-md">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">{t("reports.created-by")}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">{t("reports.webpagename")}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">{t("reports.link")}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Logo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">{t("reports.visitors")}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">{t("reports.creation-date")}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {webpageData.map((item, index) => (
                            <tr className="bg-gray-500 text-white" key={index}>
                                <td className="px-6 py-4 whitespace-nowrap capitalize">{item.userName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap mx-auto">
                                    <a href={`https://armour-web-byi6.vercel.app/aw/${item.pageUrl}`} target="_blank" rel="noopener noreferrer" className="text-white cursor-pointer hover:underline">
                                        https://armour-web-byi6.vercel.app/aw/{item.pageUrl}
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

export default AdminWebPages;