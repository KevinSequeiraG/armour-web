import { useTranslation } from "react-i18next";
import WebPageCard from "../../components/Cards/webPageCard";
import { useRouter } from "next/router";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { GetWebpagesByCreatedBy } from "@/helpers/webpage";
import { UserContext } from "@/context/UserContext";
import { RiAddCircleLine } from "react-icons/ri";
import { downloadTableData } from "@/helpers/reports";

const Home = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [webpageData, setWebpageData] = useState([]);
    const { loggedUser } = useContext(UserContext);
    const [searchInputFilter, setSearchInputFilter] = useState("");

    useEffect(() => {
        window.localStorage.removeItem("pageToEdit")
        window.localStorage.removeItem("webpageName")
        if (loggedUser) {
            GetWebpagesByCreatedBy(loggedUser?.uid).then((data) => {
                console.log(data)
                setWebpageData(data)
            })
        }

    }, [loggedUser])

    const refreshData = async () => {
        await GetWebpagesByCreatedBy(loggedUser?.uid).then((data) => {
            setWebpageData(data)
        })
    }

    return (
        <div className="bg-main">
            <Head>
                <title>{t("navbar.home")} | ArmourWeb</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/images/awLogo-nobg.png" />
            </Head>
            {/* <button onClick={()=>{downloadTableData("categories")}}>asdfasdfasdf</button> */}
            <div className="w-full px-4 py-7 bg-transparent">
                <div className="flex justify-between">
                    <div>
                        <p className="font-semibold mb-2 text-center text-2xl">{t("home.my-pages")}</p>
                        <div className="relative">
                            <input
                                type="text"
                                className="border-2 border-gray-300 bg-white w-[18rem] h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
                                placeholder={t("search.search-page")}
                                onChange={(e) => { setSearchInputFilter(e.target.value) }}
                            />
                            <button type="submit" className="absolute right-0 top-0 mt-3.5 mr-4">
                                <img src="./svgs/search.svg" className="w-[1rem] h-[1rem]" alt="rar" />
                            </button>
                        </div>
                    </div>
                    <button className="hover:bg-[#a39869] hover:text-gray-100 hover:border-gray-100 bg-[#EFE1A2] text-[#212429] px-4 py-2 rounded-[10px] border border-1 border-[#212429] font-bold h-min flex items-center shadow-md" onClick={() => router.push('/managePageBuilder')}><RiAddCircleLine className="mr-1 w-5 h-5" />{t("buttons.create-page")}</button>
                </div>
            </div>
            <div className="grid grid-cols-1 mdx800:grid-cols-2 mdx1100:grid-cols-3 mdx1400:grid-cols-4 mdx1900:grid-cols-5 justify-items-center overflow-y-auto h-[calc(100vh-13.5rem)] scrollbar gap-x-5 mx-auto mb-4 px-4">
                {webpageData?.filter(data => {
                    const normalizeNames = data?.name?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    const normalizeSearchInput = searchInputFilter.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    return normalizeNames?.includes(normalizeSearchInput);
                }).map(((webpage, i) => {
                    return (
                        <WebPageCard key={i} webpageData={webpage} refreshData={refreshData} />
                    )
                }))}
                {webpageData?.length === 0 && <p className='p-8 text-center col-span-full text-2xl font-semibold'>{t("home.no-data")}</p>}
            </div>
        </div>
    )
}

export default Home;