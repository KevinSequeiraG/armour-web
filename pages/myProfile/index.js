import SocialNetworkCard from "@/components/Cards/socialNetworkCard";
import DeleteAccount from "@/components/Modals/DeleteAccount";
import { UserContext } from "@/context/UserContext";
import { getUserByUid } from "@/helpers/users";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const MyProfile = () => {
    const { t } = useTranslation();
    const { loggedUser } = useContext(UserContext);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userData, setUserData] = useState();

    useEffect(() => {
        if (loggedUser) {
            getUserByUid(loggedUser.uid).then(user => {
                setUserData(user)
            })
        }

    }, [loggedUser])


    return (
        <div className="bg-main h-[92vh] px-20 pt-10 pb-20 overflow-y-auto scrollbar">
            <Head>
                <title>{t("navbar.my-profile")} | ArmourWeb</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/images/awLogo-nobg.png" />
            </Head>
            <div className="flex items-center mx-auto italic rounded-[.5rem] border-2 border-black w-[20rem] h-[6rem] justify-center"><h1 className="m-0 font-bold text-[3rem] ">{t("navbar.my-profile")}</h1></div>
            {userData?.imageProfileUrl ? <img src={userData?.imageProfileUrl} className="mt-10 w-[12rem] h-[12rem] bg-gray-800 rounded-full mx-auto object-cover shadow-md" alt="Image" />
                : <div className="mt-10 w-[12rem] h-[12rem] bg-gray-800 rounded-full mx-auto"></div>}
            <div>
                <Link href={"/editProfile"}><div className="mx-auto cursor-pointer relative flex items-center justify-center w-[8rem] bg-black hover:bg-gray-700 text-[1.4rem] text-center mt-3 py-2 px-4 rounded-xl text-gray-200"><p className="">{t("buttons.edit")}</p><img className="w-[1rem] ml-2" src="./svgs/edit.svg" /></div></Link>
                <div onClick={() => { setShowDeleteModal(true) }} className="mx-auto cursor-pointer relative flex items-center justify-center w-[14rem] bg-red-900 hover:bg-red-700 text-[1.4rem] text-center mt-3 py-2 px-4 rounded-xl text-gray-100"><p className="">{t("buttons.delete-account")}</p><img className="w-[1rem] ml-2" src="./svgs/delete.svg" /></div>
            </div>
            <div className="w-[35%] mx-auto mt-10">
                <p className="text-[1.8rem] font-bold mb-1">{t("user-data.basic-info")}</p>
                <hr className='border border-[#224553] mb-5' />
                <div className="flex items-center justify-between my-2">
                    <p className="text-[1.5rem] font-semibold">{t("user-data.name")}:</p>
                    <p className="text-[1.5rem] font-semibold">{userData?.name ? userData?.name.replace(/(^\w{1})|(\s+\w{1})/g, (letra) => letra.toUpperCase()) : t("user-data.undefined")}</p>
                </div>
                <div className="flex items-center justify-between my-2">
                    <p className="text-[1.5rem] font-semibold">{t("user-data.lastname")}:</p>
                    <p className="text-[1.5rem] font-semibold">{userData?.lastname ? userData?.lastname.replace(/(^\w{1})|(\s+\w{1})/g, (letra) => letra.toUpperCase()) : t("user-data.undefined")}</p>
                </div>
                <div className="flex items-center justify-between my-2">
                    <p className="text-[1.5rem] font-semibold">{t("user-data.phone")}:</p>
                    <p className="text-[1.5rem] font-semibold">{userData?.phone ? userData?.phone : t("user-data.undefined")}</p>
                </div>
                <div className="flex items-center justify-between my-2">
                    <p className="text-[1.5rem] font-semibold">{t("user-data.id")}:</p>
                    <p className="text-[1.5rem] font-semibold">{userData?.identification ? userData?.identification : t("user-data.undefined")}</p>
                </div>
                <p className="text-[1.8rem] font-bold mt-12 mb-1">{t("user-data.social-network")}</p>
                <hr className='border border-[#224553] mb-5' />
                <SocialNetworkCard type="fb" data={userData?.fb} />
                <SocialNetworkCard type="twitter" data={userData?.twitter}/>
                <SocialNetworkCard type="linkedIn" data={userData?.linkedin}/>
                <SocialNetworkCard type="web" data={userData?.webpage}/>
            </div>
            <DeleteAccount setShowDeleteModal={setShowDeleteModal} isOpen={showDeleteModal} />
        </div>
    )
}

export default MyProfile;