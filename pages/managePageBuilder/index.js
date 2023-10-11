import FirstStep from '@/components/ManagePageBuilder/firstStep';
import Navbar from '@/components/ManagePageBuilder/navbar';
import SectionView from '@/components/ManagePageBuilder/sections/sectionView';
import PersonalizationHeader from '@/components/ManagePageBuilder/sidebar/personalizationHeader';
import Sidebar from '@/components/ManagePageBuilder/sidebar/sidebar';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ManagePageBuilder() {
    const { t } = useTranslation();
    const [logoPage, setLogoPage] = useState();
    const [webPageData, setWebPageData] = useState({ pages: [{ id: 1, name: "Home", navbar: {}, sections: [] }] })
    const [currentPage, setCurrentPage] = useState(1)
    const [currentMenuOption, setCurrentMenuOption] = useState("navbar-webpage");

    const [showFirstStep, setShowFirstStep] = useState(true);

    const [isMobilePreview, setIsMobilePreview] = useState(false);

    const [navbarPosition, setNavbarPosition] = useState("top"); // Cambia esta variable según tu preferencia ("left", "top", "right")
    const [activeSection, setActiveSection] = useState("section-0");

    const [sections, setSections] = useState([]);
    // Cada sección será un objeto
    // El objeto debe tener:
    // page - página a la que pertenece
    // indexOrder - para ordernarlo según el drag&drop
    // divType - simple o dividido en 2
    // width - quizá, aunque con el padding es suficiente creo
    // height
    // padding l - t - b - r
    // bgColor
    // bgImage
    // ---------------------------------------------------------
    // luego un array de objetos con el contenido de esa sección
    // type - image, texto, cards
    // width
    // height
    // position - center - left- right
    // padding l - t - b - r
    // color
    // font
    // textSize
    // cardSelection - el card que eligió entre las opciones

    useEffect(() => {

        const handleNavbarPositionChange = (event) => {
            const selectedOption = event.option;
            setNavbarPosition(selectedOption);
        };

        window.addEventListener("navbarPositionChange", handleNavbarPositionChange);

        return () => {
            // Limpia el event listener cuando el componente se desmonta
            window.removeEventListener("navbarPositionChange", handleNavbarPositionChange);
        };
    }, []);

    useEffect(() => {
        const handlePreviewModeChange = (event) => {
            const selectedOption = event.option;
            setIsMobilePreview(selectedOption);
        };

        window.addEventListener("previewModeChange", handlePreviewModeChange);

        return () => {
            // Limpia el event listener cuando el componente se desmonta
            window.removeEventListener("previewModeChange", handlePreviewModeChange);
        };
    }, []);

    useEffect(() => {
        window.localStorage.setItem("actualPage", 1)
        console.log("wev", webPageData)
    }, [webPageData])

    useEffect(() => {
        // console.log(currentPage)
    }, [currentPage])

    useEffect(() => {
        // console.log(currentMenuOption)
    }, [activeSection, currentMenuOption])


    return (
        <>
            <Head>
                <title>{t("page-builder.new-page")} | ArmourWeb</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/images/awLogo-nobg.png" />
            </Head>
            <div className="bg-black h-screen w-screen flex">
                {showFirstStep && <FirstStep setWebPageData={setWebPageData} webPageData={webPageData} setLogoPage={setLogoPage} setShowFirstStep={setShowFirstStep} />}
                <Sidebar activeSection={activeSection} currentMenuOption={currentMenuOption} setCurrentMenuOption={setCurrentMenuOption} setActiveSection={setActiveSection} setCurrentPage={setCurrentPage} currentPage={currentPage} setWebPageData={setWebPageData} webPageData={webPageData} isMobilePreview={isMobilePreview} navbarPosition={navbarPosition} />
                <div className="w-[75%] h-full flex">
                    {/* <PersonalizationHeader /> */}
                    <div className={`${isMobilePreview ? "w-full max-w-[375px] h-[667px] m-auto shadow-md bg-white relative" : "w-full max-w-full mx-3 h-[calc(100vh-2rem)] my-auto shadow-md bg-white relative"}`}>
                        <Navbar currentPage={currentPage} setWebPageData={setWebPageData} webPageData={webPageData} logoPage={logoPage} position={navbarPosition} isMobilePreview={isMobilePreview}>
                            {/* <div>
                                NUEVA SECCION
                            </div> */}
                            <SectionView currentPage={currentPage} setWebPageData={setWebPageData} webPageData={webPageData} />
                        </Navbar>
                        {/* AQUI LAS SECCIONES */}
                        {/* LAS SECCIONES VAN A SER POR PÁGINA */}
                        {/* La página se va a sacar dependiendo del navbar, le doy clic a Home y me lleva a la página de home, debe cargarme las secciones que tengan "page: 'home'" o algí así*/}
                    </div>
                </div>
            </div>
        </>
    );
}
