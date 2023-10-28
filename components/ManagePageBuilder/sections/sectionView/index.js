import Option1 from "@/components/Cards/OptionalCards/option1";
import Option2 from "@/components/Cards/OptionalCards/option2";
import Option3 from "@/components/Cards/OptionalCards/option3";
import Option4 from "@/components/Cards/OptionalCards/option4";

import { useEffect, useState } from "react";
import { ContactUsPreview } from "../../ContactUs/ContactUsPreview";

const SectionView = (props) => {
    const [sectionType, setSectionType] = useState();
    const [sectionHeight, setSectionHeight] = useState();
    const [sectionPadingLeft, setSectionPadingLeft] = useState();
    const [sectionPadingRight, setSectionPadingRight] = useState();
    const [sectionPadingTop, setSectionPadingTop] = useState();
    const [sectionPadingBottom, setSectionPadingBottom] = useState();
    const [sectionBgColor, setSectionBgColor] = useState();
    const [sectionBgImage, setSectionBgImage] = useState();

    const styles = {
        paddingTop: props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.paddingTop,
        paddingLeft: props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.paddingLeft,
        paddingRight: props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.paddingRight,
        paddingBottom: props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.paddingBottom,
        backgroundColor: props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.backgroundColor,
        backgroundImage: `url(${props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.bgImage})`,
        backgroundPosition: "center", /* Center the image */
        backgroundRepeat: "no-repeat", /* Do not repeat the image */
        backgroundSize: "cover",
    }

    useEffect(() => {
        const handleSetSectionType = (event) => {
            setSectionType(event.option);
        };
        const handleSetSectionHeight = (event) => {
            setSectionHeight(event.option);
        };
        const handleSetSectionPadingLeft = (event) => {
            setSectionPadingLeft(event.option);
        };
        const handleSetSectionPadingRight = (event) => {
            setSectionPadingRight(event.option);
        };
        const handleSetSectionPadingTop = (event) => {
            setSectionPadingTop(event.option);
        };
        const handleSetSectionPadingBottom = (event) => {
            setSectionPadingBottom(event.option);
        };
        const handleSetSectionBgColor = (event) => {
            setSectionBgColor(event.option);
        };
        const handleSetSectionBgImage = (event) => {
            setSectionBgImage(event.option);
        };

        // Add event listeners
        window.addEventListener("changeSectionType", handleSetSectionType);
        window.addEventListener("changeSectionHeight", handleSetSectionHeight);
        window.addEventListener("changeSectionPadingLeft", handleSetSectionPadingLeft);
        window.addEventListener("changeSectionPadingRight", handleSetSectionPadingRight);
        window.addEventListener("changeSectionPadingTop", handleSetSectionPadingTop);
        window.addEventListener("changeSectionPadingBottom", handleSetSectionPadingBottom);
        window.addEventListener("changeSectionBgColor", handleSetSectionBgColor);
        window.addEventListener("changeSectionBgImage", handleSetSectionBgImage);

        return () => {
            // Remove event listeners when the component unmounts
            window.removeEventListener("changeSectionType", handleSetSectionType);
            window.removeEventListener("changeSectionHeight", handleSetSectionHeight);
            window.removeEventListener("changeSectionPadingLeft", handleSetSectionPadingLeft);
            window.removeEventListener("changeSectionPadingRight", handleSetSectionPadingRight);
            window.removeEventListener("changeSectionPadingTop", handleSetSectionPadingTop);
            window.removeEventListener("changeSectionPadingBottom", handleSetSectionPadingBottom);
            window.removeEventListener("changeSectionBgColor", handleSetSectionBgColor);
            window.removeEventListener("changeSectionBgImage", handleSetSectionBgImage);
        };

    }, []);

    return (
        <>
            <div style={styles} className={`w-full h-full object-cover overflow-y-auto scrollbarDesign`}>
                {props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.isContactPage ?
                    <ContactUsPreview isMobilePreview={props?.isMobilePreview} webPageData={props?.webPageData} currentPage={props?.currentPage} />
                    :

                    !props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.isContactPage && props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.sections !== null && props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.sections?.length > 0 && props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.sections?.map(data => {
                        if (data.type === "image" && data.imageUrl !== null && data.imageUrl !== "") {
                            const styles = {
                                height: data.height + "px",
                                width: data.width + "px",
                                borderRadius: data.rounded + "%"
                            }
                            const stylesForContainter = {
                                paddingBottom: data.paddingBottom + '%',
                                paddingLeft: data.paddingLeft + '%',
                                paddingRight: data.paddingRight + '%',
                                paddingTop: data.paddingTop + '%',
                            }
                            return (
                                <div style={stylesForContainter} className="w-full">
                                    <img style={styles} className={`object-cover ${data.position === "right" ? "ml-auto" : data.position === "left" ? "mr-auto" : "mx-auto"}`} src={data.imageUrl} />
                                </div>
                            )
                        } else if (data.type === "text" || data.type === "textArea") {
                            const styles = {
                                fontSize: data.textSize + "px",
                                color: data.color,
                                textAlign: data.position === "center" ? "center" : data.position === "left" ? "start" : "end",
                                marginBottom: data.marginBottom + '%',
                                marginLeft: data.marginLeft + '%',
                                marginRight: data.marginRight + '%',
                                marginTop: data.marginTop + '%',
                            }
                            return (
                                <p style={styles} className={`${data.isBold ? "font-bold" : ""}`}>{data.text}</p>
                            )
                        } else if (data.type === "card") {
                            return (
                                // <div className="grid grid-cols-2 gap-4">
                                <div className="w-full mx-auto">
                                    {data.cardSelected === "card1" && <div className="flex flex-wrap gap-4 justify-center mx-auto w-full"><Option1 isMobilePreview={props?.isMobilePreview} data={data} /> <Option1 isMobilePreview={props?.isMobilePreview} data={data} /> <Option1 isMobilePreview={props?.isMobilePreview} data={data} /> </div>}

                                    {data.cardSelected === "card2" && <div className="flex flex-wrap gap-4 justify-center mx-auto w-full"><Option2 data={data} isMobilePreview={props?.isMobilePreview} /> <Option2 data={data} isMobilePreview={props?.isMobilePreview} /> <Option2 data={data} isMobilePreview={props?.isMobilePreview} /> </div>}

                                    {data.cardSelected === "card3" && <div className="flex flex-wrap gap-4 justify-center mx-auto w-full"><Option3 data={data} isMobilePreview={props?.isMobilePreview} /> <Option3 data={data} isMobilePreview={props?.isMobilePreview} /> <Option3 data={data} isMobilePreview={props?.isMobilePreview} /></div>}

                                    {data.cardSelected === "card4" && <div className="flex flex-wrap gap-4 justify-center mx-auto w-full"><Option4 data={data} isMobilePreview={props?.isMobilePreview} /> <Option4 data={data} isMobilePreview={props?.isMobilePreview} /> <Option4 data={data} isMobilePreview={props?.isMobilePreview} /> </div>}
                                </div>
                                // </div>
                            )
                        }
                    })}
            </div>
        </>
    )
}

export default SectionView;