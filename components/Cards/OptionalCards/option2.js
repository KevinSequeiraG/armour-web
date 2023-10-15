const Option2 = () => {
    return (
        <div className="h-auto w-[20rem] flex mx-auto bg-white rounded-xl shadow-md overflow-hidden flex">
            {/* <div className="md:flex-shrink-0 w-1/2"> */}
                <img src={'/images/awLogo.png'} alt={"title"} className="object-cover object-center w-1/2" />
            {/* </div> */}
            <div className="p-8 full w-1/2">
                <h2 className="text-xl font-semibold">{"title"}</h2>
                <p className="text-gray-500 text-base">{"description adsfasdsa fdfas fasdfasd fasdfasdfasd asdf"}</p>
                <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                    {"buttonText"}
                </button>
            </div>
        </div>
    )
}

export default Option2;