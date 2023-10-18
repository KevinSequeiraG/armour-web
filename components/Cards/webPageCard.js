import Link from "next/link";
import { useRouter } from "next/router";

const WebPageCard = (props) => {
    const router = useRouter()

    const handleEditPage = () => {
        window.localStorage.setItem("pageToEdit", JSON.stringify(props.webpageData));
        router.push("managePageBuilder");
    }

    return (
        <div className="w-[18rem] h-[24rem] bg-webPage-card border border-7 border-black rounded-[1.5rem] m-4 text-center py-4">
            <img src={props.webpageData?.logo ? props.webpageData?.logo : "./images/awLogo-nobg.png"} className="rounded-full w-[8rem] h-[8rem] mx-auto" />
            <p className="text-white font-bold italic mt-4">{props.webpageData?.name ? props.webpageData.name : "Nombre de la web"}</p>
            <div className="flex flex-col mt-6">
                <button onClick={handleEditPage} className="hover:bg-gray-800 text-white italic bg-black w-[10rem] mx-auto px-4 py-2 rounded-md my-1 border border-1 border-white">Editar web</button>
                <Link href={{
                    pathname: "/editProducts",
                    query: { webpageNameByRouter: props.webpageData?.name },
                }} as={"/editProducts"}><button className="hover:bg-gray-800 text-white italic bg-black w-[10rem] mx-auto px-4 py-2 rounded-md my-1 border border-1 border-white">Editar productos</button></Link>
                <Link href={{
                    pathname: "/editCategories",
                    query: { webpageNameByRouter: props.webpageData?.name },
                }}
                    as={"/editCategories"}><button className="hover:bg-gray-800 text-white italic bg-black w-[10rem] mx-auto px-4 py-2 rounded-md my-1 border border-1 border-white">Editar categorías</button></Link>
            </div>
        </div>
    )
}

export default WebPageCard;