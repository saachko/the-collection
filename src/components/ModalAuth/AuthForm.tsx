import React from 'react';
import { Button, ButtonToolbar, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { closeModal } from 'redux/slices/modalAuthSlice';

import { emailValidation } from 'utils/constants';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

function AuthForm() {
  const { id } = useAppSelector((state) => state.authModal);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  return (
    <Form>
      {id === 'signUp' && (
        <Form.Group className="mb-3" controlId={`${id}formUsername`}>
          <Form.Label>{t('username')}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('usernamePlaceholder')}
            name="username"
            required
          />
        </Form.Group>
      )}
      <Form.Group className="mb-3" controlId={`${id}formEmail`}>
        <Form.Label>{t('email')}</Form.Label>
        <Form.Control
          type="email"
          placeholder={t('emailPlaceholder')}
          name="email"
          required
          pattern={emailValidation}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId={`${id}formPassword`}>
        <Form.Label>{t('password')}</Form.Label>
        <Form.Control
          type="password"
          placeholder={t('password')}
          name="password"
          required
        />
      </Form.Group>
      <ButtonToolbar className="justify-content-end gap-2 mt-4 mb-3">
        <Button className="secondary-button" onClick={() => dispatch(closeModal())}>
          {t('cancelButton')}
        </Button>
        <Button className="primary-button" type="submit">
          {t('submitButton')}
        </Button>
      </ButtonToolbar>
    </Form>
  );
}

export default AuthForm;
