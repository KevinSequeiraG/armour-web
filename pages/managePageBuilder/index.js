import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

export default function ManagePageBuilder() {
    const { t } = useTranslation();
    const router = useRouter();

    const [activeButtonIndex, setActiveButtonIndex] = useState(0);

    const handleTabMenuClick = (index) => {
        setActiveButtonIndex(index);
    };

    const handleCloseButton = () => {
        //CLEAN STORAGE RELATED TO CREATE/EDIT


        router.back();
    };

    return (
        <div className='bg-[#212429] h-full w-full flex'>
            <aside className="bg-[#212429] w-[25%] h-full flex justify-between flex-col border-r-2 border-[#EFE1A2] !text-[#F5F5F5]">
                <div className='font-medium text-[17px] w-full justify-center items-center'>

                    <div className='flex items-center my-2 -space-x-1 justify-center'>
                        <img src="/images/awLogo.png" className="w-[5rem]" />
                        <p className='text-xl font-bold uppercase'>Crear nueva página</p>
                    </div>

                    <div className="relative">
                        <button className={`relative w-full py-2 border-y ${activeButtonIndex === 0 && "border-y-2 border-[#EFE1A2] bg-[#3d4f61] shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.6)] py-2.5"} truncate px-10`} onClick={() => handleTabMenuClick(0)}>
                            Encabezado
                            <img src="./svgs/DropdownArrow.svg" className={`rotate-180 absolute right-3 top-1 h-8 ${activeButtonIndex === 0 && "!rotate-0"}`} alt="icon" />
                        </button>
                        <div className={`scrollbarDesign grid grid-cols-2 items-center justify-center px-4 gap-x-3 animate__animated ${activeButtonIndex === 0 ? "animate__fadeInDown max-h-96 overflow-y-auto" : "animate__fadeOut max-h-0"} duration-75`}>

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

                        </div>
                    </div>

                    <div className="relative">
                        <button className={`relative w-full py-2 border-y ${activeButtonIndex === 1 && "border-y-2 border-[#EFE1A2] bg-[#3d4f61] shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.6)] py-2.5"} truncate px-10`} onClick={() => handleTabMenuClick(1)}>
                            Encabezado 2
                            <img src="./svgs/DropdownArrow.svg" className={`rotate-180 absolute right-3 top-1 h-8 ${activeButtonIndex === 1 && "!rotate-0"}`} alt="icon" />
                        </button>
                        <div className={`scrollbarDesign grid grid-cols-2 items-center justify-center px-4 gap-x-3 animate__animated ${activeButtonIndex === 1 ? "animate__fadeInDown max-h-96 overflow-y-auto" : "animate__fadeOut max-h-0"} duration-75`}>

                            <button className="button truncate w-full h-36"><img src="/svgs/Car.svg" className="w-[1.5rem]" />Aquí un card</button>
                            <button className="button truncate w-full h-36"><img src="/svgs/Arroba.svg" className="w-[1.5rem]" />Aquí un card</button>

                        </div>
                    </div>

                    <div className="relative">
                    <button className={`relative w-full py-2 border-y ${activeButtonIndex === 1 && "border-y-2 border-[#EFE1A2] bg-[#3d4f61] shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.6)] py-2.5"} truncate px-10`} onClick={() => handleTabMenuClick(1)}>
                        Encabezado 2
                        <img src="./svgs/DropdownArrow.svg" className={`rotate-180 absolute right-3 top-1 h-8 ${activeButtonIndex === 1 && "!rotate-0"}`} alt="icon" />
                    </button>
                        <div className={`scrollbarDesign grid grid-cols-2 items-center justify-center px-4 gap-x-3 animate__animated ${activeButtonIndex === 2 ? "animate__fadeInDown max-h-96 overflow-y-auto" : "animate__fadeOut max-h-0"} duration-75`}>

                            <button className="button truncate w-full h-36"><img src="/svgs/Car.svg" className="w-[1.5rem]" />Aquí un card</button>
                            <button className="button truncate w-full h-36"><img src="/svgs/Arroba.svg" className="w-[1.5rem]" />Aquí un card</button>

                        </div>
                    </div>

                    <div className="relative">
                    <button className={`relative w-full py-2 border-y ${activeButtonIndex === 2 && "border-y-2 border-[#EFE1A2] bg-[#3d4f61] shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.6)] py-2.5"} truncate px-10`} onClick={() => handleTabMenuClick(2)}>
                        Encabezado 3
                        <img src="./svgs/DropdownArrow.svg" className={`rotate-180 absolute right-3 top-1 h-8 ${activeButtonIndex === 2 && "!rotate-0"}`} alt="icon" />
                    </button>
                        <div className={`scrollbarDesign grid grid-cols-2 items-center justify-center px-4 gap-x-3 animate__animated ${activeButtonIndex === 3 ? "animate__fadeInDown max-h-96 overflow-y-auto" : "animate__fadeOut max-h-0"} duration-75`}>

                            <button className="button truncate w-full h-36"><img src="/svgs/Car.svg" className="w-[1.5rem]" />Aquí un card</button>
                            <button className="button truncate w-full h-36"><img src="/svgs/Arroba.svg" className="w-[1.5rem]" />Aquí un card</button>

                        </div>
                    </div>


                 

                    <button className={`relative w-full py-2 border-y ${activeButtonIndex === 4 && "border-y-2 border-[#EFE1A2] bg-[#3d4f61] shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.6)] py-2.5"} truncate px-10`} onClick={() => handleTabMenuClick(4)}>
                        Título de sección
                        <img src="./svgs/DropdownArrow.svg" className={`rotate-180 absolute right-3 top-1 h-8 ${activeButtonIndex === 4 && "!rotate-0"}`} alt="icon" />
                    </button>

                    <button className={`relative w-full py-2 border-y ${activeButtonIndex === 5 && "border-y-2 border-[#EFE1A2] bg-[#3d4f61] shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.6)] py-2.5"} truncate px-10`} onClick={() => handleTabMenuClick(5)}>
                        Título de sección
                        <img src="./svgs/DropdownArrow.svg" className={`rotate-180 absolute right-3 top-1 h-8 ${activeButtonIndex === 5 && "!rotate-0"}`} alt="icon" />
                    </button>

                    <button className={`relative w-full py-2 border-y ${activeButtonIndex === 6 && "border-y-2 border-[#EFE1A2] bg-[#3d4f61] shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.6)] py-2.5"} truncate px-10`} onClick={() => handleTabMenuClick(6)}>
                        Título de sección
                        <img src="./svgs/DropdownArrow.svg" className={`rotate-180 absolute right-3 top-1 h-8 ${activeButtonIndex === 6 && "!rotate-0"}`} alt="icon" />
                    </button>

                    <button className={`relative w-full py-2 border-y ${activeButtonIndex === 7 && "border-y-2 border-[#EFE1A2] bg-[#3d4f61] shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.6)] py-2.5"} truncate px-10`} onClick={() => handleTabMenuClick(7)}>
                        Título de sección con nombre más largo
                        <img src="./svgs/DropdownArrow.svg" className={`rotate-180 absolute right-3 top-1 h-8 ${activeButtonIndex === 7 && "!rotate-0"}`} alt="icon" />
                    </button>

                    <button className={`relative w-full py-2 border-y ${activeButtonIndex === 8 && "border-y-2 border-[#EFE1A2] bg-[#3d4f61] shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.6)] py-2.5"} truncate px-10`} onClick={() => handleTabMenuClick(8)}>
                        Título de sección con nombre más largo largo nombre
                        <img src="./svgs/DropdownArrow.svg" className={`rotate-180 absolute right-3 top-1 h-8 ${activeButtonIndex === 8 && "!rotate-0"}`} alt="icon" />
                    </button>


                </div>
                <button className="button w-fit !ml-5" onClick={handleCloseButton}><img src="/svgs/LogOut.svg" className="mr-2" />Cancelar progreso</button>
            </aside>
            <div className='w-[75%] bg-[url("https://www.digital4design.com/wp-content/uploads/2023/04/Wix-Website-Digital4design.jpg")] bg-contain'>

            </div>
        </div>
    )
}
