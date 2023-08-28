import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useTranslation } from 'react-i18next';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      ARMOUR WEB

      <h1>{t('welcome')}</h1>
      <p>{t('greeting', { name: 'Eri' })}</p>

      <div>
        <button className='mr-4 py-2 px-4 bg-gray-200 text-black font-bold rounded-xl hover:bg-gray-400' onClick={() => changeLanguage('en')}>English</button>
        <button className='mr-4 py-2 px-4 bg-gray-200 text-black font-bold rounded-xl hover:bg-gray-400' onClick={() => changeLanguage('es')}>Español</button>
      </div>
    </main>
  )
}
