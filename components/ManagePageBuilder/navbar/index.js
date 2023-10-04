import { NavbarIcon } from "@/public/svgs/dinamicIcons";
import { useEffect, useState } from "react";

const Navbar = ({ position, children, isMobilePreview }) => {
    const [menuVisible, setMenuVisible] = useState(false);

    // Colors Styles
    const [navbarTextColor, setNavbarTextColor] = useState("#ffffff");
    const [navbarBGColor, setNavbarBGColor] = useState("#000000");
    const [navbarWidth, setNavbarWidth] = useState("5%");
    const [navbarHeight, setNavbarHeight] = useState("5%");
    const [bgImage, setBgImage] = useState(null)

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

        window.addEventListener("changeNavbarTextColor", handleSetNavbarTextColor);
        window.addEventListener("changeNavbarBGColor", handleSetNavbarBGColor);
        window.addEventListener("changeNavbarWidth", handleSetNavbarWidth);
        window.addEventListener("changeNavbarHeight", handleSetNavbarHeight);
        window.addEventListener("changeNavbarBgImage", handleSetNavbarBgImage);

        return () => {
            // Limpia el event listener cuando el componente se desmonta
            window.removeEventListener("changeNavbarTextColor", handleSetNavbarTextColor);
            window.removeEventListener("changeNavbarBGColor", handleSetNavbarBGColor);
            window.removeEventListener("changeNavbarWidth", handleSetNavbarWidth);
            window.removeEventListener("changeNavbarHeight", handleSetNavbarHeight);
            window.removeEventListener("changeNavbarBgImage", handleSetNavbarBgImage);
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

    return (
        <div className={`relative w-full h-full ${position === "top" ? "" : position === "left" ? "flex" : "flex flex-row-reverse"}`}>
            <div style={styles} className={`${!isMobilePreview && ("flex items-center")}`}>
                {isMobilePreview ? (
                    <div className={`w-full`}>
                        <button onClick={toggleMenu} className={`px-4 py-2 ${isMobilePreview ? "my-2" : ""}`}>
                            <NavbarIcon color={navbarTextColor} />
                        </button>
                    </div>
                ) : (<div className={`flex w-full ${(position === "top") && "flex-row"} ${(position === "left") && "flex-col"} ${(position === "right") && "flex-col"}`}>
                    <button className={`px-4 py-2 border-y-1 font-semibold`}>Home</button>
                    <button className={`px-4 py-2 border-y-1 font-semibold`}>Ubicacion</button>
                </div>)}
            </div>
            {
                menuVisible && (
                    <div style={mobileMenuStyles} className={` flex flex-col w-auto`}>
                        {/* Aquí coloca las opciones del menú que deseas mostrar */}
                        <button style={mobileOptionInMenuStyle} className={`px-4 py-2 border-y-1 font-semibold`}>Home</button>
                        <button style={mobileOptionInMenuStyle} className={`px-4 py-2 border-y-1 font-semibold`}>Ubicacion</button>
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