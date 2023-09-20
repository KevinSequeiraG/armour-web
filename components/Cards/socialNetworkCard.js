const SocialNetworkCard = (props) => {
    return (
        <div className="bg-gray-300 w-full h-[3rem] my-4 rounded-xl flex items-center px-6">
            {/* <p>{props.type === "fb" ? "Facebook" : props.type === "twitter" ? "Twitter" : props.type === "linkedIn" ? "Linked In" : props.type === "web" ? "Sitio web" : ""}</p> */}
            <img className="mr-4" src={props.type === "fb" ? "./svgs/fb.svg" : props.type === "twitter" ? "./svgs/twitter.svg" : props.type === "linkedIn" ? "./svgs/linkedin.svg" : props.type === "web" ? "./svgs/web.svg" : ""} />
            <p className="font-semibold">Sin definir</p>
        </div>
    )
}

export default SocialNetworkCard;