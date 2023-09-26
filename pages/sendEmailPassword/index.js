import { sendResetEmailPassword } from "@/helpers/users";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const SendEmailPassword = () => {
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const router = useRouter();
    const { t, i18n } = useTranslation();
    const [lngEsp, setLngEsp] = useState(false);
    const re = /^([a-zA-Z0-9-_]+([.][a-zA-Z0-9-_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5})$/;

    const handleChangePassword = () => {
        let pass = true
        if (!re.test(email)) {
            setEmailError("El correo no tiene la estructura correcta")
            pass = false;
        }
        if (pass) {
            sendResetEmailPassword(email).then(() => {
                toast.success(t("success.password-email-sended"));
            }).catch(() => {
                toast.error(t("errors.password-email-not-sended"));
            })
        }
    }

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
        <div className="w-screen h-screen loginBody">
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
            <div>
                <img
                    className="block md:hidden mt-20 md:mt-0 w-[480px] mb-8 md:w-[353px] object-contain mx-auto"
                    src="./images/awLogo-nobg.png"
                />
            </div>
            <div className="px-8 md:px-0 flex flex-col items-center mb-16 md:bg-white md:w-[37%] md:rounded-xl md:h-[95%] md:py-[118px] xl:px-[110px] lp:px-[160px] md:ml-[10%] md:relative">
                <img
                    className="hidden md:block mt-20 md:mt-0 w-[289px] md:w-[353px] object-contain mx-auto"
                    src="./assets/images/appLogo.png"
                />
                <div className="mt-24 xl:mt-5">
                    <p className="text-white font-bold text-[25px] mb-4 md:text-[#080808]">{t("reset-password.recover-password")}</p>
                    <p className="text-gray-400 text-[12px] mb-12 w-[74%] md:w-full md:font-semibold">
                        {t("reset-password.instructions-to-send-email")}
                    </p>

                    <div className="w-full text-left mb-4">
                        <label className="md:text-[#272E45] after:content-['*'] after:ml-0.5 after:text-red-600 inline-block font-bold text-[12px] tracking-normal text-[#F4F6F5] leading-4 mb-[7px]">
                            {t("user-data.email")}
                        </label>
                        <br />
                        <input
                            type="email"
                            className="h-[50px] rounded-xl border border-[#868686] bg-transparent w-full text-[#868686] px-5 focus:border-[#E9E9EB] focus:text-[#E9E9EB] md:focus:text-[#868686]"
                            placeholder="Info@empresa.com"
                            value={email}
                            onChange={(e) => { setEmailError(""); setEmail(e.target.value) }}
                        />
                        <div className="text-right">
                            <label className="text-[#FE3A5C] text-[12px] ">
                                {emailError}
                            </label>
                        </div>
                    </div>
                    <button
                        className="relative h-auto bg-green-600 hover:bg-green-500 md:bg-[#101217] text-[#FFFFFF] text-[15px] w-full py-[15px] rounded-xl mt-3 font-semibold"
                        onClick={handleChangePassword}
                    >
                        {t("buttons.send-email")}
                    </button>
                    <button
                        className="relative h-auto bg-gray-800 hover:bg-gray-600 md:bg-[#101217] text-[#FFFFFF] text-[15px] w-full py-[15px] rounded-xl mt-3 font-semibold"
                        onClick={() => router.push("login")}
                    >
                        {t("buttons.return-to-login")}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SendEmailPassword;