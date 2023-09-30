const Navbar = ({ position, children }) => {
    const navbarClasses = position === "top" ? `flex items-center w-full bg-gray-800 h-20 text-white p-4` : position === "left" ? "h-full bg-gray-800 text-white w-48 flex flex-col pt-8" : "right-0 top-0 h-full bg-gray-800 text-white w-48 flex flex-col pt-8";

    return (
        <div className={`relative w-full h-full ${position === "top" ? "" : position === "left" ? "flex" : "flex flex-row-reverse"}`}>
            <div className={navbarClasses}>
                {/* Contenido del Navbar */}
                <button className="bg-blue-900 px-4 py-2 rounded-xl mx-4">Home</button>
            </div>
            <div className="flex flex-1">
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Navbar;