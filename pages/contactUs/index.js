import { UserContext } from "@/context/UserContext";
import Head from "next/head";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import 'animate.css';

const ContactUs = () => {
    const { t } = useTranslation();
    const { loggedUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState({});
    const [formValues, setFormValues] = useState({ email: `${loggedUser?.email}`, phone: `${loggedUser?.phone}`, subject: '', message: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const validateForm = async () => {
        const errors = {};
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formValues.email) errors.email = t("validations.email-required");
        else if (!emailRegex.test(formValues.email)) errors.email = t("validations.email-invalid");
        if (!formValues.subject) errors.subject = t("validations.subject-is-required");
        if (!formValues.message) errors.message = t("validations.message-is-required");

        setFormError(errors);
        return Object.keys(errors).length === 0;
    };


    const handleRegister = async () => {
        const validationsResult = await validateForm();
        if (isLoading) return;
        setIsLoading(true);
        if (validationsResult) {
            try {
                await fetch("/api/sendMail", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: formValues.email,
                        phone: formValues.phone,
                        subject: formValues.subject,
                        message: formValues.message,
                    }),
                });
                setFormValues({ email: `${loggedUser?.email}`, phone: `${loggedUser?.phone}`, subject: '', message: '' });
                toast.success(t("success.email-sended"));
            } catch (error) {
                console.error('Error al enviar correo:', error);
            }
        }
        setIsLoading(false);
    };

    return (
        <div className="bg-main h-[92vh] px-20 py-20 overflow-y-auto scrollbar flex flex-col">
            <Head>
                <title>{t("navbar.contact-us")} | ArmourWeb</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/images/awLogo.png" />
            </Head>
            <div className="flex items-center mx-auto italic rounded-[.5rem] border-2 border-black w-[20rem] h-[6rem] justify-center"><h1 className="m-0 font-bold text-[3rem] ">{t("navbar.contact-us")}</h1></div>

            <div className="text-lg font-bold my-4 leading-6 text-center w-3/5 mx-auto">
                {t("contact-us.subtitle")}
            </div>

            <div className="w-4/5 mx-auto mt-8 !bg-gray-600 rounded-[10px] p-8 shadow-md text-[#e5e7eb] grid grid-cols-2 gap-4">
                <div className='relative'>
                    <p className='font-semibold'>{t("login.email")}</p>
                    <input className={`w-full rounded-[10px] bg-gray-800 shadow mt-1 px-3 py-2 ${formError.email && 'border !border-red-200'}`} type="email" placeholder={t("login.email")} name="email" value={formValues.email} onChange={handleInputChange} />
                    {formError.email && <p className="animate__animated animate__flipInX absolute text-xs font-medium -bottom-4 right-0 text-red-200">{formError.email}</p>}
                </div>

                <div className='relative'>
                    <p className='font-semibold'>{t("user-data.phone")}</p>
                    <input className={`w-full rounded-[10px] bg-gray-800 shadow mt-1 px-3 py-2`} type="number" placeholder={t("user-data.phone")} name="phone" value={formValues.phone} onChange={handleInputChange} />
                </div>

                <div className='relative col-span-2'>
                    <p className='font-semibold'>{t("contact-us.subject")}</p>
                    <input className={`w-full rounded-[10px] bg-gray-800 shadow mt-1 px-3 py-2 ${formError.subject && 'border !border-red-200'}`} type="text" placeholder={t("contact-us.subject")} name="subject" value={formValues.subject} onChange={handleInputChange} />
                    {formError.subject && <p className="animate__animated animate__flipInX absolute text-xs font-medium -bottom-4 right-0 text-red-200">{formError.subject}</p>}
                </div>

                <div className='relative col-span-2'>
                    <p className='font-semibold'>{t("contact-us.message")}</p>
                    <textarea className={`w-full rounded-[10px] bg-gray-800 shadow mt-1 px-3 py-2 ${formError.message && 'border !border-red-200'}`} type="text" placeholder={t("contact-us.message") + "..."} name="message" value={formValues.message} onChange={handleInputChange} rows="5" />
                    {formError.message && <p className="animate__animated animate__flipInX absolute text-xs font-medium -bottom-4 right-0 text-red-200">{formError.message}</p>}
                </div>

                <div className="col-span-2 w-full flex justify-end mt-3">
                    <button
                        className='bg-[#EFE1A2] w-min px-12 py-2 shadow rounded-[10px] text-black font-bold text-lg'
                        onClick={handleRegister}
                        disabled={isLoading}>
                        {t("contact-us.send")}
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ContactUs;