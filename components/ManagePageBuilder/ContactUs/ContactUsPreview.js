import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { BsInstagram } from 'react-icons/bs';
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
                            <svg className="w-9 h-9 fill-blue-500" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            <p>Facebook</p>
                        </div>
                        <div className='flex flex-col items-center space-y-1'>
                            <FaXTwitter className='w-9 h-9 fill-black' />
                            <p>Twitter</p>
                        </div>
                        <div className='flex flex-col items-center space-y-1'>
                            <svg className="w-8 h-8 fill-blue-600" role="img" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                                <g><path d="M218.123122,218.127392 L180.191928,218.127392 L180.191928,158.724263 C180.191928,144.559023 179.939053,126.323993 160.463756,126.323993 C140.707926,126.323993 137.685284,141.757585 137.685284,157.692986 L137.685284,218.123441 L99.7540894,218.123441 L99.7540894,95.9665207 L136.168036,95.9665207 L136.168036,112.660562 L136.677736,112.660562 C144.102746,99.9650027 157.908637,92.3824528 172.605689,92.9280076 C211.050535,92.9280076 218.138927,118.216023 218.138927,151.114151 L218.123122,218.127392 Z M56.9550587,79.2685282 C44.7981969,79.2707099 34.9413443,69.4171797 34.9391618,57.260052 C34.93698,45.1029244 44.7902948,35.2458562 56.9471566,35.2436736 C69.1040185,35.2414916 78.9608713,45.0950217 78.963054,57.2521493 C78.9641017,63.090208 76.6459976,68.6895714 72.5186979,72.8184433 C68.3913982,76.9473153 62.7929898,79.26748 56.9550587,79.2685282 M75.9206558,218.127392 L37.94995,218.127392 L37.94995,95.9665207 L75.9206558,95.9665207 L75.9206558,218.127392 Z M237.033403,0.0182577091 L18.8895249,0.0182577091 C8.57959469,-0.0980923971 0.124827038,8.16056231 -0.001,18.4706066 L-0.001,237.524091 C0.120519052,247.839103 8.57460631,256.105934 18.8895249,255.9977 L237.033403,255.9977 C247.368728,256.125818 255.855922,247.859464 255.999,237.524091 L255.999,18.4548016 C255.851624,8.12438979 247.363742,-0.133792868 237.033403,0.000790807055"></path></g>
                            </svg>
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
