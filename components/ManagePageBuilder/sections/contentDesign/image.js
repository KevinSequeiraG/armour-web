import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight, AiOutlineClose, AiOutlineColumnHeight } from 'react-icons/ai'
import { BiArrowToBottom, BiArrowToLeft, BiArrowToRight, BiArrowToTop, BiBorderRadius } from 'react-icons/bi'

export const Imagen = (props) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [contentValues, setContentValues] = useState(props?.content);
    const fileInputRef = useRef();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target.result);
                setContentValues((prevValues) => ({
                    ...prevValues,
                    imageUrl: e.target.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContentValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleDeleteImage = () => {
        setImageSrc(null);
        fileInputRef.current.value = '';

        setContentValues((prevValues) => ({
            ...prevValues,
            imageUrl: null,
        }));
    };

    const handleTextPositionChange = (newPosition) => {
        setContentValues((prevValues) => ({ ...prevValues, position: newPosition }));
    };

    useEffect(() => {
        const allDataInContent = [...props?.pageContentDataSections];
        allDataInContent[props?.position] = contentValues;

        props?.setPageContentDataSections(allDataInContent)
    }, [contentValues])

    useEffect(() => {
        const sectionToEdit = props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.sections?.find(section => section?.id === props?.content?.id);
        if (sectionToEdit) {
            setContentValues(sectionToEdit)
            setImageSrc(sectionToEdit.imageUrl)
        }
    }, [props.currentPage, props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.sections])

    return (
        <div>
            <input
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
                        className='object-cover w-full h-[12rem] rounded-[10px]'
                    />
                    <button
                        onClick={handleDeleteImage}
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
            ) : (
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
            )}
            <div className="flex items-center space-x-1.5 justify-between mt-5">

                <div className='flex justify-center items-center space-x-1'>
                    <AiOutlineColumnHeight className='w-5 h-5' />
                    <input name="height" value={contentValues?.height} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-1 hide-spin-buttons text-center' />
                    <em className='font-normal text-xs'>px</em>
                </div>

                <div className='flex justify-center items-center space-x-1'>
                    <AiOutlineColumnHeight className='w-5 h-5 rotate-90' />
                    <input name="width" value={contentValues?.width} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-1 hide-spin-buttons text-center' />
                    <em className='font-normal text-xs'>px</em>
                </div>

            </div>

            <div className='flex items-center space-x-1.5 justify-between mt-5'>

                <div className='flex justify-center items-center space-x-1'>
                    <BiArrowToLeft className='w-5 h-5' />
                    <input name="paddingRight" value={contentValues?.paddingRight} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-2 hide-spin-buttons text-center' />
                    <em className='font-normal text-xs'>%</em>
                </div>

                <div className='flex justify-center items-center space-x-1'>
                    <BiArrowToBottom className='w-5 h-5' />
                    <input name="paddingTop" value={contentValues?.paddingTop} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-2 hide-spin-buttons text-center' />
                    <em className='font-normal text-xs'>%</em>
                </div>

            </div>

            <div className='flex items-center space-x-1.5 justify-between mt-2'>
                <div className='flex justify-center items-center space-x-1'>
                    <BiArrowToRight className='w-5 h-5' />
                    <input name="paddingLeft" value={contentValues?.paddingLeft} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-2 hide-spin-buttons text-center' />
                    <em className='font-normal text-xs'>%</em>
                </div>
                <div className='flex justify-center items-center space-x-1'>
                    <BiArrowToTop className='w-5 h-5' />
                    <input name="paddingBottom" value={contentValues?.paddingBottom} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-2 hide-spin-buttons text-center' />
                    <em className='font-normal text-xs'>%</em>
                </div>
            </div>

            <div className='flex justify-between px-4 items-center mt-5'>
                <AiOutlineAlignLeft className={`w-8 h-8 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues.position == "left" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("left")} />
                <AiOutlineAlignCenter className={`w-8 h-8 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues.position == "center" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("center")} />
                <AiOutlineAlignRight className={`w-8 h-8 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues.position == "right" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("right")} />
            </div>

            <div className='flex justify-center items-center space-x-1 my-5'>
                <BiBorderRadius className='w-5 h-5' />
                <input name="rounded" value={contentValues?.rounded} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-2 hide-spin-buttons text-center' />
                <em className='font-normal text-xs'>%</em>
            </div>
        </div>
    );
}
