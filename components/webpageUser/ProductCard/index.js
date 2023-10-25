import { FaShoppingCart } from "react-icons/fa"

const ProductCard = (props) => {
    const titleStyles = {
        color: props?.data?.textColorTitle,
        fontSize: props?.data?.textSizeTitle + "px",
        textAlign: props?.data?.titlePosition
    }
    const descStyles = {
        color: props?.data?.textColorDesc,
        fontSize: props?.data?.textSizeDesc + "px",
        textAlign: props?.data?.descPosition
    }
    const buttonStyles = {
        color: props?.data?.textColorButton,
        fontSize: props?.data?.textSizeButton + "px",
        backgroundColor: props?.data?.bgColorButton
    }
    const buttonPosition = {
        textAlign: props?.data?.buttonPosition,
    }
    const cardStyles = {
        height: props?.data?.height + "%",
        width: props?.data?.width + "%",
        backgroundColor: props?.data?.bgColor,
        marginBottom: props?.data?.marginBottom + '%',
        marginLeft: props?.data?.marginLeft + '%',
        marginRight: props?.data?.marginRight + '%',
        marginTop: props?.data?.marginTop + '%',
    }

    return (
        <>

            {props?.data?.cardSelected === "card1" && <div style={cardStyles} className="w-[15rem] mx-4 bg-white rounded-xl shadow-md overflow-hidden">
                <img src={props.sectionInfo.image ? props.sectionInfo.image : '/images/awLogo.png'} alt={props.sectionInfo.name} className="w-full" />
                <div className="px-6 py-4 h-full">
                    <h2 style={titleStyles} className="text-xl font-semibold">{props.sectionInfo.name ? props.sectionInfo.name : 'Title'}</h2>
                    <p style={descStyles} className="text-gray-500 text-base">{props.sectionInfo.desc ? props.sectionInfo.desc : 'Description'}</p>
                    <div style={buttonPosition}>
                        <button style={buttonStyles} className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded`} onClick={()=>{props.setShowProdQuantity(true); props.setProdToAdd(props.sectionInfo)}}><FaShoppingCart /></button>
                    </div>
                </div>
            </div>}

            {props?.data?.cardSelected === "card2" && <div style={cardStyles} className="h-auto w-[36rem] flex mx-4 bg-white rounded-xl shadow-md overflow-hidden flex">
                {/* <div className="md:flex-shrink-0 w-1/2"> */}
                <img src={props.sectionInfo.image ? props.sectionInfo.image : '/images/awLogo.png'} alt={props.sectionInfo.name} className="object-cover object-center w-1/2" />
                {/* </div> */}
                <div className="p-8 full">
                    <h2 style={titleStyles} className="text-xl font-semibold">{props.data.name ? props.data.name : 'Title'}</h2>
                    <p style={descStyles} className="text-gray-500 text-base">{props.data.desc ? props.data.desc : 'Description'}</p>
                    <div style={buttonPosition}>
                        <button style={buttonStyles} className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded`} onClick={()=>{props.setShowProdQuantity(true); props.setProdToAdd(props.sectionInfo)}}><FaShoppingCart /></button>
                    </div>
                </div>
            </div>}

            {props?.data?.cardSelected === "card3" && <div style={cardStyles} className="h-auto w-[36rem] mx-4 bg-white rounded-xl shadow-md overflow-hidden flex">
                <div className="p-8 w-1/2">
                    <h2 style={titleStyles} className="text-xl font-semibold">{props.data.name ? props.data.name : 'Title'}</h2>
                    <p style={descStyles} className="text-gray-500 text-base">{props.data.desc ? props.data.desc : 'Description'}</p>
                    <div style={buttonPosition}>
                        <button style={buttonStyles} className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded`} onClick={()=>{props.setShowProdQuantity(true); props.setProdToAdd(props.sectionInfo)}}><FaShoppingCart /></button>
                    </div>
                </div>
                <img src={props.sectionInfo.image ? props.sectionInfo.image : '/images/awLogo.png'} alt={props.sectionInfo.name} className="object-cover object-center w-1/2" />
            </div>}

            {props?.data?.cardSelected === "card4" && <div style={cardStyles} className="w-[15rem] mx-4 bg-white rounded-xl shadow-md overflow-hidden md:flex">
                <div className="p-8">
                    <h2 style={titleStyles} className="text-xl font-semibold">{props.data.name ? props.data.name : 'Title'}</h2>
                    <p style={descStyles} className="text-gray-500 text-base">{props.data.desc ? props.data.desc : 'Description'}</p>
                    <div style={buttonPosition}>
                        <button style={buttonStyles} className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded`} onClick={()=>{props.setShowProdQuantity(true); props.setProdToAdd(props.sectionInfo)}}><FaShoppingCart /></button>
                    </div>
                </div>
                <div className="md:flex-shrink-0">
                    <img src={props.sectionInfo.image ? props.sectionInfo.image : '/images/awLogo.png'} alt={props.sectionInfo.name} className="w-full h-full object-cover object-center" />
                </div>
            </div>}
        </>
    )
}

export default ProductCard;