import { useEffect, useState } from "react";

const NavbarOptions = () => {
    const options = [{ id: "top", text: "Arriba" }, { id: "right", text: "Derecha" }, { id: "left", text: "Izquierda" }]
    const [selectedOption, setSelectedOption] = useState("top");
    useEffect(() => {

    }, [])

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        const customEvent = new Event("navbarPositionChange");
        customEvent.option = option; // Adjunta la opción al evento personalizado
        window.dispatchEvent(customEvent); // Despacha el evento personalizado
    };

    return (
        <div className="space-y-2">
            {options.map((option) => {
                return (
                    <button
                        key={option.id}
                        onClick={() => handleOptionClick(option.id)}
                        className={`optionButton flex justify-center w-full ${selectedOption === option.id && 'bg-[#C69434]'}`}
                        id={option.id}
                    >
                        {option.text}
                    </button>
                );
            })}
        </div>
    )
}

export default NavbarOptions;