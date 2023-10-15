import FirstStep from '@/components/ManagePageBuilder/firstStep';
import Navbar from '@/components/ManagePageBuilder/navbar';
import SectionView from '@/components/ManagePageBuilder/sections/sectionView';
import Sidebar from '@/components/ManagePageBuilder/sidebar/sidebar';
import { SaveWebPage } from '@/helpers/webpage';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ManagePageBuilder() {

    const { t } = useTranslation();

    const [logoPage, setLogoPage] = useState();

    const [webPageData, setWebPageData] = useState({ pages: [{ id: 1, name: "Home", paddingLeft: "20%", paddingRight: "20%", paddingTop: "50%", paddingBottom: "50%", backgroundColor: "#ffffff", sections: [] }] });

    const [currentPage, setCurrentPage] = useState(1);

    const [currentMenuOption, setCurrentMenuOption] = useState("navbar-webpage");

    const [showFirstStep, setShowFirstStep] = useState(true);

    const [isMobilePreview, setIsMobilePreview] = useState(false);

    const [navbarPosition, setNavbarPosition] = useState("top");

    // changes navbar position
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

    // changes preview mode desktop / mobile 
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

    return (
        <>
            <Head>
                <title>{t("page-builder.new-page")} | ArmourWeb</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/images/awLogo-nobg.png" />
            </Head>
            <div className="bg-black h-screen w-screen flex">
                {showFirstStep && <FirstStep setWebPageData={setWebPageData} webPageData={webPageData} setLogoPage={setLogoPage} setShowFirstStep={setShowFirstStep} />}

                <Sidebar currentMenuOption={currentMenuOption} setCurrentMenuOption={setCurrentMenuOption} setCurrentPage={setCurrentPage} currentPage={currentPage} setWebPageData={setWebPageData} webPageData={webPageData} isMobilePreview={isMobilePreview} navbarPosition={navbarPosition} />

                <div className="w-[75%] ml-3 shadow-2xl drop-shadow-2xl bg-gray-900 h-full flex">
                    {/* <PersonalizationHeader /> */}
                    <button className='bg-white text-black absolute right-5 top-5 px-4 py-2 rounded-xl' onClick={()=>{SaveWebPage(webPageData)}}>Save</button>
                    <div className={`${isMobilePreview ? "w-full max-w-[375px] max-h-[667px] h-full !overflow-hidden m-auto shadow-md bg-white relative" : "!overflow-auto scrollbarDesign w-full max-w-full mx-3 h-full max-h-[calc(100vh-8rem)] !my-auto shadow-md bg-white relative"}`}>

                        <Navbar currentPage={currentPage} setWebPageData={setWebPageData} webPageData={webPageData} logoPage={logoPage} position={navbarPosition} isMobilePreview={isMobilePreview}>

                            <SectionView currentPage={currentPage} setWebPageData={setWebPageData} webPageData={webPageData} />

                        </Navbar>

                    </div>
                </div>

            </div>
        </>
    );
}
