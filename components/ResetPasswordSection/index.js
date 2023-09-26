import { resetPassword } from "@/helpers/users";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const ResetPasswordSection = (props) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const [lngEsp, setLngEsp] = useState(false);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordError("");
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setConfirmPasswordError("");
    };

    const handleSavePassword = () => {
        if (password.length < 8) {
            setPasswordError("La contraseña debe tener al menos 8 caracteres.");
        } else if (password !== confirmPassword) {
            setConfirmPasswordError("Las contraseñas no coinciden.");
        } else {
            resetPassword(props.oob, password).then(() => {
                toast.success(t("success.password-edited-correctly"));
                router.push("login");
            }).catch((e) => {
                toast.error(t("errors.password-not-edited-correctly"));
                console.log(e);
            })
        }
    };

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
        <>
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
            <div className="flex flex-col items-center mb-16 md:bg-white md:w-[37%] md:rounded-xl md:h-[95%] md:py-[70px] lp:px-[180px] md:ml-[10%] md:relative">
                <img
                    className="md:hidden mb-18 block mt-20 md:mt-0 w-[289px] md:w-[353px] object-contain mx-auto"
                    src="./images/awLogo-nobg.png"
                />
                <img
                    className="hidden md:block mt-20 md:mt-0 w-[289px] md:w-[353px] object-contain mx-auto"
                    src="./images/awLogo-nobg.png"
                />
                <div className="lp:mt-32 xl:mt-10">
                    <p className="text-white font-bold text-[25px] mb-1 md:text-[#080808]">{t("reset-password.reset-passord")}</p>
                    <p className="text-gray-400 text-[12px] mb-12 w-[74%] md:w-full md:font-semibold">
                        {t("reset-password.enter-password")}
                    </p>

                    <div className="w-full text-left mb-4">
                        <label className="md:text-[#272E45] after:content-['*'] after:ml-0.5 after:text-red-600 inline-block font-bold text-[12px] tracking-normal text-[#F4F6F5] leading-4 mb-[7px]">
                            {t("reset-password.new-password")}
                        </label>
                        <br />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="h-[50px] rounded-xl border border-[#868686] bg-transparent w-full text-[#868686] px-5 focus:border-[#E9E9EB] focus:text-[#E9E9EB] md:focus:text-[#868686]"
                                placeholder="*******"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            {!showPassword ? <button className="bg-transparent right-3 top-3 absolute" onClick={() => { setShowPassword(true) }}><img src="./svgs/pwdEyeClose.svg" className="w-5"></img></button>
                                : <button className="bg-transparent right-3 top-3 absolute" onClick={() => { setShowPassword(false) }}><img src="./svgs/pwdEyeOpen.svg" className="w-5"></img></button>}
                        </div>
                        <div className="text-right">
                            <label className="text-[#FE3A5C] text-[12px] ">
                                {passwordError}
                            </label>
                        </div>
                    </div>
                    <div className="w-full text-left">
                        <label className="md:text-[#272E45] after:content-['*'] after:ml-0.5 after:text-red-600 inline-block font-bold text-[12px] tracking-normal text-[#F4F6F5] leading-4 mb-[7px]">
                            {t("reset-password.repeat-password")}
                        </label>
                        <br />
                        <div className="relative">
                            <input
                                placeholder="*******"
                                type={showConfirmPassword ? "text" : "password"}
                                className="h-[50px] rounded-xl border border-[#868686] bg-transparent w-full text-[#868686] px-5 focus:border-[#E9E9EB] focus:text-[#E9E9EB] md:focus:text-[#868686]"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                            {!showConfirmPassword ? <button className="bg-transparent right-3 top-3 absolute" onClick={() => { setShowConfirmPassword(true) }}><img src="./svgs/pwdEyeClose.svg" className="w-5"></img></button>
                                : <button className="bg-transparent right-3 top-3 absolute" onClick={() => { setShowConfirmPassword(false) }}><img src="./svgs/pwdEyeOpen.svg" className="w-5"></img></button>}
                        </div>
                        <div className="text-right">
                            <label className="text-[#FE3A5C] text-[12px] ">
                                {confirmPasswordError}
                            </label>
                        </div>
                    </div>
                    <button
                        className="relative h-auto bg-[#35CA75] text-[#FFFFFF] text-[15px] w-full py-[15px] rounded-xl mt-6 font-semibold"
                        onClick={handleSavePassword}
                    >
                        {t("buttons.change-password")}
                    </button>
                </div>
            </div>
        </>
    )
}

export default ResetPasswordSection;