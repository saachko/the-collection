import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import EmptyContainer from 'components/EmptyContainer/EmptyContainer';

import { useAppSelector } from 'hooks/useRedux';

import styles from '../ItemEditForm.module.scss';
import CustomFieldInput from './CustomFieldInput';

function CustomFieldsForm() {
  const { t } = useTranslation('translation', { keyPrefix: 'items' });
  const fieldsInCollection = useAppSelector((state) => state.item.customFieldsInItem);
  const customFieldsValues = useAppSelector((state) => state.item.customFieldsValues);

  return (
    <div className={styles.customFieldsContainer}>
      {fieldsInCollection && fieldsInCollection.length > 0 ? (
        <>
          <p>{t('prescription')}</p>
          {fieldsInCollection.map((field, index) => (
            <div key={field._id}>
              <CustomFieldInput
                field={field}
                fieldIndex={index}
                fieldsValues={customFieldsValues}
              />
            </div>
          ))}
        </>
      ) : (
        <EmptyContainer title={t('noFields')} text="" />
      )}
    </div>
  );
}

export default memo(CustomFieldsForm);
