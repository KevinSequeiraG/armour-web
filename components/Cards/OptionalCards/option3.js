import ProductsModal from "@/components/webpageUser/ProductsModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaShoppingCart } from "react-icons/fa"

const Option3 = (props) => {
    const [showProducts, setShowProducts] = useState(false);
    const { t } = useTranslation();
    const titleStyles = {
        color: props.data.textColorTitle,
        fontSize: props.data.textSizeTitle + "px",
        textAlign: props.data.titlePosition
    }
    const descStyles = {
        color: props.data.textColorDesc,
        fontSize: props.data.textSizeDesc + "px",
        textAlign: props.data.descPosition
    }
    const buttonStyles = {
        color: props.data.textColorButton,
        fontSize: props.data.textSizeButton + "px",
        backgroundColor: props.data.bgColorButton
    }
    const buttonPosition = {
        textAlign: props.data.buttonPosition,
    }
    const cardStyles = {
        height: props.data.height + "%",
        width: props.data.width + "%",
        backgroundColor: props.data.bgColor,
        marginBottom: props.data.marginBottom + '%',
        marginLeft: props.data.marginLeft + '%',
        marginRight: props.data.marginRight + '%',
        marginTop: props.data.marginTop + '%',
    }

    return (
        <div style={cardStyles} className="h-auto w-[36rem] mx-auto bg-white rounded-xl shadow-md overflow-hidden flex">
            <div className="p-8 w-1/2">
                <h2 style={titleStyles} className="text-xl font-semibold">{(props.sectionInfo && props.sectionInfo.name) ? props.sectionInfo.name : t("card.title")}</h2>
                <p style={descStyles} className="text-gray-500 text-base">{(props.sectionInfo && props.sectionInfo.desc) ? props.sectionInfo.desc : t("card.desc")}</p>
                {((props.data && !props.data.isCategory) && props.sectionInfo) && <p style={descStyles}>₡{parseInt(props.sectionInfo.prize) + (parseInt(props.sectionInfo.prize) * (parseInt(props.sectionInfo.tax) / 100))}</p>}
                <div style={buttonPosition}>
                    {props.data.isCategory ? <button style={buttonStyles} className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded`}>
                        {t("card.see")}
                    </button> : <button onClick={() => { props.setShowProdQuantity(true); props.setProdToAdd(props.sectionInfo) }} style={buttonStyles} className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded`}><FaShoppingCart /></button>}
                </div>
            </div>
            <img src={(props.sectionInfo && props.sectionInfo.image) ? props.sectionInfo.image : '/images/awLogo.png'} alt={props.sectionInfo && props.sectionInfo.name} className="object-cover object-center w-1/2" />
            {props.sectionInfo && <ProductsModal setProdToAdd={props.setProdToAdd} setShowProdQuantity={props.setShowProdQuantity} currentPage={props.currentPage} sectionUid={props.sectionInfo.id} data={props.data} webPageData={props.webPageData} isOpen={showProducts} handleShow={setShowProducts} />}
        </div>
    )
}

export default Option3;