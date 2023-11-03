import { resetPassword } from "@/helpers/users";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import ChangeLng from "../ChangeLng";

const ResetPasswordSection = (props) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { t } = useTranslation();
    const router = useRouter();

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordError("");
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setConfirmPasswordError("");
    };

    const handleSavePassword = () => {
        const passwordRegex = {
            lower: /[a-z]/,
            upper: /[A-Z]/,
            number: /[0-9]/,
            special: /[!¡@#$%^&*(),.?¿":{}|<>-]/
        };

        if (!password) {
            setPasswordError(t("validations.password-required"));
            return; // Detiene la ejecución si no hay contraseña
        }

        if (password.length < 9) {
            setPasswordError(t("validations.password-length"));
            return; // Detiene la ejecución si la longitud es insuficiente
        } else if (!passwordRegex.lower.test(password)) {
            setPasswordError(t("validations.password-lowercase-required"));
            return; // Detiene la ejecución si falta una minúscula
        } else if (!passwordRegex.upper.test(password)) {
            setPasswordError(t("validations.password-uppercase-required"));
            return; // Detiene la ejecución si falta una mayúscula
        } else if (!passwordRegex.number.test(password)) {
            setPasswordError(t("validations.password-number-required"));
            return; // Detiene la ejecución si falta un número
        } else if (!passwordRegex.special.test(password)) {
            setPasswordError(t("validations.password-special-required"));
            return; // Detiene la ejecución si falta un caracter especial
        }

        if (!confirmPassword) {
            setConfirmPasswordError(t("validations.confirm-password-required"));
            return; // Detiene la ejecución si no hay confirmación de contraseña
        } else if (password !== confirmPassword) {
            setConfirmPasswordError(t("validations.password-dont-match"));
            setPasswordError(t("validations.password-dont-match"));
            return; // Detiene la ejecución si las contraseñas no coinciden
        }

        // Intenta resetear la contraseña si todas las validaciones son correctas
        resetPassword(props.oob, password).then(() => {
            toast.success(t("success.password-edited-correctly"));
            router.push("login");
        }).catch((e) => {
            toast.error(t("errors.password-not-edited-correctly"));
            console.log(e);
        });
    };

    return (
        <>
            <ChangeLng />
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
                            {!showPassword ? <button className="bg-transparent right-3 top-4 absolute" onClick={() => { setShowPassword(true) }}><img src="./svgs/pwdEyeClose.svg" className="w-5"></img></button>
                                : <button className="bg-transparent right-3 top-4 absolute" onClick={() => { setShowPassword(false) }}><img src="./svgs/pwdEyeOpen.svg" className="w-5"></img></button>}
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
                            {!showConfirmPassword ? <button className="bg-transparent right-3 top-4 absolute" onClick={() => { setShowConfirmPassword(true) }}><img src="./svgs/pwdEyeClose.svg" className="w-5"></img></button>
                                : <button className="bg-transparent right-3 top-4 absolute" onClick={() => { setShowConfirmPassword(false) }}><img src="./svgs/pwdEyeOpen.svg" className="w-5"></img></button>}
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