import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Navbar = () => {
    const router = useRouter()
    const [showReportsOptions, setShowReportsOptions] = useState(false)
    const isLoginPage = router.pathname.includes("login")    

    return (
        <>
            {isLoginPage ? null : <aside className="bg-[#212429] w-[18rem] h-full px-4 flex justify-between flex-col">
                <div>
                    <img src="/images/awLogo.png" className="w-[10rem] mx-auto" />
                    <Link href={"/home"}><button className="button w-full"><img src="/svgs/home.svg" className="mr-2 w-[1.5rem]" />Inicio</button></Link>
                    <button className="button w-full"><img className="mr-2 w-[1.2rem]" src="/svgs/Profile.svg" />Mi perfil</button>
                    <button className="button w-full"><img src="/svgs/Phone.svg" className="mr-2" />Contáctanos</button>
                    <div className="relative">
                        <button onClick={() => setShowReportsOptions(!showReportsOptions)} className="button w-full"><img src="/svgs/Report.svg" className="mr-2 w-[1.5rem]" />Reportes</button>
                        <div className={`flex flex-col animate__animated ${showReportsOptions ? "animate__fadeInLeft" : "animate__fadeOutLeft"} transition-max-height duration-1000 ease-in-out ${showReportsOptions ? "max-h-[40rem]" : "max-h-0"}`}>
                            <Link href={"/repUserWebPages"}><button className="button w-[90%] "><img src="/svgs/webIcon.svg" className="mr-2 w-[1.5rem]" />Páginas creadas</button></Link>
                            <Link href={"/repProductAndCategories"}><button className="button w-[90%] "><img src="/svgs/Car.svg" className="mr-2 w-[1.5rem]" />Productos y categorías</button></Link>
                            <Link href={"/repSocialNetwork"}><button className="button w-[90%] "><img src="/svgs/Arroba.svg" className="mr-2 w-[1.5rem]" />Interacciones en redes sociales</button></Link>
                            <Link href={"/repAdminWebPages"}><button className="button w-[90%] "><img src="/svgs/webIcon.svg" className="mr-2 w-[1.5rem]" />Páginas creadas (Admin)</button></Link>
                        </div>
                    </div>
                </div>
                <button className="button w-full"><img src="/svgs/LogOut.svg" className="mr-2" />Cerrar sesión</button>
            </aside>}
        </>
    )
}

export default Navbar;