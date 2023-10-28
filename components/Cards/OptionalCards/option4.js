import ProductsModal from "@/components/webpageUser/ProductsModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaShoppingCart } from "react-icons/fa"

const Option4 = (props) => {
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
        <div style={cardStyles} className={`${props?.isMobilePreview && "w-full"} w-full h-auto mdx600:w-[14rem] rounded-[10px] shadow-md overflow-hidden flex flex-col border`}>
            <div className="px-4 py-3">
                <h2 style={titleStyles} className="text-lg font-semibold">{(props?.sectionInfo && props?.sectionInfo?.name) ? props?.sectionInfo?.name : t("card.title")}</h2>
                <p style={descStyles} className="pt-1">{(props?.sectionInfo && props?.sectionInfo?.desc) ? props?.sectionInfo?.desc : t("card.desc")}</p>
                {((props?.data && !props?.data?.isCategory) && props?.sectionInfo) && <p style={descStyles}>₡{parseInt(props?.sectionInfo?.prize) + (parseInt(props?.sectionInfo?.prize) * (parseInt(props?.sectionInfo?.tax) / 100))}</p>}
                <div style={buttonPosition}>
                    {(props?.data && props?.data?.isCategory) ? <button onClick={() => { if (props?.sectionInfo) setShowProducts(true) }} style={buttonStyles} className={`mt-4 font-semibold py-1 px-4 rounded-[10px]`}>
                        {t("card.see")}
                    </button> : <button style={buttonStyles} className={`mt-4 font-semibold py-2 px-4 rounded-[10px]`} onClick={() => { props?.setShowProdQuantity(true); props?.setProdToAdd(props?.sectionInfo) }}><FaShoppingCart /></button>}
                </div>
            </div>
            <img src={(props?.sectionInfo && props?.sectionInfo?.image) ? props?.sectionInfo?.image : '/images/awLogo.png'} alt={props?.sectionInfo && props?.sectionInfo?.name} className="w-full min-h-[9rem] max-h-36 object-cover" />
            {props?.sectionInfo && <ProductsModal setProdToAdd={props?.setProdToAdd} setShowProdQuantity={props?.setShowProdQuantity} currentPage={props?.currentPage} sectionUid={props?.sectionInfo?.id} data={props?.data} webPageData={props?.webPageData} isOpen={showProducts} handleShow={setShowProducts} />}
        </div>
    )
}

export default Option4;