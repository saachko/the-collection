import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { memo, useEffect, useState } from 'react';
import { Button, ButtonToolbar, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 } from 'uuid';

import { useUpdateUserByIdMutation } from 'redux/api/userApiSlice';
import { setUser } from 'redux/slices/userSlice';

import DragAndDropFileUploader from 'components/DragAndDropFileUploader/DragAndDropFileUploader';
import Loader from 'components/Loader/Loader';
import ValidationError from 'components/ModalAuth/ValidationError';

import { emailValidation, userAvatarBaseUrl } from 'utils/constants';
import storage from 'utils/firebase';
import { createUserAvatar } from 'utils/functions';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { UpdateUserFormValues, User } from 'ts/interfaces';
import { SetState } from 'ts/types';

interface UpdateUserFormProps {
  setModalShown: SetState<boolean>;
  setUpdateErrorShown: SetState<boolean>;
}

function UpdateUserForm({ setModalShown, setUpdateErrorShown }: UpdateUserFormProps) {
  const { user } = useAppSelector((state) => state.user);
  const { t } = useTranslation('translation');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [isAvatarLoading, setAvatarLoading] = useState(false);
  const [isDefaultAvatar, setDefaultAvatar] = useState(false);

  const defaultFormValues: UpdateUserFormValues = {
    username: user?.username || '',
    email: user?.email || '',
    avatar: '',
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    setFocus,
    formState: { errors },
    setValue,
  } = useForm<UpdateUserFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    setFocus('username');
  }, []);

  const changeAvatar = (file: File) => {
    setAvatar(file);
  };

  const dispatch = useAppDispatch();

  const [
    updateUserById,
    { data: updatedUser, isLoading: isUpdateUserLoading, isError: isUpdateUserError },
  ] = useUpdateUserByIdMutation();

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

  const submitUpdate: SubmitHandler<UpdateUserFormValues> = async ({ ...formValues }) => {
    if (user) {
      const updatedUserBody: User = {
        ...user,
        username: formValues.username,
        email: formValues.email,
        avatar: formValues.avatar || user.avatar,
      };
      await updateUserById({ id: user?._id, body: updatedUserBody });
    }
  };

  useEffect(() => {
    if (isUpdateUserError) {
      setUpdateErrorShown(true);
    }
  }, [isUpdateUserError]);

  useEffect(() => {
    if (updatedUser && !isUpdateUserError) {
      dispatch(setUser(updatedUser));
      setModalShown(false);
    }
  }, [updatedUser]);

  useEffect(() => {
    if (isDefaultAvatar) {
      setValue('avatar', createUserAvatar(user?.username, user?.email));
    } else {
      setValue('avatar', '');
    }
  }, [isDefaultAvatar]);

  return (
    <>
      {isAvatarLoading && <Loader />}
      <Form
        aria-label="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(submitUpdate)}
      >
        <Form.Group className="mb-3 form-group" controlId="updateUserFormUsername">
          <Form.Label>{t('auth.username')}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('auth.usernamePlaceholder')}
            {...register('username', {
              required: true,
              minLength: 2,
              maxLength: 50,
              onChange: () => errors && clearErrors('username'),
            })}
            disabled={isUpdateUserLoading}
          />
          {errors.username && <ValidationError errors={errors} field="username" />}
        </Form.Group>
        <Form.Group className="mb-3 form-group" controlId="updateUserFormEmail">
          <Form.Label>{t('auth.email')}</Form.Label>
          <Form.Control
            type="email"
            placeholder={t('auth.emailPlaceholder')}
            {...register('email', {
              required: true,
              minLength: 2,
              maxLength: 50,
              pattern: emailValidation,
              onChange: () => errors && clearErrors('email'),
            })}
            disabled={isUpdateUserLoading}
          />
          {errors.email && <ValidationError errors={errors} field="email" />}
        </Form.Group>
        <Form.Group className="mb-3 form-group" controlId="updateUserFormAvatar">
          <p className="mb-2">{t('profilePage.avatar')}</p>
          <DragAndDropFileUploader
            changeFile={changeAvatar}
            name="avatar"
            fileName={avatar?.name}
            caption={avatar ? 'profilePage.file' : 'profilePage.noFile'}
            isDisabled={isDefaultAvatar}
          />
        </Form.Group>
        {!user?.avatar.includes(userAvatarBaseUrl) && (
          <Form.Check
            type="switch"
            id="defaultAvatar"
            label={t('profilePage.defaultAvatar')}
            checked={isDefaultAvatar}
            onChange={() => setDefaultAvatar(!isDefaultAvatar)}
          />
        )}
        <ButtonToolbar className="justify-content-end gap-2 mt-4 mb-3">
          <Button className="secondary-button" onClick={() => setModalShown(false)}>
            {t('auth.cancelButton')}
          </Button>
          <Button className="primary-button" type="submit" disabled={isUpdateUserLoading}>
            {t('auth.submitButton')}
          </Button>
        </ButtonToolbar>
      </Form>
    </>
  );
}

export default memo(UpdateUserForm);
