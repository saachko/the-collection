import React, { memo, useEffect } from 'react';
import { Button, ButtonToolbar, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useUpdateUserByIdMutation } from 'redux/api/userApiSlice';
import { setUser } from 'redux/slices/userSlice';

import ValidationError from 'components/ModalAuth/ValidationError';

import { emailValidation } from 'utils/constants';

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

  const dispatch = useAppDispatch();

  const [
    updateUserById,
    { data: updatedUser, isLoading: isUpdateUserLoading, isError: isUpdateUserError },
  ] = useUpdateUserByIdMutation();

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

  return (
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
      <ButtonToolbar className="justify-content-end gap-2 mt-5 mb-3">
        <Button className="secondary-button" onClick={() => setModalShown(false)}>
          {t('auth.cancelButton')}
        </Button>
        <Button className="primary-button" type="submit" disabled={isUpdateUserLoading}>
          {t('auth.submitButton')}
        </Button>
      </ButtonToolbar>
    </Form>
  );
}

export default memo(UpdateUserForm);
