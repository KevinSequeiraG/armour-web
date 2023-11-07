import { NavbarIcon } from "@/public/svgs/dinamicIcons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineLogin } from "react-icons/ai";
import { IoLogInOutline } from "react-icons/io5";

const Navbar = ({ logoPage, children, isMobilePreview, webPageData, setWebPageData, isEdit }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const { t } = useTranslation();
    // Colors Styles
    const [navbarTextColor, setNavbarTextColor] = useState(webPageData?.navbar?.color);
    const [navbarBGColor, setNavbarBGColor] = useState(webPageData?.navbar?.backgroundColor);
    const [navbarWidth, setNavbarWidth] = useState(webPageData?.navbar?.minWidth);
    const [navbarHeight, setNavbarHeight] = useState(webPageData?.navbar?.minHeight);
    const [bgImage, setBgImage] = useState(webPageData?.navbar?.backgroundImage)
    const [contentPosition, setContentPosition] = useState(webPageData?.navbar?.contentPosition)
    const [navbarOptions, setNavbarOptions] = useState(webPageData?.pages)
    const [loginButton, setLoginButton] = useState(webPageData?.navbar.loginButton)

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    useEffect(() => {
        const handleSetNavbarTextColor = (event) => {
            setNavbarTextColor(event.option);
        };
        const handleSetNavbarBGColor = (event) => {
            setNavbarBGColor(event.option);
        };
        const handleSetNavbarWidth = (event) => {
            setNavbarWidth(event.option);
        };
        const handleSetNavbarHeight = (event) => {
            setNavbarHeight(event.option);
        };
        const handleSetNavbarBgImage = (event) => {
            setBgImage(event.option);
        };
        const handleSetContentPosition = (event) => {
            setContentPosition(event.option);
        };
        const handleSetLoginButton = (event) => {
            setLoginButton(event.option);
        };

        window.addEventListener("changeNavbarTextColor", handleSetNavbarTextColor);
        window.addEventListener("changeNavbarBGColor", handleSetNavbarBGColor);
        window.addEventListener("changeNavbarWidth", handleSetNavbarWidth);
        window.addEventListener("changeNavbarHeight", handleSetNavbarHeight);
        window.addEventListener("changeNavbarBgImage", handleSetNavbarBgImage);
        window.addEventListener("changeContentPosition", handleSetContentPosition);
        window.addEventListener("changeNavbarLoginButtonValue", handleSetLoginButton);

        return () => {
            // Limpia el event listener cuando el componente se desmonta
            window.removeEventListener("changeNavbarTextColor", handleSetNavbarTextColor);
            window.removeEventListener("changeNavbarBGColor", handleSetNavbarBGColor);
            window.removeEventListener("changeNavbarWidth", handleSetNavbarWidth);
            window.removeEventListener("changeNavbarHeight", handleSetNavbarHeight);
            window.removeEventListener("changeNavbarBgImage", handleSetNavbarBgImage);
            window.removeEventListener("changeContentPosition", handleSetContentPosition);
            window.removeEventListener("changeNavbarLoginButtonValue", handleSetLoginButton);
        };
    }, []);

    const styles = {
        color: navbarTextColor,
        backgroundColor: navbarBGColor,
        minWidth: webPageData?.navbar?.position !== "top" && navbarWidth,
        minHeight: !isMobilePreview && webPageData?.navbar?.position === "top" && navbarHeight,
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover"
    }

    const mobileMenuStyles = {
        color: navbarTextColor,
        backgroundColor: navbarBGColor,
        // border: "1px solid " + navbarTextColor
    }

    const mobileOptionInMenuStyle = {
        borderBottom: "1px solid " + navbarTextColor
    }

    const newNavbarData = {
        color: navbarTextColor,
        backgroundColor: navbarBGColor,
        minWidth: navbarWidth,
        minHeight: navbarHeight,
        backgroundImage: bgImage,
        contentPosition: contentPosition,
        position: webPageData?.navbar?.position,
        loginButton: loginButton
        // navbarOptions: navbarOptions
        // O si deseas actualizar el título del navbar, puedes hacerlo así:

        // Agrega cualquier otra propiedad que necesites actualizar
    };

    const updateNavbarData = () => {
        // Clona el objeto webPageData para no modificar el estado original directamente
        const updatedWebPageData = { ...webPageData };

        // Actualiza el objeto navbar dentro de la copia
        updatedWebPageData.navbar = newNavbarData;

        // Establece la copia actualizada como el nuevo estado
        setWebPageData(updatedWebPageData);
    };

    useEffect(() => {
        const handleSetPagesOptions = (event) => {
            setNavbarOptions(event.option);
        };

        window.addEventListener("changePagesOptions", handleSetPagesOptions);

        return () => {
            window.removeEventListener("changePagesOptions", handleSetPagesOptions);
        }
    }, [])

    useEffect(() => {
        setNavbarTextColor(webPageData?.navbar?.color)
    }, [webPageData?.navbar?.color])

    useEffect(() => {
        setNavbarBGColor(webPageData?.navbar?.backgroundColor)
    }, [webPageData?.navbar?.backgroundColor])

    useEffect(() => {
        setNavbarWidth(webPageData?.navbar?.minWidth)
    }, [webPageData?.navbar?.minWidth])

    useEffect(() => {
        setNavbarHeight(webPageData?.navbar?.minHeight)
    }, [webPageData?.navbar?.minHeight])
    useEffect(() => {
        setBgImage(webPageData?.navbar?.backgroundImage)
    }, [webPageData?.navbar?.backgroundImage])
    useEffect(() => {
        setContentPosition(webPageData?.navbar?.contentPosition)
    }, [webPageData?.navbar?.contentPosition])
    useEffect(() => {
        setLoginButton(webPageData?.navbar?.loginButton)
    }, [webPageData?.navbar?.loginButton])

    useEffect(() => {
        setNavbarOptions(webPageData?.pages)
    }, [webPageData?.pages])

    useEffect(() => {
        // setWebPageData()
        updateNavbarData()
    }, [navbarTextColor, navbarBGColor, navbarWidth, navbarHeight, bgImage, contentPosition, navbarOptions])

    return (
        <div className={`relative w-full h-full ${webPageData?.navbar?.position === "top" ? "" : webPageData?.navbar?.position === "left" ? "flex" : "flex flex-row-reverse"}`}>
            <div style={styles} className={`${!isMobilePreview && ("flex")}`}>
                {isMobilePreview ? (
                    <div className={`flex items-center ${webPageData?.navbar?.position === "top" ? "w-full" : "h-full flex-col"} ${((webPageData?.navbar?.position === "top" && contentPosition === "t-center") || (webPageData?.navbar?.position !== "top" && contentPosition === "center")) ? "justify-center" : ((webPageData?.navbar?.position === "top" && contentPosition === "t-left") || (webPageData?.navbar?.position !== "top" && contentPosition === "top")) ? "justify-start" : ((webPageData?.navbar?.position === "top" && contentPosition === "t-right") || (webPageData?.navbar?.position !== "top" && contentPosition === "bottom")) ? "justify-end" : ""}`}>
                        {(logoPage && contentPosition !== "bottom" && contentPosition !== "t-right") && <img className={`max-w-[3rem] max-h-[3rem] ${(webPageData?.navbar?.position !== "top" && contentPosition === "top") ? "mt-3" : (webPageData?.navbar?.position !== "top" && contentPosition === "bottom") ? "mb-3" : "x"} ${webPageData?.navbar?.position === "top" ? "my-3" : "mx-auto"}`} src={logoPage} alt="logo" />}
                        <button onClick={toggleMenu} className={`px-4 h-[2rem] py-2 ${isMobilePreview ? "my-2" : ""}`}>
                            <NavbarIcon color={navbarTextColor} />
                        </button>
                        {(logoPage && (contentPosition === "bottom" || contentPosition === "t-right")) && <img className={`max-w-[3rem] max-h-[3rem] ${(webPageData?.navbar?.position !== "top" && contentPosition === "top") ? "mt-3" : (webPageData?.navbar?.position !== "top" && contentPosition === "bottom") ? "mb-3" : "x"} ${webPageData?.navbar?.position === "top" ? "my-3" : "mx-auto"}`} src={logoPage} alt="logo" />}
                    </div>
                ) : (<div className={`flex items-center w-full ${(webPageData?.navbar?.position === "top") ? "flex-row" : ""} ${(webPageData?.navbar?.position === "top" && contentPosition === "t-center") ? "justify-center" : ""} ${(webPageData?.navbar?.position === "top" && contentPosition === "t-left") ? "justify-start mx-3" : ""} ${(webPageData?.navbar?.position === "top" && contentPosition === "t-right") ? "justify-end mr-3" : ""} ${(webPageData?.navbar?.position !== "top" && contentPosition === "center") ? "justify-center" : ""} ${(webPageData?.navbar?.position !== "top" && contentPosition === "top") ? "justify-start" : ""} ${(webPageData?.navbar?.position !== "top" && contentPosition === "bottom") ? "justify-end" : ""}  ${(webPageData?.navbar?.position === "left") ? "flex-col" : ""} ${(webPageData?.navbar?.position === "right") ? "flex-col" : ""}`}>
                    {(logoPage && contentPosition !== "bottom" && contentPosition !== "t-right") && <img className={`max-w-[3rem] max-h-[3rem] ${(webPageData?.navbar?.position !== "top" && contentPosition === "top") ? "mt-3" : (webPageData?.navbar?.position !== "top" && contentPosition === "bottom") ? "mb-3" : "x"} ${webPageData?.navbar?.position === "top" ? "my-3" : "mx-auto"}`} src={logoPage} alt="logo" />}
                    {(loginButton && (contentPosition === "bottom" || contentPosition === "t-right")) && <AiOutlineLogin className={`w-7 h-7 ${(webPageData?.navbar?.position !== "top" && contentPosition === "top") ? "mt-3" : (webPageData?.navbar?.position !== "top" && contentPosition === "bottom") ? "mb-3" : "x"} ${webPageData?.navbar?.position === "top" ? "my-3" : "mx-auto"}`} src={logoPage} alt="logo" />}
                    {navbarOptions.map((option, i) => {
                        return (
                            <button key={i} className={`px-4 py-2 border-y-1 font-semibold`}>{option.name}</button>
                        )
                    })}
                    {(logoPage && (contentPosition === "bottom" || contentPosition === "t-right")) && <img className={`max-w-[3rem] max-h-[3rem] ${(webPageData?.navbar?.position !== "top" && contentPosition === "top") ? "mt-3" : (webPageData?.navbar?.position !== "top" && contentPosition === "bottom") ? "mb-3" : "x"} ${webPageData?.navbar?.position === "top" ? "my-3" : "mx-auto"}`} src={logoPage} alt="logo" />}
                    {(loginButton && contentPosition !== "bottom" && contentPosition !== "t-right") && <AiOutlineLogin className={`w-7 h-7 ${(webPageData?.navbar?.position !== "top" && contentPosition === "top") ? "mt-3" : (webPageData?.navbar?.position !== "top" && contentPosition === "bottom") ? "mb-3" : "x"} ${webPageData?.navbar?.position === "top" ? "my-3" : "mx-auto"}`} src={logoPage} alt="logo" />}
                </div>)}
            </div>
            {
                menuVisible && (
                    <div style={mobileMenuStyles} className={`flex flex-col w-auto`}>
                        {/* Aquí coloca las opciones del menú que deseas mostrar */}
                        {/* <button style={mobileOptionInMenuStyle} className={`px-4 py-2 border-y-1 font-semibold`}>Home</button>
                        <button style={mobileOptionInMenuStyle} className={`px-4 py-2 border-y-1 font-semibold`}>Ubicacion</button> */}
                        {navbarOptions.map((option, i) => {
                            return (
                                <button key={i} style={mobileOptionInMenuStyle} className={`px-4 !pb-3 !border-none font-semibold`}>{option.name}</button>
                            )
                        })}
                        {loginButton && <button className="flex justify-center pb-2"><AiOutlineLogin className="w-7 h-7" /></button>}
                        {/* ... */}
                    </div>
                )
            }

            {children}
        </div >
    );
};

export default Navbar;