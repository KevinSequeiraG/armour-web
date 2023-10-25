import { useTranslation } from "react-i18next";
import ImageUploader from "../ImageUploader";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiSolidInfoCircle } from "react-icons/bi";
import { CiCircleAlert } from "react-icons/ci";
import { Tooltip } from 'react-tooltip'
import { GetWebpageExists } from "@/helpers/webpage";
import { toast } from 'react-toastify';

const FirstStep = (props) => {
    const { t } = useTranslation();
    const router = useRouter();
    const [newWebPageLogo, setNewWebPageLogo] = useState()
    const [newWebPageName, setNewWebPageName] = useState()
    const [registrationError, setRegistrationError] = useState({});

    const validationsAndContinue = async () => {
        const errors = {};
        if (!newWebPageName) {
            errors.name = t("validations.required");
            setRegistrationError(errors);
        } else {
            const newUrl = creteURL(newWebPageName);
            const pageNameAlreadyInUse = await GetWebpageExists(newUrl)

            if (pageNameAlreadyInUse) toast.warning(t("validations.page-name-already-exits"))
            else {
                console.log("newUrl", newUrl);
                props.setWebPageData({ ...props.webPageData, pageUrl: newUrl })
                props.setShowFirstStep(false)
            }
        }
    }

    const creteURL = (pageName) => {
        // Convertir a minúsculas
        let newUrlName = pageName?.toLowerCase();

        // Sustituir caracteres acentuados
        newUrlName = newUrlName
            .replace(/[áäàâ]/g, 'a')
            .replace(/[éëèê]/g, 'e')
            .replace(/[íïìî]/g, 'i')
            .replace(/[óöòô]/g, 'o')
            .replace(/[úüùû]/g, 'u')
            .replace(/[ñ]/g, 'n');

        // Eliminar caracteres no permitidos (solo permitir letras, números)
        newUrlName = newUrlName.replace(/[^a-z0-9]/g, '');

        return newUrlName;
    };

    const handleSetNewLogo = (imageUrl) => {
        setNewWebPageLogo(imageUrl)
        let urlImage = ""
        if (imageUrl) urlImage = URL.createObjectURL(imageUrl)
        props.setLogoPage(urlImage)
        props.setWebPageData({ ...props.webPageData, logo: urlImage })
    }

    const handleSetNeName = (e) => {
        setNewWebPageName(e.target.value)
        props.setWebPageData({ ...props.webPageData, name: e.target.value })
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 loginBody">
            <div className="relative rounded-lg p-5 mx-auto z-50 border-[.2rem] shadow-md bg-white">
                <p className="text-black font-bold text-[1.8rem] text-center">{t("first-step.lbl")}</p>
                <p className="text-black font-semibold text-[1.4rem] text-center">{t("first-step.desc")}</p>
                <div className="flex items-center justify-center space-x-1 mt-3">
                    <CiCircleAlert className="w-6 h-6 text-red-600" />
                    <p className="text-gray-700 font-medium text-[1rem] italic text-center">{t("first-step.alert")}</p>
                </div>
                <div className="flex flex-col items-center mt-5">
                    <div className="relative">
                        <p className="text-center font-semibold after:content-['*'] after:ml-0.5 after:text-red-500">{t("first-step.page-name")}</p>
                        <input onChange={handleSetNeName} type="text" className="border border-gray-400 rounded-xl mx-auto h-[2rem] mt-2 px-2 bg-[#f5f5f5]" />
                        {registrationError.name && <p className="animate__animated animate__flipInX absolute text-xs font-medium -bottom-4 right-0 text-red-600">* {registrationError.name}</p>}
                    </div>
                    <div>
                        <div className="flex items-center justify-center space-x-2 mt-10">
                            <p className="text-center font-semibold">{t("first-step.logo")}<em className="ml-1 text-sm text-gray-500">({t("validations.optional")})</em></p>
                            <BiSolidInfoCircle className="w-6 h-6 text-gray-500 hover:text-gray-600 cursor-pointer" data-tooltip-id="logo" data-tooltip-content={t("first-step.tooltip_logo")} />
                        </div>
                        <Tooltip id="logo" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
                        <ImageUploader setImage={handleSetNewLogo} image={newWebPageLogo} divDesign="mb-5 mt-2 w-[12rem] h-[12rem] bg-[#f5f5f5] rounded-full mx-auto shadow-md border border-gray-400" />
                    </div>
                </div>
                <div className="flex">
                    <button onClick={() => router.push("/home")} className="mx-auto cursor-pointer relative flex items-center justify-center w-[9rem] bg-red-500 border-2 border-gray-300 hover:bg-red-700 text-[1rem] text-center mt-3 py-2 px-4 rounded-xl text-gray-100">{t("buttons.cancel")}</button>
                    <button onClick={() => validationsAndContinue()} className="mx-auto cursor-pointer relative flex items-center justify-center w-[9rem] bg-green-600 border-2 border-gray-300 hover:bg-green-700 text-[1rem] text-center mt-3 py-2 px-4 rounded-xl text-gray-100">{t("buttons.confirm")}</button>
                </div>
            </div>
        </div>
    )
}

export default FirstStep;