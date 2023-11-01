import { GetCategoriesByWebpage } from "@/helpers/categories";
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { EditProductByUid, SaveProduct } from "@/helpers/products";
import Switch from 'react-switch';
import { BsCart4 } from "react-icons/bs";

const CreateProduct = ({ editProduct, productToEdit, isOpen, handleShow, webpageName, getProducts, pagesWithProductsCards, setPageSelected, pageSelected }) => {
    if (!isOpen) return null;
    const { t } = useTranslation();
    const [name, setName] = useState();
    const [desc, setDesc] = useState();
    const [imageSrc, setImageSrc] = useState(null);
    const [prize, setPrize] = useState(0);
    const [tax, setTax] = useState(0);
    const fileInputRef = useRef();
    const [categorySelected, setCategorySelected] = useState();
    const [categories, setCategories] = useState([])
    const [isFromCategory, setIsFromCategory] = useState(editProduct ? productToEdit.isFromCategory : true);
    const [registrationError, setRegistrationError] = useState({});
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteBGImage = () => {
        setImageSrc(null);
        fileInputRef.current.value = '';
    };

    const validateForm = async () => {
        const errors = {};
        if (!name) errors.name = t("validations.required");
        if (isFromCategory && !categorySelected) errors.categorySelected = t("validations.required");
        if (!isFromCategory && !pageSelected) errors.pageSelected = t("validations.required");

        setRegistrationError(errors);
        return Object.keys(errors).length === 0;
    };

    const handleConfirm = async () => {
        if (buttonDisabled) return;
        setButtonDisabled(true);
        const validationsResult = await validateForm()
        if (validationsResult) {
            if (editProduct) {
                const dataToSave = { name: name, desc: desc, webpageName: webpageName, categoryId: categorySelected ? categorySelected : "", prize: prize ? prize : 0, tax: tax ? tax : 0, image: imageSrc, isFromCategory: isFromCategory, webpagePage: pageSelected ? pageSelected?.toString() : "" }
                EditProductByUid(productToEdit.id, dataToSave).then(() => {
                    toast.success(t("products.crud-edit"));
                    getProducts();
                    handleShow(false);
                    setButtonDisabled(false);
                    cleanStates();
                }).catch((e) => console.log(e))
            } else {
                SaveProduct({ name: name, desc: desc, webpageName: webpageName, categoryId: categorySelected ? categorySelected : "", prize: prize ? prize : 0, tax: tax ? tax : 0, image: imageSrc, isFromCategory: isFromCategory, webpagePage: pageSelected ? pageSelected?.toString() : "", createdAt: new Date() }).then(() => {
                    toast.success(t("products.crud-create"));
                    getProducts();
                    handleShow(false);
                    setButtonDisabled(false);
                    cleanStates();
                })
            }
        } else setButtonDisabled(false);
    }

    const cleanStates = () => {
        setName("");
        setImageSrc("");
        setDesc("");
        setPageSelected("");
        setCategorySelected("");
        setPrize(0);
        setTax(0);
        setIsFromCategory(true);
    }

    useEffect(() => {
        GetCategoriesByWebpage(webpageName).then(data => {
            setCategories(data)
        })
        if (editProduct) {
            setName(productToEdit?.name);
            setImageSrc(productToEdit?.image);
            setIsFromCategory(productToEdit?.isFromCategory);
            setDesc(productToEdit?.desc);
            setPrize(productToEdit?.prize);
            setTax(productToEdit?.tax);
            setCategorySelected(productToEdit?.categoryId);
            setPageSelected(productToEdit?.webpagePage);
        } else cleanStates();
    }, [])

    useEffect(() => {
        if (isFromCategory)
            setPageSelected("")
        else
            setCategorySelected("")

    }, [isFromCategory])

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
            <div className="relative bg-white rounded-lg p-5 w-2/5 mx-auto z-50 border-[.2rem] border-gray-500">
                <p className="text-2xl font-semibold mb-6 flex items-center justify-center"><BsCart4 className="mr-1 h-7 w-7" />{editProduct ? t("products.edit") : t("buttons.new-product")}</p>
                <div className="grid grid-cols-2 gap-x-5 gap-y-2 items-center">
                    <div className="relative">
                        <label className="text-gray-700 font-bold mb-2 flex after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="nombre">
                            {t("products.name")}
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline mb-4"
                            id="nombre"
                            type="text"
                            placeholder={t("products.name")}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {registrationError.name && <p className="animate__animated animate__flipInX absolute text-xs font-medium -bottom-1 right-0 text-red-600">* {registrationError.name}</p>}
                    </div>

                    <div className="relative">

                        <label className="text-gray-700 font-bold mb-2 flex" htmlFor="desc">
                            {t("products.description")}
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline mb-4"
                            id="desc"
                            type="text"
                            placeholder={t("products.description")}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-bold mb-2 flex" htmlFor="prize">
                            {t("products.base-price")}
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline mb-4"
                            id="prize"
                            type="number"
                            placeholder={t("products.base-price")}
                            value={prize}
                            min={0}
                            onChange={(e) => setPrize(e.target.value < 0 ? 0 : e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-bold mb-2 flex" htmlFor="tax">
                            {t("products.tax")} (%)
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline mb-4"
                            id="tax"
                            type="number"
                            min={0}
                            placeholder={t("products.tax")}
                            value={tax}
                            onChange={(e) => setTax(e.target.value)}
                        />
                    </div>

                    <div className="col-span-2 w-1/2 mx-auto">
                        <div className='flex items-center space-x-2 my-1'>
                            <p className="text-gray-700 font-bold mb-2 flex after:content-['*'] after:ml-0.5 after:text-red-500">{t("products.linked-to-category")}</p>
                            <Switch name='cardType'
                                onChange={value => setIsFromCategory(value)}
                                checked={isFromCategory}
                            />
                        </div>
                        {isFromCategory ?
                            <div className="relative">
                                <select
                                    className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline mb-4"
                                    value={categorySelected}
                                    onChange={(e) => { setCategorySelected(e.target.value) }}
                                >
                                    <option value={""}>{t("products.select-category")}</option>
                                    {categories.map((category) => (
                                        <option key={category?.id} value={category?.id}>
                                            {category?.name}
                                        </option>
                                    ))}
                                </select>
                                {registrationError.categorySelected && <p className="animate__animated animate__flipInX absolute text-xs font-medium -bottom-1 right-0 text-red-600">* {registrationError.categorySelected}</p>}
                            </div>

                            :
                            <div className="relative">
                                <select
                                    id="pages"
                                    className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline mb-4"
                                    value={pageSelected}
                                    onChange={(e) => { setPageSelected(e.target.value) }}
                                >
                                    <option value={""}>{t("products.select-page")}</option>
                                    {pagesWithProductsCards.map((page, i) => (
                                        <option key={i} value={page?.id}>
                                            {page?.name}
                                        </option>
                                    ))}
                                </select>
                                {registrationError.pageSelected && <p className="animate__animated animate__flipInX absolute text-xs font-medium -bottom-1 right-0 text-red-600">* {registrationError.pageSelected}</p>}
                            </div>
                        }
                    </div>

                    <div className="col-span-2">
                        <input
                            name="category"
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="image">{t("products.cover-image")}</label>
                        {imageSrc ? (
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={imageSrc}
                                    alt="Uploaded"
                                    // style={{ ...imageStyles }}
                                    className='object-cover w-full h-[10rem] rounded-[10px] border-2 border-dashed border-[#224553]'
                                />
                                <button
                                    onClick={handleDeleteBGImage}
                                    style={{
                                        position: 'absolute',
                                        top: "-10px",
                                        right: "-5px",
                                        background: 'red',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                        padding: '0rem 0.45rem',
                                    }}
                                >
                                    X
                                </button>
                            </div>
                        ) :
                            <label
                                style={{
                                    padding: '15px 10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    fontWeight: 500,
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    lineHeight: '1rem',
                                    border: '2px dashed #224553',
                                    borderRadius: '10px',
                                }}
                                className='w-full h-[10rem]'
                            >
                                + {t("products.add-image")}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        }
                    </div>
                </div>
                <div className="flex items-center mt-6">
                    <button onClick={() => handleShow(false)} className="mx-auto cursor-pointer relative flex items-center justify-center w-[9rem] bg-red-500 border-2 border-gray-300 hover:bg-red-700 text-[1rem] text-center mt-3 py-2 px-4 rounded-xl text-gray-100">{t("buttons.cancel")}</button>
                    <button onClick={handleConfirm} className="mx-auto cursor-pointer relative flex items-center justify-center w-[9rem] bg-green-600 border-2 border-gray-300 hover:bg-green-700 text-[1rem] text-center mt-3 py-2 px-4 rounded-xl text-gray-100">{t("buttons.confirm")}</button>
                </div>
            </div>
        </div>
    );
}

export default CreateProduct;