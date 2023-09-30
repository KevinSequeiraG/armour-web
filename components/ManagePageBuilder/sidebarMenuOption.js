import React from 'react';

const SidebarMenuOption = ({ label, isActive, onClick, children }) => {
    return (
        <div className="relative">

            <button className={`relative w-full py-2 border-y ${isActive && "border-y-2 border-[#EFE1A2] bg-[#3d4f61] shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.6)] py-2.5"} truncate px-10`} onClick={onClick}>
                {label}
                <img src="./svgs/DropdownArrow.svg" className={`rotate-180 absolute right-3 top-1 h-8 ${isActive && "!rotate-0"}`} alt="icon" />
            </button>

            <div className={`scrollbarDesignTiny px-4 gap-x-3 animate__animated ${isActive ? "animate__fadeIn max-h-80 overflow-y-auto" : "hidden max-h-0"}`}>
                {children}
            </div>
        </div>
    );
};

export default SidebarMenuOption;
