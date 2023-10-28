import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { BiCategoryAlt, BiPaint } from "react-icons/bi";
import { BsCart4 } from "react-icons/bs";

const WebPageCard = (props) => {
    const router = useRouter()
    const { t } = useTranslation();
    const handleEditPage = () => {
        window.localStorage.setItem("pageToEdit", JSON.stringify(props.webpageData));
        router.push("managePageBuilder");
    }

    return (
        <div className="w-[18rem] h-[24rem] bg-webPage-card border border-7 border-black rounded-[1.5rem] m-4 text-center py-4">
            <img src={props.webpageData?.logo ? props.webpageData?.logo : "./images/awLogo-nobg.png"} className="rounded-full w-[8rem] h-[8rem] mx-auto" />
            <p className="text-white font-bold text-lg mt-4">{props.webpageData?.name ? props.webpageData.name : "Nombre de la web"}</p>
            <div className="flex flex-col mt-5">
                <button onClick={handleEditPage} className="hover:bg-gray-800 text-white italic bg-black w-[10rem] mx-auto px-1 justify-center py-2 rounded-[10px] my-1 border border-white flex items-center"><BiPaint className="mr-1" />{t("home.personalize")}</button>
                <Link href={{
                    pathname: "/editCategories",
                    query: { webpageNameByRouter: props.webpageData?.pageUrl },
                }}
                    as={"/editCategories"}><button className="hover:bg-gray-800 text-white italic bg-black w-[10rem] mx-auto px-1 justify-center py-2 rounded-[10px] my-1 border border-white flex items-center"><BiCategoryAlt className="mr-1" />{t("home.my-categories")}</button></Link>
                <Link href={{
                    pathname: "/editProducts",
                    query: { webpageNameByRouter: props.webpageData?.pageUrl },
                }} as={"/editProducts"}><button className="hover:bg-gray-800 text-white italic bg-black w-[10rem] mx-auto px-1 justify-center py-2 rounded-[10px] my-1 border border-white flex items-center"><BsCart4 className="mr-1" />{t("home.my-products")}</button></Link>
            </div>
        </div>
    )
}

export default WebPageCard;