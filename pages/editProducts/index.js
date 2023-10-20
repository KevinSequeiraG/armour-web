import ConfirmDeleteProduct from '@/components/Modals/ConfirmDeleteProduct';
import CreateProduct from '@/components/Modals/CreateProduct';
import { GetCategoryByUid } from '@/helpers/categories';
import { GetProductsByWebpage } from '@/helpers/products';
import { GetWebpage } from '@/helpers/webpage';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const EditProductPage = () => {
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
        if (products.length > 0) {
            const fetchData = async () => {
                const completeData = await Promise.all(
                    products.map(async (product) => {
                        const productComplete = { ...product };
                        const categoryData = await GetCategoryByUid(product?.categoryId);
                        productComplete.categoryName = categoryData?.name;
                        return productComplete;
                    })
                );

                setProductToShow(completeData);
            };

            fetchData();
        }
    }, [products]);


    useEffect(() => {
        if (webpageName) {
            getProducts();
            GetWebpage(webpageName).then(data => {
                if (data && data.pages) {
                    const pagesWithCategoryCards = data.pages
                        .filter(page => page.sections.some(section => section?.type === "card" && !section?.isCategory))
                        .map(page => ({ id: page?.id, name: page?.name }));

                    if (pagesWithCategoryCards.length > 0) {
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
                <div className='flex justify-between items-center'>
                    <h1 className="text-2xl font-semibold mb-4">Editar Productos</h1>
                    <button onClick={() => setShowNewProduct(true)} className="hover:bg-[#a39869] hover:text-gray-100 hover:border-gray-100 bg-[#EFE1A2] h-[2.5rem] w-[10rem] text-[#212429] px-4 py-2 rounded-[.5rem] border border-1 border-[#212429] font-semibold">Agregar +</button>
                </div>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="p-2 border border-gray-300">Nombre del Producto</th>
                            <th className="p-2 border border-gray-300">Descripción</th>
                            <th className="p-2 border border-gray-300">Imagen</th>
                            <th className="p-2 border border-gray-300">Precio base</th>
                            <th className="p-2 border border-gray-300">Categoria</th>
                            <th className="p-2 border border-gray-300">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productToShow?.map((product) => (
                            <tr key={product.id} className='text-center'>
                                <td className="p-2 border border-gray-300">{product.name}</td>
                                <td className="p-2 border border-gray-300">{product.desc}</td>
                                <td className="p-2 border border-gray-300">
                                    <img className="max-w-[4rem] mx-auto" src={product.image ? product.image : '/images/awLogo-nobg.png'} alt="Product Image" />
                                </td>
                                <td className="p-2 border border-gray-300">{product.prize}</td>
                                <td className="p-2 border border-gray-300">{product.categoryName}</td>
                                <td className="p-2 border border-gray-300">
                                    <button
                                        onClick={() => editProduct(product)}
                                        className="text-blue-500 hover:text-blue-700 mr-2"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => deleteProduct(product)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <CreateProduct getProducts={getProducts} webpageName={webpageName} handleShow={setShowNewProduct} isOpen={showNewProduct} pagesWithProductsCards={pagesWithProductsCards} setPageSelected={setPageSelected} pageSelected={pageSelected} />
            <CreateProduct editProduct productToEdit={productToEdit} getProducts={getProducts} webpageName={webpageName} handleShow={setShowEditProduct} isOpen={showEditProduct} pagesWithProductsCards={pagesWithProductsCards} setPageSelected={setPageSelected} pageSelected={pageSelected} />
            <ConfirmDeleteProduct getProducts={getProducts} isOpen={showDeleteProduct} handleShow={setShowDeleteProduct} productName={productToDelete?.name} productId={productToDelete?.id} />
        </>
    );
};

export default EditProductPage;
