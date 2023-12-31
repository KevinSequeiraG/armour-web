import FirstStep from '@/components/ManagePageBuilder/firstStep';
import Navbar from '@/components/ManagePageBuilder/navbar';
import SectionView from '@/components/ManagePageBuilder/sections/sectionView';
import Sidebar from '@/components/ManagePageBuilder/sidebar/sidebar';
import ShareWebPage from '@/components/Modals/ShareWebPage';
import { UserContext } from '@/context/UserContext';
import { SaveWebPage } from '@/helpers/webpage';
import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiSolidInfoCircle } from 'react-icons/bi';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2';

export default function ManagePageBuilder() {
    const { loggedUser } = useContext(UserContext);

    const { t, i18n } = useTranslation();

    const [lngEsp, setLngEsp] = useState(i18n.language == "es");

    const [logoPage, setLogoPage] = useState();

    const [webPageData, setWebPageData] = useState({ navbar: { backgroundColor: "#000000", backgroundImage: "", color: "#ffffff", contentPosition: "top", minHeight: "10%", minWidth: "5%", position: "top", loginButton: false }, isSpanish: i18n.language == "es", pages: [{ id: 1, name: t("navbar.home"), paddingLeft: "15%", paddingRight: "15%", paddingTop: "5%", paddingBottom: "10%", backgroundColor: "#ffffff", sections: [] }], totalFacebookRedirects: 0, totalTwitterRedirects: 0, totalLinkedInRedirects: 0, totalInstagramRedirects: 0 });

    const [currentPage, setCurrentPage] = useState(1);

    const [currentMenuOption, setCurrentMenuOption] = useState("navbar-webpage");

    const [showFirstStep, setShowFirstStep] = useState(true);

    const [isMobilePreview, setIsMobilePreview] = useState(false);

    const [isEdit, setIsEdit] = useState(false);

    const [showShareModal, setShowShareModal] = useState(false);

    // changes navbar position
    useEffect(() => {
        const handleNavbarPositionChange = (event) => {
            const selectedOption = event.option;
            setWebPageData(prevData => ({
                ...prevData,
                navbar: {
                    ...prevData.navbar,
                    position: selectedOption
                }
            }));
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

    useEffect(() => {
        const dataToEdit = JSON.parse(window.localStorage.getItem("pageToEdit"))
        if (dataToEdit) {
            setWebPageData(dataToEdit);
            setLogoPage(dataToEdit?.logo)
            setIsEdit(true);
        }
    }, [])

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setWebPageData(prevData => ({
            ...prevData,
            isSpanish: lng === "es"
        }));
    };

    useEffect(() => {
        if (lngEsp) {
            changeLanguage("es")
        } else {
            changeLanguage("en")
        }
    }, [lngEsp])

    const handleCreateWebPage = async () => {

        Swal.fire({
            title: t("create-modal.sure"),
            text: t("create-modal.alert"),
            icon: 'question',
            showCancelButton: true,
            cancelButtonColor: '#9b9b9b',
            confirmButtonColor: '#24a424',
            confirmButtonText: t("buttons.confirm"),
            cancelButtonText: t("buttons.cancel"),
            reverseButtons: true,
            allowOutsideClick: false,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await SaveWebPage(webPageData, loggedUser?.uid).then(() => {
                    setShowShareModal(true);
                })
            }
        })
    };


    return (
        <>
            <Head>
                <title>{t("page-builder.new-page")} | ArmourWeb</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/images/awLogo-nobg.png" />
            </Head>
            <div className="bg-black h-screen w-screen flex">
                {(showFirstStep && !isEdit) && <FirstStep setWebPageData={setWebPageData} webPageData={webPageData} setLogoPage={setLogoPage} setShowFirstStep={setShowFirstStep} />}

                <Sidebar currentMenuOption={currentMenuOption} setCurrentMenuOption={setCurrentMenuOption} setCurrentPage={setCurrentPage} currentPage={currentPage} setWebPageData={setWebPageData} webPageData={webPageData} isMobilePreview={isMobilePreview} />

                <div className="min-w-[69%] max-w-[69%] ml-3 shadow-2xl drop-shadow-2xl bg-gray-900 h-full flex">
                    <div className='absolute right-5 top-3 flex '>
                    <Link href={`https://drive.google.com/file/d/1DCabHO98zDxzZrnIaQ_gzk2W206ZH6SG/view?usp=sharing`} target="_blank">
                        <BiSolidInfoCircle className="mr-3 mt-1.5 w-7 h-7 text-gray-300 hover:text-gray-400 cursor-pointer" data-tooltip-id="manual" data-tooltip-content={t("navbar.manual-link")} />
                    </Link>
                    <Tooltip id="manual" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
                        <div className='flex items-center bg-black px-4 rounded-xl border border-1 border-gray-300'>
                            <span className="text-[1rem] text-gray-200 font-medium mr-3">EN</span>
                            <label className="relative inline-flex items-center cursor-pointer" >
                                <div>
                                    <input type="checkbox" value="" className="sr-only peer" checked={lngEsp} onClick={(e) => setLngEsp(!lngEsp)} />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-700 dark:peer-focus:ring-gray-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-700"></div>
                                </div>
                                <span className="ml-3 text-[1rem] text-gray-200 font-medium">ES</span>
                            </label>
                        </div>
                        <button className='bg-[#EFE1A2] hover:bg-[#C69434] hover:text-white text-black font-bold ml-3 px-4 py-2 rounded-[10px] min-w-[6rem] shadow-lg' onClick={() => { handleCreateWebPage() }}>{t("buttons.save")}</button>
                    </div>
                    <div className={`${isMobilePreview ? "w-full max-w-[375px] max-h-[667px] h-full !overflow-hidden m-auto shadow-md bg-white relative" : "!overflow-hidden w-full max-w-full mx-3 h-full max-h-[calc(100vh-8rem)] !my-auto shadow-md bg-white relative"}`}>

                        <Navbar currentPage={currentPage} setWebPageData={setWebPageData} webPageData={webPageData} logoPage={logoPage} isMobilePreview={isMobilePreview} isEdit={isEdit}>

                            <SectionView currentPage={currentPage} setWebPageData={setWebPageData} webPageData={webPageData} isMobilePreview={isMobilePreview} />

                        </Navbar>

                    </div>
                </div>

            </div>
            <ShareWebPage setShowShareModal={setShowShareModal} isOpen={showShareModal} webPageData={webPageData} />
        </>
    );
}
