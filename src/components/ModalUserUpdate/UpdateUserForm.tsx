import React, { memo, useEffect } from 'react';
import { Button, ButtonToolbar, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import DragAndDropFileUploader from 'components/DragAndDropFileUploader/DragAndDropFileUploader';
import Loader from 'components/Loader/Loader';
import ValidationError from 'components/ModalAuth/ValidationError';

import { emailValidation, userAvatarBaseUrl } from 'utils/constants';
import { createImage } from 'utils/functions';

import useUpdateImage from 'hooks/useUpdateImage';
import useUpdateUser from 'hooks/useUpdateUser';

import { UpdateUserFormValues, User } from 'ts/interfaces';
import { SetState } from 'ts/types';

interface UpdateUserFormProps {
  user: User | null;
  setModalShown: SetState<boolean>;
  setUpdateErrorShown: SetState<boolean>;
}

function UpdateUserForm({
  user,
  setModalShown,
  setUpdateErrorShown,
}: UpdateUserFormProps) {
  const { t } = useTranslation('translation');

  const { submitUpdate, isUpdateUserLoading } = useUpdateUser(
    user,
    setModalShown,
    setUpdateErrorShown
  );

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

  const {
    image: avatar,
    imageUrl: avatarUrl,
    changeImage: changeAvatar,
    isDefaultImage: isDefaultAvatar,
    setDefaultImage: setDefaultAvatar,
    isImageLoading: isAvatarLoading,
  } = useUpdateImage('usersAvatars');

  useEffect(() => {
    if (avatar && avatarUrl) {
      setValue('avatar', avatarUrl);
    }
  }, [avatar, avatarUrl]);

  useEffect(() => {
    if (isDefaultAvatar) {
      setValue('avatar', createImage('beam', user?.username, user?.email));
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
