import Header from "@/components/Header/index.js";
import Navbar from "@/components/Navbar";
import Head from "next/head";

const ProductAndCategories = () => {
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