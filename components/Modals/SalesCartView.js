import React from "react";
import { useTranslation } from "react-i18next";
import { AiFillDelete } from "react-icons/ai";

const SalesCartView = (props) => {
    if (!props.isOpen) return null;
    const { t } = useTranslation();

    const handleRemoveFromCart = (productId) => {
        const newCart = props.cartProducts.filter((prod => { return (prod.idProd !== productId) }))
        props.setSalesCart(newCart)
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
            <div className="relative min-w-[30%] max-h-[80%] overflow-y-auto bg-white rounded-lg px-6 py-[3rem] mx-auto z-50 border-[.2rem] border-gray-500">
                <p className="text-[1.5rem] text-center font-semibold mb-4">{props?.isSpanish ? "Carrito de compras" : "Your cart"}</p>
                <ul className="text-left w-auto">
                    {props.cartProducts.length < 1 && <div className="text-center">
                        <p>{props?.isSpanish ? "No has añadido nada al carrito" : "You have not added anything to the cart"}</p>
                    </div>}
                    {props.cartProducts.map((product) => (
                        <li key={product.idProd} className="my-3 flex items-center justify-between border border-1 border-gray-300 px-4 py-4 rounded-xl">
                            <div className="">
                                <p className="text-[1.2rem] font-semibold">{product.name}</p>
                                <p>{t("cart.quantity")}: {product.quantity}</p>
                                <p>{t("cart.prize")}: ₡{product.prize}</p>
                                <p>{t("cart.taxes")}: {product.tax}%</p>
                                <p>{t("cart.tot")}: ₡{parseInt(product.prize) + (parseInt(product.prize) * (parseInt(product.tax) / 100))}</p>
                                {/* <p>{t("Descripción")}: {product.desc}</p> */}
                            </div>
                            <button
                                onClick={() => handleRemoveFromCart(product.idProd)}
                                className="cursor-pointer text-red-600 hover:text-red-800"
                            >
                                <AiFillDelete size={20} />
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-center mt-4">
                    <button onClick={() => props.handleShow(false)} className="mx-auto cursor-pointer w-[9rem] bg-red-500 border-2 border-gray-100 hover:bg-red-700 text-[1rem] text-center py-2 px-4 rounded-xl text-gray-100">
                        {props?.isSpanish ? "Cancelar" : "Cancel"}
                    </button>
                    <button onClick={() => props.handleShow(false)} className="mx-auto cursor-pointer w-min bg-green-500 border-2 border-gray-100 hover:bg-green-700 text-[1rem] text-center py-2 px-4 rounded-xl text-gray-100 truncate">
                        {props?.isSpanish ? "Enviar mi compra" : "Send my purchase"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SalesCartView;
