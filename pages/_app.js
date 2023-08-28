import '@/styles/globals.css'
import { I18nextProvider } from 'react-i18next';

export default function App({ Component, pageProps }) {
  return (
    <I18nextProvider>
      <Component {...pageProps} />
    </I18nextProvider>
  )
}
