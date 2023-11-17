import html2canvas from "html2canvas";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import QRCode from "react-qr-code";

const ShareWebPage = ({ isOpen, setShowShareModal, webPageData }) => {
    if (!isOpen) return null;
    const { t } = useTranslation();
    const router = useRouter();
    const handleDownloadImageQR = async () => {
        const element = document.getElementById("QRCodeScaled");
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL("image/jpg");
        const link = document.createElement("a");
        link.href = data;
        link.download = "ArmourWebQR.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
            <div className="relative rounded-[10px] bg-white text-black p-5 w-auto min-w-[32rem] max-w-lg mx-auto z-50 border-[.2rem]">
                <p className="absolute right-1 top-1 text-lg font-bold cursor-pointer bg-red-400 px-3 py-1 text-white rounded-full" onClick={() => { setShowShareModal(false); router.push("/home") }}>X</p>
                <p className="font-bold text-[1.8rem] text-center">{t("share-modal.title")}</p>
                <p className="text-center w-4/5 mt-2 mx-auto">{t("share-modal.subtitle")}</p>
                <p className="text-[1.2rem] font-semibold pl-2 my-4">{t("share-modal.download-title")}</p>
                <div className="w-1/3 flex flex-col mx-auto items-center">
                    <div className="shadow-[0px_2px_8px_#00000032] w-min rounded-[10px]">
                        <div id="QRCodeScaled" className="w-min p-3">
                            <QRCode
                                size={150}
                                style={{ height: "auto", margin: "0 auto" }}
                                title="QR Code"
                                value={`https://armour-web-byi6.vercel.app/aw/${webPageData?.pageUrl}`}
                                viewBox={`0 0 200 200`}
                            />
                        </div>
                    </div>
                    <p onClick={() => handleDownloadImageQR()} className={`w-min truncate rounded-[5px] bg-[#C69434] cursor-pointer  hover:shadow-md mt-3 px-9 font-semibold text-center text-white py-1.5`}>{t("share-modal.download")}</p>
                </div>
                <p className="text-[1.2rem] pl-2 mt-4 font-semibold">{t("share-modal.your-link")}</p>
                <Link href={`https://armour-web-byi6.vercel.app/aw/${webPageData?.pageUrl}`} target="_blank"><p target="_blank" className="bg-[#f5f5f5] underline hover:text-blue-700 shadow-sm border px-3 py-2 truncate rounded-[10px] font-medium text-[1.2rem] text-start mt-1 mb-3">{`https://armour-web-byi6.vercel.app/aw/${webPageData?.pageUrl}`}</p></Link>

            </div>
        </div>
    );
}

export default ShareWebPage;