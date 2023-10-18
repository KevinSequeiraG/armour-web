import { GetCategoriesByWebpage } from "@/helpers/categories";
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { EditProductByUid, SaveProduct } from "@/helpers/products";

const CreateProduct = ({ editProduct, productToEdit, isOpen, handleShow, webpageName, getProducts }) => {
    if (!isOpen) return null;
    const { t } = useTranslation();
    const [name, setName] = useState();
    const [desc, setDesc] = useState();
    const [imageSrc, setImageSrc] = useState(null);
    const [prize, setPrize] = useState();
    const fileInputRef = useRef();
    const [categorySelected, setCategorySelected] = useState();
    const [categories, setCategories] = useState([])

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

    const handleConfirm = () => {
        if (editProduct) {
            const dataToSave = { name: name, desc: desc, webpageName: webpageName, categoryId: categorySelected, prize: prize, image: imageSrc }
            EditProductByUid(productToEdit.id, dataToSave).then(() => {
                toast.success("Categoria actualizada");
                getProducts();
                handleShow(false);
            }).catch((e) => console.log(e))
        } else {
            SaveProduct({ name: name, desc: desc, webpageName: webpageName, categoryId: categorySelected, prize: prize, image: imageSrc }).then(() => {
                toast.success("Categoria hecha");
                getProducts();
                handleShow(false);
            })
        }
    }

    useEffect(() => {
        GetCategoriesByWebpage(webpageName).then(data => {
            setCategories(data)
            setCategorySelected(data[0].id)
        })
        if (editProduct) {
            setName(productToEdit.name);
            setImageSrc(productToEdit.image);
            setDesc(productToEdit.desc)
            setPrize(productToEdit.prize)
        }
    }, [])


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
            <div className="relative bg-white rounded-lg p-5 w-1/2 py-[3rem] mx-auto z-50 border border-[.2rem] border-gray-500">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                        Nombre
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-[20rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                        id="nombre"
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desc">
                        Descripción
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-[20rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                        id="desc"
                        type="text"
                        placeholder="Descripción"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prize">
                        Precio
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-[20rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                        id="prize"
                        type="number"
                        placeholder="Precio"
                        value={prize}
                        onChange={(e) => setPrize(e.target.value)}
                    />

                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Categoria a la que pertenece</label>
                    <select
                        className="p-2 border rounded-lg w-[20rem] my-2"
                        value={categorySelected}
                        onChange={(e) => { setCategorySelected(e.target.value) }}
                    >
                        {categories.map((category) => (
                            <option key={category?.id} value={category?.id}>
                                {category?.name}
                            </option>
                        ))}
                    </select>

                    <input
                        name="category"
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Imagen de fondo</label>
                    {imageSrc ? (
                        <div style={{ position: 'relative' }}>
                            <img
                                src={imageSrc}
                                alt="Uploaded"
                                // style={{ ...imageStyles }}
                                className='object-cover w-full h-[12rem] rounded-[10px]'
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
                                    padding: '0.2rem 0.4rem',
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
                            className='w-full h-[12rem]'
                        >
                            Añadir imagen
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </label>
                    }
                </div>
                <div className="flex">
                    <button onClick={() => handleShow(false)} className="mx-auto cursor-pointer relative flex items-center justify-center w-[8rem] bg-red-500 border border-2 border-gray-300 hover:bg-red-700 text-[1rem] text-center mt-3 py-2 px-4 rounded-xl text-gray-200">{t("buttons.cancel")}</button>
                    <button onClick={handleConfirm} className="mx-auto cursor-pointer relative flex items-center justify-center w-[8rem] bg-green-600 border border-2 border-gray-300 hover:bg-green-700 text-[1rem] text-center mt-3 py-2 px-4 rounded-xl text-gray-200">{t("buttons.confirm")}</button>
                </div>
            </div>
        </div>
    );
}

export default CreateProduct;