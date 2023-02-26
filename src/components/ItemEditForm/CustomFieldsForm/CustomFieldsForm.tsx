import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useLazyGetCustomFieldsByCollectionIdQuery } from 'redux/api/customFieldApiSlice';
import { setCustomFieldsInItem, setCustomFieldsValues } from 'redux/slices/itemSlice';

import EmptyContainer from 'components/EmptyContainer/EmptyContainer';
import Loader from 'components/Loader/Loader';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import styles from '../ItemEditForm.module.scss';
import CustomFieldInput from './CustomFieldInput';

interface CustomFieldsFormProps {
  collectionId: string | undefined;
}

function CustomFieldsForm({ collectionId }: CustomFieldsFormProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'items' });
  const customFieldsValues = useAppSelector((state) => state.item.customFieldsValues);
  const dispatch = useAppDispatch();
  const [
    getCustomFields,
    { data: customFields, isSuccess: isSuccessGetFields, isLoading: isFieldsLoading },
  ] = useLazyGetCustomFieldsByCollectionIdQuery();

  useEffect(() => {
    if (collectionId) {
      (async () => {
        await getCustomFields(collectionId);
      })();
    }
  }, [collectionId]);

  useEffect(() => {
    if (isSuccessGetFields && customFields) {
      dispatch(setCustomFieldsInItem(customFields));
      const defaultFieldsValues = new Array(customFields.length).fill('⎯');
      dispatch(setCustomFieldsValues(defaultFieldsValues));
    }
  }, [isSuccessGetFields]);

  return (
    <div className={styles.customFieldsContainer}>
      {customFields && customFields.length > 0 ? (
        <>
          {isFieldsLoading && <Loader />}
          <p>{t('prescription')}</p>
          {customFields.map((field, index) => (
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
