import React from 'react';
import { Form } from 'react-bootstrap';
import { FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { UserAuthFormValues } from 'ts/interfaces';

type Field = 'username' | 'email' | 'password';

interface ValidationErrorProps {
  errors: FieldErrors<UserAuthFormValues>;
  field: Field;
}

function ValidationError({ errors, field }: ValidationErrorProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });
  const language = localStorage.getItem('i18nextLng');

  return (
    <Form.Control.Feedback type="invalid" id={`${field}${language}`}>
      {errors[field]?.type &&
        errors[field]?.type !== 'pattern' &&
        `${t(`${errors[field]?.type}`, { value: t(field) })}`}
      {field === 'email' && errors[field]?.type === 'pattern' && `${t('patternEmail')}`}
    </Form.Control.Feedback>
  );
}

export default ValidationError;
