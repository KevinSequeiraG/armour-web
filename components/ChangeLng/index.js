import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ChangeLng = () => {
    const { t, i18n } = useTranslation();
    const [lngEsp, setLngEsp] = useState(false);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    useEffect(() => {
        if (lngEsp) {
            changeLanguage("es")
        } else {
            changeLanguage("en")
        }
    }, [lngEsp])

    return (
        <div className='absolute right-8 top-6 flex items-center bg-[#F5F5F5] px-4 py-2 rounded-[1rem] border border-1 border-gray-900'>
            <span className="text-[1rem] font-medium text-gray-900 mr-3">EN</span>
            <label className="relative inline-flex items-center cursor-pointer" >
                <div>
                    <input type="checkbox" value="" className="sr-only peer" checked={lngEsp} onClick={(e) => setLngEsp(!lngEsp)} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-700 dark:peer-focus:ring-gray-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-700"></div>
                </div>
                <span className="ml-3 text-[1rem] font-medium text-gray-900">ES</span>
            </label>
        </div>
    )
}

export default ChangeLng;