import { useTranslation } from "react-i18next";
import ImageUploader from "../ImageUploader";
import { useRouter } from "next/router";

const FirstStep = (props) => {
    const { t } = useTranslation();
    const router = useRouter();
    
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white">
            <div className="relative rounded-lg p-5 mx-auto z-50 border border-[.2rem]">
                <p className="text-black font-bold text-[1.8rem] text-center">¡Estás a punto de crear tu propia página web!</p>
                <p className="text-black font-bold text-[1.4rem] text-center">Ingresa la informacion que se requiere para continuar</p>
                <div className="flex flex-col items-center mt-5">
                    <div>
                        <p className="text-center font-semibold">Nombre de página</p>
                        <input type="text" className="border border-1 border-gray-400 rounded-xl mx-auto h-[2rem] mt-2" />
                    </div>
                    <div>
                        <ImageUploader divDesign="mb-5 mt-10 w-[12rem] h-[12rem] bg-gray-800 rounded-full mx-auto shadow-md" />
                        <p className="text-center font-semibold">Logo</p>
                    </div>
                </div>
                <div className="flex">
                    <button onClick={() => router.push("/home")} className="mx-auto cursor-pointer relative flex items-center justify-center w-[8rem] bg-red-500 border border-2 border-gray-300 hover:bg-red-700 text-[1rem] text-center mt-3 py-2 px-4 rounded-xl text-gray-200">{t("buttons.cancel")}</button>
                    <button onClick={() => props.setShowFirstStep(false)} className="mx-auto cursor-pointer relative flex items-center justify-center w-[8rem] bg-green-600 border border-2 border-gray-300 hover:bg-green-700 text-[1rem] text-center mt-3 py-2 px-4 rounded-xl text-gray-200">{t("buttons.confirm")}</button>
                </div>
            </div>
        </div>
    )
}

export default FirstStep;