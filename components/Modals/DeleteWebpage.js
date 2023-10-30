import { UserContext } from "@/context/UserContext";
import { deleteWebpage } from "@/helpers/webpage";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';

const DeleteWebpage = ({ isOpen, setShowDeleteModal, webPageData }) => {
    const { loggedUser } = useContext(UserContext);
    if (!isOpen) return null;
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
            <div className="relative bg-gray-700 rounded-lg p-5 max-w-md mx-auto z-50 border-[.2rem] border-red-500">
                <p className="text-white font-bold text-[1.8rem] text-center">{t("deleteweb-modal.sure") +' "'+ webPageData?.name + '"?'}</p>
                <img className="w-[4rem] mx-auto mt-4" src="./svgs/alert.svg" />
                <p className="text-white font-bold text-[1.2rem] my-8 text-center">{t("deleteweb-modal.alert")}</p>
                <div className="flex">
                    <button onClick={() => setShowDeleteModal(false)} className="mx-auto cursor-pointer relative flex items-center justify-center w-[8rem] bg-red-500 border-2 border-gray-300 hover:bg-red-700 text-[1rem] text-center mt-3 py-2 px-4 rounded-xl text-gray-100">{t("buttons.cancel")}</button>
                    <button onClick={() => deleteWebpage(webPageData?.pageUrl).then(() => { toast.success(t("success.page-deleted")); })} className="mx-auto cursor-pointer relative flex items-center justify-center w-[8rem] bg-green-600 border-2 border-gray-300 hover:bg-green-700 text-[1rem] text-center mt-3 py-2 px-4 rounded-xl text-gray-100">{t("buttons.confirm")}</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteWebpage;