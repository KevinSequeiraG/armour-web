import { useRouter } from "next/router";

const Header = () => {
    const router = useRouter();
    const isLoginPage = router.pathname.includes("login");

    return (
        <>
            {isLoginPage ? null : <div className="bg-[#212429] h-[5rem] flex justify-end items-center">
                <p className="mr-4 text-[#EFE1A2]">Kevin Sequeira</p>
                <div className="rounded-full w-[4rem] mr-4 h-[4rem] bg-[#EFE1A2]"></div>
            </div>}
        </>
    )
}

export default Header;