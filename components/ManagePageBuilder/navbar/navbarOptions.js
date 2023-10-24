import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const NavbarOptions = () => {
    const { t } = useTranslation();
    const options = [{ id: "top", text: t("page-builder.top") }, { id: "right", text: t("page-builder.right") }, { id: "left", text: t("page-builder.left") }]
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