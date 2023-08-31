import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
    const [showReportsOptions, setShowReportsOptions] = useState(false)

    return (
        <aside className="bg-[#212429] w-[18rem] h-full px-4 flex justify-between flex-col">
            <div>
                <img src="/images/awLogo.png" className="w-[10rem] mx-auto" />
                <Link href={"/home"}><button className="text-[#EFE1A2] hover:bg-gray-900 border border-1 border-[#C69434] my-2 rounded-[.5rem] text-left px-4 font-semibold py-3 w-full bg-[#212429] flex items-center"><img src="/svgs/home.svg" className="mr-2 w-[1.5rem]"/>Inicio</button></Link>
                <button className="text-[#EFE1A2] w-full hover:bg-gray-900 ml-auto border border-1 border-[#C69434] my-2 rounded-[.5rem] text-left px-4 font-semibold py-3 w-bg-full [#212429] flex items-center"><img className="mr-2 w-[1.2rem]" src="/svgs/Profile.svg" />Mi perfil</button>
                <div className="relative">
                    <button onClick={() => setShowReportsOptions(!showReportsOptions)} className="items-center text-[#EFE1A2] hover:bg-gray-900 border border-1 border-[#C69434] my-2 rounded-[.5rem] text-left px-4 font-semibold py-3 w-full bg-[#212429] flex"><img src="/svgs/Report.svg" className="mr-2 w-[1.5rem]" />Reportes</button>
                    <div className={`flex flex-col animate__animated ${showReportsOptions ? "animate__fadeInLeft" : "animate__fadeOutLeft"} transition-max-height duration-1000 ease-in-out ${showReportsOptions ? "max-h-[40rem]" : "max-h-0"}`}>
                        <button className="text-[#EFE1A2] hover:bg-gray-900 ml-auto border border-1 border-[#C69434] my-2 rounded-[.5rem] text-left px-4 font-semibold py-3 w-[90%] bg-[#212429] flex items-center"><img src="/svgs/webIcon.svg" className="mr-2 w-[1.5rem]" />Páginas creadas</button>
                        <button className="text-[#EFE1A2] hover:bg-gray-900 ml-auto border border-1 border-[#C69434] my-2 rounded-[.5rem] text-left px-4 font-semibold py-3 w-[90%] bg-[#212429] flex items-center"><img src="/svgs/Car.svg" className="mr-2 w-[1.5rem]" />Productos y categorías</button>
                        <button className="text-[#EFE1A2] hover:bg-gray-900 ml-auto border border-1 border-[#C69434] my-2 rounded-[.5rem] text-left px-4 font-semibold py-3 w-[90%] bg-[#212429] flex items-center"><img src="/svgs/Arroba.svg" className="mr-2 w-[1.5rem]" />Interacciones en redes sociales</button>
                        <button className="text-[#EFE1A2] hover:bg-gray-900 ml-auto border border-1 border-[#C69434] my-2 rounded-[.5rem] text-left px-4 font-semibold py-3 w-[90%] bg-[#212429] flex items-center"><img src="/svgs/webIcon.svg" className="mr-2 w-[1.5rem]" />Páginas creadas (Admin)</button>
                    </div>
                </div>
                <button className="flex items-center text-[#EFE1A2] hover:bg-gray-900 border border-1 border-[#C69434] my-2 rounded-[.5rem] text-left px-4 font-semibold py-3 w-full bg-[#212429]"><img src="/svgs/Phone.svg" className="mr-2" />Contáctanos</button>
            </div>
            <button className="flex items-center text-[#EFE1A2] mb-4 hover:bg-gray-900 border border-1 border-[#C69434] my-2 rounded-[.5rem] text-left px-4 font-semibold py-3 w-full bg-[#212429]"><img src="/svgs/LogOut.svg" className="mr-2" />Cerrar sesión</button>
        </aside>
    )
}

export default Navbar;