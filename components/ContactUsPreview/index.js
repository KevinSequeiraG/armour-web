import React from 'react'
import { useTranslation } from 'react-i18next';

export const ContactUsPreview = (props) => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col">
            <div className="mx-auto !text-4xl italic">
                <p className="font-bold">{t("navbar.contact-us")}</p>
            </div>

            <div className='flex flex-col lg:flex-row'>



                <div className="w-full mx-auto rounded-[10px] pt-8 pb-16 grid grid-cols-2 gap-4">

                    <div className='relative'>
                        <p className='font-semibold'>Nombre</p>
                        <input className={`w-full rounded-[10px] bg-[#e5e7eb] text-black font-medium shadow mt-1 px-3 py-2`} type="text" disabled placeholder='John Green' />
                    </div>

                    <div className='relative'>
                        <p className='font-semibold'>{t("login.email")}</p>
                        <input className={`w-full rounded-[10px] bg-[#e5e7eb] text-black font-medium shadow mt-1 px-3 py-2`} type="email" disabled placeholder='armour@web.com' />
                    </div>

                    <div className='relative col-span-2'>
                        <p className='font-semibold'>{t("contact-us.subject")}</p>
                        <input className={`w-full rounded-[10px] bg-[#e5e7eb] text-black font-medium shadow mt-1 px-3 py-2`} type="text" disabled placeholder='Este es el tema' />
                    </div>

                    <div className='relative col-span-2'>
                        <p className='font-semibold'>{t("contact-us.message")}</p>
                        <textarea className={`w-full rounded-[10px] bg-[#e5e7eb] text-black font-medium shadow mt-1 px-3 py-2`} type="text" rows="5" disabled placeholder='Escribe un mensaje...' />
                    </div>

                    <div className="col-span-2 w-full flex justify-end mt-3">
                        <button
                            className='bg-[#EFE1A2] w-min px-12 py-1.5 shadow-md rounded-[10px] text-black font-bold text-lg'>
                            {t("contact-us.send")}
                        </button>
                    </div>
                </div>

                {/* social media */}
                <div className='flex flex-col'>
                    
                </div>
            </div>
        </div>
    )
}
