import React, { useState } from 'react';
import { AiOutlineDesktop, AiOutlineMobile } from "react-icons/ai";

const PersonalizationHeader = () => {
    return (
        <div className="bg-[#212429] text-[#F5F5F5] border-b border-[#EFE1A2] h-20 mx-4 px-4 flex justify-between items-center text-start">

            <div className="border-r border-[#EFE1A2] h-full flex justify-center w-full items-center">
                <p>Opciones de personalizar texto</p>
            </div>
            <div className="border-r border-[#EFE1A2] h-full flex justify-center w-full items-center">
                <p>Opciones de personalizar imágenes</p>
            </div>
            <div className="border-r border-[#EFE1A2] h-full flex justify-center w-full items-center">
                <p>Opciones de personalizar secciones</p>
            </div>
            <div className="pl-5 h-full flex justify-center items-center space-x-4">
                <div className='flex items-center '>
                    <div className='bg-[#F5F5F5] w-full h-full rounded-l-[10px] shadow-md'>
                        <AiOutlineMobile className='h-10 w-10 text-black cursor-pointer px-2' />
                    </div>

                    <div className='separator'></div> {/* Línea separadora */}
                    <div className='bg-gray-950 w-full h-full rounded-r-[10px] shadow-md'>
                        <AiOutlineDesktop className='h-10 w-10 text-white cursor-pointer px-2' />
                    </div>

                </div>

            </div>

        </div>
    );
};

export default PersonalizationHeader;