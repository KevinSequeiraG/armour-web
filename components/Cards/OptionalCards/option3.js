const Option3 = (props) => {
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
                <h2 style={titleStyles} className="text-xl font-semibold">{props.data.textTitle ? props.data.textTitle : 'Title'}</h2>
                <p style={descStyles} className="text-gray-500 text-base">{props.data.textDesc ? props.data.textDesc : 'Description'}</p>
                <div style={buttonPosition}>
                    {props.data.isCategory ? <button style={buttonStyles} className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded`}>
                        Ver
                    </button> : <button style={buttonStyles} className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded`}>"ico carrito :v"</button>}
                </div>
            </div>
            <img src={props.data.image ? props.data.image : '/images/awLogo.png'} alt={props.data.textTitle} className="object-cover object-center w-1/2" />
        </div>
    )
}

export default Option3;