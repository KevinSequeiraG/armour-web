import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight, AiOutlineBgColors, AiOutlineFontColors, AiOutlineFontSize } from 'react-icons/ai'
import { BiSolidInfoCircle } from 'react-icons/bi'
import { Tooltip } from 'react-tooltip';

export const Card = (props) => {
    const { t } = useTranslation();
    const [showTitleDesign, setShowTitleDesign] = useState(false);
    const [showDescDesign, setShowDescDesign] = useState(false);
    const [showButtonDesign, setShowButtonDesign] = useState(false);
    const [contentValues, setContentValues] = useState(props?.content);

    const cardDesignOptions = [
        { label: `${t("page-builder.tool-page-content-card-option")} 1`, value: 'card1' },
        { label: `${t("page-builder.tool-page-content-card-option")} 2`, value: 'card2' },
        { label: `${t("page-builder.tool-page-content-card-option")} 3`, value: 'card3' },
        { label: `${t("page-builder.tool-page-content-card-option")} 4`, value: 'card4' },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContentValues((prevValues) => ({ ...prevValues, [name]: (!isNaN(value) && (!value || value < 0)) ? 0 : value }));
    };

    const handleTextPositionChange = (newPosition, name) => {
        const completeName = name + "Position"
        setContentValues((prevValues) => ({ ...prevValues, [completeName]: newPosition }));
    };

    useEffect(() => {
        const allDataInContent = [...props?.pageContentDataSections];
        allDataInContent[props?.position] = contentValues;
        props?.setPageContentDataSections(allDataInContent)
    }, [contentValues]);

    useEffect(() => {
        if (props.webPageData.pages[props.currentPage - 1].sections.lenght > 1) {
            const dataToUpdate = { ...contentValues }

            const sectionToEdit = props.webPageData.pages[props.currentPage - 1].sections.find(section => section.id === dataToUpdate.id)
            if (sectionToEdit) {
                setContentValues({
                    ...dataToUpdate,
                    isCategory: sectionToEdit?.isCategory,
                    cardSelected: sectionToEdit?.cardSelected,
                    bgColor: sectionToEdit?.bgColor,
                    titlePosition: sectionToEdit?.titlePosition,
                    textSizeTitle: sectionToEdit?.textSizeTitle,
                    textColorTitle: sectionToEdit?.textColorTitle,
                    descPosition: sectionToEdit?.descPosition,
                    textSizeDesc: sectionToEdit?.textSizeDesc,
                    textColorDesc: sectionToEdit?.textColorDesc,
                    buttonPosition: sectionToEdit?.buttonPosition,
                    textSizeButton: sectionToEdit?.textSizeButton,
                    textColorButton: sectionToEdit?.textColorButton,
                    bgColorButton: sectionToEdit?.bgColorButton
                })
            }
        }
    }, [props.currentPage])

    return (
        <div>
            <div className='mt-3 ml-1.5 flex items-center'>
                <label className='flex items-center cursor-pointer'>
                    <input
                        type="radio"
                        checked={contentValues?.isCategory}
                        className='sr-only'
                        onClick={() => { setContentValues((prevValues) => ({ ...prevValues, 'isCategory': true })); }}
                    />
                    <span className={`mr-1 w-3.5 h-3.5 rounded-full border ${contentValues?.isCategory ? 'bg-[#3d4f61] border-yellow-400' : 'bg-white border-gray-400'}`}></span>
                    {t("page-builder.card-isCategory")}
                </label>
                <BiSolidInfoCircle className="ml-3 w-5 h-5 text-gray-500 hover:text-gray-600 cursor-pointer" data-tooltip-id="card-cat" data-tooltip-content={t("page-builder.tool-page-content-card-isCategory")} />
                <Tooltip id="card-cat" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
            </div>
            <div className='mt-2 ml-1.5 flex items-center'>
                <label className='flex items-center cursor-pointer'>
                    <input
                        type="radio"
                        checked={!contentValues?.isCategory}
                        className='sr-only'
                        onClick={() => { setContentValues((prevValues) => ({ ...prevValues, 'isCategory': false })); }}
                    />
                    <span className={`mr-1 w-3.5 h-3.5 rounded-full border ${!contentValues?.isCategory ? 'bg-[#3d4f61] border-yellow-400' : 'bg-white border-gray-400'}`}></span>
                    {t("page-builder.card-isProduct")}
                </label>
                <BiSolidInfoCircle className="ml-3.5 w-5 h-5 text-gray-500 hover:text-gray-600 cursor-pointer" data-tooltip-id="card-prod" data-tooltip-content={t("page-builder.tool-page-content-card-isProduct")} />
                <Tooltip id="card-prod" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
            </div>
            <div className='flex flex-col mt-4'>
                <label>{t("page-builder.tool-page-content-card-desing")}</label>
                <select
                    className="px-1 py-0.5 border rounded-lg w-2/3 mx-auto  mt-1 border-black"
                    value={contentValues?.cardSelected}
                    name="cardSelected"
                    onChange={handleInputChange}
                >
                    {cardDesignOptions.map((option, index) => (
                        <option key={index} value={option?.value}>
                            {option?.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className='mt-3'>
                <p className=''>{t("page-builder.tool-page-content-card-color")}</p>
                <div className='flex justify-center items-center w-full'>
                    <AiOutlineBgColors className='w-7 h-7' />
                    <input value={contentValues?.bgColor} onChange={handleInputChange} type="color" id="colorPicker" name="bgColor" className='inputColor w-2/5 h-[1.5rem]' />
                </div>
            </div>
            <div className='flex flex-col mt-4'>
                <button onClick={() => { setShowTitleDesign(!showTitleDesign); setShowDescDesign(false); setShowButtonDesign(false) }} className={`border-2 border-gray-400 ${showTitleDesign ? "bg-gray-700 text-white hover:bg-gray-900 rounded-t-[10px]" : "hover:bg-gray-200 bg-white text-black mb-2 rounded-[10px]"} w-full py-0.5`}>{t("page-builder.card-title-styles")}</button>
                {showTitleDesign &&
                    <div className='border-2 border-t-0 rounded-b-[10px] border-gray-400 mb-2 py-1'>
                        <div className='flex justify-between px-5 items-center mt-2'>
                            <AiOutlineAlignLeft className={`w-7 h-7 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues?.titlePosition == "left" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("left", "title")} data-tooltip-id="nav-content-image-left" data-tooltip-content={t("page-builder.left")} />
                            <Tooltip id="nav-content-image-left" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />

                            <AiOutlineAlignCenter className={`w-7 h-7 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues?.titlePosition == "center" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("center", "title")} data-tooltip-id="nav-content-image-center" data-tooltip-content={t("page-builder.center")} />
                            <Tooltip id="nav-content-image-center" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />

                            <AiOutlineAlignRight className={`w-7 h-7 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues?.titlePosition == "right" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("right", "title")} data-tooltip-id="nav-content-image-right" data-tooltip-content={t("page-builder.right")} />
                            <Tooltip id="nav-content-image-right" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
                        </div>
                        <div className='flex items-center justify-between mt-3 px-3'>
                            <div className='flex justify-center items-center space-x-1'>
                                <AiOutlineFontSize className='w-4 h-4' />
                                <input min={0} name="textSizeTitle" value={contentValues?.textSizeTitle} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-0.5 hide-spin-buttons text-center' data-tooltip-id="nav-content-text-size" data-tooltip-content={t("page-builder.tool-page-content-text-size")} />
                                <Tooltip id="nav-content-text-size" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
                            </div>

                            <div className='flex justify-center items-center'>
                                <AiOutlineFontColors className='w-4 h-4' />
                                <input name="textColorTitle" value={contentValues?.textColorTitle} onChange={handleInputChange} type="color" className='inputColor mb-1' />
                            </div>

                        </div>
                    </div>}

                <button onClick={() => { setShowTitleDesign(false); setShowDescDesign(!showDescDesign); setShowButtonDesign(false) }} className={`border-2 border-gray-400 ${showDescDesign ? "bg-gray-700 text-white hover:bg-gray-900 rounded-t-[10px]" : "hover:bg-gray-200 bg-white text-black mb-2 rounded-[10px]"} w-full py-0.5`}>{t("page-builder.card-desc-styles")}</button>
                {showDescDesign &&
                    <div className='border-2 border-t-0 rounded-b-[10px] border-gray-400 mb-2 py-1'>
                        <div className='flex justify-between px-5 items-center mt-2'>
                            <AiOutlineAlignLeft className={`w-7 h-7 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues?.descPosition == "left" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("left", "desc")} data-tooltip-id="nav-content-image-left" data-tooltip-content={t("page-builder.left")} />
                            <Tooltip id="nav-content-image-left" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />

                            <AiOutlineAlignCenter className={`w-7 h-7 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues?.descPosition == "center" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("center", "desc")} data-tooltip-id="nav-content-image-center" data-tooltip-content={t("page-builder.center")} />
                            <Tooltip id="nav-content-image-center" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />

                            <AiOutlineAlignRight className={`w-7 h-7 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues?.descPosition == "right" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("right", "desc")} data-tooltip-id="nav-content-image-right" data-tooltip-content={t("page-builder.right")} />
                            <Tooltip id="nav-content-image-right" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
                        </div>
                        <div className='flex items-center justify-between mt-3 px-3'>
                            <div className='flex justify-center items-center space-x-1'>
                                <AiOutlineFontSize className='w-4 h-4' />
                                <input min={0} name="textSizeDesc" value={contentValues?.textSizeDesc} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-0.5 hide-spin-buttons text-center' data-tooltip-id="nav-content-text-size" data-tooltip-content={t("page-builder.tool-page-content-text-size")} />
                                <Tooltip id="nav-content-text-size" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
                            </div>

                            <div className='flex justify-center items-center'>
                                <AiOutlineFontColors className='w-4 h-4' />
                                <input name="textColorDesc" value={contentValues?.textColorDesc} onChange={handleInputChange} type="color" className='inputColor mb-1' />
                            </div>
                        </div>

                    </div>}

                <button onClick={() => { setShowTitleDesign(false); setShowDescDesign(false); setShowButtonDesign(!showButtonDesign) }} className={`border-2 border-gray-400 ${showButtonDesign ? "bg-gray-700 text-white hover:bg-gray-900 rounded-t-[10px]" : "hover:bg-gray-200 bg-white text-black mb-2 rounded-[10px]"} w-full py-0.5`}>{t("page-builder.card-button-styles")}</button>
                {showButtonDesign &&
                    <div className='border-2 border-t-0 rounded-b-[10px] border-gray-400 mb-2 py-1'>
                        <div className='flex justify-between px-5 items-center mt-2'>
                            <AiOutlineAlignLeft className={`w-7 h-7 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues?.buttonPosition == "left" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("left", "button")} data-tooltip-id="nav-content-image-left" data-tooltip-content={t("page-builder.left")} />
                            <Tooltip id="nav-content-image-left" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />

                            <AiOutlineAlignCenter className={`w-7 h-7 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues?.buttonPosition == "center" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("center", "button")} data-tooltip-id="nav-content-image-center" data-tooltip-content={t("page-builder.center")} />
                            <Tooltip id="nav-content-image-center" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />

                            <AiOutlineAlignRight className={`w-7 h-7 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues?.buttonPosition == "right" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("right", "button")} data-tooltip-id="nav-content-image-right" data-tooltip-content={t("page-builder.right")} />
                            <Tooltip id="nav-content-image-right" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
                        </div>
                        <div className='flex items-center justify-between mt-3 px-3'>
                            <div className='flex justify-center items-center space-x-1'>
                                <AiOutlineFontSize className='w-4 h-4' />
                                <input min={0} name="textSizeButton" value={contentValues?.textSizeButton} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-0.5 hide-spin-buttons text-center' data-tooltip-id="nav-content-text-size" data-tooltip-content={t("page-builder.tool-page-content-text-size")} />
                                <Tooltip id="nav-content-text-size" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
                            </div>

                            <div className='flex justify-center items-center'>
                                <AiOutlineFontColors className='w-4 h-4' />
                                <input name="textColorButton" value={contentValues?.textColorButton} onChange={handleInputChange} type="color" className='inputColor mb-1' />
                            </div>
                        </div>
                        <div className='px-5 mt-2'>
                            <p className='mb-0.5'>{t("page-builder.bg-color")}</p>
                            <div className='flex justify-center items-center w-full'>
                                <AiOutlineBgColors className='w-7 h-7' />
                                <input value={contentValues?.bgColorButton} onChange={handleInputChange} type="color" id="colorPicker" name="bgColorButton" className='inputColor w-2/5 h-[1.5rem]' />
                            </div>
                        </div>
                    </div>}
            </div>
        </div>
    )
}
