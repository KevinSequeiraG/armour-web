import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight, AiOutlineBgColors, AiOutlineBold, AiOutlineColumnHeight, AiOutlineFontColors, AiOutlineFontSize } from 'react-icons/ai'
import { BiArrowToBottom, BiArrowToLeft, BiArrowToRight, BiArrowToTop } from 'react-icons/bi'
import Switch from 'react-switch';

export const Card = (props) => {
    const { t } = useTranslation();
    const [showTitleDesign, setShowTitleDesign] = useState(false);
    const [showDescDesign, setShowDescDesign] = useState(false);
    const [showButtonDesign, setShowButtonDesign] = useState(false);
    const [showCardDesign, setShowCardDesign] = useState(false);
    const [contentValues, setContentValues] = useState(props?.content);
    const [imageSrc, setImageSrc] = useState(null);
    const options = [
        { label: 'Opción 1', value: 'card1' },
        { label: 'Opción 2', value: 'card2' },
        { label: 'Opción 3', value: 'card3' },
        { label: 'Opción 4', value: 'card4' },
    ];
    const [cardOption, setCardOption] = useState();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target.result);
                setContentValues((prevValues) => ({ ...prevValues, image: e.target.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteBGImage = () => {
        setImageSrc(null);
        setContentValues((prevValues) => ({ ...prevValues, image: null }));
    };

    const onChangeCardOption = (e) => {
        setCardOption(e.target.value)
        handleInputChange(e)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContentValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleBoldTextChange = () => {
        setContentValues((prevValues) => ({ ...prevValues, isBold: !prevValues.isBold }));
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
                setContentValues({ ...dataToUpdate, color: sectionToEdit.color, text: sectionToEdit.text, height: sectionToEdit.height, isBold: sectionToEdit.isBold, marginBottom: sectionToEdit.marginBottom, marginLeft: sectionToEdit.marginLeft, marginRight: sectionToEdit.marginRight, marginTop: sectionToEdit.marginTop, position: sectionToEdit.position, textSize: sectionToEdit.textSize, width: sectionToEdit.width })
            }
        }
    }, [props.currentPage])

    // NEW DATA
    const [isCategory, setIsCategory] = useState(true);
    return (
        <div>
            <div className='flex flex-col'>
                <label>Tipo de card</label>
                <select
                    className="p-2 border rounded-lg w-full my-2"
                    value={cardOption}
                    name="cardSelected"
                    onChange={onChangeCardOption}
                >
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className='relative flex items-center justify-between mx-2'>
                <p>Producto</p>
                <Switch name='cardType' onChange={(value) => { setIsCategory(!isCategory); setContentValues((prevValues) => ({ ...prevValues, 'isCategory': value })); }} checked={isCategory} offColor="#3d4f61" onColor="#3d4f61" uncheckedIcon={false} checkedIcon={false} width={40} handleDiameter={10} />
                <p>Categoría</p>
            </div>
            <div className='flex flex-col'>
                <button onClick={() => { setShowCardDesign(!showCardDesign); }} className={`${showCardDesign ? "bg-gray-700 text-white mt-4 hover:bg-gray-900" : "hover:bg-gray-200 bg-white text-black mt-4 mb-2"} w-full py-2 border-2 border-gray-400 rounded-xl`}>Estilos card</button>
                {showCardDesign && <div className='mb-4'>
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
                    <div className='flex items-center space-x-1.5 justify-between mt-2'>

                        <div className='flex justify-center items-center space-x-1'>
                            <BiArrowToLeft className='w-5 h-5' />
                            <input name="marginRight" value={contentValues?.marginRight} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-2 hide-spin-buttons text-center' />
                            <em className='font-normal text-xs'>%</em>
                        </div>

                        <div className='flex justify-center items-center space-x-1'>
                            <BiArrowToBottom className='w-5 h-5' />
                            <input name="marginTop" value={contentValues?.marginTop} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-2 hide-spin-buttons text-center' />
                            <em className='font-normal text-xs'>%</em>
                        </div>

                    </div>

                    <div className='flex items-center space-x-1.5 justify-between mt-2'>
                        <div className='flex justify-center items-center space-x-1'>
                            <BiArrowToRight className='w-5 h-5' />
                            <input name="marginLeft" value={contentValues?.marginLeft} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-2 hide-spin-buttons text-center' />
                            <em className='font-normal text-xs'>%</em>
                        </div>
                        <div className='flex justify-center items-center space-x-1'>
                            <BiArrowToTop className='w-5 h-5' />
                            <input name="marginBottom" value={contentValues?.marginBottom} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-2 hide-spin-buttons text-center' />
                            <em className='font-normal text-xs'>%</em>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <p className=''>{t("page-builder.bg-color")}</p>
                        <div className='flex justify-center items-center w-full'>
                            <AiOutlineBgColors className='w-7 h-7' />
                            <input value={contentValues?.bgColorButton} onChange={handleInputChange} type="color" id="colorPicker" name="bgColor" className='inputColor w-2/3 h-[1.5rem]' />
                        </div>
                    </div>
                </div>
                }

                <button onClick={() => setShowTitleDesign(!showTitleDesign)} className={`${showTitleDesign ? "bg-gray-700 text-white mt-4 hover:bg-gray-900" : "hover:bg-gray-200 bg-white text-black mb-2"} w-full py-2 border-2 border-gray-400 rounded-xl`}>Estilos titulo</button>
                {showTitleDesign &&
                    <>
                        <div className='flex justify-between px-4 items-center mt-2'>
                            <AiOutlineAlignLeft className={`w-8 h-8 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues.titlePosition == "left" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("left", "title")} />
                            <AiOutlineAlignCenter className={`w-8 h-8 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues.titlePosition == "center" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("center", "title")} />
                            <AiOutlineAlignRight className={`w-8 h-8 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues.titlePosition == "right" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("right", "title")} />
                        </div>
                        <div className='flex items-center space-x-1.5 justify-between my-5'>
                            <div className='flex justify-center items-center space-x-1'>
                                <AiOutlineFontSize className='w-5 h-5' />
                                <input name="textSizeTitle" value={contentValues?.textSizeTitle} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-2 hide-spin-buttons text-center' />
                            </div>
                            <div className='flex justify-center items-center space-x-1'>
                                <AiOutlineFontColors className='w-5 h-5' />
                                <input name="textColorTitle" value={contentValues?.textColorTitle} onChange={handleInputChange} type="color" className='inputColor' />
                            </div>
                        </div>
                    </>}

                <button onClick={() => setShowDescDesign(!showDescDesign)} className={`${showDescDesign ? "bg-gray-700 text-white mt-2 hover:bg-gray-900" : "hover:bg-gray-200 bg-white text-black mt-0 mb-2"} w-full py-2 border-2 border-gray-400 rounded-xl`}>Estilos Descripcion</button>
                {showDescDesign &&
                    <>
                        <div className='flex justify-between px-4 items-center mt-2'>
                            <AiOutlineAlignLeft className={`w-8 h-8 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues.descPosition == "left" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("left", "desc")} />
                            <AiOutlineAlignCenter className={`w-8 h-8 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues.descPosition == "center" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("center", "desc")} />
                            <AiOutlineAlignRight className={`w-8 h-8 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues.descPosition == "right" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("right", "desc")} />
                        </div>
                        <div className='flex items-center space-x-1.5 justify-between my-5'>
                            <div className='flex justify-center items-center space-x-1'>
                                <AiOutlineFontSize className='w-5 h-5' />
                                <input name="textSizeDesc" value={contentValues?.textSizeDesc} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-2 hide-spin-buttons text-center' />
                            </div>
                            <div className='flex justify-center items-center space-x-1'>
                                <AiOutlineFontColors className='w-5 h-5' />
                                <input name="textColorDesc" value={contentValues?.textColorDesc} onChange={handleInputChange} type="color" className='inputColor' />
                            </div>
                        </div>
                    </>}

                <button onClick={() => setShowButtonDesign(!showButtonDesign)} className={`${showButtonDesign ? "bg-gray-700 text-white mt-2 hover:bg-gray-900" : "hover:bg-gray-200 bg-white text-black mt-0 mb-2"} w-full py-2 border-2 border-gray-400 rounded-xl`}>Estilos de boton</button>
                {showButtonDesign &&
                    <>
                        {!isCategory && <div className='relative mt-2'>
                            <label>Precio base:</label>
                            <input name="prodPrize" value={contentValues?.text} onChange={handleInputChange} className='w-full rounded-[10px] shadow border py-1 px-2 border-[#224553]' type='number' />
                            {/* <AiOutlineBold onClick={handleBoldTextChange} className={`absolute top-2 right-1 font-bold w-5 h-5 cursor-pointer hover:bg-gray-500 rounded-full hover:text-white p-0.5 ${contentValues?.isBold && "bg-gray-800 text-white"}`} /> */}
                        </div>}
                        <div className='flex justify-between px-4 items-center mt-2'>
                            <AiOutlineAlignLeft className={`w-8 h-8 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues.buttonPosition == "left" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("left", "button")} />
                            <AiOutlineAlignCenter className={`w-8 h-8 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues.buttonPosition == "center" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("center", "button")} />
                            <AiOutlineAlignRight className={`w-8 h-8 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${contentValues.buttonPosition == "right" && "!bg-gray-800 text-white"}`} onClick={() => handleTextPositionChange("right", "button")} />
                        </div>
                        <div className='flex items-center space-x-1.5 justify-between '>
                            <div className='flex justify-center items-center space-x-1'>
                                <AiOutlineFontSize className='w-5 h-5' />
                                <input name="textSizeButton" value={contentValues?.textSizeButton} onChange={handleInputChange} type='number' className='w-1/2 bg-white border border-[#224553] rounded-[5px] px-2 hide-spin-buttons text-center' />
                            </div>
                            <div className='flex justify-center items-center space-x-1'>
                                <AiOutlineFontColors className='w-5 h-5' />
                                <input name="textColorButton" value={contentValues?.textColorButton} onChange={handleInputChange} type="color" className='inputColor' />
                            </div>
                        </div>
                        <div className='mx-2'>
                            <p className=''>{t("page-builder.bg-color")}</p>
                            <div className='flex justify-center items-center w-full'>
                                <AiOutlineBgColors className='w-7 h-7' />
                                <input value={contentValues?.bgColorButton} onChange={handleInputChange} type="color" id="colorPicker" name="bgColorButton" className='inputColor w-2/3 h-[1.5rem]' />
                            </div>
                        </div>
                    </>}
            </div>
        </div>
    )
}
