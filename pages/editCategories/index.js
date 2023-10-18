import ConfirmDeleteCategory from '@/components/Modals/ConfirmDeleteCategory';
import CreateCategory from '@/components/Modals/CreateCategory';
import { DeleteCategoryByUid, GetCategoriesByWebpage } from '@/helpers/categories';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const EditCategoryPage = () => {
    const router = useRouter();
    const { webpageNameByRouter } = router.query;
    const [webpageName, setWebpageName] = useState()
    const [categories, setCategories] = useState([])
    const [showNewCategory, setShowNewCategory] = useState(false);
    const [showEditCategory, setShowEditCategory] = useState(false);
    const [showDeleteCategory, setShowDeleteCategory] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState();
    const [categoryToDelete, setCategoryToDelete] = useState();

    const getCategories = () => {
        const fetchCategories = async () => {
            try {
                await GetCategoriesByWebpage(webpageName).then(categories => {
                    setCategories(categories)
                })
            } catch (error) {
                console.error('Error al cargar categorias:', error);
            }
        };

        fetchCategories();
    }

    useEffect(() => {
        if (webpageNameByRouter) {
            window.localStorage.setItem("webpageName", webpageNameByRouter)
            setWebpageName(webpageNameByRouter)
        } else {
            setWebpageName(window.localStorage.getItem("webpageName"))
        }

    }, [webpageNameByRouter]);

    useEffect(() => {
        if (webpageName) {
            getCategories();
        }
    }, [webpageName])


    const editCategory = (category) => {
        setCategoryToEdit(category);
        setShowEditCategory(true);
    };

    const deleteCategory = (category) => {
        setCategoryToDelete(category);
        setShowDeleteCategory(true);
    };

    return (
        <>
            <div className="container mx-auto py-4 px-8">
                <div className='flex justify-between items-center'>
                    <h1 className="text-2xl font-semibold mb-4">Editar Categorías</h1>
                    <button onClick={() => setShowNewCategory(true)} className="hover:bg-[#a39869] hover:text-gray-100 hover:border-gray-100 bg-[#EFE1A2] h-[2.5rem] w-[10rem] text-[#212429] px-4 py-2 rounded-[.5rem] border border-1 border-[#212429] font-semibold">Agregar +</button>
                </div>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="p-2 border border-gray-300">Nombre de la categoría</th>
                            <th className="p-2 border border-gray-300">Descripción</th>
                            <th className="p-2 border border-gray-300">Imagen</th>
                            <th className="p-2 border border-gray-300">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.map((category) => (
                            <tr key={category.id} className='text-center'>
                                <td className="p-2 border border-gray-300">{category.name}</td>
                                <td className="p-2 border border-gray-300">{category.desc}</td>
                                <td className="p-2 border border-gray-300"><img className="max-w-[4rem] mx-auto" src={category.image ? category.image : '/images/awLogo-nobg.png'} /></td>
                                <td className="p-2 border border-gray-300">
                                    <button
                                        onClick={() => editCategory(category)}
                                        className="text-blue-500 hover:text-blue-700 mr-2"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => deleteCategory(category)}
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
            <CreateCategory getCategories={getCategories} webpageName={webpageName} handleShow={setShowNewCategory} isOpen={showNewCategory} />
            <CreateCategory editCategory categoryToEdit={categoryToEdit} getCategories={getCategories} webpageName={webpageName} handleShow={setShowEditCategory} isOpen={showEditCategory} />
            <ConfirmDeleteCategory getCategories={getCategories} isOpen={showDeleteCategory} handleShow={setShowDeleteCategory} categoryName={categoryToDelete?.name} categoryId={categoryToDelete?.id} />
        </>
    );
};

export default EditCategoryPage;
