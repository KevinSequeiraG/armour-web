import React, { useState } from 'react';
import MenuOption from './MenuOption';

const Sidebar = () => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);

  const menuData = [
    { label: 'Encabezado' },
    { label: 'Encabezado 2' },
    { label: 'Título de sección' },
    { label: 'Título de sección' },
    { label: 'Título de sección con nombre más largo' },
  ];

  const handleTabMenuClick = (index) => {
    setActiveButtonIndex(index);
  };

  return (
    <aside className="bg-[#212429] w-[25%] h-full flex justify-between flex-col border-r-2 border-[#EFE1A2] !text-[#F5F5F5]">
      <div className='font-medium text-[17px] h-[calc(100vh-1rem)] scrollbarDesign overflow-y-auto w-full justify-center items-center'>
        {/* ... Otras partes del código */}
        {menuData.map((item, index) => (
          <MenuOption
            key={index}
            label={item.label}
            isActive={activeButtonIndex === index}
            onClick={() => handleTabMenuClick(index)}
          />
        ))}
        {/* ... Otras partes del código */}
      </div>
      <button className="button w-fit !ml-5" onClick={handleCloseButton}>
        <img src="/svgs/LogOut.svg" className="mr-2" />
        Cancelar progreso
      </button>
    </aside>
  );
};

export default Sidebar;
