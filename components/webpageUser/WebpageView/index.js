import Option1 from "@/components/Cards/OptionalCards/option1"
import Option2 from "@/components/Cards/OptionalCards/option2"
import Option3 from "@/components/Cards/OptionalCards/option3"
import Option4 from "@/components/Cards/OptionalCards/option4"
import { GetCategoriesByWebpage } from "@/helpers/categories"
import { useEffect, useState } from "react"
import { ContactUs } from "@/components/ManagePageBuilder/ContactUs/contactUs"
import { GetProductsByWebpage } from "@/helpers/products"
import ProductQuantity from "@/components/Modals/ProductQuantity"
import SalesCartView from "@/components/Modals/SalesCartView"
import { FaShoppingCart } from "react-icons/fa"

const WebpageView = (props) => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [showSalesCart, setShowSalesCart] = useState(false);
    const [salesCart, setSalesCart] = useState([]);
    const [showProdQuantity, setShowProdQuantity] = useState(false);
    const [prodToAdd, setProdToAdd] = useState();
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
        console.log("web", props.webPageData)
        GetCategoriesByWebpage(props?.webPageData?.pageUrl).then(data => {
            setCategories(data)
            console.log("cat", data)
        })

        GetProductsByWebpage(props?.webPageData?.pageUrl).then(data => {
            setProducts(data)
            console.log("pro", data)
        })
    }, [])

    return (
        <>
            <div style={styles} className={` flex-1 w-full object-cover overflow-y-auto scrollbarDesign h-screen`}>
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
                    } else if (data.type === "card" && data.isCategory) {
                        console.log(2)
                        return (
                            <div className="flex-col mdx600:flex-row items-center mt-2 flex flex-wrap gap-4 justify-center mx-auto w-full">
                                {categories.map((cat,i) => {
                                    return (
                                        <div key={i}>
                                            {(data.cardSelected === "card1" && (props?.currentPage === parseInt(cat.webpagePage))) && <Option1 setProdToAdd={setProdToAdd} setShowProdQuantity={setShowProdQuantity} currentPage={props.currentPage} webPageData={props.webPageData} data={data} sectionInfo={cat} />}
                                            {(data.cardSelected === "card2" && (props?.currentPage === parseInt(cat.webpagePage))) && <Option2 setProdToAdd={setProdToAdd} setShowProdQuantity={setShowProdQuantity} currentPage={props.currentPage} webPageData={props.webPageData} data={data} sectionInfo={cat} />}
                                            {(data.cardSelected === "card3" && (props?.currentPage === parseInt(cat.webpagePage))) && <Option3 setProdToAdd={setProdToAdd} setShowProdQuantity={setShowProdQuantity} currentPage={props.currentPage} webPageData={props.webPageData} data={data} sectionInfo={cat} />}
                                            {(data.cardSelected === "card4" && (props?.currentPage === parseInt(cat.webpagePage))) && <Option4 setProdToAdd={setProdToAdd} setShowProdQuantity={setShowProdQuantity} currentPage={props.currentPage} webPageData={props.webPageData} data={data} sectionInfo={cat} />}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    } else if (data.type === "card" && !data.isCategory) {
                        console.log(1)
                        return (
                            <div className="flex mdx600:flex-row flex-col gap-4 items-center mx-auto mdx600:w-full mt-2">
                                {products.map(prod => {
                                    return (
                                        <>
                                            {(data.cardSelected === "card1" && (props?.currentPage === parseInt(prod.webpagePage))) && <Option1 setProdToAdd={setProdToAdd} setShowProdQuantity={setShowProdQuantity} currentPage={props.currentPage} webPageData={props.webPageData} data={data} sectionInfo={prod} />}
                                            {(data.cardSelected === "card2" && (props?.currentPage === parseInt(prod.webpagePage))) && <Option2 setProdToAdd={setProdToAdd} setShowProdQuantity={setShowProdQuantity} currentPage={props.currentPage} webPageData={props.webPageData} data={data} sectionInfo={prod} />}
                                            {(data.cardSelected === "card3" && (props?.currentPage === parseInt(prod.webpagePage))) && <Option3 setProdToAdd={setProdToAdd} setShowProdQuantity={setShowProdQuantity} currentPage={props.currentPage} webPageData={props.webPageData} data={data} sectionInfo={prod} />}
                                            {(data.cardSelected === "card4" && (props?.currentPage === parseInt(prod.webpagePage))) && <Option4 setProdToAdd={setProdToAdd} setShowProdQuantity={setShowProdQuantity} currentPage={props.currentPage} webPageData={props.webPageData} data={data} sectionInfo={prod} />}
                                        </>
                                    )
                                })}
                            </div>
                        )
                    }
                }) :
                    <ContactUs webPageData={props?.webPageData} currentPage={props?.currentPage} />
                }
            </div>
            <button onClick={() => { setShowSalesCart(true) }} className="text-white px-3 py-2 bg-black rounded-full text-[1.5rem] p-4 absolute bottom-14 w-14 h-14 flex items-center justify-center right-5"><FaShoppingCart /></button>
            <SalesCartView isOpen={showSalesCart} setSalesCart={setSalesCart} cartProducts={salesCart} handleShow={setShowSalesCart} />
            <ProductQuantity salesCart={salesCart} prodToAdd={prodToAdd} setSalesCart={setSalesCart} handleShow={setShowProdQuantity} isOpen={showProdQuantity} />
        </>
    )
}

export default WebpageView;