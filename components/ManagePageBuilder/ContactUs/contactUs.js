import { database } from '@/lib/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { BsInstagram } from 'react-icons/bs';
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
                        emailToRecieve: pageDesign?.emailToRecieve,
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
            const databaseWebPageRef = doc(database, `admin/data/webpages/${props?.webPageData?.name}`);
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
                <p className="font-bold">{props?.webPageData?.isSpanish ? "Contácto" : "Contact us"}</p>
            </div>

            <div className={`flex flex-col mdx1000:!flex-row`}>

                <div className="w-full mx-auto rounded-[10px] pt-8 pb-14 grid grid-cols-2 gap-4">

                    <div className='relative col-span-2 mdx1000:col-span-1'>
                        <p className='font-semibold'>{props?.webPageData?.isSpanish ? "Tu nombre" : "Your name"}</p>
                        <input style={inputStyles} name="name" value={formValues.name} onChange={handleInputChange} className={`w-full rounded-[10px] font-medium shadow mt-1 px-3 py-2 ${formError.name && 'border !border-red-400'}`} type="text" placeholder={"Ana Mary"} />
                        {formError.name && <p className="animate__animated animate__flipInX absolute text-lg font-bold top-7 right-2 text-red-500">*</p>}
                    </div>

                    <div className='relative col-span-2 mdx1000:col-span-1'>
                        <p className='font-semibold'>{props?.webPageData?.isSpanish ? "Correo" : "Contact us"}</p>
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
                            <svg className="w-9 h-9 fill-blue-500" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            <p>Facebook</p>
                        </div>}
                        {pageDesign?.twitter && <div className='flex flex-col items-center space-y-1 h-min cursor-pointer' onClick={() => redirectToSocialMedia("twitter")}>
                            <FaXTwitter className='w-9 h-9' />
                            <p>Twitter</p>
                        </div>}
                        {pageDesign?.linkedIn && <div className='flex flex-col items-center space-y-1 h-min cursor-pointer' onClick={() => redirectToSocialMedia("linkedIn")}>
                            <svg className="w-8 h-8 fill-blue-600" role="img" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                                <g><path d="M218.123122,218.127392 L180.191928,218.127392 L180.191928,158.724263 C180.191928,144.559023 179.939053,126.323993 160.463756,126.323993 C140.707926,126.323993 137.685284,141.757585 137.685284,157.692986 L137.685284,218.123441 L99.7540894,218.123441 L99.7540894,95.9665207 L136.168036,95.9665207 L136.168036,112.660562 L136.677736,112.660562 C144.102746,99.9650027 157.908637,92.3824528 172.605689,92.9280076 C211.050535,92.9280076 218.138927,118.216023 218.138927,151.114151 L218.123122,218.127392 Z M56.9550587,79.2685282 C44.7981969,79.2707099 34.9413443,69.4171797 34.9391618,57.260052 C34.93698,45.1029244 44.7902948,35.2458562 56.9471566,35.2436736 C69.1040185,35.2414916 78.9608713,45.0950217 78.963054,57.2521493 C78.9641017,63.090208 76.6459976,68.6895714 72.5186979,72.8184433 C68.3913982,76.9473153 62.7929898,79.26748 56.9550587,79.2685282 M75.9206558,218.127392 L37.94995,218.127392 L37.94995,95.9665207 L75.9206558,95.9665207 L75.9206558,218.127392 Z M237.033403,0.0182577091 L18.8895249,0.0182577091 C8.57959469,-0.0980923971 0.124827038,8.16056231 -0.001,18.4706066 L-0.001,237.524091 C0.120519052,247.839103 8.57460631,256.105934 18.8895249,255.9977 L237.033403,255.9977 C247.368728,256.125818 255.855922,247.859464 255.999,237.524091 L255.999,18.4548016 C255.851624,8.12438979 247.363742,-0.133792868 237.033403,0.000790807055"></path></g>
                            </svg>
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
