import WebPageCard from "../../components/Cards/webPageCard";

const Home = () => {
    return (
        <div className="">
            <div className="w-full px-4 my-7">
                <div className="flex justify-between">
                    <div className="relative">
                        <input
                            type="text"
                            className="border-2 border-gray-300 bg-white w-[18rem] h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
                            placeholder="Buscar página"
                        />
                        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                            <img src="./svgs/search.svg" className="w-[1rem] h-[1rem]" alt="rar"/>
                        </button>
                    </div>
                    <button className="hover:bg-[#a39869] hover:text-gray-100 hover:border-gray-100 bg-[#EFE1A2] text-[#212429] px-4 py-2 rounded-[.5rem] border border-1 border-[#212429] font-semibold">Crear página</button>
                </div>
            </div>
            <div className="grid grid-cols-5 mx-auto justify-items-center gap-4">
                <WebPageCard />
                <WebPageCard />
                <WebPageCard />
                <WebPageCard />
                <WebPageCard />
                <WebPageCard />
                <WebPageCard />
                <WebPageCard />
            </div>
        </div>
    )
}

export default Home;