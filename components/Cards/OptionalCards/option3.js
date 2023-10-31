import ProductsModal from "@/components/webpageUser/ProductsModal";
import { increaseCounterForCategoryWatched, increaseCounterForProductWatched } from "@/helpers/reports";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaShoppingCart } from "react-icons/fa"

const Option3 = (props) => {
    const [showProducts, setShowProducts] = useState(false);
    const { t } = useTranslation();
    const titleStyles = {
        color: props?.data.textColorTitle,
        fontSize: props?.data.textSizeTitle + "px",
        textAlign: props?.data.titlePosition
    }
    const descStyles = {
        color: props?.data.textColorDesc,
        fontSize: props?.data.textSizeDesc + "px",
        textAlign: props?.data.descPosition
    }
    const buttonStyles = {
        color: props?.data.textColorButton,
        fontSize: props?.data.textSizeButton + "px",
        backgroundColor: props?.data.bgColorButton
    }
    const buttonPosition = {
        textAlign: props?.data.buttonPosition,
    }
    const cardStyles = {
        backgroundColor: props?.data.bgColor,
    }

    return (
        <div style={cardStyles} className={`${props?.isMobilePreview && "w-full"} w-full h-auto mdx600:w-[36rem] rounded-[10px] shadow-md border overflow-hidden flex`}>
            {/* <div className="md:flex-shrink-0 w-1/2"> */}

            {/* </div> */}
            <div className="p-8 w-1/2">
                <h2 style={titleStyles} className="text-lg font-semibold">{(props?.sectionInfo && props?.sectionInfo?.name) ? props?.sectionInfo?.name : t("card.title")}</h2>
                <p style={descStyles} className="pt-1">{(props?.sectionInfo && props?.sectionInfo?.desc) ? props?.sectionInfo?.desc : t("card.desc")}</p>
                {((props?.data && !props?.data?.isCategory) && props?.sectionInfo) && <p style={descStyles}>₡{parseInt(props?.sectionInfo?.prize) + (parseInt(props?.sectionInfo?.prize) * (parseInt(props?.sectionInfo?.tax) / 100))}</p>}
                <div style={buttonPosition}>
                    {(props?.data && props?.data?.isCategory) ? <button onClick={() => { if (props?.sectionInfo) { setShowProducts(true); increaseCounterForCategoryWatched(props?.sectionInfo?.id) } }} style={buttonStyles} className={`mt-4 font-semibold py-1 px-4 rounded-[10px]`}>
                        {props?.sectionInfo ? props.isSpanish ? "Ver" : "See" : t("card.see")}
                    </button> : <button style={buttonStyles} className={`mt-4 font-semibold py-2 px-4 rounded-[10px]`} onClick={() => { increaseCounterForProductWatched(props?.sectionInfo?.id); props?.setShowProdQuantity && props?.setShowProdQuantity(true); props.setProdToAdd && props.setProdToAdd(props?.sectionInfo) }}><FaShoppingCart /></button>}
                </div>
            </div>
            <img src={(props?.sectionInfo && props?.sectionInfo?.image) ? props?.sectionInfo?.image : '/images/awLogo.png'} alt={props?.sectionInfo && props?.sectionInfo?.name} className="w-1/2 min-h-full object-cover" />
            {props?.sectionInfo && <ProductsModal isSpanish={props?.isSpanish} setProdToAdd={props?.setProdToAdd} setShowProdQuantity={props?.setShowProdQuantity} currentPage={props?.currentPage} sectionUid={props?.sectionInfo?.id} data={props?.data} webPageData={props?.webPageData} isOpen={showProducts} handleShow={setShowProducts} />}
        </div>
    )
}

export default Option3;