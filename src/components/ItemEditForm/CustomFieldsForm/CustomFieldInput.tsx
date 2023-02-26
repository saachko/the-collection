import React, { memo } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { setCustomFieldsValues } from 'redux/slices/itemSlice';

import MarkdownTextarea from 'components/MarkdownTextarea/MarkdownTextarea';

import { useAppDispatch } from 'hooks/useRedux';

import { CustomField } from 'ts/interfaces';

interface CustomFieldProps {
  field: CustomField;
  fieldIndex: number;
  fieldsValues: string[];
}

function CustomFieldInput({ field, fieldIndex, fieldsValues }: CustomFieldProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'items' });
  const inputTypes = ['string', 'number', 'date'];
  const dispatch = useAppDispatch();

  const setFieldValue = (newValue: string) => {
    const newFieldsValues = fieldsValues.slice();
    newFieldsValues[fieldIndex] = newValue;
    dispatch(setCustomFieldsValues(newFieldsValues));
  };

  return (
    <Form.Group className="mb-3 form-group" controlId="collectionFormTitle">
      <Form.Label>{field.label}</Form.Label>
      {inputTypes.includes(field.type) && (
        <Form.Control
          type={field.type}
          onChange={({ target }) => {
            setFieldValue(target.value);
          }}
        />
      )}
      {field.type === 'text' && (
        <MarkdownTextarea value={fieldsValues[fieldIndex]} setValue={setFieldValue} />
      )}
      {field.type === 'checkbox' && (
        <div className="d-flex gap-2">
          <em className="me-2">{t('no')}</em>
          <Form.Check
            type="switch"
            id="defaultImage"
            onChange={({ target }) => setFieldValue(`${target.checked}`)}
          />
          <em>{t('yes')}</em>
        </div>
      )}
    </Form.Group>
  );
}

export default memo(CustomFieldInput);
