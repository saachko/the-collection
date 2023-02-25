import React, { memo } from 'react';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import ReactSelect from 'react-select';
import { v4 } from 'uuid';

import EmptyContainer from 'components/EmptyContainer/EmptyContainer';

import { customFieldsTypes, selectStyles } from 'utils/constants';

import { Collection, CustomFieldFormValuesWithId, SelectOption } from 'ts/interfaces';
import { SetState } from 'ts/types';

import styles from './CustomFieldsForm.module.scss';

interface CustomFieldsFormProps {
  fields: CustomFieldFormValuesWithId[];
  setFields: SetState<CustomFieldFormValuesWithId[]>;
  selectedCollection: Collection | null;
  startFieldsIds: string[];
}

function CustomFieldsForm({
  fields,
  setFields,
  selectedCollection,
  startFieldsIds,
}: CustomFieldsFormProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'collections' });

  const defaultCustomField: CustomFieldFormValuesWithId = {
    id: v4(),
    type: '',
    label: '',
  };

  const customFieldTypesOptions: SelectOption[] = customFieldsTypes.map((type) => ({
    value: type,
    label: `${t(type)}`,
  }));

  const getValueFromOption = (value: string) =>
    value ? customFieldTypesOptions.find((option) => option.value === value) : '';

  const addField = () => {
    setFields((prev) => [...prev, defaultCustomField]);
  };

  const removeField = (fieldId: string) => {
    setFields((prev) => prev.filter((field) => field.id !== fieldId));
  };

  const updateField = (key: string, value: string, id: string) => {
    setFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, [key]: value } : field))
    );
  };
  return (
    <div className={styles.container}>
      <p className={styles.prescription}>{t('prescription')}</p>
      <div className="d-flex gap-3 align-items-center">
        <h4 className="mb-0">{t('customFields')}</h4>
        <OverlayTrigger placement="right" overlay={<Tooltip>{t('addField')}</Tooltip>}>
          <button type="button" className={styles.addFieldButton} onClick={addField}>
            <AiFillPlusCircle />
          </button>
        </OverlayTrigger>
      </div>
      <p className={styles.note}>
        {selectedCollection ? `${t('fieldsUpdateNote')}` : `${t('fieldsNote')}`}
      </p>
      <div className="mb-3">
        {fields.length > 0 ? (
          fields.map((field) => (
            <div className="d-flex gap-2 align-items-center" key={field.id}>
              <Form.Group
                className="mb-3 form-group w-75"
                controlId="collectionFormTitle"
              >
                <Form.Control
                  type="text"
                  placeholder={t('labelPlaceholder')}
                  value={field.label}
                  onChange={({ target }) => updateField('label', target.value, field.id)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3 form-group w-25"
                controlId="collectionFormTheme"
              >
                <ReactSelect
                  options={customFieldTypesOptions}
                  placeholder={t('typePlaceholder')}
                  onChange={(newValue) =>
                    updateField('type', (newValue as SelectOption).value, field.id)
                  }
                  value={getValueFromOption(field.type)}
                  styles={selectStyles}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  isDisabled={!!selectedCollection && startFieldsIds.includes(field.id)}
                />
              </Form.Group>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>{t('removeField')}</Tooltip>}
              >
                <button
                  type="button"
                  className={styles.removeFieldButton}
                  onClick={() => removeField(field.id)}
                >
                  <AiFillMinusCircle />
                </button>
              </OverlayTrigger>
            </div>
          ))
        ) : (
          <EmptyContainer title={t('emptyTitle')} text={t('emptyText')} />
        )}
      </div>
    </div>
  );
}

export default memo(CustomFieldsForm);
