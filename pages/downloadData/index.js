import { downloadTableData } from "@/helpers/reports"
import { useTranslation } from "react-i18next";

const DownloadData = () => {
    const { t } = useTranslation();
    return (
        <div>
            <p className="text-center mt-10 font-semibold text-[2rem]">{t("reports.download-data")}</p>
            <div className="text-center mt-10">
                <button onClick={() => { downloadTableData("categories") }} className="bg-red-700 px-4 py-2 mx-2 text-white rounded-xl">{t("reports.download-categories")}</button>
                <button onClick={() => { downloadTableData("processes") }} className="bg-red-700 px-4 py-2 mx-2 text-white rounded-xl">{t("reports.download-processes")}</button>
                <button onClick={() => { downloadTableData("products") }} className="bg-red-700 px-4 py-2 mx-2 text-white rounded-xl">{t("reports.download-products")}</button>
                <button onClick={() => { downloadTableData("users") }} className="bg-red-700 px-4 py-2 mx-2 text-white rounded-xl">{t("reports.download-users")}</button>
                <button onClick={() => { downloadTableData("webpages") }} className="bg-red-700 px-4 py-2 mx-2 text-white rounded-xl">{t("reports.download-webpages")}</button>
            </div>
        </div>
    )
}

export default DownloadData;