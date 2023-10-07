import { NavbarIcon } from "@/public/svgs/dinamicIcons";
import { useEffect, useState } from "react";

const Navbar = ({ logoPage, position, children, isMobilePreview, webPageData, setWebPageData, currentPage }) => {
    const [menuVisible, setMenuVisible] = useState(false);

    // Colors Styles
    const [navbarTextColor, setNavbarTextColor] = useState("#ffffff");
    const [navbarBGColor, setNavbarBGColor] = useState("#000000");
    const [navbarWidth, setNavbarWidth] = useState("5%");
    const [navbarHeight, setNavbarHeight] = useState("5%");
    const [bgImage, setBgImage] = useState(null)
    const [contentPosition, setContentPosition] = useState(position === "top" ? "t-left" : "top")
    const [navbarOptions, setNavbarOptions] = useState([{ id: 1, name: "Home" }])

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

        window.addEventListener("changeNavbarTextColor", handleSetNavbarTextColor);
        window.addEventListener("changeNavbarBGColor", handleSetNavbarBGColor);
        window.addEventListener("changeNavbarWidth", handleSetNavbarWidth);
        window.addEventListener("changeNavbarHeight", handleSetNavbarHeight);
        window.addEventListener("changeNavbarBgImage", handleSetNavbarBgImage);
        window.addEventListener("changeContentPosition", handleSetContentPosition);

        return () => {
            // Limpia el event listener cuando el componente se desmonta
            window.removeEventListener("changeNavbarTextColor", handleSetNavbarTextColor);
            window.removeEventListener("changeNavbarBGColor", handleSetNavbarBGColor);
            window.removeEventListener("changeNavbarWidth", handleSetNavbarWidth);
            window.removeEventListener("changeNavbarHeight", handleSetNavbarHeight);
            window.removeEventListener("changeNavbarBgImage", handleSetNavbarBgImage);
            window.removeEventListener("changeContentPosition", handleSetContentPosition);
        };
    }, []);

    const styles = {
        color: navbarTextColor,
        backgroundColor: navbarBGColor,
        minWidth: position !== "top" && navbarWidth,
        minHeight: position === "top" && navbarHeight,
        backgroundImage: `url(${bgImage})`
    }

    const mobileMenuStyles = {
        color: navbarTextColor,
        backgroundColor: navbarBGColor,
        border: "1px solid " + navbarTextColor
    }

    const mobileOptionInMenuStyle = {
        borderBottom: "1px solid " + navbarTextColor
    }

    const newNavbarData = {
        color: navbarTextColor,
        backgroundColor: navbarBGColor,
        minWidth: navbarWidth,
        minHeight: navbarHeight,
        backgroundImage: `url(${bgImage})`,
        contentPosition: contentPosition,
        navbarOptions: navbarOptions
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
        if (position === "top") setContentPosition("t-left")
        if (position === "left" || position === "right") setContentPosition("top")
    }, [position])

    useEffect(() => {
        setWebPageData()
        console.log("webPageData", webPageData)
        updateNavbarData()
    }, [navbarTextColor, navbarBGColor, navbarWidth, navbarHeight, bgImage, contentPosition, navbarOptions, position])

    return (
        <div className={`relative w-full h-full ${position === "top" ? "" : position === "left" ? "flex" : "flex flex-row-reverse"}`}>
            <div style={styles} className={`${!isMobilePreview && ("flex")}`}>
                {isMobilePreview ? (
                    <div className={`flex items-center ${position === "top" ? "w-full" : "h-full flex-col"} ${((position === "top" && contentPosition === "t-center") || (position !== "top" && contentPosition === "center")) ? "justify-center" : ((position === "top" && contentPosition === "t-left") || (position !== "top" && contentPosition === "top")) ? "justify-start" : ((position === "top" && contentPosition === "t-right") || (position !== "top" && contentPosition === "bottom")) ? "justify-end" : ""}`}>
                        {(logoPage && contentPosition !== "bottom" && contentPosition !== "t-right") && <img className={`max-w-[3rem] max-h-[3rem] ${(position !== "top" && contentPosition === "top") ? "mt-3" : (position !== "top" && contentPosition === "bottom") ? "mb-3" : "x"} ${position === "top" ? "my-3" : "mx-auto"}`} src={logoPage} alt="logo" />}
                        <button onClick={toggleMenu} className={`px-4 h-[2rem] py-2 ${isMobilePreview ? "my-2" : ""}`}>
                            <NavbarIcon color={navbarTextColor} />
                        </button>
                        {(logoPage && (contentPosition === "bottom" || contentPosition === "t-right")) && <img className={`max-w-[3rem] max-h-[3rem] ${(position !== "top" && contentPosition === "top") ? "mt-3" : (position !== "top" && contentPosition === "bottom") ? "mb-3" : "x"} ${position === "top" ? "my-3" : "mx-auto"}`} src={logoPage} alt="logo" />}
                    </div>
                ) : (<div className={`flex items-center w-full ${(position === "top") ? "flex-row" : ""} ${(position === "top" && contentPosition === "t-center") ? "justify-center" : ""} ${(position === "top" && contentPosition === "t-left") ? "justify-start mx-3" : ""} ${(position === "top" && contentPosition === "t-right") ? "justify-end mr-3" : ""} ${(position !== "top" && contentPosition === "center") ? "justify-center" : ""} ${(position !== "top" && contentPosition === "top") ? "justify-start" : ""} ${(position !== "top" && contentPosition === "bottom") ? "justify-end" : ""}  ${(position === "left") ? "flex-col" : ""} ${(position === "right") ? "flex-col" : ""}`}>
                    {(logoPage && contentPosition !== "bottom" && contentPosition !== "t-right") && <img className={`max-w-[3rem] max-h-[3rem] ${(position !== "top" && contentPosition === "top") ? "mt-3" : (position !== "top" && contentPosition === "bottom") ? "mb-3" : "x"} ${position === "top" ? "my-3" : "mx-auto"}`} src={logoPage} alt="logo" />}
                    {navbarOptions.map(option => {
                        return (
                            <button className={`px-4 py-2 border-y-1 font-semibold`}>{option.name}</button>
                        )
                    })}
                    {(logoPage && (contentPosition === "bottom" || contentPosition === "t-right")) && <img className={`max-w-[3rem] max-h-[3rem] ${(position !== "top" && contentPosition === "top") ? "mt-3" : (position !== "top" && contentPosition === "bottom") ? "mb-3" : "x"} ${position === "top" ? "my-3" : "mx-auto"}`} src={logoPage} alt="logo" />}
                </div>)}
            </div>
            {
                menuVisible && (
                    <div style={mobileMenuStyles} className={` flex flex-col w-auto`}>
                        {/* Aquí coloca las opciones del menú que deseas mostrar */}
                        {/* <button style={mobileOptionInMenuStyle} className={`px-4 py-2 border-y-1 font-semibold`}>Home</button>
                        <button style={mobileOptionInMenuStyle} className={`px-4 py-2 border-y-1 font-semibold`}>Ubicacion</button> */}
                        {navbarOptions.map(option => {
                            return (
                                <button style={mobileOptionInMenuStyle} className={`px-4 py-2 border-y-1 font-semibold`}>{option.name}</button>
                            )
                        })}
                        {/* ... */}
                    </div>
                )
            }
            <div className="flex flex-1">
                <div>{children}</div>
            </div>
        </div >
    );
};

export default Navbar;