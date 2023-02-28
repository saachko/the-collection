import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import EmptyContainer from 'components/EmptyContainer/EmptyContainer';
import Loader from 'components/Loader/Loader';

import useGetCustomFieldsInCollection from 'hooks/useGetCustomFieldsInCollection';

import styles from '../ItemEditForm.module.scss';
import CustomFieldInput from './CustomFieldInput';

interface CustomFieldsFormProps {
  collectionId: string | undefined;
}

function CustomFieldsForm({ collectionId }: CustomFieldsFormProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'items' });
  const { fieldsInCollection, isLoadingFields, itemFieldsValues } =
    useGetCustomFieldsInCollection(collectionId);

  return (
    <div className={styles.customFieldsContainer}>
      {isLoadingFields && <Loader />}
      {fieldsInCollection && fieldsInCollection.length > 0 ? (
        <>
          <p>{t('prescription')}</p>
          {fieldsInCollection.map((field, index) => (
            <div key={field._id}>
              <CustomFieldInput
                field={field}
                fieldIndex={index}
                fieldsValues={itemFieldsValues}
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
