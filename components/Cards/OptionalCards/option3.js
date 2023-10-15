const Option3 = () => {
    return (
        <div className="h-auto w-[20rem] mx-auto bg-white rounded-xl shadow-md overflow-hidden flex">
            <div className="p-8 w-[15rem]">
                <h2 className="text-xl font-semibold">{"title"}</h2>
                <p className="text-gray-500 text-base">{"description"}</p>
                <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                    {"buttonText"}
                </button>
            </div>
            <img src={"/images/awLogo.png"} alt={"title"} className="object-cover object-center w-1/2" />
        </div>
    )
}

export default Option3;