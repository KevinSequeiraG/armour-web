import { NavbarIcon } from "@/public/svgs/dinamicIcons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { AiOutlineLogin } from "react-icons/ai";

const Navbar = ({ children, webpageData, setCurrentPage }) => {
    const [navbarOptions, setNavbarOptions] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);
    const router = useRouter();

    const styles = {
        color: webpageData?.navbar?.color,
        backgroundColor: webpageData?.navbar?.backgroundColor,
        minWidth: webpageData?.navbar?.position !== "top" && webpageData?.navbar?.minWidth,
        minHeight: webpageData?.navbar?.position === "top" && webpageData?.navbar?.minHeight,
        backgroundImage: `url(${webpageData?.navbar?.backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover"
    }

    const mobileMenuStyles = {
        color: webpageData?.navbar?.color,
        backgroundColor: webpageData?.navbar?.backgroundColor,
        // border: "1px solid " + navbarTextColor
    }

    const mobileOptionInMenuStyle = {
        borderBottom: "1px solid " + webpageData?.navbar?.color
    }

    const childrenStyles = {
        height: webpageData?.navbar?.position === "top" && `calc(100vh - ${webpageData?.navbar?.minHeight})`,
    }

    useEffect(() => {
        if (webpageData) {
            let fullArray = []
            webpageData?.pages?.map(page => {
                fullArray.push(page);
            })
            setNavbarOptions(fullArray)
        }
    }, [webpageData])


    return (
        <div className={` relative w-full h-full ${webpageData?.navbar?.position === "top" ? "" : webpageData?.navbar?.position === "left" ? "flex" : "flex flex-row-reverse"}`}>
            <div style={styles} className={`${("flex")}`}>
                <div className={`flex items-center w-full ${(webpageData?.navbar?.position === "top") ? "flex-row" : ""} ${(webpageData?.navbar?.position === "top" && webpageData?.navbar?.contentPosition === "t-center") ? "justify-center" : ""} ${(webpageData?.navbar?.position === "top" && webpageData?.navbar?.contentPosition === "t-left") ? "justify-start mx-3" : ""} ${(webpageData?.navbar?.position === "top" && webpageData?.navbar?.contentPosition === "t-right") ? "justify-end mr-3" : ""} ${(webpageData?.navbar?.position !== "top" && webpageData?.navbar?.contentPosition === "center") ? "justify-center" : ""} ${(webpageData?.navbar?.position !== "top" && webpageData?.navbar?.contentPosition === "top") ? "justify-start" : ""} ${(webpageData?.navbar?.position !== "top" && webpageData?.navbar?.contentPosition === "bottom") ? "justify-end" : ""}  ${(webpageData?.navbar?.position === "left") ? "flex-col" : ""} ${(webpageData?.navbar?.position === "right") ? "flex-col" : ""}`}>
                    {(webpageData?.logo && webpageData?.navbar?.contentPosition !== "bottom" && webpageData?.navbar?.contentPosition !== "t-right") && <img className={`max-w-[3rem] max-h-[3rem] ${(webpageData?.navbar?.position !== "top" && webpageData?.navbar?.contentPosition === "top") ? "mt-3" : (webpageData?.navbar?.position !== "top" && webpageData?.navbar?.contentPosition === "bottom") ? "mb-3" : "x"} ${webpageData?.navbar?.position === "top" ? "my-3" : "mx-auto"}`} src={webpageData?.logo} alt="logo" />}
                    
                    
                    {(webpageData?.navbar?.loginButton && (webpageData?.navbar?.contentPosition === "bottom" || webpageData?.navbar?.contentPosition === "t-right")) && <AiOutlineLogin onClick={() => { router.push("/login") }} className={`cursor-pointer w-7 h-7 hidden mdx600:block ${(webpageData?.navbar?.position !== "top" && webpageData?.navbar?.contentPosition === "top") ? "mt-3" : (webpageData?.navbar?.position !== "top" && webpageData?.navbar?.contentPosition === "bottom") ? "mb-3" : "x"} ${webpageData?.navbar?.position === "top" ? "my-3" : "mx-auto"}`} src={webpageData?.logo} alt="logo" />}




                    <button className="mdx600:hidden block ml-2" onClick={() => { setMenuVisible(!menuVisible) }}><NavbarIcon color={webpageData?.navbar?.color} /></button>
                    <div className={`hidden ${webpageData?.navbar?.position === "top" ? "mdx600:block" : "mdx600:flex flex-col"} `}>
                        {navbarOptions.map((option, i) => {
                            return (
                                <button key={i} onClick={() => { setCurrentPage(option.id) }} className={`px-4 py-2 border-y-1 font-semibold`}>{option.name}</button>
                            )
                        })}
                    </div>
                    {(webpageData?.logo && (webpageData?.navbar?.contentPosition === "bottom" || webpageData?.navbar?.contentPosition === "t-right")) && <img className={`max-w-[3rem] max-h-[3rem] ${(webpageData?.navbar?.position !== "top" && webpageData?.navbar?.contentPosition === "top") ? "mt-3" : (webpageData?.navbar?.position !== "top" && webpageData?.navbar?.contentPosition === "bottom") ? "mb-3" : "x"} ${webpageData?.navbar?.position === "top" ? "my-3" : "mx-auto"}`} src={webpageData?.logo} alt="logo" />}

                    {(webpageData?.navbar?.loginButton && webpageData?.navbar?.contentPosition !== "bottom" && webpageData?.navbar?.contentPosition !== "t-right") && <AiOutlineLogin onClick={() => { router.push("/login") }} className={`cursor-pointer w-7 h-7 hidden mdx600:block ${(webpageData?.navbar?.position !== "top" && webpageData?.navbar?.contentPosition === "top") ? "mt-3" : (webpageData?.navbar?.position !== "top" && webpageData?.navbar?.contentPosition === "bottom") ? "mb-3" : "x"} ${webpageData?.navbar?.position === "top" ? "my-3" : "mx-auto"}`} src={webpageData?.logo} alt="logo" />}

                </div>
            </div>
            {
                menuVisible && (
                    <div style={mobileMenuStyles} className={`flex flex-col w-auto ${webpageData?.navbar?.position === "top" ? "w-full" : "h-full"} `}>
                        {/* Aquí coloca las opciones del menú que deseas mostrar */}
                        {/* <button style={mobileOptionInMenuStyle} className={`px-4 py-2 border-y-1 font-semibold`}>Home</button>
                        <button style={mobileOptionInMenuStyle} className={`px-4 py-2 border-y-1 font-semibold`}>Ubicacion</button> */}
                        {navbarOptions.map((option, i) => {
                            return (
                                <button key={i} onClick={() => { setCurrentPage(option.id) }} style={mobileOptionInMenuStyle} className={`px-4 !py-3 !border-none font-semibold`}>{option.name}</button>
                            )
                        })}
                        {webpageData?.navbar?.loginButton && <button onClick={() => { router.push("/login") }} style={mobileOptionInMenuStyle} className={`px-4 !py-3 !border-none font-semibold flex justify-center cursor-pointer`}><AiOutlineLogin className="w-7 h-7" /></button>}
                        {/* ... */}
                    </div>
                )
            }

            <div style={childrenStyles} className="w-full overflow-y-auto scrollbarDesign">
                {children}
            </div>
        </div >
    )
}

export default Navbar;