import React, { memo } from 'react';
import { Form } from 'react-bootstrap';
import { FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CollectionFormValues } from 'ts/interfaces';

type Field = 'title' | 'description';

interface ValidationErrorProps {
  errors: FieldErrors<CollectionFormValues>;
  field: Field;
}

function ValidationError({ errors, field }: ValidationErrorProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'collections' });
  const language = localStorage.getItem('i18nextLng');

  return (
    <Form.Control.Feedback type="invalid" id={`${field}${language}`}>
      {errors[field]?.type === 'required' && `${t('required', { value: t(field) })}`}
      {errors[field]?.type === 'maxLength' &&
        `${t('maxLength', { value: t(field), count: field === 'title' ? 50 : 1000 })}`}
    </Form.Control.Feedback>
  );
}

export default memo(ValidationError);
