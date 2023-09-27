import Head from "next/head";
import { useTranslation } from "react-i18next";

const ProductAndCategories = () => {
    const { t } = useTranslation();
    return (
        <div className="">
            <Head>
                <title>{t("navbar.reports")} | ArmourWeb</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/images/awLogo.png" />
            </Head>
            REPORTE DE PRODUCTOS Y CATEGORIAS
        </div>
    )
}

export default ProductAndCategories;