import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import SidebarMenuOption from './sidebarMenuOption';


const Sidebar = () => {
    const [activeButtonIndex, setActiveButtonIndex] = useState(-1);
    const { t } = useTranslation();
    const router = useRouter();

    const handleCloseButton = () => {
        //CLEAN STORAGE RELATED TO CREATE/EDIT


        router.back();
    };

    const handleTabMenuClick = (index) => {
        activeButtonIndex === index ? setActiveButtonIndex(-1) : setActiveButtonIndex(index);
    };

    return (
        <aside className="bg-[#212429] w-[25%] h-full flex justify-between flex-col border-r-2 border-[#EFE1A2] !text-[#F5F5F5]">
            <div className='font-medium text-[17px] h-[calc(100vh-1rem)] scrollbarDesign overflow-y-auto w-full justify-center items-center'>

                <div className='flex items-center my-2 -space-x-1 justify-center'>
                    <img src="/images/awLogo.png" className="w-[5rem]" />
                    <p className='text-xl font-bold uppercase'>Crear nueva página</p>
                </div>

                <SidebarMenuOption label="Encabezado" isActive={activeButtonIndex === 0} onClick={() => handleTabMenuClick(0)}                    >
                    <button className="button truncate w-full h-36"><img src="/svgs/Car.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Arroba.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Car.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Arroba.svg" className="w-[1.5rem]" />Aquí un card</button>

                    <button className="button truncate w-full h-36"><img src="/svgs/Car.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Arroba.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Car.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Arroba.svg" className="w-[1.5rem]" />Aquí un card</button>

                    <button className="button truncate w-full h-36"><img src="/svgs/Car.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Arroba.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Car.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Arroba.svg" className="w-[1.5rem]" />Aquí un card</button>
                </SidebarMenuOption>

                <SidebarMenuOption label="Encabezado 2" isActive={activeButtonIndex === 1} onClick={() => handleTabMenuClick(1)}                    >
                    <button className="button truncate w-full h-36"><img src="/svgs/Car.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Arroba.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Car.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Arroba.svg" className="w-[1.5rem]" />Aquí un card</button>
                </SidebarMenuOption>

                <SidebarMenuOption label="Encabezado 3" isActive={activeButtonIndex === 2} onClick={() => handleTabMenuClick(2)}                    >
                    <button className="button truncate w-full h-36"><img src="/svgs/Car.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Arroba.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Car.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Arroba.svg" className="w-[1.5rem]" />Aquí un card</button>
                </SidebarMenuOption>

                <SidebarMenuOption label="Encabezado 4" isActive={activeButtonIndex === 3} onClick={() => handleTabMenuClick(3)}                    >
                    <button className="button truncate w-full h-36"><img src="/svgs/Car.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Arroba.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Car.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Arroba.svg" className="w-[1.5rem]" />Aquí un card</button>
                </SidebarMenuOption>

                <SidebarMenuOption label="Encabezado 5" isActive={activeButtonIndex === 4} onClick={() => handleTabMenuClick(4)}                    >
                    <button className="button truncate w-full h-36"><img src="/svgs/Car.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Arroba.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Car.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Arroba.svg" className="w-[1.5rem]" />Aquí un card</button>
                </SidebarMenuOption>

                <SidebarMenuOption label="Encabezado 6" isActive={activeButtonIndex === 5} onClick={() => handleTabMenuClick(5)}                    >
                    <button className="button truncate w-full h-36"><img src="/svgs/Car.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Arroba.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Car.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Arroba.svg" className="w-[1.5rem]" />Aquí un card</button>
                </SidebarMenuOption>

                <SidebarMenuOption label="Encabezado 7" isActive={activeButtonIndex === 6} onClick={() => handleTabMenuClick(6)}                    >
                    <button className="button truncate w-full h-36"><img src="/svgs/Car.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Arroba.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Car.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Arroba.svg" className="w-[1.5rem]" />Aquí un card</button>
                </SidebarMenuOption>

                <SidebarMenuOption label="Encabezado 8" isActive={activeButtonIndex === 7} onClick={() => handleTabMenuClick(7)}                    >
                    <button className="button truncate w-full h-36"><img src="/svgs/Car.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Arroba.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Car.svg" className="w-[1.5rem]" />Aquí un card</button>
                    <button className="button truncate w-full h-36"><img src="/svgs/Arroba.svg" className="w-[1.5rem]" />Aquí un card</button>
                </SidebarMenuOption>

            </div>
            <button className="button w-fit !ml-5" onClick={handleCloseButton}><img src="/svgs/LogOut.svg" className="mr-2" />Cancelar progreso</button>
        </aside>
    );
};

export default Sidebar;
