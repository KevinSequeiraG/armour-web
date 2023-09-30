import { useEffect } from "react";

const NavbarOptions = () => {
    const options = [{ id: "top", text: "Arriba" }, { id: "right", text: "Derecha" }, { id: "left", text: "Izquierda" }]

    useEffect(() => {

    }, [])

    const handleOptionClick = (option) => {
        const customEvent = new Event("navbarPositionChange");
        customEvent.option = option; // Adjunta la opción al evento personalizado
        window.dispatchEvent(customEvent); // Despacha el evento personalizado
    };

    return (
        <div className="grid grid-cols-2 items-center justify-center gap-x-3">
            {options.map((option) => {
                return (
                    <button
                        key={option.id}
                        onClick={() => handleOptionClick(option.id)}
                        className="button truncate w-full"
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