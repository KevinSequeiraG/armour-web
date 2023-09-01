import Header from "@/components/Header.js";
import Navbar from "@/components/Navbar";

const Home = () => {
    return (
        <div className="w-screen h-screen flex">
            <Navbar />
            <div className="w-full h-full">
                <Header />
            </div>
        </div>
    )
}

export default Home;