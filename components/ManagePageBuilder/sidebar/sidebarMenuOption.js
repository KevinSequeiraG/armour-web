import React from 'react';
import { FiArrowDownCircle } from "react-icons/fi";
const SidebarMenuOption = ({ label, isActive, onClick, children }) => {
    return (
        <div className="relative">

            <button className={`relative w-full mb-2 py-2 border-y border-r rounded-e-2xl ${isActive && "mb-0 border-r-2 border-[#EFE1A2] bg-[#224553] shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.6)]"} truncate px-10`} onClick={onClick}>
                {label}
                <FiArrowDownCircle className={`rotate-0 absolute right-2.5 top-1.5 h-8 ${isActive && "!rotate-180"}`} />
            </button>

            <div className={`scrollbarDesignTiny space-y-2 mx-2 mb-2 px-2 pb-2 border border-transparent animate__animated ${isActive ? "animate__fadeIn max-h-64 mdx1600:max-h-72 overflow-y-auto" : "hidden max-h-0"}`}>
                {children}
            </div>
        </div>
    );
};

export default SidebarMenuOption;
