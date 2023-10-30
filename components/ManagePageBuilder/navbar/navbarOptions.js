import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiCaretLeftCircle, BiCaretRightCircle, BiCaretUpCircle } from "react-icons/bi";

const NavbarOptions = (props) => {
    const { t } = useTranslation();
    const options = [{ id: "top", text: t("page-builder.top") }, { id: "right", text: t("page-builder.right") }, { id: "left", text: t("page-builder.left") }]
    const [selectedOption, setSelectedOption] = useState(props?.navbarData?.position);
    useEffect(() => {
        setSelectedOption(props?.navbarData?.position)
    }, [props?.navbarData])

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        const customEvent = new Event("navbarPositionChange");
        customEvent.option = option; // Adjunta la opción al evento personalizado
        window.dispatchEvent(customEvent); // Despacha el evento personalizado

        const customEventContent = new Event("changeContentPosition");
        customEventContent.option = option == "top" ? "t-left" : "top";
        window.dispatchEvent(customEventContent);
    };

    return (
        <div className="space-y-2">
            {options.map((option) => {
                return (
                    <button
                        key={option.id}
                        onClick={() => handleOptionClick(option.id)}
                        className={`optionButton flex justify-center items-center w-full ${selectedOption === option.id && 'bg-[#C69434]'}`}
                        id={option.id}
                    >
                        {option.id == "top" && <BiCaretUpCircle className="mr-1 w-5 h-5" />}
                        {option.id == "left" && <BiCaretLeftCircle className="mr-1 w-5 h-5" />}
                        {option.id == "right" && <BiCaretRightCircle className="mr-1 w-5 h-5" />}
                        {option.text}
                    </button>
                );
            })}
        </div>
    )
}

export default NavbarOptions;