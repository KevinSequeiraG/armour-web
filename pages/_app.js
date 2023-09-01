import '@/styles/globals.css'
import 'animate.css';
import { I18nextProvider } from 'react-i18next';
import { UserProvider } from '@/context/UserContext.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  return <UserProvider><I18nextProvider><ToastContainer /><Component {...pageProps} /></I18nextProvider></UserProvider>
}
