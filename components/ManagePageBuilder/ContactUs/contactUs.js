import { database } from '@/lib/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs';
import { FaXTwitter } from 'react-icons/fa6';
import { toast } from 'react-toastify';

export const ContactUs = (props) => {

    const [pageDesign, setPageDesign] = useState(props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage)))

    useEffect(() => {
        setPageDesign(props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage)))
    }, [props?.webPageData])

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

    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState({});
    const [formValues, setFormValues] = useState({ name: '', email: '', subject: '', message: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const validateForm = async () => {
        const errors = {};
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!formValues.name) errors.name = "error";
        if (!formValues.email) errors.email = "error";
        else if (!emailRegex.test(formValues.email)) errors.email = "error";
        if (!formValues.subject) errors.subject = "error";
        if (!formValues.message) errors.message = "error";

        setFormError(errors);
        return Object.keys(errors).length === 0;
    };

    const handleRegister = async () => {
        const validationsResult = await validateForm();
        if (isLoading) return;
        setIsLoading(true);
        if (validationsResult) {
            try {
                await fetch("/api/sendContactEmail", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: formValues.name,
                        email: formValues.email,
                        emailToRecieve: pageDesign?.emailRecieve,
                        subject: formValues.subject,
                        message: formValues.message,
                        language: props?.webPageData?.isSpanish ? "es" : "en"
                    }),
                });
                setFormValues({ name: '', email: '', subject: '', message: '' });
                toast.success(props?.webPageData?.isSpanish ? "Correo enviado" : "Email sent");
            } catch (error) {
                console.error('Error al enviar correo:', error);
            }
        }
        setIsLoading(false);
    };

    const redirectToSocialMedia = async (socialMediaSelected) => {
        try {
            const databaseWebPageRef = doc(database, `admin/data/webpages/${props?.webPageData?.pageUrl}`);
            await getDoc(databaseWebPageRef).then((doc) => {
                let webpageData = doc.data();
                switch (socialMediaSelected) {
                    case "facebook":
                        updateDoc(databaseWebPageRef, {
                            totalFacebookRedirects: parseInt(webpageData?.totalFacebookRedirects) + 1,
                        })
                        window.open(pageDesign?.fb, "_blank");
                        break;
                    case "twitter":
                        updateDoc(databaseWebPageRef, {
                            totalTwitterRedirects: parseInt(webpageData?.totalTwitterRedirects) + 1,
                        })
                        window.open(pageDesign?.twitter, "_blank");
                        break;
                    case "linkedIn":
                        updateDoc(databaseWebPageRef, {
                            totalLinkedInRedirects: parseInt(webpageData?.totalLinkedInRedirects) + 1,
                        })
                        window.open(pageDesign?.linkedIn, "_blank");
                        break;
                    case "instagram":
                        updateDoc(databaseWebPageRef, {
                            totalInstagramRedirects: parseInt(webpageData?.totalInstagramRedirects) + 1,
                        })
                        window.open(pageDesign?.instagram, "_blank");
                        break;
                    default:
                        break;
                }

            });
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className={`flex flex-col`} style={divStyles}>
            <div className="mx-auto !text-4xl italic">
                <p className="font-bold">{props?.webPageData?.isSpanish ? "Contacto" : "Contact us"}</p>
            </div>

            <div className={`flex flex-col mdx1000:!flex-row`}>

                <div className="w-full mx-auto rounded-[10px] pt-8 pb-14 grid grid-cols-2 gap-4">

                    <div className='relative col-span-2 mdx1000:col-span-1'>
                        <p className='font-semibold'>{props?.webPageData?.isSpanish ? "Tu nombre" : "Your name"}</p>
                        <input style={inputStyles} name="name" value={formValues.name} onChange={handleInputChange} className={`w-full rounded-[10px] font-medium shadow mt-1 px-3 py-2 ${formError.name && 'border !border-red-400'}`} type="text" placeholder={"Ana Mary"} />
                        {formError.name && <p className="animate__animated animate__flipInX absolute text-lg font-bold top-7 right-2 text-red-500">*</p>}
                    </div>

                    <div className='relative col-span-2 mdx1000:col-span-1'>
                        <p className='font-semibold'>{props?.webPageData?.isSpanish ? "Correo" : "Email"}</p>
                        <input style={inputStyles} name="email" value={formValues.email} onChange={handleInputChange} className={`w-full rounded-[10px] font-medium shadow mt-1 px-3 py-2 ${formError.email && 'border !border-red-400'}`} type="email" placeholder='armour@web.com' />
                        {formError.email && <p className="animate__animated animate__flipInX absolute text-lg font-bold top-7 right-2 text-red-500">*</p>}
                    </div>

                    <div className='relative col-span-2'>
                        <p className='font-semibold'>{props?.webPageData?.isSpanish ? "Asunto" : "Subject"}</p>
                        <input style={inputStyles} name="subject" value={formValues.subject} onChange={handleInputChange} className={`w-full rounded-[10px] font-medium shadow mt-1 px-3 py-2 ${formError.subject && 'border !border-red-400'}`} type="text" placeholder={props?.webPageData?.isSpanish ? "Este es el tema" : "This is the subject"} />
                        {formError.subject && <p className="animate__animated animate__flipInX absolute text-lg font-bold top-7 right-2 text-red-500">*</p>}
                    </div>

                    <div className='relative col-span-2'>
                        <p className='font-semibold'>{props?.webPageData?.isSpanish ? "Mansaje" : "Message"}</p>
                        <textarea style={inputStyles} name="message" value={formValues.message} onChange={handleInputChange} className={`w-full rounded-[10px] font-medium shadow mt-1 px-3 py-2 ${formError.message && 'border !border-red-400'}`} type="text" rows="5" placeholder={props?.webPageData?.isSpanish ? "Escribe un mensaje..." : "Write a message..."} />
                        {formError.message && <p className="animate__animated animate__flipInX absolute text-lg font-bold top-7 right-2 text-red-500">*</p>}
                    </div>

                    <div className="col-span-2 w-full flex justify-end mt-3">
                        <button style={buttonStyles} onClick={handleRegister} disabled={isLoading}
                            className='w-min px-12 py-1.5 shadow-md rounded-[10px] font-bold text-lg'>
                            {props?.webPageData?.isSpanish ? "Enviar" : "Send"}
                        </button>
                    </div>
                </div>

                {/* social media */}
                {pageDesign?.showSocialMedia && (pageDesign?.fb || pageDesign?.twitter || pageDesign?.linkedIn || pageDesign?.instagram) &&
                    <div className={`gap-y-6 grid pb-20 grid-cols-2 mdx1000:mt-10 mdx1000:ml-10 mdx1000:grid-cols-1`}>
                        {pageDesign?.fb && <div className='flex flex-col items-center space-y-1 h-min cursor-pointer' onClick={() => redirectToSocialMedia("facebook")}>
                            <BsFacebook className="w-9 h-9 fill-blue-500" />
                            <p>Facebook</p>
                        </div>}
                        {pageDesign?.twitter && <div className='flex flex-col items-center space-y-1 h-min cursor-pointer' onClick={() => redirectToSocialMedia("twitter")}>
                            <FaXTwitter className='w-9 h-9' />
                            <p>X</p>
                        </div>}
                        {pageDesign?.linkedIn && <div className='flex flex-col items-center space-y-1 h-min cursor-pointer' onClick={() => redirectToSocialMedia("linkedIn")}>
                            <BsLinkedin className="w-8 h-8 fill-blue-600" />
                            <p>LinkedIn</p>
                        </div>}
                        {pageDesign?.instagram && <div className='flex flex-col items-center space-y-1 h-min cursor-pointer' onClick={() => redirectToSocialMedia("instagram")}>
                            <BsInstagram className='w-9 h-9'/>
                            <p>Instagram</p>
                        </div>}
                    </div>}
            </div>
        </div >
    )
}
