import { DeleteCategoryByUid } from "@/helpers/categories";
import { useTranslation } from "react-i18next";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const ConfirmDeleteCategory = (props) => {
    if (!props.isOpen) return null;
    const { t } = useTranslation();

    const handleConfirm = () => {
        DeleteCategoryByUid(props?.categoryId).then(() => {
            props.getCategories();
            toast.success(t("categories.crud-delete"));
            props.handleShow(false);
        })
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
            <div className="relative bg-white rounded-lg px-6 py-[3rem] mx-auto z-50 border-[.2rem] border-gray-500">

                <AiFillDelete className="h-8 text-red-500 text-center w-full mb-3" />
                <p className="text-[1.5rem] text-center font-semibold mb-10">{t("categories.delete")} "{props.categoryName}"?</p>

                <div className="flex">
                    <button onClick={() => props.handleShow(false)} className="mx-auto cursor-pointer relative flex items-center justify-center w-[9rem] bg-red-500 border-2 border-gray-300 hover:bg-red-700 text-[1rem] text-center mt-3 py-2 px-4 rounded-xl text-gray-100">{t("buttons.cancel")}</button>
                    <button onClick={handleConfirm} className="mx-auto cursor-pointer relative flex items-center justify-center w-[9rem] bg-green-600 border-2 border-gray-300 hover:bg-green-700 text-[1rem] text-center mt-3 py-2 px-4 rounded-xl text-gray-100">{t("buttons.confirm")}</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDeleteCategory;