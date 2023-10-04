import { NavbarIcon } from "@/public/svgs/dinamicIcons";
import { useEffect, useState } from "react";

const Navbar = ({ position, children, isMobilePreview }) => {
    const [menuVisible, setMenuVisible] = useState(false);

    // position top
    let navbarClasses = "flex items-center w-full";

    if (isMobilePreview) {
        if (menuVisible) {
            if (position === "top") {
                // navbarClasses += " !h-auto";
            } else {
                // navbarClasses += " !h-auto";
            }
        } else {
            if (position === "top") {
                // navbarClasses += " !h-auto";
            } else {
                // navbarClasses += " !h-auto";
            }
        }
    } else if (position === "top") {
        navbarClasses += "pt-4";
    } else if (position === "left" || position === "right") {
        navbarClasses += " pt-8 w-48";
    }

    // Colors Styles
    const [navbarTextColor, setNavbarTextColor] = useState("#ffffff");
    const [navbarBGColor, setNavbarBGColor] = useState("#000000");
    const [navbarWidth, setNavbarWidth] = useState("");
    const [navbarHeight, setNavbarHeight] = useState("");

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

        window.addEventListener("changeNavbarTextColor", handleSetNavbarTextColor);
        window.addEventListener("changeNavbarBGColor", handleSetNavbarBGColor);
        window.addEventListener("changeNavbarWidth", handleSetNavbarWidth);
        window.addEventListener("changeNavbarHeight", handleSetNavbarHeight);

        return () => {
            // Limpia el event listener cuando el componente se desmonta
            window.removeEventListener("changeNavbarTextColor", handleSetNavbarTextColor);
            window.removeEventListener("changeNavbarBGColor", handleSetNavbarBGColor);
            window.removeEventListener("changeNavbarWidth", handleSetNavbarWidth);
            window.removeEventListener("changeNavbarHeight", handleSetNavbarHeight);
        };
    }, []);

    const styles = {
        color: navbarTextColor,
        backgroundColor: navbarBGColor,
        width: position !== "top" && navbarWidth,
        height: position === "top" && navbarHeight
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
            <div style={styles} className={navbarClasses}>
                {isMobilePreview && (
                    <div className={`w-full`}>
                        <button onClick={toggleMenu} className={`px-4 py-2 ${isMobilePreview ? "my-2" : ""}`}>
                            <NavbarIcon color={navbarTextColor} />
                        </button>
                    </div>
                )}
                {/* ... */}
            </div>
            {menuVisible && (
                <div style={mobileMenuStyles} className={` flex flex-col w-auto`}>
                    {/* Aquí coloca las opciones del menú que deseas mostrar */}
                    <button style={mobileOptionInMenuStyle} className={`px-4 py-2 border-y-1 font-semibold`}>Home</button>
                    <button style={mobileOptionInMenuStyle} className={`px-4 py-2 border-y-1 font-semibold`}>Ubicacion</button>
                    {/* ... */}
                </div>
            )}
            <div className="flex flex-1">
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Navbar;