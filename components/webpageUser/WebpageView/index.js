import Option1 from "@/components/Cards/OptionalCards/option1"
import Option2 from "@/components/Cards/OptionalCards/option2"
import Option3 from "@/components/Cards/OptionalCards/option3"
import Option4 from "@/components/Cards/OptionalCards/option4"
import { GetCategoriesByWebpage } from "@/helpers/categories"
import { useEffect, useState } from "react"
import { ContactUs } from "@/components/ManagePageBuilder/ContactUs/contactUs"

const WebpageView = (props) => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [cardsData, setCardsData] = useState([]);
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
        GetCategoriesByWebpage(props?.webPageData?.name).then(data => {
            setCategories(data)
        })
    }, [])

    // useEffect(() => {
    //     console.log(categories)
    //     categories.map((cat) => {
    //         let dataCompleted = { ...cat }
    //         let sectionData = props?.webPageData?.pages[props.currentPage]?.sections?.find(section => section.type === "card" && section.isCategory);
    //         console.log("sectionData", sectionData)

    //     })
    // }, [categories])



    return (
        <>
            <div style={styles} className={`w-full h-full object-cover overflow-y-auto scrollbarDesign`}>
                {!props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.isContactPage && props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.sections !== null && props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.sections?.length > 0 ? props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.sections?.map(data => {
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
                            <div className="flex w-full mt-2">
                                {categories.map(cat => {
                                    return (
                                        // <div className="grid grid-cols-2 gap-4">
                                        <>
                                            {(data.cardSelected === "card1" && data.isCategory) && <Option1 currentPage={props.currentPage} webPageData={props.webPageData} data={data} sectionInfo={cat} />}
                                            {(data.cardSelected === "card2" && data.isCategory) && <Option2 currentPage={props.currentPage} webPageData={props.webPageData} data={data} sectionInfo={cat} />}
                                            {(data.cardSelected === "card3" && data.isCategory) && <Option3 currentPage={props.currentPage} webPageData={props.webPageData} data={data} sectionInfo={cat} />}
                                            {(data.cardSelected === "card4" && data.isCategory) && <Option4 currentPage={props.currentPage} webPageData={props.webPageData} data={data} sectionInfo={cat} />}
                                        </>
                                        // </div>
                                    )
                                })}
                            </div>
                        )
                    }
                }) :
                    <ContactUs webPageData={props?.webPageData} currentPage={props?.currentPage} />
                }
            </div>
        </>
    )
}

export default WebpageView;