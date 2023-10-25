import { FaShoppingCart } from "react-icons/fa"

const Option4 = (props) => {
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
        <div style={cardStyles} className="w-[15rem] mx-auto bg-white rounded-xl shadow-md overflow-hidden md:flex">
            <div className="p-8">
                <h2 style={titleStyles} className="text-xl font-semibold">{(props.sectionInfo && props.sectionInfo.name) ? props.sectionInfo.name : 'Title'}</h2>
                <p style={descStyles} className="text-gray-500 text-base">{(props.sectionInfo && props.sectionInfo.desc) ? props.sectionInfo.desc : 'Description'}</p>
                <div style={buttonPosition}>
                    {props.data.isCategory ? <button style={buttonStyles} className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded`}>
                        Ver
                    </button> : <button onClick={()=>{props.setShowProdQuantity(true); props.setProdToAdd(props.sectionInfo)}} style={buttonStyles} className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded`}><FaShoppingCart /></button>}
                </div>
            </div>
            <div className="md:flex-shrink-0">
                <img src={(props.sectionInfo && props.sectionInfo.image) ? props.sectionInfo.image : '/images/awLogo.png'} alt={props.sectionInfo && props.sectionInfo.name} className="w-full h-full object-cover object-center" />
            </div>
        </div>
    )
}

export default Option4;