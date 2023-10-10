import React, { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineColumnHeight } from 'react-icons/ai'
import { BiArrowToBottom, BiArrowToLeft, BiArrowToRight, BiArrowToTop, BiBorderRadius } from 'react-icons/bi'

export const Imagen = (props) => {
    const [contentValues, setContentValues] = useState(props?.content);

    const removeImage = (dropZoneElement) => {
        const thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb-1");

        if (thumbnailElement) {
            // Eliminar solo el thumbnailElement correspondiente
            thumbnailElement.remove();
        }
        // Restablecer el prompt si existe
        const promptElement = dropZoneElement.querySelector(".drop-zone__prompt-1");
        if (promptElement) {
            promptElement.classList.remove("hidden");
        }
        // Restablecer el valor del input
        const inputElement = dropZoneElement.querySelector(".drop-zone__input-1");
        if (inputElement) {
            inputElement.value = "";
        }
    };

    const handleDeleteImage = (type) => {
        const dropZoneElement = document.querySelector(`.drop-zone-1`);
        if (dropZoneElement) {
            removeImage(dropZoneElement);
            // setBgImage(null)
            handleBgImageChange(null)
        }
    };

    const DragAndDropLogic = () => {
        const dropZoneElements = document.querySelectorAll(".drop-zone-1");
        dropZoneElements.forEach((dropZoneElement, i) => {
            const inputElement = dropZoneElement.querySelector(".drop-zone__input-1");
            const type = dropZoneElement.getAttribute("data-type");
            let clicked = false; // Flag para controlar si se hizo clic en la zona de soltar
            dropZoneElement.addEventListener("click", (e) => {
                if (!clicked) {
                    if (i == 0) {
                        inputElement.click();
                    }
                }
            });

            inputElement.addEventListener("change", (e) => {
                if (inputElement.files.length) {
                    if (inputElement.files.length) {
                        // setBgImage(inputElement.files[0]);
                    }
                    updateThumbnail(dropZoneElement, inputElement.files[0]);
                }
                clicked = false; // Reiniciar el flag después de seleccionar el archivo
            });
            dropZoneElement.addEventListener("dragover", (e) => {
                e.preventDefault();
                dropZoneElement.classList.add("drop-zone--over-1");
            });
            ["dragleave", "dragend"].forEach((type) => {
                dropZoneElement.addEventListener(type, (e) => {
                    dropZoneElement.classList.remove("drop-zone--over-1");
                });
            });
            dropZoneElement.addEventListener("drop", (e) => {
                e.preventDefault();
                if (e.dataTransfer.files.length) {
                    inputElement.files = e.dataTransfer.files;
                    updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
                    // setBgImage(e.dataTransfer.files[0]);
                }
                dropZoneElement.classList.remove("drop-zone--over-1");
            });


        });
    };

    function updateThumbnail(dropZoneElement, file) {
        let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb-1");
        // First time - remove the prompt
        if (dropZoneElement.querySelector(".drop-zone__prompt-1")) {
            dropZoneElement.querySelector(".drop-zone__prompt-1").classList.add("hidden");
        }
        // First time - there is no thumbnail element, so lets create it
        if (!thumbnailElement) {
            thumbnailElement = document.createElement("div");
            thumbnailElement.classList.add("drop-zone__thumb-1");
            dropZoneElement.appendChild(thumbnailElement);
        }
        thumbnailElement.dataset.label = file.name;
        // Show thumbnail for image files
        if (file?.type?.startsWith("image/")) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
                handleBgImageChange(reader.result)
            };
        } else if (typeof file === 'string' && file.startsWith('http')) {
            // If the file is a link, use it directly as the background image URL
            thumbnailElement.style.backgroundImage = `url('${file}')`;
            var urlSections = file.split("/");
            var imageName = urlSections[urlSections.length - 1];
            imageName = decodeURIComponent(imageName.replace("images%2F", ""));
            imageName = imageName.split("?")[0];
            thumbnailElement.dataset.label = imageName;
        } else {
            thumbnailElement.style.backgroundImage = null;
        }
    }

    useEffect(() => {
        DragAndDropLogic();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContentValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    return (
        <div>
            <div className="drop-zone-1 cursor-pointer w-full">
                <label className="drop-zone__prompt-1 font-bold">Añadir imagen</label>
                <input type="file" name="myFilee" className="drop-zone__input-1" />
            </div>
            <AiOutlineClose className='w-4 h-4 text-[#d8d8d8] absolute -top-1 -right-1 bg-gray-500 rounded-full p-1 cursor-pointer' onClick={() => handleDeleteImage()} />

            <div className="flex items-center space-x-1.5 justify-between mt-5">

                <div className='flex justify-center items-center space-x-1'>
                    <AiOutlineColumnHeight className='w-5 h-5' />
                    <input name="height" value={contentValues?.height} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-1 hide-spin-buttons text-center' />
                    <em className='font-normal text-xs'>%</em>
                </div>

                <div className='flex justify-center items-center space-x-1'>
                    <AiOutlineColumnHeight className='w-5 h-5 rotate-90' />
                    <input name="width" value={contentValues?.width} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-1 hide-spin-buttons text-center' />
                    <em className='font-normal text-xs'>%</em>
                </div>

            </div>

            <div className='flex items-center space-x-1.5 justify-between mt-5'>

                <div className='flex justify-center items-center space-x-1'>
                    <BiArrowToLeft className='w-5 h-5' />
                    <input name="paddingLeft" value={contentValues?.paddingLeft} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-2 hide-spin-buttons text-center' />
                    <em className='font-normal text-xs'>%</em>
                </div>

                <div className='flex justify-center items-center space-x-1'>
                    <BiArrowToBottom className='w-5 h-5' />
                    <input name="paddingBottom" value={contentValues?.paddingBottom} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-2 hide-spin-buttons text-center' />
                    <em className='font-normal text-xs'>%</em>
                </div>

            </div>

            <div className='flex items-center space-x-1.5 justify-between mt-2'>
                <div className='flex justify-center items-center space-x-1'>
                    <BiArrowToRight className='w-5 h-5' />
                    <input name="paddingRight" value={contentValues?.paddingRight} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-2 hide-spin-buttons text-center' />
                    <em className='font-normal text-xs'>%</em>
                </div>
                <div className='flex justify-center items-center space-x-1'>
                    <BiArrowToTop className='w-5 h-5' />
                    <input name="paddingTop" value={contentValues?.paddingTop} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-2 hide-spin-buttons text-center' />
                    <em className='font-normal text-xs'>%</em>
                </div>
            </div>

            <div className='flex justify-center items-center space-x-1 my-5'>
                <BiBorderRadius className='w-5 h-5' />
                <input name="rounded" value={contentValues?.rounded} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-2 hide-spin-buttons text-center' />
                <em className='font-normal text-xs'>%</em>
            </div>

        </div>
    )
}
