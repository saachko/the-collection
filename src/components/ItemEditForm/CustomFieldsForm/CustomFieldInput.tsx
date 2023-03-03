import React, { memo, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { setCustomFieldsValues } from 'redux/slices/itemSlice';

import MarkdownTextarea from 'components/MarkdownTextarea/MarkdownTextarea';

import { defaultInputTypes } from 'utils/constants';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { CustomField } from 'ts/interfaces';

interface CustomFieldProps {
  field: CustomField;
  fieldIndex: number;
  fieldsValues: string[];
}

function CustomFieldInput({ field, fieldIndex, fieldsValues }: CustomFieldProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'items' });
  const [inputValue, setInputValue] = useState(fieldsValues[fieldIndex] || '');
  const customFieldsValues = useAppSelector((state) => state.item.customFieldsValues);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const newFieldsValues = customFieldsValues.slice();
    newFieldsValues[fieldIndex] = inputValue;
    dispatch(setCustomFieldsValues(newFieldsValues));
  }, [inputValue]);

  return (
    <Form.Group className="mb-3 form-group" controlId="collectionFormTitle">
      <Form.Label>
        {field.label} ({t(field.type)})
      </Form.Label>
      {defaultInputTypes.includes(field.type) && (
        <Form.Control
          value={inputValue}
          type={field.type}
          onChange={({ target }) => setInputValue(target.value)}
        />
      )}
      {field.type === 'text' && (
        <MarkdownTextarea value={inputValue} setValue={setInputValue} />
      )}
      {field.type === 'checkbox' && (
        <div className="d-flex gap-2">
          <em className="me-2">{t('no')}</em>
          <Form.Check
            type="switch"
            id="defaultImage"
            onChange={({ target }) => setInputValue(`${target.checked}`)}
            value={inputValue}
            defaultChecked={inputValue === 'true'}
          />
          <em>{t('yes')}</em>
        </div>
      )}
    </Form.Group>
  );
}

export default memo(CustomFieldInput);
