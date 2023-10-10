import React, { useState } from 'react'
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight, AiOutlineBold, AiOutlineColumnHeight, AiOutlineFontColors, AiOutlineFontSize } from 'react-icons/ai'
import { BiArrowToBottom, BiArrowToLeft, BiArrowToRight, BiArrowToTop, BiBorderRadius } from 'react-icons/bi'

export const TextArea = (props) => {
    const [contentValues, setContentValues] = useState(props?.content);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContentValues((prevValues) => ({ ...prevValues, [name]: value }));
    };
    const handleBoldTextChange = () => {
        setContentValues((prevValues) => ({ ...prevValues, isBold: !prevValues.isBold }));
    };
    const handleTextPositionChange = (newPosition) => {
        setContentValues((prevValues) => ({ ...prevValues, position: newPosition }));
    };
    return (
        <div>
            <div className='relative'>
                <textarea name="text" value={contentValues?.text} onChange={handleInputChange} className='w-full rounded-[10px] shadow border py-1 pl-2 pr-7 border-[#224553]' />
                <AiOutlineBold onClick={handleBoldTextChange} className={`absolute top-2 right-1 font-bold w-5 h-5 cursor-pointer hover:bg-gray-500 rounded-full hover:text-white p-0.5 ${contentValues.isBold && "bg-gray-800 text-white"}`} />
            </div>

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

            <div className='flex justify-between px-4 items-center mt-5'>
                <AiOutlineAlignLeft className={`w-8 h-8 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues.position == "left" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("left")} />
                <AiOutlineAlignCenter className={`w-8 h-8 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues.position == "center" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("center")} />
                <AiOutlineAlignRight className={`w-8 h-8 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues.position == "right" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("right")} />
            </div>



            <div className='flex items-center space-x-1.5 justify-between my-5'>
                <div className='flex justify-center items-center space-x-1'>
                    <AiOutlineFontSize className='w-5 h-5' />
                    <input name="textSize" value={contentValues?.textSize} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-2 hide-spin-buttons text-center' />
                </div>

                <div className='flex justify-center items-center space-x-1'>
                    <AiOutlineFontColors className='w-5 h-5' />
                    <input name="color" value={contentValues?.color} onChange={handleInputChange} type="color" className='inputColor' />
                </div>

            </div>

        </div>
    )
}
