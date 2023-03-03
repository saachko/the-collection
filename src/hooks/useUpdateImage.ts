import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import storage from 'utils/firebase';

const useUpdateImage = (path: string) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isImageLoading, setImageLoading] = useState(false);
  const [isDefaultImage, setDefaultImage] = useState(false);

  const changeImage = (file: File) => {
    setImage(file);
  };

  const uploadImage = () => {
    if (image) {
      const avatarRef = ref(storage, `${path}/${image.name + v4()}`);
      uploadBytes(avatarRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrl(url);
          setImageLoading(false);
        });
      });
    }
  };

  useEffect(() => {
    if (image) {
      setImageLoading(true);
      uploadImage();
    }
  }, [image]);

  return {
    image,
    imageUrl,
    changeImage,
    isDefaultImage,
    setDefaultImage,
    isImageLoading,
  };
};

export default useUpdateImage;
