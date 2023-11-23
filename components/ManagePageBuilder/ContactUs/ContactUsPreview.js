import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs';
import { FaXTwitter } from 'react-icons/fa6';
export const ContactUsPreview = (props) => {

    const { t } = useTranslation();
    const [pageDesign, setPageDesign] = useState(props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage)))

    useEffect(() => {
        setPageDesign(props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage)))
    }, [props.webPageData])

    const divStyles = {
        color: pageDesign?.textColor,
    }

    const inputStyles = {
        backgroundColor: pageDesign?.inputColor,
        color: pageDesign?.inputTextColor,
    }

    const buttonStyles = {
        backgroundColor: pageDesign?.buttonColor,
        color: pageDesign?.buttonTextColor,
    }

    return (
        <div className={`flex flex-col`} style={divStyles}>
            <div className="mx-auto !text-4xl italic">
                <p className="font-bold">{t("navbar.contact-us")}</p>
            </div>

            <div className={`flex ${props?.isMobilePreview && "flex-col"}`}>

                <div className="w-full mx-auto rounded-[10px] pt-8 pb-14 grid grid-cols-2 gap-4">

                    <div className='relative'>
                        <p className='font-semibold'>{t("login.name")}</p>
                        <input style={inputStyles} className={`w-full rounded-[10px] font-medium shadow mt-1 px-3 py-2`} type="text" disabled value={"Ana Marie"} />
                    </div>

                    <div className='relative'>
                        <p className='font-semibold'>{t("login.email")}</p>
                        <input style={inputStyles} className={`w-full rounded-[10px] font-medium shadow mt-1 px-3 py-2`} type="email" disabled value='armour@web.com' />
                    </div>

                    <div className='relative col-span-2'>
                        <p className='font-semibold'>{t("contact-us.subject")}</p>
                        <input style={inputStyles} className={`w-full rounded-[10px] font-medium shadow mt-1 px-3 py-2`} type="text" disabled value={props?.webPageData.isSpanish ? "Este es el tema" : "This is the subject"} />
                    </div>

                    <div className='relative col-span-2'>
                        <p className='font-semibold'>{t("contact-us.message")}</p>
                        <textarea style={inputStyles} className={`w-full rounded-[10px] font-medium shadow mt-1 px-3 py-2`} type="text" rows="5" disabled value={props?.webPageData.isSpanish ? "Escribe un mensaje..." : "Write a message..."} />
                    </div>

                    <div className="col-span-2 w-full flex justify-end mt-3">
                        <button style={buttonStyles}
                            className='w-min px-12 py-1.5 shadow-md rounded-[10px] font-bold text-lg'>
                            {t("contact-us.send")}
                        </button>
                    </div>
                </div>

                {/* social media */}
                {pageDesign?.showSocialMedia &&
                    <div className={`gap-y-6 grid pb-20 ${props.isMobilePreview ? "grid-cols-2" : "mt-10 ml-10 grid-cols-1"}`}>
                        <div className='flex flex-col items-center space-y-1'>
                            <BsFacebook className="w-9 h-9 fill-blue-500" />
                            <p>Facebook</p>
                        </div>
                        <div className='flex flex-col items-center space-y-1'>
                            <FaXTwitter className='w-9 h-9 fill-black' />
                            <p>X</p>
                        </div>
                        <div className='flex flex-col items-center space-y-1'>
                            <BsLinkedin className="w-8 h-8 fill-blue-600" />
                            <p>LinkedIn</p>
                        </div>
                        <div className='flex flex-col items-center space-y-1'>
                            <BsInstagram className='w-9 h-9' />
                            <p>Instagram</p>
                        </div>
                    </div>}
            </div>
        </div>
    )
}
