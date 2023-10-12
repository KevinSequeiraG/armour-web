import { useEffect, useState } from "react";

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
        paddingTop: props.webPageData.pages[parseInt(props.currentPage) - 1].paddingTop,
        paddingLeft: props.webPageData.pages[parseInt(props.currentPage) - 1].paddingLeft,
        paddingRight: props.webPageData.pages[parseInt(props.currentPage) - 1].paddingRight,
        paddingBottom: props.webPageData.pages[parseInt(props.currentPage) - 1].paddingBottom,
        backgroundColor: props.webPageData.pages[parseInt(props.currentPage) - 1].backgroundColor
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
            <div style={styles} className={`bg-red-500 w-full h-full`}>
                {props.webPageData.pages[parseInt(props.currentPage) - 1].sections !== null && props.webPageData.pages[parseInt(props.currentPage) - 1].sections.length > 0 && props.webPageData.pages[parseInt(props.currentPage) - 1].sections.map(data => {
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
                    } else {
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
                    }

                })}
            </div>
        </>
    )
}

export default SectionView;