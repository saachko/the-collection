import React from 'react';
import { Button, ButtonToolbar, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { closeModal } from 'redux/slices/modalAuthSlice';

import { defaultUserFormValues, emailValidation } from 'utils/constants';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { UserAuthFormValues } from 'ts/interfaces';

function AuthForm() {
  const { id } = useAppSelector((state) => state.authModal);
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const user = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm<UserAuthFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: defaultUserFormValues,
  });
  const isFormValid = Object.values(errors).every((error) => !error?.message);

  const submitForm = () => {
    if (id === 'signUp') {
      console.log('sign up');
    } else {
      console.log('sign in');
    }
    reset();
    dispatch(closeModal());
    navigate('/profile');
  };

  return (
    <Form
      aria-label="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(submitForm)}
    >
      {id === 'signUp' && (
        <Form.Group className="mb-3" controlId={`${id}formUsername`}>
          <Form.Label>{t('username')}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('usernamePlaceholder')}
            {...register('username', {
              required: true,
              minLength: 2,
              maxLength: 30,
              onChange: () => errors && clearErrors('username'),
            })}
            // disabled={isLoadingAuth}
          />
        </Form.Group>
      )}
      <Form.Group className="mb-3" controlId={`${id}formEmail`}>
        <Form.Label>{t('email')}</Form.Label>
        <Form.Control
          type="email"
          placeholder={t('emailPlaceholder')}
          {...register('email', {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: emailValidation,
            onChange: () => errors && clearErrors('email'),
          })}
          // disabled={isLoadingAuth}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId={`${id}formPassword`}>
        <Form.Label>{t('password')}</Form.Label>
        <Form.Control
          type="password"
          placeholder={t('password')}
          {...register('password', {
            required: true,
            minLength: 2,
            maxLength: 50,
            onChange: () => errors && clearErrors('password'),
          })}
          // disabled={isLoadingAuth}
        />
      </Form.Group>
      <ButtonToolbar className="justify-content-end gap-2 mt-4 mb-3">
        <Button className="secondary-button" onClick={() => dispatch(closeModal())}>
          {t('cancelButton')}
        </Button>
        <Button
          className="primary-button"
          type="submit"
          disabled={!isFormValid}
          // disabled={isLoadingAuth || !isFormValid}
        >
          {t('submitButton')}
        </Button>
      </ButtonToolbar>
    </Form>
  );
}

export default AuthForm;
