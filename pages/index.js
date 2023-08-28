import { Inter } from 'next/font/google'
import { useTranslation } from 'react-i18next';
import { database } from '../lib/firebaseConfig';
import { addDoc, collection} from 'firebase/firestore';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleCreate = async () => {
    try {
      // let badgeToDelete = doc(database, `badges/data`);
      const badgeRef = collection(database, `event+/badges/data`);

        await addDoc(badgeRef, {
            eventId: "",
            eventUid: "",
            type: "label",
        })
    } catch (error) {
      console.error('Error al crear el documento:', error);
    }
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

        <button onClick={handleCreate}>Prueba de Firebase</button>
      </div>
    </main>
  )
}
