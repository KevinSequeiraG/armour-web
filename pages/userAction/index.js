import ResetPasswordSection from "@/components/ResetPasswordSection";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UserAction = () => {
    const router = useRouter();
    const { mode, oobCode } = router.query;
    const [showResetPasswordSection, setShowResetPasswordSection] = useState(false);

    useEffect(() => {
        console.log(mode);
        if (mode == "resetPassword") {
            setShowResetPasswordSection(true);
        }
        if (mode == "verifyEmail") {

        }
    }, [mode, oobCode]);

    return (
        <div className="loginBody w-screen h-screen">
            {showResetPasswordSection && <ResetPasswordSection oob={oobCode} setShowResetPasswordSection={setShowResetPasswordSection} />}
        </div>
    )
}

export default UserAction;