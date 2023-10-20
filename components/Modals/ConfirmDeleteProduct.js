import { DeleteProductByUid } from "@/helpers/products";
import { useTranslation } from "react-i18next";

const ConfirmDeleteProduct = (props) => {
    if (!props.isOpen) return null;
    const { t } = useTranslation();

    const handleConfirm = () => {
        DeleteProductByUid(props.productId).then(() => {
            props.getProducts();
            props.handleShow(false);
        })
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
            <div className="relative bg-white rounded-lg p-5 py-[3rem] mx-auto z-50 border border-[.2rem] border-gray-500">
                <p className="text-[1.5rem] text-center font-semibold mb-10">Seguro que quiere eliminar el producto "{props.productName}"?</p>
                <div className="flex">
                    <button onClick={() => props.handleShow(false)} className="mx-auto cursor-pointer relative flex items-center justify-center w-[8rem] bg-red-500 border border-2 border-gray-300 hover:bg-red-700 text-[1rem] text-center mt-3 py-2 px-4 rounded-xl text-gray-200">{t("buttons.cancel")}</button>
                    <button onClick={handleConfirm} className="mx-auto cursor-pointer relative flex items-center justify-center w-[8rem] bg-green-600 border border-2 border-gray-300 hover:bg-green-700 text-[1rem] text-center mt-3 py-2 px-4 rounded-xl text-gray-200">{t("buttons.confirm")}</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDeleteProduct;