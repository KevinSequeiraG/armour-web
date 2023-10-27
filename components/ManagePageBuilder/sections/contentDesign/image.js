import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight, AiOutlineClose, AiOutlineColumnHeight } from 'react-icons/ai'
import { BiArrowToBottom, BiArrowToLeft, BiArrowToRight, BiArrowToTop, BiBorderRadius } from 'react-icons/bi'
import { Tooltip } from 'react-tooltip';

export const Imagen = (props) => {
    const { t } = useTranslation();
    const [contentValues, setContentValues] = useState(props?.content);
    const fileInputRef = useRef();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
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
            [name]: (!value||value < 0) ? 0 : value,
        }));
    };

    const handleDeleteImage = () => {
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
        if (sectionToEdit) setContentValues(sectionToEdit)

    }, [props.currentPage])

    return (
        <div className='mt-3.5'>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            {contentValues.imageUrl ? (
                <div style={{ position: 'relative' }}>
                    <img
                        src={contentValues.imageUrl}
                        alt="Uploaded"
                        // style={{ ...imageStyles }}
                        className='object-cover w-full max-h-[7rem] min-h-[7rem] rounded-[10px] border-2 border-dashed border-[#224553]'
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
                            padding: '0rem 0.40rem',
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
                    className='w-full max-h-[7rem] min-h-[7rem] bg-[#f5f5f5]'
                >
                    + {t("buttons.add-img")}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </label>
            )}
            <div className="flex items-center justify-between mt-5">

                <div className='flex justify-center items-center space-x-1 mr-1'>
                    <AiOutlineColumnHeight className='w-5 h-5' />
                    <input min={0} name="height" value={contentValues?.height} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-0.5 hide-spin-buttons text-center' data-tooltip-id="nav-content-image-h" data-tooltip-content={t("page-builder.tool-page-content-image-h")} />
                    <em className='font-normal text-xs'>px</em>
                    <Tooltip id="nav-content-image-h" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
                </div>

                <div className='flex justify-center items-center space-x-1'>
                    <AiOutlineColumnHeight className='w-5 h-5 rotate-90' />
                    <input min={0} name="width" value={contentValues?.width} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-1 hide-spin-buttons text-center' data-tooltip-id="nav-content-image-w" data-tooltip-content={t("page-builder.tool-page-content-image-w")} />
                    <em className='font-normal text-xs'>px</em>
                    <Tooltip id="nav-content-image-w" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
                </div>

            </div>

            <div className='flex items-center space-x-1 justify-between mt-4'>

                <div className='flex justify-center items-center space-x-1'>
                    <BiArrowToLeft className='w-5 h-5' />
                    <input min={0} name="paddingRight" value={contentValues?.paddingRight} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] hide-spin-buttons text-center' data-tooltip-id="nav-content-image-pl" data-tooltip-content={t("page-builder.tool-page-padding-left")} />
                    <em className='font-normal text-xs'>%</em>
                    <Tooltip id="nav-content-image-pl" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
                </div>

                <div className='flex justify-center items-center space-x-1'>
                    <BiArrowToBottom className='w-5 h-5' />
                    <input min={0} name="paddingTop" value={contentValues?.paddingTop} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px]  hide-spin-buttons text-center' data-tooltip-id="nav-content-image-pb" data-tooltip-content={t("page-builder.tool-page-padding-bottom")} />
                    <em className='font-normal text-xs'>%</em>
                    <Tooltip id="nav-content-image-pb" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
                </div>

            </div>

            <div className='flex items-center space-x-1 justify-between mt-1.5'>
                <div className='flex justify-center items-center space-x-1'>
                    <BiArrowToRight className='w-5 h-5' />
                    <input min={0} name="paddingLeft" value={contentValues?.paddingLeft} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px]  hide-spin-buttons text-center' data-tooltip-id="nav-content-image-pr" data-tooltip-content={t("page-builder.tool-page-padding-right")} />
                    <em className='font-normal text-xs'>%</em>
                    <Tooltip id="nav-content-image-pr" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
                </div>
                <div className='flex justify-center items-center space-x-1'>
                    <BiArrowToTop className='w-5 h-5' />
                    <input min={0} name="paddingBottom" value={contentValues?.paddingBottom} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px]  hide-spin-buttons text-center' data-tooltip-id="nav-content-image-pt" data-tooltip-content={t("page-builder.tool-page-padding-top")} />
                    <em className='font-normal text-xs'>%</em>
                    <Tooltip id="nav-content-image-pt" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
                </div>
            </div>

            <div className='flex justify-between px-6 items-center mt-4'>
                <AiOutlineAlignLeft className={`w-7 h-7 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues.position == "left" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("left")} data-tooltip-id="nav-content-image-left" data-tooltip-content={t("page-builder.left")} />
                <Tooltip id="nav-content-image-left" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />

                <AiOutlineAlignCenter className={`w-7 h-7 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues.position == "center" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("center")} data-tooltip-id="nav-content-image-center" data-tooltip-content={t("page-builder.center")} />
                <Tooltip id="nav-content-image-center" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />

                <AiOutlineAlignRight className={`w-7 h-7 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues.position == "right" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("right")} data-tooltip-id="nav-content-image-right" data-tooltip-content={t("page-builder.right")} />
                <Tooltip id="nav-content-image-right" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
            </div>

            <div className='flex justify-center items-center space-x-1 mt-4 mb-1'>
                <BiBorderRadius className='w-5 h-5' />
                <input min={0} name="rounded" value={contentValues?.rounded} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] hide-spin-buttons text-center' data-tooltip-id="nav-content-image-rounded" data-tooltip-content={t("page-builder.tool-page-content-image-rounded")} />
                <Tooltip id="nav-content-image-rounded" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
                <em className='font-normal text-xs'>%</em>
            </div>
        </div>
    );
}
