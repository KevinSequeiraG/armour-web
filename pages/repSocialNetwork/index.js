import SocialMediaReportCard from "@/components/Cards/SocialMediaReportCards";
import { UserContext } from "@/context/UserContext";
import { GetWebpagesByCreatedBy } from "@/helpers/webpage";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const SocialNetwork = () => {
    const { t } = useTranslation();
    const { loggedUser } = useContext(UserContext);
    const [webpagesData, setWebpagesData] = useState([]);
    const [pageSelected, setPageSelected] = useState();
    const [pageToShow, setPageToShow] = useState();

    async function downloadExcel() {
        if (!pageToShow) return;
        // Tus datos como un array de objetos
        const data = [];
        let fileName = '';
        fileName = t("reports.report-socialnetwork")

        data.push({
            Facebook: pageToShow.totalFacebookRedirects,
            Instagram: pageToShow.totalInstagramRedirects,
            X: pageToShow.totalTwitterRedirects,
            LinkedIn: pageToShow.totalLinkedInRedirects,
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
            GetWebpagesByCreatedBy(loggedUser?.uid).then(webpages => {
                setWebpagesData(webpages);
                setPageSelected(webpages[0]?.pageUrl)
            })
        }
    }, [loggedUser])

    useEffect(() => {
        if (pageSelected !== undefined) {
            setPageToShow(webpagesData.find(page => page.pageUrl === pageSelected))
        }
    }, [pageSelected])

    return (
        <div className="">
            <Head>
                <title>{t("navbar.reports")} | ArmourWeb</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/images/awLogo-nobg.png" />
            </Head>
            <p className="ml-16 mt-10 mb-3 font-bold text-2xl">{t("navbar.interactions-on-social-networks")}</p>
            <select className="ml-16 shadow border w-[20rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 rounded-[10px]" value={pageSelected} onChange={(e) => { setPageSelected(e.target.value) }}>
                <option value="None">{t("reports.select-page")}</option>
                {webpagesData?.map((webpage, i) => {
                    return (<option key={i} value={webpage?.pageUrl}>{webpage?.name}</option>)
                })}
            </select>
            <div className="flex justify-end"><button className="mr-8 bg-green-500 text-white rounded-[10px] shadow-md hover:bg-green-700 py-2 px-4" onClick={downloadExcel}>{t("reports.download-report")}</button></div>
            <p className="text-center text-[2rem] font-bold my-10">{pageToShow?.name}</p>
            <div className="grid grid-cols-4 mx-[8rem] justify-items-center gap-y-4">
                <SocialMediaReportCard cardType="Facebook" webpage={pageToShow} />
                <SocialMediaReportCard cardType="Instagram" webpage={pageToShow} />
                <SocialMediaReportCard cardType="X" webpage={pageToShow} />
                <SocialMediaReportCard cardType="LinkedIn" webpage={pageToShow} />
            </div>
        </div >
    )
}

export default SocialNetwork;