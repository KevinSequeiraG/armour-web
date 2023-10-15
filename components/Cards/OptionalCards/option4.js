const Option4 = () => {
    return (
        <div className="w-[15rem] mx-auto bg-white rounded-xl shadow-md overflow-hidden md:flex">
            <div className="p-8">
                <h2 className="text-xl font-semibold">{"title"}</h2>
                <p className="text-gray-500 text-base">{"description"}</p>
                <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                    {"buttonText"}
                </button>
            </div>
            <div className="md:flex-shrink-0">
                <img src={"/images/awLogo.png"} alt={"title"} className="w-full h-full object-cover object-center" />
            </div>
        </div>
    )
}

export default Option4;