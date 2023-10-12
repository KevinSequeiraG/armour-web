import { UserContext } from "@/context/UserContext";
import { getUserByUid } from "@/helpers/users";
//No borrar el import, es para devs 
// import { updateEmailVerified } from "@/helpers/users";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
    const router = useRouter();
    const isLoginPage = router.pathname.includes("login");
    const isUserActionPage = router.pathname.includes("userAction");
    const isSendEmailPassword = router.pathname.includes("sendEmailPassword");
    const isEmailNoVerified = router.pathname.includes("emailNoVerified");
    const isBuilderPage = router.pathname.includes("managePageBuilder");
    const isLandingPage = router.pathname == "/";
    const [lngEsp, setLngEsp] = useState(false);
    const { t, i18n } = useTranslation();
    const [showConfig, setShowConfig] = useState(false);
    const configRef = useRef(null);
    const { loggedUser } = useContext(UserContext);
    const [userData, setUserData] = useState();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const handleClickOutside = (event) => {
        if (configRef.current && !configRef.current.contains(event.target)) {
            setShowConfig(false);
        }
    };

    useEffect(() => {
        if (lngEsp) {
            changeLanguage("es")
        } else {
            changeLanguage("en")
        }
    }, [lngEsp])

    useEffect(() => {
        // Agregar el event listener al documento cuando showConfig está abierto
        if (showConfig) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            // Remover el event listener cuando showConfig está cerrado
            document.removeEventListener("mousedown", handleClickOutside);
        }

        // Limpiar el event listener cuando el componente se desmonta
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showConfig]);

    useEffect(() => {
        if (loggedUser) {
            getUserByUid(loggedUser.uid).then(user => {
                setUserData(user)
            })
        }

    }, [loggedUser])

    return (
        <>
            {isLandingPage || isEmailNoVerified || isSendEmailPassword || isUserActionPage || isLoginPage || isBuilderPage ? null : <div className="bg-black h-[5rem] flex justify-end items-center">

                {/* Button for testing, if you need to reset the verify email with the logged user, log in and then press this button */}
                {/* <button className="text-white border border-1 border-white mr-10 w-[10rem]" onClick={() => { updateEmailVerified(loggedUser.uid).then(() => { console.log("Pueso a false"); }).catch((e) => { console.log("e", e); }) }}>Reiniciar verificacion a false</button> */}

                <div className="flex flex-col text-right">
                    <p className="mr-4 text-[#EFE1A2] capitalize">{userData?.name + " " + userData?.lastname}</p>
                    <div className="relative mr-4" ref={configRef}>
                        <button onClick={() => setShowConfig(!showConfig)} className="mt-1 text-gray-400 bg-gray-200 rounded-full p-1"><img src="./svgs/config.svg"></img></button>
                        {showConfig && <div className="border border-1 border-[#F5F5F5] bg-gray-500 min-h-[5rem] min-w-[5rem] absolute right-3 px-3 py-4 rounded-xl text-left">
                            <p className="text-[#F5F5F5]">{t("config.language")}</p>
                            <div className='mt-2 flex items-center bg-[#F5F5F5] px-4 py-2 rounded-[1rem] border border-1 border-gray-900'>
                                <span className="text-[1rem] font-medium text-gray-900 mr-3">EN</span>
                                <label className="relative inline-flex items-center cursor-pointer" >
                                    <div>
                                        <input type="checkbox" value="" className="sr-only peer" checked={lngEsp} onClick={(e) => setLngEsp(!lngEsp)} />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-700 dark:peer-focus:ring-gray-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-700"></div>
                                    </div>
                                    <span className="ml-3 text-[1rem] font-medium text-gray-900">ES</span>
                                </label>
                            </div>
                        </div>}
                    </div>
                </div>
                {userData?.imageProfileUrl === "" ? <div className="rounded-full w-[4rem] mr-4 h-[4rem] bg-[#EFE1A2]"></div> : <img className="rounded-full w-[4rem] mr-4 h-[4rem]" src={userData?.imageProfileUrl} />}
            </div>}
        </>
    )
}

export default Header;