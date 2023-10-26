import { DeleteProductByUid } from "@/helpers/products";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillDelete } from "react-icons/ai";

const ProductQuantity = (props) => {
    if (!props.isOpen) return null;
    const [quantity, setQuantity] = useState(1);
    const { t } = useTranslation();

    const handleConfirm = () => {
        const newProduct = {
            name: props?.prodToAdd?.name,
            prize: props?.prodToAdd?.prize,
            tax: props?.prodToAdd?.tax,
            desc: props?.prodToAdd?.desc,
            image: props?.prodToAdd?.image,
            idProd: props?.prodToAdd?.id,
            quantity: quantity,
        };

        // Comprueba si props.salesCart está definido y es un array
        if (Array.isArray(props.salesCart)) {
            const existingProductIndex = props.salesCart.findIndex(
                (product) => product.idProd === newProduct.idProd
            );

            if (existingProductIndex !== -1) {
                // El producto ya está en el carrito, actualiza la cantidad
                const updatedSalesCar = [...props.salesCart];
                updatedSalesCar[existingProductIndex].quantity += parseInt(quantity);

                // Actualiza el estado del carrito
                props.setSalesCart(updatedSalesCar);
            } else {
                // El producto no está en el carrito, agrégalo
                props.setSalesCart((prods) => [...prods, newProduct]);
            }

            // Cierra el modal
            props.handleShow(false);
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
            <div className="relative bg-white rounded-lg px-6 py-[3rem] mx-auto z-50 border-[.2rem] border-gray-500">
                <p className="text-[1.5rem] text-center font-semibold mb-10">{t("cart.quant-to-add")} "{props.prodToAdd.name}"?</p>
                <div className="text-center my-6">
                    <label className="font-semibold text-[1.2rem]">{t("cart.quantity")}</label>
                    <input className="border border-2 border-black rounded-xl px-3 py-1 mx-2" type="number" min={1} value={quantity} onChange={(e) => { setQuantity(e.target.value) }} />
                </div>
                <div className="flex">
                    <button onClick={() => props.handleShow(false)} className="mx-auto cursor-pointer relative flex items-center justify-center w-[9rem] bg-red-500 border-2 border-gray-300 hover:bg-red-700 text-[1rem] text-center mt-3 py-2 px-4 rounded-xl text-gray-100">{t("buttons.cancel")}</button>
                    <button onClick={handleConfirm} className="mx-auto cursor-pointer relative flex items-center justify-center w-[9rem] bg-green-600 border-2 border-gray-300 hover:bg-green-700 text-[1rem] text-center mt-3 py-2 px-4 rounded-xl text-gray-100">{t("buttons.confirm")}</button>
                </div>
            </div>
        </div>
    )
}

export default ProductQuantity;