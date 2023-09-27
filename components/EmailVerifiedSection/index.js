import { handleVerifyEmail } from "@/helpers/users"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import ChangeLng from "../ChangeLng"

const EmailVerifiedSection = (props) => {
    const router = useRouter()
    const { t } = useTranslation();

    useEffect(() => {
        handleVerifyEmail(props.oob)
        if (props.oob == undefined) {
            router.reload()
        }
    }, [])

    return (
        <div className="flex flex-col items-center mb-10 xl:bg-white xl:w-[37%] xl:rounded-xl xl:h-auto xl:py-[118px] xl:px-[60px] xl:ml-[10%] xl:relative">
            <ChangeLng />
            <img
                className="xl:hidden mb-20 block mt-20 md:mt-0 w-[289px] md:w-[353px] object-contain mx-auto"
                src="./images/awLogo-nobg.png"
            />
            <img
                className="hidden xl:block mt-20 md:mt-0 w-[289px] md:w-[353px] object-contain mx-auto"
                src="./images/awLogo-nobg.png"
            />
            <div className="mt-20">
                <p className="text-white text-center font-bold text-[25px] mb-1 xl:text-[#080808]">{t("verify-page.email-verified")}</p>
                <p className="text-gray-300 text-[12px] mb-12 w-[74%] mx-auto md:w-full text-center md:font-semibold">{t("verify-page.desc-verified")}</p>
                <Link href={"/login"}>
                    <button className="relative h-auto bg-[#35CA75] text-[#FFFFFF] text-[15px] w-full py-[15px] rounded-xl mt-6 font-semibold">
                        {t("login.log-in")}
                    </button>
                </Link>
            </div>
        </div >
    )
}

export default EmailVerifiedSection;