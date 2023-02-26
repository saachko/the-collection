import React, { memo } from 'react';
import { Form } from 'react-bootstrap';
import { FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ItemFormValues } from 'ts/interfaces';

interface ValidationErrorProps {
  errors: FieldErrors<ItemFormValues>;
}

function ValidationError({ errors }: ValidationErrorProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'items' });

  return (
    <Form.Control.Feedback type="invalid">
      {errors.itemName?.type === 'required' && `${t('required')}`}
      {errors.itemName?.type === 'maxLength' && `${t('maxLength')}`}
    </Form.Control.Feedback>
  );
}

export default memo(ValidationError);
