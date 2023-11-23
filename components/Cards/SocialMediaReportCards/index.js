import { useTranslation } from "react-i18next";
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";

const SocialMediaReportCard = (props) => {
    const { t } = useTranslation();

    return (
        <div className="w-[12rem] h-auto py-6 border-8 border-black rounded-xl text-center overflow-hidden">
            {props.cardType === "Facebook" && <BsFacebook className="w-16 h-16 fill-blue-500 mx-auto" />}
            {props.cardType === "Instagram" && <BsInstagram className='w-16 h-16 mx-auto' />}
            {props.cardType === "LinkedIn" && <BsLinkedin className="w-16 h-16 fill-blue-600 mx-auto" />}
            {props.cardType === "X" && <FaXTwitter className='w-16 h-16 mx-auto' />}
            <p className="font-bold">{props.cardType}</p>
            <p className="mt-4 font-semibold">{t("reports.total-redirected-users")}:</p>
            {props.cardType === "Facebook" && <p className="text-[4rem]">{props.webpage?.totalFacebookRedirects}</p>}
            {props.cardType === "Instagram" && <p className="text-[4rem]">{props.webpage?.totalInstagramRedirects}</p>}
            {props.cardType === "LinkedIn" && <p className="text-[4rem]">{props.webpage?.totalLinkedInRedirects}</p>}
            {props.cardType === "X" && <p className="text-[4rem]">{props.webpage?.totalTwitterRedirects}</p>}
        </div>
    )
}

export default SocialMediaReportCard;