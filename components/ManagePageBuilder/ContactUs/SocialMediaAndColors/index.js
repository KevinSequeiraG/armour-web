import React, { useEffect, useState } from 'react'
import Switch from 'react-switch';
import SocialMediaInput from './socialMediaInputs';
import { AiOutlineBgColors, AiOutlineFontColors } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

export const ContactUsSocialMediaAndColors = (props) => {
    const { t } = useTranslation();
    const [pageContactUs, setPageContactUs] = useState(props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage)));

    useEffect(() => {
        setPageContactUs(props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage)));
    }, [props?.currentPage]);

    useEffect(() => {
        if (!props.webPageData) return;

        const { webPageData, currentPage, setWebPageData } = props;

        const updatedWebPageData = {
            ...webPageData,
            pages: webPageData?.pages?.map((page) => {
                if (page?.id === parseInt(currentPage))
                    return { ...pageContactUs };

                return page;
            }),
        };
        setWebPageData(updatedWebPageData);
    }, [pageContactUs, props.currentPage]);

    return (
        <div>
            <div className='relative flex items-center justify-center space-x-4'>
                <p>{t("user-data.social-network")}</p>
                <Switch name='cardType'
                    onChange={(value) => setPageContactUs(prevValues => ({ ...prevValues, showSocialMedia: value }))}
                    checked={pageContactUs?.showSocialMedia}
                />
            </div>
            {pageContactUs?.showSocialMedia &&
                <div className="flex flex-col space-y-3 mt-3">
                    <div>
                        <SocialMediaInput
                            socialMediaName="fb"
                            facebookIcon
                            inputValue={pageContactUs?.fb}
                            setInputValue={setPageContactUs}
                        />
                    </div>
                    <div>
                        <SocialMediaInput
                            socialMediaName="twitter"
                            twitterIcon
                            inputValue={pageContactUs?.twitter}
                            setInputValue={setPageContactUs}
                        />
                    </div>
                    <div>
                        <SocialMediaInput
                            socialMediaName="linkedIn"
                            linkedInIcon
                            inputValue={pageContactUs?.linkedIn}
                            setInputValue={setPageContactUs}
                        />
                    </div>
                    <div>
                        <SocialMediaInput
                            socialMediaName="google"
                            googleIcon
                            inputValue={pageContactUs?.google}
                            setInputValue={setPageContactUs}
                        />
                    </div>
                </div>
            }
            <hr className='border border-[#224553] my-5' />

            <div className='flex flex-col items-start border space-y-2'>
                <p>{t("page-builder.contact-title-color")}</p>
                <div className='flex justify-center items-center space-x-2 w-full h-full px-2 pb-2'>
                    <AiOutlineFontColors className='w-7 h-7' />
                    <input
                        value={pageContactUs?.textColor}
                        onChange={(e) => setPageContactUs(prevValues => ({ ...prevValues, textColor: e?.target?.value }))}
                        type="color" id="colorPicker" name="colorPicker" className='inputColor w-2/3'
                    />
                </div>

                <hr className='border border-[#224553] w-full' />

                <p>{t("page-builder.contact-bg-color")}</p>
                <div className='flex justify-center items-center space-x-2 w-full px-2 pb-2'>

                    <AiOutlineBgColors className='w-7 h-7' />
                    <input
                        value={pageContactUs?.inputColor}
                        onChange={(e) => setPageContactUs(prevValues => ({ ...prevValues, inputColor: e?.target?.value }))}
                        type="color" id="colorPicker" name="colorPicker" className='inputColor w-2/3'
                    />
                </div>

                <p>{t("page-builder.contact-text-color")}</p>
                <div className='flex justify-center items-center space-x-2 w-full h-full px-2 pb-2'>
                    <AiOutlineFontColors className='w-7 h-7' />
                    <input
                        value={pageContactUs?.inputTextColor}
                        onChange={(e) => setPageContactUs(prevValues => ({ ...prevValues, inputTextColor: e?.target?.value }))}
                        type="color" id="colorPicker" name="colorPicker" className='inputColor w-2/3'
                    />
                </div>

                <hr className='border border-[#224553] w-full' />

                <p>{t("page-builder.contact-button-color")}</p>
                <div className='flex justify-center items-center space-x-2 w-full px-2 pb-2'>
                    <AiOutlineBgColors className='w-7 h-7' />
                    <input
                        value={pageContactUs?.buttonColor}
                        onChange={(e) => setPageContactUs(prevValues => ({ ...prevValues, buttonColor: e?.target?.value }))}
                        type="color" id="colorPicker" name="colorPicker" className='inputColor w-2/3'
                    />
                </div>

                <p>{t("page-builder.contact-button-text-color")}</p>
                <div className='flex justify-center items-center space-x-2 w-full px-2 pb-2'>
                    <AiOutlineFontColors className='w-7 h-7' />
                    <input
                        value={pageContactUs?.buttonTextColor}
                        onChange={(e) => setPageContactUs(prevValues => ({ ...prevValues, buttonTextColor: e?.target?.value }))}
                        type="color" id="colorPicker" name="colorPicker" className='inputColor w-2/3'
                    />
                </div>

            </div>
        </div>
    )
}
