import React from 'react';

const MenuOption = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`relative w-full py-2 border-y ${isActive && "border-y-2 border-[#EFE1A2] bg-[#3d4f61] shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.6)] py-2.5"} truncate px-10`}
      onClick={onClick}
    >
      {label}
      <img
        src="./svgs/DropdownArrow.svg"
        className={`rotate-180 absolute right-3 top-1 h-8 ${isActive && "!rotate-0"}`}
        alt="icon"
      />
    </button>
  );
};

export default MenuOption;
