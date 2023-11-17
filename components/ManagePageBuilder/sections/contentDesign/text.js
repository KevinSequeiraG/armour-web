import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight, AiOutlineBold, AiOutlineFontColors, AiOutlineFontSize } from 'react-icons/ai'
import { BiArrowToBottom, BiArrowToLeft, BiArrowToRight, BiArrowToTop } from 'react-icons/bi'
import { Tooltip } from 'react-tooltip';

export const Text = (props) => {
    const { t } = useTranslation();
    const [contentValues, setContentValues] = useState(props?.content);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContentValues((prevValues) => ({ ...prevValues, [name]: (!isNaN(value) && (!value || value < 0)) ? 0 : value }));
    };

    const handleBoldTextChange = () => {
        setContentValues((prevValues) => ({ ...prevValues, isBold: !prevValues.isBold }));
    };

    const handleTextPositionChange = (newPosition) => {
        setContentValues((prevValues) => ({ ...prevValues, position: newPosition }));
    };

    useEffect(() => {
        const allDataInContent = [...props?.pageContentDataSections];
        allDataInContent[props?.position] = contentValues;

        props?.setPageContentDataSections(allDataInContent)
    }, [contentValues]);

    useEffect(() => {
        const sectionToEdit = props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.sections?.find(section => section?.id === props?.content?.id);

        if (sectionToEdit) setContentValues(sectionToEdit)
    }, [props.currentPage])

    return (
        <div>
            <div className='relative'>
                <input name="text" value={contentValues?.text} onChange={handleInputChange} className='w-full rounded-[10px] shadow border py-[3px] pl-2 pr-7 border-[#224553]' />
                <AiOutlineBold onClick={handleBoldTextChange} className={`absolute top-1 right-1 font-bold w-5 h-5 cursor-pointer hover:bg-gray-500 rounded-full hover:text-white p-0.5 ${contentValues?.isBold && "bg-gray-800 text-white"}`} data-tooltip-id="nav-content-text-bold" data-tooltip-content={t("page-builder.tool-page-content-text-bold")} />
                <Tooltip id="nav-content-text-bold" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
            </div>

            <div className='flex items-center space-x-1 justify-between mt-3'>

                <div className='flex justify-center items-center space-x-1'>
                    <BiArrowToLeft className='w-5 h-5' />
                    <input min={0} name="marginRight" value={contentValues?.marginRight} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-0.5 hide-spin-buttons text-center' data-tooltip-id="nav-content-text-pl" data-tooltip-content={t("page-builder.tool-page-padding-left")} />
                    <em className='font-normal text-xs'>%</em>
                    <Tooltip id="nav-content-text-pl" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
                </div>

                <div className='flex justify-center items-center space-x-1'>
                    <BiArrowToBottom className='w-5 h-5' />
                    <input min={0} name="marginTop" value={contentValues?.marginTop} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-0.5 hide-spin-buttons text-center' data-tooltip-id="nav-content-text-pb" data-tooltip-content={t("page-builder.tool-page-padding-bottom")} />
                    <em className='font-normal text-xs'>%</em>
                    <Tooltip id="nav-content-text-pb" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
                </div>

            </div>

            <div className='flex items-center space-x-1.5 justify-between mt-2'>
                <div className='flex justify-center items-center space-x-1'>
                    <BiArrowToRight className='w-5 h-5' />
                    <input min={0} name="marginLeft" value={contentValues?.marginLeft} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-0.5 hide-spin-buttons text-center' data-tooltip-id="nav-content-text-pr" data-tooltip-content={t("page-builder.tool-page-padding-right")} />
                    <em className='font-normal text-xs'>%</em>
                    <Tooltip id="nav-content-text-pr" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
                </div>
                <div className='flex justify-center items-center space-x-1'>
                    <BiArrowToTop className='w-5 h-5' />
                    <input min={0} name="marginBottom" value={contentValues?.marginBottom} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-0.5 hide-spin-buttons text-center' data-tooltip-id="nav-content-text-pt" data-tooltip-content={t("page-builder.tool-page-padding-top")} />
                    <em className='font-normal text-xs'>%</em>
                    <Tooltip id="nav-content-text-pt" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
                </div>
            </div>

            <div className='flex justify-between px-6 items-center mt-4'>
                <AiOutlineAlignLeft className={`w-7 h-7 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues.position == "left" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("left")} data-tooltip-id="nav-content-text-left" data-tooltip-content={t("page-builder.left")} />
                <Tooltip id="nav-content-text-left" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />

                <AiOutlineAlignCenter className={`w-7 h-7 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues.position == "center" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("center")} data-tooltip-id="nav-content-text-center" data-tooltip-content={t("page-builder.center")} />
                <Tooltip id="nav-content-text-center" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />

                <AiOutlineAlignRight className={`w-7 h-7 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues.position == "right" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("right")} data-tooltip-id="nav-content-text-right" data-tooltip-content={t("page-builder.right")} />
                <Tooltip id="nav-content-text-right" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
            </div>

            <div className='flex items-center space-x-1.5 justify-between mt-3'>
                <div className='flex justify-center items-center space-x-1'>
                    <AiOutlineFontSize className='w-4 h-4' />
                    <input min={0} name="textSize" value={contentValues?.textSize} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-0.5 hide-spin-buttons text-center' data-tooltip-id="nav-content-text-size" data-tooltip-content={t("page-builder.tool-page-content-text-size")} />
                    <em className='font-normal text-xs'>px</em>
                    <Tooltip id="nav-content-text-size" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
                </div>

                <div className='flex justify-center items-center space-x-1'>
                    <AiOutlineFontColors className='w-4 h-4' />
                    <input name="color" value={contentValues?.color} onChange={handleInputChange} type="color" className='inputColor mb-1' />
                </div>

            </div>

        </div>
    )
}
