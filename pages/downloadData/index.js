import { downloadTableData, uploadJsonToFirestore } from "@/helpers/reports"
import { useState } from "react";
import { useTranslation } from "react-i18next";

const DownloadData = () => {
    const { t } = useTranslation();

    // Estado para manejar múltiples archivos
    const [jsonFiles, setJsonFiles] = useState({});

    const handleFileChange = (tableName, e) => {
        const file = e.target.files[0];

        // Actualizar el estado con el archivo correspondiente a la tabla
        setJsonFiles((prevFiles) => ({
            ...prevFiles,
            [tableName]: file,
        }));
    };

    const handleUpload = async (tableName) => {
        const jsonFile = jsonFiles[tableName];

        if (jsonFile) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                try {
                    const jsonObject = JSON.parse(event.target.result);

                    // Genera un nombre único para el archivo (puedes cambiar esta lógica según tus necesidades)
                    const fileName = tableName;

                    // Llama a la función para subir el archivo JSON a Firebase Storage
                    const storagePath = await uploadJsonToFirestore(
                        fileName,
                        jsonObject
                    );

                    console.log("Ruta de almacenamiento en Firebase:", storagePath);
                } catch (error) {
                    console.error("Error al parsear el archivo JSON:", error);
                }
            };
            reader.readAsText(jsonFile);
        }
    };

    return (
        <div>
            <p className="text-center mt-10 font-semibold text-[2rem]">{t("reports.download-data")}</p>
            <div className="text-center mt-10">
                {["categories", "processes", "products", "users", "webpages"].map(
                    (tableName) => (
                        <div key={tableName}>
                            <button
                                onClick={() => {
                                    downloadTableData(tableName);
                                }}
                                className="bg-red-700 px-4 py-2 mx-2 text-white rounded-xl min-w-[220px] my-2"
                            >
                                {t(`reports.download-${tableName}`)}
                            </button>
                            <button
                                onClick={() => {
                                    handleUpload(tableName);
                                }}
                                className="bg-green-700 px-4 py-2 mx-2 text-white rounded-xl min-w-[220px] my-2"
                            >
                                {t(`reports.upload-${tableName}`)}
                            </button>
                            <input
                                type="file"
                                accept=".json"
                                onChange={(e) => {
                                    handleFileChange(tableName, e);
                                }}
                            />
                        </div>
                    )
                )}
            </div>
        </div >
    )
}

export default DownloadData;