import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import SidebarMenuOption from './sidebarMenuOption';
import NavbarOptions from '../navbar/navbarOptions';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight, AiOutlineBgColors, AiOutlineColumnHeight, AiOutlineDesktop, AiOutlineFontColors, AiOutlineMobile } from 'react-icons/ai';
import { BiArrowToBottom, BiArrowToLeft, BiArrowToRight, BiArrowToTop, BiVerticalBottom, BiVerticalCenter, BiVerticalTop } from "react-icons/bi";
import 'animate.css';
import MypagesDragDrop from './myPagesDragDrop';
import { ContentDragDrop } from '../sections/contentDragDrop';
import { ContactUsSocialMediaAndColors } from '../ContactUs/SocialMediaAndColors';

const Sidebar = (props) => {
    const [activeButtonIndex, setActiveButtonIndex] = useState(-1);
    const { t } = useTranslation();
    const fileInputRef = useRef();
    const fileInputRefNavbar = useRef();
    const router = useRouter();

    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("10");
    const [txtColor, setTxtColor] = useState("#ffffff");
    const [bgColor, setBgColor] = useState("#000000");
    const [imageSrc, setImageSrc] = useState(null);
    const [imageSrcNavbar, setImageSrcNavbar] = useState(null);

    const [pagePaddingLeft, setPagePaddingLeft] = useState("25");
    const [pagePaddingRight, setPagePaddingRight] = useState("25");
    const [pagePaddingTop, setPagePaddingTop] = useState("50");
    const [pagePaddingBottom, setPagePaddingBottom] = useState("50");

    const handleCloseButton = () => {
        //CLEAN STORAGE RELATED TO CREATE/EDIT
        router.back();
    };

    const handlePreviewModeClick = (option) => {
        const customEvent = new Event("previewModeChange");
        customEvent.option = option; // Adjunta la opción al evento personalizado
        window.dispatchEvent(customEvent); // Despacha el evento personalizado
    };

    const handleTabMenuClick = (index, name) => {
        activeButtonIndex === index ? setActiveButtonIndex(-1) : setActiveButtonIndex(index);
        props.setCurrentMenuOption(name);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target.result);

                props.setWebPageData(prevData => {
                    const updatedPages = prevData?.pages?.map(page => {
                        if (page?.id === props?.currentPage)
                            return { ...page, bgImage: e.target.result };

                        return page;
                    });
                    return {
                        ...prevData,
                        pages: updatedPages
                    };
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNavbarFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrcNavbar(e.target.result);
                props.setWebPageData(prevData => {
                    return {
                        ...prevData,
                        navbar: { ...prevData.navbar, backgroundImage: e.target.result }
                    };
                });
                handleBgImageChange(e.target.result)
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteBGImage = () => {
        setImageSrc(null);
        props.setWebPageData(prevData => {
            const updatedPages = prevData?.pages?.map(page => {
                if (page?.id === props?.currentPage)
                    return { ...page, bgImage: null };

                return page;
            });
            return {
                ...prevData,
                pages: updatedPages
            };
        });
        fileInputRef.current.value = '';
    };

    const handleDeleteBGImageNavbar = () => {
        handleBgImageChange(null)
        setImageSrcNavbar(null);
        props.setWebPageData(prevData => {
            return {
                ...prevData,
                navbar: { ...prevData.navbar, backgroundImage: null }
            };
        });
        fileInputRefNavbar.current.value = '';
    };

    const handleTxtColorChange = (color) => {
        if (props.currentMenuOption === "navbar-webpage") {
            setTxtColor(color);
            const customEvent = new Event("changeNavbarTextColor");
            customEvent.option = color;
            window.dispatchEvent(customEvent);
        }
    };

    const handleBGColorChange = (color) => {
        if (props.currentMenuOption === "navbar-webpage") {
            setBgColor(color);
            const customEvent = new Event("changeNavbarBGColor");
            customEvent.option = color;
            window.dispatchEvent(customEvent);
        } else if (props.currentMenuOption === "sections-webpage") {
            setBgColor(color);
            props.setWebPageData(prevData => {
                const updatedPages = prevData?.pages?.map(page => {
                    if (page?.id === props?.currentPage)
                        return { ...page, backgroundColor: color };

                    return page;
                });
                return {
                    ...prevData,
                    pages: updatedPages
                };
            });
            const customEvent = new Event("changeSectionBgColor");
            customEvent.option = color;
            window.dispatchEvent(customEvent);
        }
    };

    const handleWidthChange = (size) => {
        if (props.currentMenuOption === "navbar-webpage") {
            setWidth(size)
            const customEvent = new Event("changeNavbarWidth");
            customEvent.option = size + "%";
            window.dispatchEvent(customEvent);
        }
    };

    const handleHeightChange = (size) => {
        if (props.currentMenuOption === "navbar-webpage") {
            setHeight(size)
            const customEvent = new Event("changeNavbarHeight");
            customEvent.option = size + "%";
            window.dispatchEvent(customEvent);
        } else if (props.currentMenuOption === "sections-webpage") {
            setHeight(size)
            const customEvent = new Event("changeSectionHeight");
            customEvent.option = size + "%";
            window.dispatchEvent(customEvent);
        }
    };

    const handleBgImageChange = (image) => {
        if (props.currentMenuOption === "navbar-webpage") {
            const customEvent = new Event("changeNavbarBgImage");
            customEvent.option = image;
            window.dispatchEvent(customEvent);
        }
    }

    // pone color a la opción seleccionada (solo visual)
    const [posiitionDesignColor, setPosiitionDesignColor] = useState(props.navbarPosition == "top" ? "t-left" : "top");
    useEffect(() => {
        setPosiitionDesignColor(props.navbarPosition == "top" ? "t-left" : "top")
    }, [props.navbarPosition])

    const handleChangeContentPosition = (newPosition) => {
        setPosiitionDesignColor(newPosition);
        if (props.currentMenuOption === "navbar-webpage") {
            const customEvent = new Event("changeContentPosition");
            customEvent.option = newPosition;
            window.dispatchEvent(customEvent);
        }
    }

    const handleChangePadding = (side, size) => {
        let updatedPages = [];

        // Actualizar el estado con las páginas actualizadas
        if (side === "top") {
            updatedPages = props?.webPageData?.pages?.map(page => {
                if (page?.id === props?.currentPage)
                    return { ...page, paddingTop: size + "%" };
                return page;
            });
            setPagePaddingTop(size);
            const customEvent = new Event("changeSectionPadingTop");
            customEvent.option = size + "%"
            window.dispatchEvent(customEvent);
        } else if (side === "right") {
            updatedPages = props?.webPageData?.pages?.map(page => {
                if (page?.id === props?.currentPage)
                    return { ...page, paddingRight: size + "%" };
                return page;
            });
            setPagePaddingRight(size);
            const customEvent = new Event("changeSectionPadingRight");
            customEvent.option = size + "%"
            window.dispatchEvent(customEvent);
        } else if (side === "bottom") {
            updatedPages = props?.webPageData?.pages?.map(page => {
                if (page?.id === props?.currentPage)
                    return { ...page, paddingBottom: size + "%" };
                return page;
            });
            setPagePaddingBottom(size);
            const customEvent = new Event("changeSectionPadingBottom");
            customEvent.option = size + "%"
            window.dispatchEvent(customEvent);
        } else if (side === "left") {
            updatedPages = props?.webPageData?.pages?.map(page => {
                if (page?.id === props?.currentPage)
                    return { ...page, paddingLeft: size + "%" };
                return page;
            });
            setPagePaddingLeft(size);
            const customEvent = new Event("changeSectionPadingLeft");
            customEvent.option = size + "%"
            window.dispatchEvent(customEvent);
        }
        props.setWebPageData(prevState => ({
            ...prevState,
            pages: updatedPages
        }));
    }

    useEffect(() => {
        if (props?.currentMenuOption === "navbar-webpage") {
            setWidth(parseInt(props?.webPageData?.navbar?.minWidth.replace('%', '')));
            setHeight(parseInt(props?.webPageData?.navbar?.minHeight.replace('%', '')));
            setTxtColor(props?.webPageData?.navbar?.color);
            setBgColor(props?.webPageData?.navbar?.backgroundColor);

        } else if (props?.currentMenuOption === "sections-webpage") {
            const currentPageSectionsData = props?.webPageData?.pages?.find((pagesData) => pagesData?.id == props?.currentPage);
            setBgColor(currentPageSectionsData?.backgroundColor);
            setPagePaddingLeft(parseInt(currentPageSectionsData?.paddingLeft?.replace('%', '')));
            setPagePaddingRight(parseInt(currentPageSectionsData?.paddingRight?.replace('%', '')));
            setPagePaddingTop(parseInt(currentPageSectionsData?.paddingTop?.replace('%', '')));
            setPagePaddingBottom(parseInt(currentPageSectionsData?.paddingBottom?.replace('%', '')));
            setImageSrc(currentPageSectionsData?.bgImage)
        }
    }, [props.currentMenuOption, props?.currentPage])

    useEffect(() => {
      setImageSrcNavbar(props?.webPageData?.navbar?.backgroundImage)
    }, [props.webPageData])
    

    return (
        <aside className="bg-black w-full max-w-[30%] h-full flex !text-[#F5F5F5]">
            <div className='flex flex-col h-full w-1/2 border-r border-[#EFE1A2] pr-3 shadow-2xl bg-black relative z-10'>
                <div className='font-medium text-[17px] h-[calc(100vh-3.5rem)] scrollbarDesignTiny overflow-y-auto justify-center items-center'>

                    <div className='flex items-center my-2 -space-x-1 justify-center'>
                        <img src="/images/awLogo-nobg.png" className="w-[6rem]" />
                    </div>

                    <SidebarMenuOption label="Menú de navegación" isActive={activeButtonIndex === 0} onClick={() => handleTabMenuClick(0, "navbar-webpage")}>
                        <NavbarOptions />
                    </SidebarMenuOption>

                    <SidebarMenuOption label="Mis páginas" isActive={activeButtonIndex === 1} onClick={() => handleTabMenuClick(1, "sections-webpage")}>

                        {props?.webPageData?.pages?.map((pageData, i) => {
                            return (
                                <div key={i} className={`optionButton h-14 truncate cursor-pointer ${props?.currentPage === pageData?.id && "bg-[#C69434]"}`} onClick={(e) => { window.localStorage.setItem("actualPage", pageData?.id); props?.setCurrentPage(pageData?.id) }}>
                                    {pageData?.name}
                                </div>
                            )
                        })}

                    </SidebarMenuOption>

                </div>
                <button className="optionButton w-fit !ml-5 !flex !items-center !justify-center" onClick={handleCloseButton}>
                    <FiArrowLeftCircle className='mr-1 w-5 h-5' />
                    Cancelar
                </button>
            </div>

            <div className={`flex flex-col items-center w-1/2 max-w-[50%] overflow-x-hidden ml-3`}>

                {/* Change mobile/desktop preview */}
                <div className="flex justify-center items-center space-x-4 mt-8">
                    <div className='flex items-center'>
                        <div className={`${props.isMobilePreview ? "bg-white text-black" : "bg-[#224553] text-white"} w-full h-full rounded-l-[10px] shadow-md`} onClick={() => handlePreviewModeClick(false)}>
                            <AiOutlineDesktop className='h-10 w-10 cursor-pointer px-2' />
                        </div>

                        <div className='separator'></div> {/* Línea separadora */}

                        <div className={`${props.isMobilePreview ? "bg-[#224553] text-white" : "bg-white text-black"} w-full h-full rounded-r-[10px] shadow-md`} onClick={() => handlePreviewModeClick(true)}>
                            <AiOutlineMobile className='h-10 w-10 cursor-pointer px-2' />
                        </div>
                    </div>
                </div>

                <div className={`bg-gray-200 drop-shadow-2xl shadow-md text-black rounded-[10px] flex flex-col space-y-5 h-auto max-h-[calc(100vh-8rem)] mt-4 py-4 px-4 font-medium text-base overflow-y-auto scrollbarDesignTiny animate__animated animate__faster relative z-0 ${activeButtonIndex !== -1 ? "animate__slideInLeft" : "animate__slideOutLeft"}`}>

                    {activeButtonIndex === 0 && <>
                        <div className='flex flex-col items-start border space-y-2'>
                            <p>Altura</p>
                            <div className='flex justify-center items-center space-x-2'>
                                <AiOutlineColumnHeight className='w-7 h-7' />
                                <input value={height} onChange={(e) => handleHeightChange(e.target.value)} type='number' className='w-1/2 bg-[#F5F5F5] border-2 border-[#224553] rounded-[10px] px-2 hide-spin-buttons text-center' />
                                <em className='font-normal text-sm'>%</em>
                            </div>
                            {(activeButtonIndex === 0 && props.navbarPosition !== "top") && <>
                                <p>Anchura</p>
                                <div className='flex justify-center items-center space-x-2'>
                                    <AiOutlineColumnHeight className='w-7 h-7 rotate-90' />
                                    <input value={width} onChange={(e) => handleWidthChange(e.target.value)} type='number' className='w-1/2 bg-[#F5F5F5] border-2 border-[#224553] rounded-[10px] px-2 hide-spin-buttons text-center' />
                                    <em className='font-normal text-sm'>%</em>
                                </div>
                            </>
                            }
                        </div>

                        <hr className='border border-[#224553]' />
                    </>}

                    {activeButtonIndex !== 0 &&
                        <>
                            <div className='flex flex-col items-start border space-y-2'>
                                <p>Relleno</p>
                                <div className='flex justify-center items-center space-x-2'>
                                    <BiArrowToLeft className='w-7 h-7' />
                                    <input value={pagePaddingRight} type='number' onChange={(e) => { handleChangePadding("right", e.target.value) }} className='w-1/2 bg-[#F5F5F5] border-2 border-[#224553] rounded-[10px] px-2 hide-spin-buttons text-center' />
                                    <em className='font-normal text-sm'>%</em>
                                </div>
                                <div className='flex justify-center items-center space-x-2'>
                                    <BiArrowToBottom className='w-7 h-7' />
                                    <input value={pagePaddingTop} type='number' onChange={(e) => { handleChangePadding("top", e.target.value) }} className='w-1/2 bg-[#F5F5F5] border-2 border-[#224553] rounded-[10px] px-2 hide-spin-buttons text-center' />
                                    <em className='font-normal text-sm'>%</em>
                                </div>
                                <div className='flex justify-center items-center space-x-2'>
                                    <BiArrowToRight className='w-7 h-7' />
                                    <input value={pagePaddingLeft} type='number' onChange={(e) => { handleChangePadding("left", e.target.value) }} className='w-1/2 bg-[#F5F5F5] border-2 border-[#224553] rounded-[10px] px-2 hide-spin-buttons text-center' />
                                    <em className='font-normal text-sm'>%</em>
                                </div>
                                <div className='flex justify-center items-center space-x-2'>
                                    <BiArrowToTop className='w-7 h-7' />
                                    <input value={pagePaddingBottom} type='number' onChange={(e) => { handleChangePadding("bottom", e.target.value) }} className='w-1/2 bg-[#F5F5F5] border-2 border-[#224553] rounded-[10px] px-2 hide-spin-buttons text-center' />
                                    <em className='font-normal text-sm'>%</em>
                                </div>
                            </div>

                            <hr className='border border-[#224553]' />
                        </>
                    }

                    <div className='flex flex-col items-start border space-y-2'>
                        <p>Color de fondo</p>
                        <div className='flex justify-center items-center space-x-2 w-full px-2'>
                            <AiOutlineBgColors className='w-7 h-7' />
                            <input value={bgColor} onChange={(e) => { handleBGColorChange(e.target.value) }} type="color" id="colorPicker" name="colorPicker" className='inputColor w-2/3 h-full' />
                        </div>
                        {activeButtonIndex === 0 && <>
                            <p>Color de texto</p>
                            <div className='flex justify-center items-center space-x-2 w-full px-2'>
                                <AiOutlineFontColors className='w-7 h-7' />
                                <input value={txtColor} onChange={(e) => { handleTxtColorChange(e.target.value) }} type="color" id="colorPicker" name="colorPicker" className='inputColor w-2/3 h-full' />
                            </div>
                        </>}
                    </div>

                    <hr className='border border-[#224553]' />

                    {activeButtonIndex === 0 && <label>Imagen de fondo</label>}
                    {activeButtonIndex === 0 && <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRefNavbar}
                        onChange={handleNavbarFileChange}
                        style={{ display: 'none' }}
                    />}

                    {activeButtonIndex === 0 && imageSrcNavbar ? (
                        <div style={{ position: 'relative' }}>
                            <img
                                src={imageSrcNavbar}
                                alt="Uploaded"
                                // style={{ ...imageStyles }}
                                className='object-cover w-full h-[12rem] rounded-[10px]'
                            />
                            <button
                                onClick={handleDeleteBGImageNavbar}
                                style={{
                                    position: 'absolute',
                                    top: "-10px",
                                    right: "-5px",
                                    background: 'red',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    padding: '0.2rem 0.4rem',
                                }}
                            >
                                X
                            </button>
                        </div>
                    ) : activeButtonIndex === 0 ? (
                        <label
                            style={{
                                padding: '15px 10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                fontWeight: 500,
                                fontSize: '14px',
                                cursor: 'pointer',
                                lineHeight: '1rem',
                                border: '2px dashed #224553',
                                borderRadius: '10px',
                            }}
                            className='w-full h-[12rem]'
                        >
                            Añadir imagen
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleNavbarFileChange}
                                style={{ display: 'none' }}
                            />
                        </label>
                    ) : null}

                    {activeButtonIndex === 1 && <label>Imagen de fondo</label>}
                    {activeButtonIndex === 1 && <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />}

                    {activeButtonIndex === 1 && imageSrc ? (
                        <div style={{ position: 'relative' }}>
                            <img
                                src={imageSrc}
                                alt="Uploaded"
                                // style={{ ...imageStyles }}
                                className='object-cover w-full h-[12rem] rounded-[10px]'
                            />
                            <button
                                onClick={handleDeleteBGImage}
                                style={{
                                    position: 'absolute',
                                    top: "-10px",
                                    right: "-5px",
                                    background: 'red',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    padding: '0.2rem 0.4rem',
                                }}
                            >
                                X
                            </button>
                        </div>
                    ) : activeButtonIndex === 1 ? (
                        <label
                            style={{
                                padding: '15px 10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                fontWeight: 500,
                                fontSize: '14px',
                                cursor: 'pointer',
                                lineHeight: '1rem',
                                border: '2px dashed #224553',
                                borderRadius: '10px',
                            }}
                            className='w-full h-[12rem]'
                        >
                            Añadir imagen
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </label>
                    ) : null}

                    {activeButtonIndex === 0 &&
                        <div className='flex flex-col items-center'>
                            Mis páginas
                            <MypagesDragDrop setWebPageData={props.setWebPageData} webPageData={props.webPageData} />
                        </div>
                    }

                    {activeButtonIndex === 0 &&
                        <>
                            <hr className='border border-[#224553]' />
                            <div className='flex flex-col items-center space-y-2'>
                                <p>Posición del contenido</p>
                                <div className='flex justify-center items-center space-x-5'>
                                    {props.navbarPosition === "top" ?
                                        <>
                                            <AiOutlineAlignLeft className={`w-8 h-8 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${posiitionDesignColor == "t-left" && "!bg-gray-700 text-white"}`} onClick={() => handleChangeContentPosition("t-left")} />
                                            <AiOutlineAlignCenter className={`w-8 h-8 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${posiitionDesignColor == "t-center" && "!bg-gray-700 text-white"}`} onClick={() => handleChangeContentPosition("t-center")} />
                                            <AiOutlineAlignRight className={`w-8 h-8 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${posiitionDesignColor == "t-right" && "!bg-gray-700 text-white"}`} onClick={() => handleChangeContentPosition("t-right")} />
                                        </>
                                        :
                                        <>
                                            <BiVerticalTop className={`w-8 h-8 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${posiitionDesignColor == "top" && "!bg-gray-700 text-white"}`} onClick={() => handleChangeContentPosition("top")} />
                                            <BiVerticalCenter className={`w-8 h-8 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${posiitionDesignColor == "center" && "!bg-gray-700 text-white"}`} onClick={() => handleChangeContentPosition("center")} />
                                            <BiVerticalBottom className={`w-8 h-8 cursor-pointer bg-white rounded-full p-1.5 shadow-md ${posiitionDesignColor == "bottom" && "!bg-gray-700 text-white"}`} onClick={() => handleChangeContentPosition("bottom")} />
                                        </>
                                    }
                                </div>
                            </div>
                        </>
                    }

                    {activeButtonIndex === 1 && !props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.isContactPage && <>
                        <div className='flex flex-col items-center'>
                            <p>Contenido</p>

                            <ContentDragDrop currentPage={props.currentPage} setWebPageData={props.setWebPageData} webPageData={props.webPageData} />

                        </div>
                    </>}

                    {activeButtonIndex === 1 && props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.isContactPage &&
                        <>
                            <hr className='border border-[#224553]' />
                            <ContactUsSocialMediaAndColors currentPage={props.currentPage} setWebPageData={props.setWebPageData} webPageData={props.webPageData} />
                        </>
                    }

                </div>
            </div>
        </aside >
    );
};

export default Sidebar;
