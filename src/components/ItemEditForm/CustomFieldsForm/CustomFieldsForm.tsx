import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import EmptyContainer from 'components/EmptyContainer/EmptyContainer';
import Loader from 'components/Loader/Loader';

import useGetCustomFieldsInCollection from 'hooks/useGetCustomFieldsInCollection';
import { useAppSelector } from 'hooks/useRedux';

import styles from '../ItemEditForm.module.scss';
import CustomFieldInput from './CustomFieldInput';

interface CustomFieldsFormProps {
  collectionId: string | undefined;
}

function CustomFieldsForm({ collectionId }: CustomFieldsFormProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'items' });
  const customFieldsValues = useAppSelector((state) => state.item.customFieldsValues);
  const { fieldsInCollection, isLoadingFields } =
    useGetCustomFieldsInCollection(collectionId);

  return (
    <div className={styles.customFieldsContainer}>
      {fieldsInCollection && fieldsInCollection.length > 0 ? (
        <>
          {isLoadingFields && <Loader />}
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
