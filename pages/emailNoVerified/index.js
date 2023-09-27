import ChangeLng from "@/components/ChangeLng";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const EmailNoVerified = () => {
    const { sendUserEmailVerification } = useContext(UserContext);
    const { t } = useTranslation();

    return (
        <div className="w-screen h-screen loginBody">
            <ChangeLng />
            <div className="px-8 md:px-0 flex flex-col items-center mb-16 md:bg-white md:w-[37%] md:rounded-xl md:h-[95%] md:py-[70px] xl:px-[110px] lp:px-[180px] md:ml-[10%] md:relative">
                <img
                    className="md:hidden mb-20 block mt-20 md:mt-0 w-[289px] md:w-[353px] object-contain mx-auto"
                    src="./images/awLogo-nobg.png"
                />
                <img
                    className="hidden md:block mt-20 md:mt-0 w-[289px] md:w-[353px] object-contain mx-auto"
                    src="./images/awLogo-nobg.png"
                />
                <div className="xl:mt-20 lp:mt-40">
                    <p className="text-white font-bold text-[25px] text-center mb-1 md:text-[#080808]">{t("verify-page.verify-your-email")}</p>
                    <p className="text-gray-300 text-[12px] mb-12 text-center w-[74%] mx-auto md:w-full md:font-semibold">{t("verify-page.we-need-to-know")}</p>
                    <button
                        className="relative h-auto bg-[#35CA75] text-[#FFFFFF] text-[15px] w-full py-[15px] rounded-xl mt-6 font-semibold"
                        onClick={
                            () => {
                                sendUserEmailVerification().then(() => {
                                    toast.success(t("success.password-email-sended"));
                                }).catch((err) => {
                                    toast.error(t("errors.password-email-not-sended"));
                                })
                            }
                        }
                    >
                        {t("buttons.send-email")}
                    </button>
                    <Link href={"/login"}>
                        <button
                            className="relative h-auto bg-[#F4F6F5] text-[#080808] text-[15px] w-full py-[15px] rounded-xl mt-6 font-semibold"
                        >
                            {t("buttons.return-to-login")}
                        </button>
                    </Link>
                </div>
            </div >
        </div>
    )
}

export default EmailNoVerified;