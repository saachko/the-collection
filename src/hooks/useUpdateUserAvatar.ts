import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { v4 } from 'uuid';

import storage from 'utils/firebase';
import { createUserAvatar } from 'utils/functions';

import { UpdateUserFormValues, User } from 'ts/interfaces';

const useUpdateUserAvatar = (
  user: User | null,
  setValue: UseFormSetValue<UpdateUserFormValues>
) => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [isAvatarLoading, setAvatarLoading] = useState(false);
  const [isDefaultAvatar, setDefaultAvatar] = useState(false);

  const changeAvatar = (file: File) => {
    setAvatar(file);
  };

  const uploadAvatar = () => {
    if (avatar) {
      const avatarRef = ref(storage, `usersAvatars/${avatar.name + v4()}`);
      uploadBytes(avatarRef, avatar).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setValue('avatar', url);
          setAvatarLoading(false);
        });
      });
    }
  };

  useEffect(() => {
    if (avatar) {
      setAvatarLoading(true);
      uploadAvatar();
    }
  }, [avatar]);

  useEffect(() => {
    if (isDefaultAvatar) {
      setValue('avatar', createUserAvatar(user?.username, user?.email));
    } else {
      setValue('avatar', '');
    }
  }, [isDefaultAvatar]);

  return { avatar, changeAvatar, isDefaultAvatar, setDefaultAvatar, isAvatarLoading };
};

export default useUpdateUserAvatar;
