import Option1 from "@/components/Cards/OptionalCards/option1"
import Option2 from "@/components/Cards/OptionalCards/option2"
import Option3 from "@/components/Cards/OptionalCards/option3"
import Option4 from "@/components/Cards/OptionalCards/option4"
import { useEffect } from "react"

const WebpageView = (props) => {
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
        console.log(props.webPageData)
        console.log(props.currentPage)
    }, [])


    return (
        <>
            <div style={styles} className={`w-full h-full object-cover overflow-y-auto scrollbarDesign`}>
                {!props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.isContactPage && props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.sections !== null && props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.sections?.length > 0 && props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.sections?.map(data => {
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
                            <>
                                {data.cardSelected === "card1" && <Option1 data={data} />}
                                {data.cardSelected === "card2" && <Option2 data={data} />}
                                {data.cardSelected === "card3" && <Option3 data={data} />}
                                {data.cardSelected === "card4" && <Option4 data={data} />}
                            </>
                            // </div>
                        )
                    }
                })}
            </div>
        </>
    )
}

export default WebpageView;