import ConfirmDeleteProduct from '@/components/Modals/ConfirmDeleteProduct';
import CreateProduct from '@/components/Modals/CreateProduct';
import { GetCategoryByUid } from '@/helpers/categories';
import { GetProductsByWebpage } from '@/helpers/products';
import { GetWebpage } from '@/helpers/webpage';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { RiAddCircleLine } from 'react-icons/ri';

const EditProductPage = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { webpageNameByRouter } = router.query;
    const [products, setProducts] = useState([]);
    const [productToShow, setProductToShow] = useState([]);
    const [showNewProduct, setShowNewProduct] = useState(false);
    const [showDeleteProduct, setShowDeleteProduct] = useState(false);
    const [showEditProduct, setShowEditProduct] = useState(false);
    const [webpageName, setWebpageName] = useState();
    const [productToEdit, setProductToEdit] = useState();
    const [productToDelete, setProductToDelete] = useState();
    const [pagesWithProductsCards, setPagesWithProductsCards] = useState([]);
    const [pageSelected, setPageSelected] = useState();
    const [searchInputFilter, setSearchInputFilter] = useState("");

    // Función para cargar los productos
    const getProducts = async () => {
        try {
            const products = await GetProductsByWebpage(webpageName);
            setProducts(products);
        } catch (error) {
            console.error('Error al cargar productos:', error);
        }
    };

    useEffect(() => {
        if (products?.length > 0) {
            const fetchData = async () => {
                const completeData = await Promise.all(
                    products.map(async (product) => {
                        const productComplete = { ...product };
                        if (productComplete?.isFromCategory) {
                            const categoryData = await GetCategoryByUid(product?.categoryId);
                            productComplete.linkedTo = categoryData?.name;
                        } else {
                            const pageData = pagesWithProductsCards.filter(page => page?.id == parseInt(product?.webpagePage));
                            productComplete.linkedTo = pageData[0]?.name;
                        }
                        return productComplete;
                    })
                );

                setProductToShow(completeData);
            };

            fetchData();
        }
    }, [products, pagesWithProductsCards]);


    useEffect(() => {
        if (webpageName) {
            getProducts();
            GetWebpage(webpageName).then(data => {
                if (data && data.pages) {
                    const pagesWithCategoryCards = data.pages
                        .filter(page => page.sections.some(section => section?.type === "card" && !section?.isCategory))
                        .map(page => ({ id: page?.id, name: page?.name }));

                    if (pagesWithCategoryCards?.length > 0) {
                        setPagesWithProductsCards(pagesWithCategoryCards);
                        setPageSelected("");
                    }
                }
            });
        }
    }, [webpageName]);

    useEffect(() => {
        if (webpageNameByRouter) {
            window.localStorage.setItem("webpageName", webpageNameByRouter);
            setWebpageName(webpageNameByRouter);
        } else {
            setWebpageName(window.localStorage.getItem("webpageName"));
        }
    }, [webpageNameByRouter]);

    const editProduct = (product) => {
        setProductToEdit(product);
        setShowEditProduct(true);
    };

    const deleteProduct = (product) => {
        setProductToDelete(product);
        setShowDeleteProduct(true);
    };

    return (
        <>
            <div className="container mx-auto py-4 px-8">
                <div className='flex justify-between items-center mb-2'>
                    <div>
                        <div className='flex items-center space-x-11'>
                            <BsFillArrowLeftCircleFill className='w-6 h-6 cursor-pointer' onClick={() => router.back()} />
                            <p className="font-semibold mb-2 text-center text-2xl">{t("home.my-products")}</p>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                className="border-2 border-gray-300 bg-white w-[18rem] h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
                                placeholder={t("search.search-product")}
                                onChange={(e) => { setSearchInputFilter(e.target.value) }}
                            />
                            <button type="submit" className="absolute right-0 top-0 mt-3.5 mr-4">
                                <img src="./svgs/search.svg" className="w-[1rem] h-[1rem]" alt="rar" />
                            </button>
                        </div>
                    </div>
                    <button className="hover:bg-[#a39869] hover:text-gray-100 hover:border-gray-100 bg-[#EFE1A2] text-[#212429] px-4 py-2 rounded-[10px] border border-1 border-[#212429] font-bold h-min flex items-center shadow-md" onClick={() => setShowNewProduct(true)}><RiAddCircleLine className="mr-1 w-5 h-5" />{t("buttons.new-product")}</button>
                </div>
                <div className='max-h-[calc(100vh-13rem)] overflow-y-auto scrollbarDesign rounded-[10px]'>
                    <table className="w-full border-collapse rounded-[10px] overflow-hidden bg-[#f5f5f5]">
                        <thead>
                            <tr className='bg-gray-800 text-white text-lg'>
                                <th className="p-2 border border-gray-300">{t("products.name")}</th>
                                <th className="p-2 border border-gray-300">{t("products.description")}</th>
                                <th className="p-2 border border-gray-300">{t("products.image")}</th>
                                <th className="p-2 border border-gray-300">{t("products.base-price")}</th>
                                <th className="p-2 border border-gray-300">{t("products.tax")}</th>
                                <th className="p-2 border border-gray-300">{t("products.final-cost")}</th>
                                <th className="p-2 border border-gray-300">{t("products.linked-to")}</th>
                                <th className="p-2 border border-gray-300">{t("products.actions")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productToShow?.filter(data => {
                                const normalizeNames = data?.name?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                                const normalizeSearchInput = searchInputFilter.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                                return normalizeNames?.includes(normalizeSearchInput);
                            }).map((product) => (
                                <tr key={product.id} className='text-center'>
                                    <td className="p-2 border border-gray-300">{product?.name}</td>
                                    <td className="p-2 border border-gray-300">{product?.desc}</td>
                                    <td className="p-2 border border-gray-300">
                                        <img className="max-w-[4rem] mx-auto" src={product?.image ? product?.image : '/images/awLogo-nobg.png'} alt="Product Image" />
                                    </td>
                                    <td className="p-2 border border-gray-300">{product?.prize}</td>
                                    <td className="p-2 border border-gray-300">{product?.tax}</td>
                                    <td className="p-2 border border-gray-300">{parseInt(product?.prize) + (parseInt(product?.prize) * (parseInt(product?.tax) / 100))}</td>
                                    <td className="p-2 border border-gray-300">{product?.linkedTo}</td>
                                    <td className="p-2 border border-gray-300">
                                        <button
                                            onClick={() => editProduct(product)}
                                            className="text-blue-500 hover:text-blue-700 mr-2"
                                        >
                                            <FaEdit className='w-5 h-5' />
                                        </button>
                                        <button
                                            onClick={() => deleteProduct(product)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FaTrash className='w-5 h-5' />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {productToShow?.length === 0 && <p className='p-8 text-center text-2xl font-semibold'>{t("products.no-data")}</p>}
            </div>
            <CreateProduct getProducts={getProducts} webpageName={webpageName} handleShow={setShowNewProduct} isOpen={showNewProduct} pagesWithProductsCards={pagesWithProductsCards} setPageSelected={setPageSelected} pageSelected={pageSelected} />
            <CreateProduct editProduct productToEdit={productToEdit} getProducts={getProducts} webpageName={webpageName} handleShow={setShowEditProduct} isOpen={showEditProduct} pagesWithProductsCards={pagesWithProductsCards} setPageSelected={setPageSelected} pageSelected={pageSelected} />
            <ConfirmDeleteProduct getProducts={getProducts} isOpen={showDeleteProduct} handleShow={setShowDeleteProduct} productName={productToDelete?.name} productId={productToDelete?.id} />
        </>
    );
};

export default EditProductPage;
