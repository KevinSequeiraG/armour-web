import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

function ImageUploader(props) {

  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);
  const [imageUrl, setImageUrl] = useState(props?.image || '');

  useEffect(() => {
    props?.image?.toString()?.includes("firebasestorage") && setImageUrl(props?.image);
  }, [props?.image])

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const imageLocalUrl = URL.createObjectURL(file);
        setImageUrl(imageLocalUrl);
        props.setImage(file);
      } else toast.error(t("errors.image-invalid"));

    }
  }

  function deleteImage(e) {
    e.preventDefault();
    e.stopPropagation();
    setImageUrl('');
    props.setImage('');
  }

  return (
    <div className={`relative overflow-hidden ${props?.divDesign}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <input type="file" accept="image/*" onChange={handleImageChange} className="absolute w-full h-full opacity-0 top-0 left-0 cursor-pointer z-50" />

      {imageUrl ? (

        <div className="w-full h-full relative">
          <img src={imageUrl} className='w-full h-full object-cover' alt="Preview" />

          <div className={`absolute top-0 left-0 w-full h-full flex justify-center items-center transition delay-75 duration-300 ${hovered ? 'opacity-100' : 'opacity-0'} bg-[#707070] bg-opacity-60 text-white font-bold space-x-3`}>
            <img src="/svgs/pen.svg" className='w-6 shadow' alt='Icon' />
            <img src="/svgs/deleteRed.svg" className='w-6 z-50 cursor-pointer shadow' alt='Icon' onClick={deleteImage} />
          </div>
        </div>

      ) : (

        <div className="w-full h-full relative">
          <div className={`absolute top-0 left-0 w-full h-full flex justify-center items-center transition delay-75 duration-300 ${hovered ? 'opacity-100' : 'opacity-0'} bg-[#707070] bg-opacity-60 text-white font-bold`}>
            <img src="/svgs/pen.svg" className='mr-1' alt='Icon' /> Agregar imagen
          </div>
        </div>

      )}
    </div>
  );
}

export default ImageUploader;
