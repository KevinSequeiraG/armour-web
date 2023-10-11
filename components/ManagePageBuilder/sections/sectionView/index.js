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
        maxHeight: sectionHeight ? sectionHeight : "100%",
        paddingTop: sectionPadingTop ? sectionPadingTop : "0",
        paddingLeft: sectionPadingLeft ? sectionPadingLeft : "0",
        paddingRight: sectionPadingRight ? sectionPadingRight : "0",
        paddingBottom: sectionPadingBottom ? sectionPadingBottom : "0",
        backgroundColor: sectionBgColor ? sectionBgColor : "#ffffff",
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

    useEffect(() => {
        console.log(props.webPageData)
        props.webPageData.pages[parseInt(props.currentPage) - 1].sections.map(data => {
            console.log(data)
        })
        console.log("currentPage", props.currentPage)
    }, [props.webPageData])

    return (
        <div style={styles} className={`bg-red-500 w-full h-full overflow-x-hidden`}>
            {props.webPageData.pages[parseInt(props.currentPage) - 1].sections.length > 0 && props.webPageData.pages[parseInt(props.currentPage) - 1].sections.map(data => {
                const styles = {
                    fontSize: data.textSize + "px",
                    color: data.color,
                    textAlign: data.position === "center" ? "center" : data.position === "left" ? "start" : "end",
                    marginBottom:data.marginBottom+'%',
                    marginLeft:data.marginLeft+'%',
                    marginRight:data.marginRight+'%',
                    marginTop:data.marginTop+'%',
                }
                return (
                    <p style={styles} className={`${data.isBold ? "font-bold" : ""}`}>{data.text}</p>
                )
            })}
        </div>
    )
}

export default SectionView;