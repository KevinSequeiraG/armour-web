import { increaseCounterForProductWatched } from "@/helpers/reports";
import { useTranslation } from "react-i18next";
import { FaShoppingCart } from "react-icons/fa"

const ProductCard = (props) => {
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
        <>

            {props?.data?.cardSelected === "card1" && <div style={cardStyles} className="w-full h-auto mdx600:w-[14rem] rounded-[10px] shadow-md overflow-hidden flex flex-col border">
                <img src={props.sectionInfo.image ? props.sectionInfo.image : '/images/awLogo.png'} alt={props.sectionInfo.name} className="w-full min-h-[9rem] max-h-36 object-cover" />
                <div className="px-4 py-3">
                    <h2 style={titleStyles} className="text-lg font-semibold">{props.sectionInfo.name ? props.sectionInfo.name :  t("card.title")}</h2>
                    <p style={descStyles} className="pt-1">{props.sectionInfo.desc ? props.sectionInfo.desc : t("card.desc")}</p>
                    {((props.data) && props.sectionInfo) && <p style={descStyles}>₡{(parseFloat(props.sectionInfo.prize) + (parseFloat(props.sectionInfo.prize) * (parseFloat(props.sectionInfo.tax) / 100))).toLocaleString('es-CR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>}
                    <div style={buttonPosition}>
                        <button style={buttonStyles} className={`mt-4 font-semibold py-2 px-4 rounded-[10px]`} onClick={()=>{props.setShowProdQuantity(true); increaseCounterForProductWatched(props?.sectionInfo?.id); props.setProdToAdd(props.sectionInfo)}}><FaShoppingCart /></button>
                    </div>
                </div>
            </div>}

            {props?.data?.cardSelected === "card2" && <div style={cardStyles} className="w-full h-auto mdx600:w-[36rem] rounded-[10px] shadow-md border overflow-hidden flex">
                {/* <div className="md:flex-shrink-0 w-1/2"> */}
                <img src={props.sectionInfo.image ? props.sectionInfo.image : '/images/awLogo.png'} alt={props.sectionInfo.name} className="w-1/2 min-h-full object-cover" />
                {/* </div> */}
                <div className="p-8 w-1/2">
                    <h2 style={titleStyles} className="text-lg font-semibold">{props.data.name ? props.data.name :  t("card.title")}</h2>
                    <p style={descStyles} className="pt-1">{props.data.desc ? props.data.desc : t("card.desc")}</p>
                    {((props.data) && props.sectionInfo) && <p style={descStyles}>₡{(parseFloat(props.sectionInfo.prize) + (parseFloat(props.sectionInfo.prize) * (parseFloat(props.sectionInfo.tax) / 100))).toLocaleString('es-CR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>}
                    <div style={buttonPosition}>
                        <button style={buttonStyles} className={`mt-4 font-semibold py-2 px-4 rounded-[10px]`} onClick={()=>{props.setShowProdQuantity(true); increaseCounterForProductWatched(props?.sectionInfo?.id); props.setProdToAdd(props.sectionInfo)}}><FaShoppingCart /></button>
                    </div>
                </div>
            </div>}

            {props?.data?.cardSelected === "card3" && <div style={cardStyles} className="w-full h-auto mdx600:w-[36rem] rounded-[10px] shadow-md border overflow-hidden flex">
                <div className="p-8 w-1/2">
                    <h2 style={titleStyles} className="text-lg font-semibold">{props.data.name ? props.data.name :  t("card.title")}</h2>
                    <p style={descStyles} className="pt-1">{props.data.desc ? props.data.desc : t("card.desc")}</p>
                    {((props.data) && props.sectionInfo) && <p style={descStyles}>₡{(parseFloat(props.sectionInfo.prize) + (parseFloat(props.sectionInfo.prize) * (parseFloat(props.sectionInfo.tax) / 100))).toLocaleString('es-CR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>}
                    <div style={buttonPosition}>
                        <button style={buttonStyles} className={`mt-4 font-semibold py-2 px-4 rounded-[10px]`} onClick={()=>{props.setShowProdQuantity(true); increaseCounterForProductWatched(props?.sectionInfo?.id); props.setProdToAdd(props.sectionInfo)}}><FaShoppingCart /></button>
                    </div>
                </div>
                <img src={props.sectionInfo.image ? props.sectionInfo.image : '/images/awLogo.png'} alt={props.sectionInfo.name} className="w-1/2 min-h-full object-cover" />
            </div>}

            {props?.data?.cardSelected === "card4" && <div style={cardStyles} className="w-full h-auto mdx600:w-[14rem] rounded-[10px] shadow-md overflow-hidden flex flex-col border">
                <div className="px-4 py-3">
                    <h2 style={titleStyles} className="text-lg font-semibold">{props.data.name ? props.data.name :  t("card.title")}</h2>
                    <p style={descStyles} className="pt-1">{props.data.desc ? props.data.desc : t("card.desc")}</p>
                    {((props.data) && props.sectionInfo) && <p style={descStyles}>₡{(parseFloat(props.sectionInfo.prize) + (parseFloat(props.sectionInfo.prize) * (parseFloat(props.sectionInfo.tax) / 100))).toLocaleString('es-CR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>}
                    <div style={buttonPosition}>
                        <button style={buttonStyles} className={`mt-4 font-semibold py-2 px-4 rounded-[10px]`} onClick={()=>{props.setShowProdQuantity(true); increaseCounterForProductWatched(props?.sectionInfo?.id); props.setProdToAdd(props.sectionInfo)}}><FaShoppingCart /></button>
                    </div>
                </div>
                <div className="md:flex-shrink-0">
                    <img src={props.sectionInfo.image ? props.sectionInfo.image : '/images/awLogo.png'} alt={props.sectionInfo.name} className="w-full min-h-[9rem] max-h-36 object-cover" />
                </div>
            </div>}
        </>
    )
}

export default ProductCard;