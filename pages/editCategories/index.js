import ConfirmDeleteCategory from '@/components/Modals/ConfirmDeleteCategory';
import CreateCategory from '@/components/Modals/CreateCategory';
import { GetCategoriesByWebpage } from '@/helpers/categories';
import { GetWebpage } from '@/helpers/webpage';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { RiAddCircleLine } from 'react-icons/ri';

const EditCategoryPage = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { webpageNameByRouter } = router.query;
    const [webpageName, setWebpageName] = useState()
    const [categories, setCategories] = useState([])
    const [showNewCategory, setShowNewCategory] = useState(false);
    const [showEditCategory, setShowEditCategory] = useState(false);
    const [showDeleteCategory, setShowDeleteCategory] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState();
    const [categoryToDelete, setCategoryToDelete] = useState();
    const [pagesWithCategoryCards, setPagesWithCategoryCards] = useState([]);
    const [pageSelected, setPageSelected] = useState();
    const [searchInputFilter, setSearchInputFilter] = useState("");

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
            GetWebpage(webpageName).then(data => {
                if (data && data.pages) {
                    const pagesWithCategoryCards = data.pages
                        .filter(page => page.sections.some(section => section?.type === "card" && section?.isCategory))
                        .map(page => ({ id: page?.id, name: page?.name }));

                    if (pagesWithCategoryCards.length > 0) {
                        setPagesWithCategoryCards(pagesWithCategoryCards);
                        setPageSelected(pagesWithCategoryCards[0].id);
                    }
                }
            });
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
                <div className='flex justify-between items-center mb-2'>
                    <div>
                        <div className='flex items-center space-x-11'>
                            <BsFillArrowLeftCircleFill className='w-6 h-6 cursor-pointer' onClick={() => router.back()} />
                            <p className="font-semibold mb-2 text-center text-2xl">{t("home.my-categories")}</p>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                className="border-2 border-gray-300 bg-white w-[18rem] h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
                                placeholder={t("search.search-category")}
                                onChange={(e) => { setSearchInputFilter(e.target.value) }}
                            />
                            <button type="submit" className="absolute right-0 top-0 mt-3.5 mr-4">
                                <img src="./svgs/search.svg" className="w-[1rem] h-[1rem]" alt="rar" />
                            </button>
                        </div>
                    </div>
                    <button className="hover:bg-[#a39869] hover:text-gray-100 hover:border-gray-100 bg-[#EFE1A2] text-[#212429] px-4 py-2 rounded-[10px] border border-1 border-[#212429] font-bold h-min flex items-center shadow-md" onClick={() => setShowNewCategory(true)}><RiAddCircleLine className="mr-1 w-5 h-5" />{t("buttons.new-category")}</button>
                </div>
                <table className="w-full border-collapse rounded-[10px] overflow-hidden bg-[#f5f5f5]">
                    <thead>
                        <tr className='bg-gray-800 text-white text-lg'>
                            <th className="p-2 border border-gray-300">{t("categories.name")}</th>
                            <th className="p-2 border border-gray-300">{t("categories.description")}</th>
                            <th className="p-2 border border-gray-300">{t("categories.image")}</th>
                            <th className="p-2 border border-gray-300">{t("categories.actions")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.filter(data => {
                            const normalizeNames = data?.name?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                            const normalizeSearchInput = searchInputFilter.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                            return normalizeNames?.includes(normalizeSearchInput);
                        }).map((category) => (
                            <tr key={category.id} className='text-center'>
                                <td className="p-2 border border-gray-300">{category?.name}</td>
                                <td className="p-2 border border-gray-300">{category?.desc}</td>
                                <td className="p-2 border border-gray-300"><img className="max-w-[4rem] mx-auto" src={category?.image ? category?.image : '/images/awLogo-nobg.png'} /></td>
                                <td className="p-2 border border-gray-300">
                                    <button
                                        onClick={() => editCategory(category)}
                                        className="text-blue-500 hover:text-blue-700 mr-2"
                                    >
                                        <FaEdit className='w-5 h-5' />
                                    </button>
                                    <button
                                        onClick={() => deleteCategory(category)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash className='w-5 h-5' />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {categories.length === 0 && <p className='p-8 text-center text-2xl font-semibold'>{t("categories.no-data")}</p>}
            </div>
            <CreateCategory getCategories={getCategories} webpageName={webpageName} handleShow={setShowNewCategory} isOpen={showNewCategory} pagesWithCategoryCards={pagesWithCategoryCards} setPageSelected={setPageSelected} pageSelected={pageSelected} />
            <CreateCategory editCategory categoryToEdit={categoryToEdit} getCategories={getCategories} webpageName={webpageName} handleShow={setShowEditCategory} isOpen={showEditCategory} pagesWithCategoryCards={pagesWithCategoryCards} setPageSelected={setPageSelected} pageSelected={pageSelected} />
            <ConfirmDeleteCategory getCategories={getCategories} isOpen={showDeleteCategory} handleShow={setShowDeleteCategory} categoryName={categoryToDelete?.name} categoryId={categoryToDelete?.id} />
        </>
    );
};

export default EditCategoryPage;
