import { useEffect, useState } from "react"

const ProductCard = (props) => {
    const [cardData, setCardData] = useState();
    const titleStyles = {
        color: cardData?.textColorTitle,
        fontSize: cardData?.textSizeTitle + "px",
        textAlign: cardData?.titlePosition
    }
    const descStyles = {
        color: cardData?.textColorDesc,
        fontSize: cardData?.textSizeDesc + "px",
        textAlign: cardData?.descPosition
    }
    const buttonStyles = {
        color: cardData?.textColorButton,
        fontSize: cardData?.textSizeButton + "px",
        backgroundColor: cardData?.bgColorButton
    }
    const buttonPosition = {
        textAlign: cardData?.buttonPosition,
    }
    const cardStyles = {
        height: cardData?.height + "%",
        width: cardData?.width + "%",
        backgroundColor: cardData?.bgColor,
        marginBottom: cardData?.marginBottom + '%',
        marginLeft: cardData?.marginLeft + '%',
        marginRight: cardData?.marginRight + '%',
        marginTop: cardData?.marginTop + '%',
    }

    useEffect(() => {
        console.log("props.data", props.data)
        console.log("props.webPageData", props.webPageData)
        console.log("props.currentPage", props.currentPage)
        setCardData(props?.webPageData?.pages[props.currentPage - 1]?.sections?.find(section => !section.isCategory && section.type === "card"))
        console.log(props?.webPageData?.pages[props.currentPage - 1]?.sections?.find(section => !section.isCategory && section.type === "card"))
    }, [])


    return (
        <>

            {cardData?.cardSelected === "card1" && <div style={cardStyles} className="w-[15rem] mx-4 bg-white rounded-xl shadow-md overflow-hidden">
                <img src={props.sectionInfo.image ? props.sectionInfo.image : '/images/awLogo.png'} alt={props.sectionInfo.name} className="w-full" />
                <div className="px-6 py-4 h-full">
                    <h2 style={titleStyles} className="text-xl font-semibold">{props.sectionInfo.name ? props.sectionInfo.name : 'Title'}</h2>
                    <p style={descStyles} className="text-gray-500 text-base">{props.sectionInfo.desc ? props.sectionInfo.desc : 'Description'}</p>
                    <div style={buttonPosition}>
                        {cardData?.isCategory ? <button style={buttonStyles} className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded`}>
                            Ver
                        </button> : <button style={buttonStyles} className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded`}>"ico carrito :v"</button>}
                    </div>
                </div>
            </div>}

            {cardData?.cardSelected === "card2" && <div style={cardStyles} className="h-auto w-[36rem] flex mx-4 bg-white rounded-xl shadow-md overflow-hidden flex">
                {/* <div className="md:flex-shrink-0 w-1/2"> */}
                <img src={props.sectionInfo.image ? props.sectionInfo.image : '/images/awLogo.png'} alt={props.sectionInfo.name} className="object-cover object-center w-1/2" />
                {/* </div> */}
                <div className="p-8 full">
                    <h2 style={titleStyles} className="text-xl font-semibold">{props.data.name ? props.data.name : 'Title'}</h2>
                    <p style={descStyles} className="text-gray-500 text-base">{props.data.desc ? props.data.desc : 'Description'}</p>
                    <div style={buttonPosition}>
                        {cardData?.isCategory ? <button style={buttonStyles} className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded`}>
                            Ver
                        </button> : <button style={buttonStyles} className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded`}>"ico carrito :v"</button>}
                    </div>
                </div>
            </div>}

            {cardData?.cardSelected === "card3" && <div style={cardStyles} className="h-auto w-[36rem] mx-4 bg-white rounded-xl shadow-md overflow-hidden flex">
                <div className="p-8 w-1/2">
                    <h2 style={titleStyles} className="text-xl font-semibold">{props.data.name ? props.data.name : 'Title'}</h2>
                    <p style={descStyles} className="text-gray-500 text-base">{props.data.desc ? props.data.desc : 'Description'}</p>
                    <div style={buttonPosition}>
                        {cardData?.isCategory ? <button style={buttonStyles} className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded`}>
                            Ver
                        </button> : <button style={buttonStyles} className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded`}>"ico carrito :v"</button>}
                    </div>
                </div>
                <img src={props.sectionInfo.image ? props.sectionInfo.image : '/images/awLogo.png'} alt={props.sectionInfo.name} className="object-cover object-center w-1/2" />
            </div>}

            {cardData?.cardSelected === "card4" && <div style={cardStyles} className="w-[15rem] mx-4 bg-white rounded-xl shadow-md overflow-hidden md:flex">
                <div className="p-8">
                    <h2 style={titleStyles} className="text-xl font-semibold">{props.data.name ? props.data.name : 'Title'}</h2>
                    <p style={descStyles} className="text-gray-500 text-base">{props.data.desc ? props.data.desc : 'Description'}</p>
                    <div style={buttonPosition}>
                        {cardData?.isCategory ? <button style={buttonStyles} className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded`}>
                            Ver
                        </button> : <button style={buttonStyles} className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded`}>"ico carrito :v"</button>}
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