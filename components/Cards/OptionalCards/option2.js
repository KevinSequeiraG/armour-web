import { FaShoppingCart } from "react-icons/fa"

const Option2 = (props) => {
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
        <div style={cardStyles} className="h-auto w-[36rem] flex mx-auto bg-white rounded-xl shadow-md overflow-hidden flex">
            {/* <div className="md:flex-shrink-0 w-1/2"> */}
            <img src={(props.sectionInfo && props.sectionInfo.image) ? props.sectionInfo.image : '/images/awLogo.png'} alt={props.sectionInfo && props.sectionInfo.name} className="object-cover object-center w-1/2" />
            {/* </div> */}
            <div className="p-8 full">
                <h2 style={titleStyles} className="text-xl font-semibold">{(props.sectionInfo && props.sectionInfo.name) ? props.data.name : 'Title'}</h2>
                <p style={descStyles} className="text-gray-500 text-base">{(props.sectionInfo && props.sectionInfo.desc) ? props.data.desc : 'Description'}</p>
                {((props.data && !props.data.isCategory) && props.sectionInfo) && <p style={descStyles}>₡{parseInt(props.sectionInfo.prize) + (parseInt(props.sectionInfo.prize) * (parseInt(props.sectionInfo.tax) / 100))}</p>}
                <div style={buttonPosition}>
                    {props.data.isCategory ? <button style={buttonStyles} className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded`}>
                        Ver
                    </button> : <button style={buttonStyles} className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded`} onClick={() => { props.setShowProdQuantity(true); props.setProdToAdd(props.sectionInfo) }}><FaShoppingCart /></button>}
                </div>
            </div>
        </div>
    )
}

export default Option2;