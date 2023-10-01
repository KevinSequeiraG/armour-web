import React, { useState } from 'react';
import { AiOutlineDesktop, AiOutlineMobile } from "react-icons/ai";

const PersonalizationHeader = () => {
    return (
        <div className="bg-black text-[#F5F5F5] border-b border-[#EFE1A2] h-20 mx-4 px-4 flex justify-between items-center text-start">

            <div className="border-r border-[#EFE1A2] h-full flex justify-center w-full items-center">
                <p>Opciones de personalizar texto</p>
            </div>
            <div className="border-r border-[#EFE1A2] h-full flex justify-center w-full items-center">
                <p>Opciones de personalizar imágenes</p>
            </div>
            <div className="border-r border-[#EFE1A2] h-full flex justify-center w-full items-center">
                <p>Opciones de personalizar secciones</p>
            </div>


        </div>
    );
};

export default PersonalizationHeader;