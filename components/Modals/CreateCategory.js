import { EditCategoryByUid, SaveCategory } from "@/helpers/categories";
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiCategoryAlt } from "react-icons/bi";
import 'animate.css';

const CreateCategory = ({ editCategory, categoryToEdit, isOpen, handleShow, webpageName, getCategories, pageSelected, setPageSelected, pagesWithCategoryCards }) => {
    if (!isOpen) return null;
    const { t } = useTranslation();
    const [name, setName] = useState();
    const [desc, setDesc] = useState();
    const [imageSrc, setImageSrc] = useState(null);
    const fileInputRef = useRef();
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
        if (!desc) errors.desc = t("validations.required");
        if (!pageSelected) errors.pageSelected = t("validations.required");

        setRegistrationError(errors);
        return Object.keys(errors).length === 0;
    };


    const handleConfirm = async () => {
        if (buttonDisabled) return;
        setButtonDisabled(true);
        const validationsResult = await validateForm()
        if (validationsResult) {
            if (editCategory) {
                const dataToSave = { name: name, desc: desc, webpageName: webpageName, image: imageSrc, webpagePage: pageSelected?.toString() }
                EditCategoryByUid(categoryToEdit.id, dataToSave).then(() => {
                    toast.success(t("categories.crud-edit"));
                    getCategories();
                    handleShow(false);
                    setButtonDisabled(false);
                    cleanStates()
                }).catch((e) => console.log(e))
            } else {
                SaveCategory({ name: name, desc: desc, webpageName: webpageName, image: imageSrc, webpagePage: pageSelected?.toString(), createdAt: new Date() }).then(() => {
                    toast.success(t("categories.crud-create"));
                    getCategories();
                    handleShow(false);
                    setButtonDisabled(false);
                    cleanStates()
                })
            }
        } else setButtonDisabled(false);
    }

    const cleanStates = () => {
        setName("");
        setImageSrc("");
        setDesc("")
        setPageSelected(pagesWithCategoryCards[0]?.id || null)
    }

    useEffect(() => {
        if (editCategory) {
            setName(categoryToEdit.name);
            setImageSrc(categoryToEdit.image);
            setDesc(categoryToEdit.desc)
            setPageSelected(categoryToEdit?.webpagePage)
            
        } else cleanStates()
        console.log(":pagesWithCategoryCards", pagesWithCategoryCards)

    }, [])


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
            <div className="relative bg-white rounded-lg p-5 w-1/3 mx-auto z-50 border-[.2rem] border-gray-500">
                <p className="text-2xl font-semibold mb-6 flex items-center justify-center"><BiCategoryAlt className="mr-1 h-7 w-7" />{editCategory ? t("categories.edit") : t("buttons.new-category")}</p>
                <div>
                    <div className="relative">
                        <label className="text-gray-700 font-bold mb-2 flex" htmlFor="nombre">
                            {t("categories.name")} <p className="text-red-500 ml-1">*</p>
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                            id="nombre"
                            type="text"
                            placeholder={t("categories.name")}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {registrationError.name && <p className="animate__animated animate__flipInX absolute text-xs font-medium -bottom-1 right-0 text-red-600">* {registrationError.name}</p>}
                    </div>

                    <div className="relative">

                        <label className="text-gray-700 font-bold mb-2 flex" htmlFor="nombre">
                            {t("categories.description")} <p className="text-red-500 ml-1">*</p>
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                            id="nombre"
                            type="text"
                            placeholder={t("categories.description")}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        {registrationError.desc && <p className="animate__animated animate__flipInX absolute text-xs font-medium -bottom-1 right-0 text-red-600">* {registrationError.desc}</p>}
                    </div>

                    <div className="relative">
                        <label className="text-gray-700 font-bold mb-2 flex" htmlFor="nombre">
                            {t("categories.page-from")} <p className="text-red-500 ml-1">*</p>
                        </label>
                        <select
                            id="pages"
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                            value={pageSelected}
                            onChange={(e) => { setPageSelected(e.target.value) }}
                        >
                            {pagesWithCategoryCards.map((page, i) => (
                                <option key={i} value={page?.id}>
                                    {page?.name}
                                </option>
                            ))}
                        </select>
                        {registrationError.pageSelected && <p className="animate__animated animate__flipInX absolute text-xs font-medium -bottom-1 right-0 text-red-600">* {registrationError.pageSelected}</p>}
                    </div>

                    <label className="block text-gray-700 font-bold mb-2" htmlFor="image">{t("categories.cover-image")}</label>
                    <input
                        name="image"
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />

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
                            + {t("categories.add-image")}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </label>
                    }
                </div>
                <div className="flex items-center mt-6">
                    <button onClick={() => handleShow(false)} className="mx-auto cursor-pointer relative flex items-center justify-center w-[9rem] bg-red-500 border-2 border-gray-300 hover:bg-red-700 text-[1rem] text-center mt-3 py-2 px-4 rounded-xl text-gray-100">{t("buttons.cancel")}</button>
                    <button disabled={buttonDisabled} onClick={handleConfirm} className="mx-auto cursor-pointer relative flex items-center justify-center w-[9rem] bg-green-600 border-2 border-gray-300 hover:bg-green-700 text-[1rem] text-center mt-3 py-2 px-4 rounded-xl text-gray-100">{t("buttons.confirm")}</button>
                </div>
            </div>
        </div>
    );
}

export default CreateCategory;