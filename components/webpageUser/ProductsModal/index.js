import { GetProductsByCatUid, GetProductsByWebpage } from "@/helpers/products";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProductCard from "../ProductCard";
import { Range } from 'react-range';

const ProductsModal = (props) => {
    if (!props.isOpen) return null;
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const [searchInputFilter, setSearchInputFilter] = useState("");
    useEffect(() => {
        GetProductsByCatUid(props?.sectionUid).then((data) => {
            setProducts(data);
            if (data.length > 0) {
                const [minPrice, maxPrice] = calculatePriceRange(data);
                // Verifica si minPrice es igual a maxPrice
                if (minPrice < maxPrice) {
                    setPriceRange([minPrice, maxPrice]);
                    setSelectedRange([minPrice, maxPrice]);
                } else {
                    // Manejar el caso donde min y max son iguales, por ejemplo:
                    setPriceRange([minPrice, minPrice + 1]); // Asumiendo que minPrice es tu precio base.
                    setSelectedRange([minPrice, minPrice + 1]);
                }
            } else {
                // Manejar el caso donde no hay productos
                // Por ejemplo, podrías establecer un rango predeterminado o no mostrar el deslizador
                setPriceRange([0, 1]); // Rango predeterminado para representar "no hay datos"
                setSelectedRange([0, 1]);
            }
        })
    }, [])

    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedRange, setSelectedRange] = useState([0, 1000]);

    const calculatePriceRange = (products) => {
        let minPrice = Infinity;
        let maxPrice = -Infinity;

        products.forEach(product => {
            const finalPrice = parseFloat(product?.prize) + (parseFloat(product?.prize) * (parseFloat(product?.tax) / 100));
            if (finalPrice < minPrice) minPrice = finalPrice;
            if (finalPrice > maxPrice) maxPrice = finalPrice;
        });

        return [minPrice, maxPrice];
    };

    const isWithinSelectedRange = (product) => {
        const finalPrice = parseFloat(product?.prize) + (parseFloat(product?.prize) * (parseFloat(product?.tax) / 100));
        return finalPrice >= selectedRange[0] && finalPrice <= selectedRange[1];
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
            <div className={`relative bg-white rounded-[10px] p-5 py-[3rem] mx-auto z-50 border-[.2rem] border-gray-500 overflow-auto max-w-[90%] max-h-[90vh] scrollbarDesign ${products?.length > 0 ? "min-w-[90%] min-h-[90vh]" : ""}`}>
                {products?.length > 0 ? <>

                    <p className="text-3xl font-bold text-center  pb-3 italic">{props?.sectionInfo?.name}</p>
                    <p className="text-lg font-semibold text-center mb-5">{props?.sectionInfo?.desc}</p>
                    <div className="flex flex-col mdx600:flex-row items-center space-y-8 mdx600:space-x-8 mdx600:space-y-0 mb-5">
                        <div className="relative w-min">
                            <input
                                type="text"
                                className="border-2 border-gray-300 bg-white w-[18rem] h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
                                placeholder={props?.isSpanish ? "Buscar producto" : "Search product"}
                                onChange={(e) => { setSearchInputFilter(e.target.value) }}
                            />
                            <button type="submit" className="absolute right-0 top-0 mt-3.5 mr-4">
                                <img src="../svgs/search.svg" className="w-[1rem] h-[1rem]" alt="rar" />
                            </button>
                        </div>
                        <div>
                            <Range
                                step={50}
                                min={priceRange[0]} // precio mínimo de todos los productos
                                max={priceRange[1]} // precio máximo de todos los productos
                                values={selectedRange} // rango seleccionado por el usuario
                                onChange={(values) => setSelectedRange(values)}
                                renderTrack={({ props, children }) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            height: '6px',
                                            width: '100%',
                                            backgroundColor: '#EFE1A2',
                                            borderRadius: "10px"
                                        }}
                                    >
                                        {children}
                                    </div>
                                )}
                                renderThumb={({ props }) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            height: '18px',
                                            width: '18px',
                                            borderRadius: '4px',
                                            backgroundColor: '#212429'
                                        }}
                                    />
                                )}
                            />
                            <div className="mt-2">
                                {props?.isSpanish ? "Rango de precios:" : "Price range:"} ₡{selectedRange[0].toLocaleString('es-CR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} - ₡{selectedRange[1].toLocaleString('es-CR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                        </div>
                    </div>
                    <div className="flex-col mdx600:flex-row items-center mt-2 flex flex-wrap gap-4 justify-center mx-auto w-full">{products.filter(data => {
                        const normalizeNames = data?.name?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                        const normalizeSearchInput = searchInputFilter.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                        return normalizeNames?.includes(normalizeSearchInput) && isWithinSelectedRange(data);
                    }).map((prod) => {
                        return (
                            <>
                                <ProductCard setProdToAdd={props.setProdToAdd} setShowProdQuantity={props.setShowProdQuantity} currentPage={props.currentPage} webPageData={props.webPageData} data={props.data} sectionInfo={prod} />
                            </>
                        )
                    })}
                    </div>
                </> : <p className="mt-5">{props?.isSpanish ? "No hay productos en esta categoría." : "There are no products in this category."}</p>}
                {/* <div className="flex"> */}
                <button onClick={() => props.handleShow(false)} className="absolute top-0 right-3 mx-auto cursor-pointer flex items-center justify-center  bg-red-500 border-2 border-gray-300 hover:bg-red-700 text-[1rem] text-center mt-3 py-2 px-4 rounded-full text-gray-100">X</button>
                {/* </div> */}
            </div>
        </div>
    )
}

export default ProductsModal;