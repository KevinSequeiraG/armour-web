import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import SidebarMenuOption from './sidebarMenuOption';
import NavbarOptions from './navbar/navbarOptions';
import { FiArrowLeftCircle } from 'react-icons/fi';
import Section from './sections';
import { BsSquare, BsSquareHalf, BsImage, BsCardText } from "react-icons/bs";
import { AiOutlineBgColors, AiOutlineColumnHeight, AiOutlineColumnWidth, AiOutlineDesktop, AiOutlineMobile } from 'react-icons/ai';
import { BiArrowFromRight, BiArrowToBottom, BiArrowToLeft, BiArrowToRight, BiArrowToTop, BiBookmarks, BiText } from "react-icons/bi";

const Sidebar = (props) => {
    const [activeButtonIndex, setActiveButtonIndex] = useState(-1);
    const { t } = useTranslation();
    const router = useRouter();

    const handleCloseButton = () => {
        //CLEAN STORAGE RELATED TO CREATE/EDIT
        router.back();
    };

    const handlePreviewModeClick = (option) => {
        const customEvent = new Event("previewModeChange");
        customEvent.option = option; // Adjunta la opción al evento personalizado
        window.dispatchEvent(customEvent); // Despacha el evento personalizado
    };

    const handleTabMenuClick = (index) => {
        activeButtonIndex === index ? setActiveButtonIndex(-1) : setActiveButtonIndex(index);
    };

    return (
        <aside className="bg-black w-full max-w-[30%] h-full flex !text-[#F5F5F5]">
            <div className='flex flex-col h-full w-1/2 border-r border-[#EFE1A2] pr-3 shadow-2xl'>
                <div className='font-medium text-[17px] h-[calc(100vh-3.5rem)] scrollbarDesignTiny overflow-y-auto justify-center items-center'>

                    <div className='flex items-center my-2 -space-x-1 justify-center'>
                        <img src="/images/awLogo-nobg.png" className="w-[6rem]" />
                        {/* <p className='text-xl font-bold uppercase'>Crear nueva página</p> */}
                    </div>

                    <SidebarMenuOption label="Menú" isActive={activeButtonIndex === 0} onClick={() => handleTabMenuClick(0)}>
                        <NavbarOptions />
                    </SidebarMenuOption>

                    <SidebarMenuOption label="Sections" isActive={activeButtonIndex === 1} onClick={() => handleTabMenuClick(1)}>
                        <Section />
                    </SidebarMenuOption>

                    <SidebarMenuOption label="Redes sociales" isActive={activeButtonIndex === 2} onClick={() => handleTabMenuClick(2)}                    >
                        <Section />
                    </SidebarMenuOption>

                    <SidebarMenuOption label="Paginas extras" isActive={activeButtonIndex === 3} onClick={() => handleTabMenuClick(3)}                    >
                        <Section />
                    </SidebarMenuOption>

                    <SidebarMenuOption label="Footer" isActive={activeButtonIndex === 4} onClick={() => handleTabMenuClick(4)}>
                        <Section />
                    </SidebarMenuOption>

                </div>
                <button className="optionButton w-fit !ml-5 !flex !items-center !justify-center" onClick={handleCloseButton}>
                    <FiArrowLeftCircle className='mr-1 w-5 h-5' />
                    Cancelar
                </button>
            </div>
            <div className='flex flex-col items-center w-1/2 max-w-[50%]'>
                <div className="flex justify-center items-center space-x-4 mt-8">
                    <div className='flex items-center '>
                        <div className={`${props.isMobilePreview ? "bg-white text-black" : "bg-[#224553] text-white"} w-full h-full rounded-l-[10px] shadow-md`} onClick={() => handlePreviewModeClick(false)}>
                            <AiOutlineDesktop className='h-10 w-10  cursor-pointer px-2' />
                        </div>

                        <div className='separator'></div> {/* Línea separadora */}

                        <div className={`${props.isMobilePreview ? "bg-[#224553] text-white" : "bg-white text-black"} w-full h-full rounded-r-[10px] shadow-md`} onClick={() => handlePreviewModeClick(true)}>
                            <AiOutlineMobile className='h-10 w-10 cursor-pointer px-2' />
                        </div>
                    </div>
                </div>

                <div className='bg-gray-200 drop-shadow-2xl shadow-md text-black rounded-[10px] ml-3 flex flex-col space-y-5 h-auto max-h-[calc(100vh-6.5rem)] mt-4 py-4 px-6 font-medium text-base overflow-y-auto scrollbarDesignTiny'>
                    <div className='flex flex-col items-center'>
                        Tipo de sección
                        <div className='flex'>
                            <BsSquare className='w-12 h-12 cursor-pointer hover:bg-gray-300 hover:shadow-md p-1.5 rounded-[10px]' />
                            <BsSquareHalf className='w-12 h-12 cursor-pointer hover:bg-gray-300 hover:shadow-md p-1.5 rounded-[10px]' />
                        </div>
                    </div>

                    {/* EMPIEZA FLUJO PARA DIV SIN DIVISIÓN */}
                    <hr className='border border-[#224553]' />

                    <div className='flex flex-col items-start border space-y-2'>
                        {/* <p>Dimensiones</p> */}
                        {/* <div className='flex justify-center items-center space-x-2'>
                            <AiOutlineColumnWidth className='w-8 h-8' />
                            <input type='number' className='w-1/2 bg-[#F5F5F5] border-2 border-[#224553] rounded-[10px] px-2 hide-spin-buttons text-center' />
                            <em className='font-normal text-sm'>px</em>
                        </div> */}
                        <p>Altura</p>
                        <div className='flex justify-center items-center space-x-2'>
                            <AiOutlineColumnHeight className='w-8 h-8' />
                            <input type='number' className='w-1/2 bg-[#F5F5F5] border-2 border-[#224553] rounded-[10px] px-2 hide-spin-buttons text-center' />
                            <em className='font-normal text-sm'>px</em>
                        </div>
                    </div>

                    <hr className='border border-[#224553]' />

                    {/* PONER POR DEFECTO UN PADDING, COMO EL CONTAINER DE BOOTSTRAP */}
                    <div className='flex flex-col items-start border space-y-2'>
                        <p>Relleno ¿padding?</p>
                        <div className='flex justify-center items-center space-x-2'>
                            <BiArrowToLeft className='w-8 h-8' />
                            <input type='number' className='w-1/2 bg-[#F5F5F5] border-2 border-[#224553] rounded-[10px] px-2 hide-spin-buttons text-center' />
                            <em className='font-normal text-sm'>px</em>
                        </div>
                        <div className='flex justify-center items-center space-x-2'>
                            <BiArrowToBottom className='w-8 h-8' />
                            <input type='number' className='w-1/2 bg-[#F5F5F5] border-2 border-[#224553] rounded-[10px] px-2 hide-spin-buttons text-center' />
                            <em className='font-normal text-sm'>px</em>
                        </div>
                        <div className='flex justify-center items-center space-x-2'>
                            <BiArrowToRight className='w-8 h-8' />
                            <input type='number' className='w-1/2 bg-[#F5F5F5] border-2 border-[#224553] rounded-[10px] px-2 hide-spin-buttons text-center' />
                            <em className='font-normal text-sm'>px</em>
                        </div>
                        <div className='flex justify-center items-center space-x-2'>
                            <BiArrowToTop className='w-8 h-8' />
                            <input type='number' className='w-1/2 bg-[#F5F5F5] border-2 border-[#224553] rounded-[10px] px-2 hide-spin-buttons text-center' />
                            <em className='font-normal text-sm'>px</em>
                        </div>
                    </div>

                    <hr className='border border-[#224553]' />

                    <div className='flex flex-col items-start border space-y-2'>
                        <p>Color de fondo</p>
                        <div className='flex justify-center items-center space-x-2 w-full px-2'>
                            <AiOutlineBgColors className='w-8 h-8' />
                            <input type="color" id="colorPicker" name="colorPicker" className='inputColor w-2/3 h-full' />
                        </div>
                    </div>

                    <hr className='border border-[#224553]' />

                    <div className='flex flex-col items-start border space-y-2'>
                        <p>Imagen de fondo</p>
                        <div className="drop-zone" data-type="logo">
                            <label className="drop-zone__prompt">Arrastra una imagen o <span className="text-[#33CA75] underline underline-offset-4">Busca el archivo</span></label>
                            <input type="file" name="myFilee" className="drop-zone__input" />
                        </div>
                    </div>

                    <hr className='border border-[#224553]' />

                    <div className='flex flex-col items-center border space-y-2'>
                        <p>Contenido</p>
                        {/* EMPIEZA CONTENIDO DEL SECTION */}
                        {/* LOS ELEMENTO DEBEN SER DRAG & DROP */}
                        {/* TERMINA CONTENIDO DEL SECTION */}


                        {/* BOTONES PARA AGREGAR NUEVO ELEMENTO */}
                        <div className='flex justify-center items-center space-x-5'>
                            <BsImage className='w-7 h-7 cursor-pointer' />
                            <BiText className='w-7 h-7 cursor-pointer' />
                            <BsCardText className='w-7 h-7 cursor-pointer' />
                            <BiBookmarks className='w-7 h-7 cursor-pointer' />
                        </div>
                    </div>
                    {/* TERMINA FLUJO PARA DIV SIN DIVISIÓN */}

                    {/* EMPIEZA FLUJO PARA DIV CON DIVISIÓN */}
                    {/* TERMINA FLUJO PARA DIV CON DIVISIÓN */}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
