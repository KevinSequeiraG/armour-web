import Navbar from '@/components/webpageUser/Navbar';
import WebpageView from '@/components/webpageUser/WebpageView';
import { GetWebpage } from '@/helpers/webpage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Webpage() {
    const router = useRouter();
    const { index } = router.query;
    const [webpageData, setWebpageData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    // El valor de slug será un array con las partes dinámicas de la URL (por ejemplo, ["ksg", "home"]).

    // Aquí puedes utilizar el valor de slug para cargar la página deseada desde Firebase o tu base de datos.

    useEffect(() => {
        if (index) {
            GetWebpage(index).then((data) => {
                setWebpageData(data);
            })
        }
    }, [index])

    return (
        <>
            {webpageData ? <div className={`!overflow-hidden w-screen mx-3 h-screen ml-0 !my-auto shadow-md bg-white relative`}>
                <Navbar setCurrentPage={setCurrentPage} webpageData={webpageData}>
                    <WebpageView webPageData={webpageData} currentPage={currentPage} />
                    {/* <div className='w-full h-full object-cover overflow-y-auto scrollbarDesign'><h1 className='my-0'>Mostrando la página: {slug && slug[1]} del sitio {slug && slug[0]}</h1>
                        <h1>{webpageData?.name}</h1>
                    </div> */}
                </Navbar>
            </div> : <div>Cargando...</div>}
        </>
    );
}

export default Webpage;
