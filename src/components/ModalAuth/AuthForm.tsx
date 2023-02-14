import React, { useEffect } from 'react';
import { Button, ButtonToolbar, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { closeModal } from 'redux/slices/modalAuthSlice';

import { defaultUserFormValues, emailValidation } from 'utils/constants';

import useAuth from 'hooks/useAuth';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { UserAuthFormValues } from 'ts/interfaces';

import ValidationError from './ValidationError';

function AuthForm() {
  const { id } = useAppSelector((state) => state.authModal);
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { onSignUp, onSignIn, isLoadingAuth } = useAuth();
  const {
    register,
    handleSubmit,
    clearErrors,
    setFocus,
    formState: { errors },
    reset,
  } = useForm<UserAuthFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: defaultUserFormValues,
  });

  useEffect(() => {
    if (id === 'signUp') {
      setFocus('username');
    } else {
      setFocus('email');
    }
  }, []);

  const submitForm: SubmitHandler<UserAuthFormValues> = async ({ ...formValues }) => {
    if (id === 'signUp') {
      await onSignUp(formValues);
    } else {
      await onSignIn(formValues);
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
        <Form.Group className="mb-3 form-group" controlId={`${id}formUsername`}>
          <Form.Label>{t('username')}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('usernamePlaceholder')}
            {...register('username', {
              required: true,
              minLength: 2,
              maxLength: 50,
              onChange: () => errors && clearErrors('username'),
            })}
            disabled={isLoadingAuth}
          />
          {errors.username && <ValidationError errors={errors} field="username" />}
        </Form.Group>
      )}
      <Form.Group className="mb-3 form-group" controlId={`${id}formEmail`}>
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
          disabled={isLoadingAuth}
        />
        {errors.email && <ValidationError errors={errors} field="email" />}
      </Form.Group>
      <Form.Group className="mb-3 form-group" controlId={`${id}formPassword`}>
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
          disabled={isLoadingAuth}
        />
        {errors.password && <ValidationError errors={errors} field="password" />}
      </Form.Group>
      <ButtonToolbar className="justify-content-end gap-2 mt-5 mb-3">
        <Button className="secondary-button" onClick={() => dispatch(closeModal())}>
          {t('cancelButton')}
        </Button>
        <Button className="primary-button" type="submit" disabled={isLoadingAuth}>
          {t('submitButton')}
        </Button>
      </ButtonToolbar>
    </Form>
  );
}

export default AuthForm;
