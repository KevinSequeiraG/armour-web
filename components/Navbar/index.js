import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
    const router = useRouter()
    const [showReportsOptions, setShowReportsOptions] = useState(false);
    const isLoginPage = router.pathname.includes("login");
    const isEmailNoVerified = router.pathname.includes("emailNoVerified");
    const isLandingPage = router.pathname == "/";
    const isUserActionPage = router.pathname.includes("userAction");
    const isSendEmailPassword = router.pathname.includes("sendEmailPassword");
    const isBuilderPage = router.pathname.includes("managePageBuilder");
    const isAwPage = router.pathname.includes("/aw/");
    const { t } = useTranslation();
    const { loggedUser } = useContext(UserContext);

    return (
        <>
            {isAwPage || isLandingPage || isEmailNoVerified || isSendEmailPassword || isUserActionPage || isLoginPage || isBuilderPage ? null : <aside className="bg-black w-[18rem] h-full px-4 flex justify-between flex-col">
                <div>
                    <img src="/images/awLogo-nobg.png" className="w-[10rem] mx-auto" />
                    <Link href={"/home"}><button className="button !py-2.5 !rounded-[10px] w-full"><img src="/svgs/home.svg" className="mr-2 w-[1.5rem]" />{t("navbar.home")}</button></Link>
                    <Link href={"/myProfile"}><button className="button !py-2.5 !rounded-[10px] w-full"><img className="mr-2 w-[1.2rem]" src="/svgs/Profile.svg" />{t("navbar.my-profile")}</button></Link>
                    <Link href={"/contactUs"}><button className="button !py-2.5 !rounded-[10px] w-full"><img src="/svgs/Phone.svg" className="mr-2" />{t("navbar.contact-us")}</button></Link>
                    <div className="relative">
                        <button onClick={() => setShowReportsOptions(!showReportsOptions)} className="button !py-2.5 !rounded-[10px] w-full"><img src="/svgs/Report.svg" className="mr-2 w-[1.5rem]" />{t("navbar.reports")}</button>
                        <div className={`flex flex-col animate__animated ${showReportsOptions ? "animate__fadeInLeft" : "animate__fadeOutLeft"} transition-max-height duration-1000 ease-in-out ${showReportsOptions ? "max-h-[40rem]" : "max-h-0"}`}>
                            <Link href={"/repProductAndCategories"}><button className="button !py-2.5 !rounded-[10px] w-[90%] "><img src="/svgs/Car.svg" className="mr-2 w-[1.5rem]" />{t("navbar.products-and-categories")}</button></Link>
                            <Link href={"/repSocialNetwork"}><button className="button !py-2.5 !rounded-[10px] w-[90%] "><img src="/svgs/Arroba.svg" className="mr-2 w-[1.5rem]" />{t("navbar.interactions-on-social-networks")}</button></Link>
                            <Link href={"/repUserWebPages"}><button className="button !py-2.5 !rounded-[10px] w-[90%] "><img src="/svgs/webIcon.svg" className="mr-2 w-[1.5rem]" />{t("navbar.pages-created")}</button></Link>
                            {loggedUser?.userType === "admin" && <Link href={"/repAdminWebPages"}><button className="button !py-2.5 !rounded-[10px] w-[90%] "><img src="/svgs/webIcon.svg" className="mr-2 w-[1.5rem]" />{t("navbar.pages-created")}</button></Link>}
                        </div>
                    </div>
                </div>
                <Link href={"/login"}><button className="button !py-2.5 !rounded-[10px] w-full"><img src="/svgs/LogOut.svg" className="mr-2" />{t("navbar.sign-off")}</button></Link>
            </aside >}
        </>
    )
}

export default Navbar;