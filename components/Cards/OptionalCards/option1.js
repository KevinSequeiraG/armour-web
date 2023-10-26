import ProductsModal from "@/components/webpageUser/ProductsModal"
import { useEffect, useState } from "react"
import { FaShoppingCart } from "react-icons/fa";

const Option1 = (props) => {
    const [showProducts, setShowProducts] = useState(false);
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

    useEffect(() => {
        console.log(props.sectionInfo)
        console.log(parseInt(props.sectionInfo.prize) + (parseInt(props.sectionInfo.prize) * (parseInt(props.sectionInfo.tax) / 100)))
        console.log("aa", parseFloat(props.sectionInfo.prize) + (parseInt(props.sectionInfo.prize) * parseInt(props.sectionInfo.tax)))
    }, [])


    return (
        <div style={cardStyles} className={`w-[15rem] ${props.sectionInfo ? "mx-4" : "mx-auto"} bg-white rounded-xl shadow-md overflow-hidden`}>
            <img src={(props.sectionInfo && props.sectionInfo.image) ? props.sectionInfo.image : '/images/awLogo.png'} alt={props.sectionInfo && props.sectionInfo.name} className="w-full" />
            <div className="px-6 py-4 h-full">
                <h2 style={titleStyles} className="text-xl font-semibold">{(props.sectionInfo && props.sectionInfo.name) ? props.sectionInfo.name : 'Title'}</h2>
                <p style={descStyles} className="text-gray-500 text-base">{(props.sectionInfo && props.sectionInfo.desc) ? props.sectionInfo.desc : 'Description'}</p>
                {((props.data && !props.data.isCategory) && props.sectionInfo) && <p style={descStyles}>₡{parseInt(props.sectionInfo.prize) + (parseInt(props.sectionInfo.prize) * (parseInt(props.sectionInfo.tax) / 100))}</p>}
                <div style={buttonPosition}>
                    {(props.data && props.data.isCategory) ? <button onClick={() => { if (props.sectionInfo) setShowProducts(true) }} style={buttonStyles} className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded`}>
                        Ver
                    </button> : <button style={buttonStyles} className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded`} onClick={() => { props.setShowProdQuantity(true); props.setProdToAdd(props.sectionInfo) }}><FaShoppingCart /></button>}
                </div>
            </div>
            {props.sectionInfo && <ProductsModal setProdToAdd={props.setProdToAdd} setShowProdQuantity={props.setShowProdQuantity} currentPage={props.currentPage} sectionUid={props.sectionInfo.id} data={props.data} webPageData={props.webPageData} isOpen={showProducts} handleShow={setShowProducts} />}
        </div>
    )
}

export default Option1;