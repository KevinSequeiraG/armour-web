import { useEffect, useState } from "react"

const Navbar = ({ children, webpageData, setCurrentPage }) => {
    const [navbarOptions, setNavbarOptions] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);

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
        <div className={`relative w-full h-full ${webpageData?.navbar?.position === "top" ? "" : webpageData?.navbar?.position === "left" ? "flex" : "flex flex-row-reverse"}`}>
            <div style={styles} className={`${("flex")}`}>
                <div className={`flex items-center w-full ${(webpageData?.navbar?.position === "top") ? "flex-row" : ""} ${(webpageData?.navbar?.position === "top" && webpageData?.navbar?.contentPosition === "t-center") ? "justify-center" : ""} ${(webpageData?.navbar?.position === "top" && webpageData?.navbar?.contentPosition === "t-left") ? "justify-start mx-3" : ""} ${(webpageData?.navbar?.position === "top" && webpageData?.navbar?.contentPosition === "t-right") ? "justify-end mr-3" : ""} ${(webpageData?.navbar?.position !== "top" && webpageData?.navbar?.contentPosition === "center") ? "justify-center" : ""} ${(webpageData?.navbar?.position !== "top" && webpageData?.navbar?.contentPosition === "top") ? "justify-start" : ""} ${(webpageData?.navbar?.position !== "top" && webpageData?.navbar?.contentPosition === "bottom") ? "justify-end" : ""}  ${(webpageData?.navbar?.position === "left") ? "flex-col" : ""} ${(webpageData?.navbar?.position === "right") ? "flex-col" : ""}`}>
                    {(webpageData?.logo && webpageData?.navbar?.contentPosition !== "bottom" && webpageData?.navbar?.contentPosition !== "t-right") && <img className={`max-w-[3rem] max-h-[3rem] ${(webpageData?.navbar?.position !== "top" && webpageData?.navbar?.contentPosition === "top") ? "mt-3" : (webpageData?.navbar?.position !== "top" && webpageData?.navbar?.contentPosition === "bottom") ? "mb-3" : "x"} ${webpageData?.navbar?.position === "top" ? "my-3" : "mx-auto"}`} src={webpageData?.logo} alt="logo" />}
                    {navbarOptions.map(option => {
                        return (
                            <button onClick={() => { setCurrentPage(option.id) }} className={`px-4 py-2 border-y-1 font-semibold`}>{option.name}</button>
                        )
                    })}
                    {(webpageData?.logo && (webpageData?.navbar?.contentPosition === "bottom" || webpageData?.navbar?.contentPosition === "t-right")) && <img className={`max-w-[3rem] max-h-[3rem] ${(webpageData?.navbar?.position !== "top" && webpageData?.navbar?.contentPosition === "top") ? "mt-3" : (webpageData?.navbar?.position !== "top" && webpageData?.navbar?.contentPosition === "bottom") ? "mb-3" : "x"} ${webpageData?.navbar?.position === "top" ? "my-3" : "mx-auto"}`} src={webpageData?.logo} alt="logo" />}
                </div>
            </div>
            {
                menuVisible && (
                    <div style={mobileMenuStyles} className={`flex flex-col w-auto`}>
                        {/* Aquí coloca las opciones del menú que deseas mostrar */}
                        {/* <button style={mobileOptionInMenuStyle} className={`px-4 py-2 border-y-1 font-semibold`}>Home</button>
                        <button style={mobileOptionInMenuStyle} className={`px-4 py-2 border-y-1 font-semibold`}>Ubicacion</button> */}
                        {navbarOptions.map(option => {
                            return (
                                <button onClick={() => { setCurrentPage(option.id)}} style={mobileOptionInMenuStyle} className={`px-4 !pb-3 !border-none font-semibold`}>{option.name}</button>
                            )
                        })}
                        {/* ... */}
                    </div>
                )
            }

            {children}
        </div >
    )
}

export default Navbar;