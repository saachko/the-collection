import React, { memo, useState } from 'react';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import ReactSelect from 'react-select';
import { v4 } from 'uuid';

import EmptyContainer from 'components/EmptyContainer/EmptyContainer';

import { customFieldsTypes, selectStyles } from 'utils/constants';

import { CustomFieldFormValues, SelectOption } from 'ts/interfaces';

import styles from './CustomFieldsForm.module.scss';

interface CustomFieldFormValuesWithId extends CustomFieldFormValues {
  id: string;
}

function CustomFieldsForm() {
  const { t } = useTranslation('translation', { keyPrefix: 'collections' });
  const [fields, setFields] = useState<CustomFieldFormValuesWithId[]>([]);

  const defaultCustomField: CustomFieldFormValuesWithId = {
    id: v4(),
    type: '',
    label: '',
  };

  const customFieldTypesOptions: SelectOption[] = customFieldsTypes.map((type) => ({
    value: type,
    label: `${t(type)}`,
  }));

  const addField = () => {
    setFields((prev) => [...prev, defaultCustomField]);
  };

  const removeField = (fieldId: string) => {
    setFields((prev) => prev.filter((field) => field.id !== fieldId));
  };

  return (
    <div className={styles.container}>
      <p className={styles.prescription}>{t('prescription')}</p>
      <div className="d-flex gap-3 align-items-center">
        <h4>{t('customFields')}</h4>
        <OverlayTrigger placement="right" overlay={<Tooltip>{t('addField')}</Tooltip>}>
          <button type="button" className={styles.addFieldButton} onClick={addField}>
            <AiFillPlusCircle />
          </button>
        </OverlayTrigger>
      </div>
      {fields.length > 0 ? (
        fields.map((field) => (
          <div className="d-flex gap-2 align-items-center" key={field.id}>
            <Form.Group className="mb-3 form-group w-75" controlId="collectionFormTitle">
              <Form.Control
                type="text"
                placeholder={t('labelPlaceholder')}
                // {...register('username', {
                //   required: true,
                //   minLength: 2,
                //   maxLength: 50,
                //   onChange: () => errors && clearErrors('username'),
                // })}
                // disabled={isUpdateUserLoading}
              />
              {/* {errors.username && <ValidationError errors={errors} field="username" />} */}
            </Form.Group>
            <Form.Group className="mb-3 form-group w-25" controlId="collectionFormTheme">
              {/* <Controller
      control={control}
      name="responsibleUser"
      render={({ field: { onChange, value } }) => ( */}
              <ReactSelect
                options={customFieldTypesOptions}
                placeholder={t('typePlaceholder')}
                // onChange={(newValue) => onChange((newValue as SelectOptions).value)}
                styles={selectStyles}
                className="react-select-container"
                classNamePrefix="react-select"
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
  );
}

export default memo(CustomFieldsForm);
