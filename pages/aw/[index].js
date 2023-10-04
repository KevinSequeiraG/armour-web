

import { GetWebpage } from "@/helpers/webpage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function AW() {
    const router = useRouter();
    const [webpageName, setWebpageName] = useState()

    useEffect(() => {
        console.log()
        var webpageName = router.asPath.split("/")
        setWebpageName(webpageName[2])
    }, [router])

    useEffect(() => {
        if (webpageName) {
            GetWebpage(webpageName)
        }
    }, [webpageName])



    return (
        <div>
            <h1>Página web: {webpageName}</h1>
            {/* Resto del contenido de la página */}
        </div>
    );
}

export default AW;