import '@/styles/globals.css'
import '@/styles/buttons.scss'
import 'animate.css';
import { I18nextProvider } from 'react-i18next';
import { UserProvider } from '@/context/UserContext.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header/index.js';
import i18n from '../i18n.js'; //NO BORRAR

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <I18nextProvider>
        <ToastContainer />
        <div className="w-screen h-screen flex overflow-hidden">
          <Navbar />
          <div className="w-full h-full">
            <Header />
            <Component {...pageProps} />
          </div>
        </div>
      </I18nextProvider>
    </UserProvider>
  )
}
