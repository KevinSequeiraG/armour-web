import { GetProductsByCatUid, GetProductsByWebpage } from "@/helpers/products";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProductCard from "../ProductCard";

const ProductsModal = (props) => {
    if (!props.isOpen) return null;
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log(props.data)
        console.log(props?.webPageData)
        GetProductsByCatUid(props?.sectionUid).then((data) => {
            console.log("data", data)
            setProducts(data);
        })
    }, [])


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
            <div className="relative bg-white rounded-lg p-5 py-[3rem] mx-auto z-50 border border-[.2rem] border-gray-500">
                {products.length > 0 ? <div className="flex">{products.map((prod) => {
                    return (
                        <>
                            <ProductCard currentPage={props.currentPage} webPageData={props.webPageData} data={props.data} sectionInfo={prod} />
                        </>
                    )
                })}
                </div> : <p>No hay productos en esta categoría</p>}
                <div className="flex">
                    <button onClick={() => props.handleShow(false)} className="mx-auto cursor-pointer relative flex items-center justify-center w-[8rem] bg-red-500 border border-2 border-gray-300 hover:bg-red-700 text-[1rem] text-center mt-3 py-2 px-4 rounded-xl text-gray-200">{t("buttons.cancel")}</button>
                </div>
            </div>
        </div>
    )
}

export default ProductsModal;