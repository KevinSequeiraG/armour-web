import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { BiCategoryAlt, BiPaint, BiShareAlt, BiTrash } from "react-icons/bi";
import { BsCart4 } from "react-icons/bs";
import ShareWebPage from "../Modals/ShareWebPage";
import { useState } from "react";

const WebPageCard = (props) => {
    const router = useRouter()
    const { t } = useTranslation();
    const [showShareModal, setShowShareModal] = useState(false);
    const handleEditPage = () => {
        window.localStorage.setItem("pageToEdit", JSON.stringify(props?.webpageData));
        router.push("managePageBuilder");
    }

    return (
        <div className="w-full bg-webPage-card h-min border border-7 border-black rounded-[1.5rem] m-4 text-center py-6 relative">
            <BiShareAlt className="absolute left-3 top-3 w-7 h-7 text-white cursor-pointer hover:text-gray-200" onClick={() => { setShowShareModal(true) }} />
            <BiTrash className="absolute top-3 right-3 w-7 h-7 text-red-400 cursor-pointer hover:text-red-500" />
            <img src={props.webpageData?.logo ? props.webpageData?.logo : "./images/awLogo-nobg.png"} className="rounded-full w-[8rem] h-[8rem] mx-auto" />
            <p className="text-white font-bold text-lg mt-4">{props.webpageData?.name ? props.webpageData.name : "Nombre de la web"}</p>
            <div className="flex flex-col mt-5">
                <button onClick={handleEditPage} className="hover:bg-gray-800 text-white italic bg-black w-[10rem] mx-auto px-1 justify-center py-2 rounded-[10px] my-1 border border-white flex items-center"><BiPaint className="mr-1" />{t("home.personalize")}</button>
                <Link className="w-min mx-auto" href={{
                    pathname: "/editCategories",
                    query: { webpageNameByRouter: props.webpageData?.pageUrl },
                }}
                    as={"/editCategories"}><button className="hover:bg-gray-800 text-white italic bg-black w-[10rem] mx-auto px-1 justify-center py-2 rounded-[10px] my-1 border border-white flex items-center"><BiCategoryAlt className="mr-1" />{t("home.my-categories")}</button></Link>
                <Link className="w-min mx-auto" href={{
                    pathname: "/editProducts",
                    query: { webpageNameByRouter: props.webpageData?.pageUrl },
                }} as={"/editProducts"}><button className="hover:bg-gray-800 text-white italic bg-black w-[10rem] mx-auto px-1 justify-center py-2 rounded-[10px] my-1 border border-white flex items-center"><BsCart4 className="mr-1" />{t("home.my-products")}</button></Link>
            </div>
            {showShareModal && <ShareWebPage setShowShareModal={setShowShareModal} isOpen={showShareModal} webPageData={props.webpageData} />}
        </div>
    )
}

export default WebPageCard;