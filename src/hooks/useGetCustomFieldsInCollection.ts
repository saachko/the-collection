import { useEffect, useState } from 'react';

import { useLazyGetCustomFieldsByCollectionIdQuery } from 'redux/api/customFieldApiSlice';
import { setCustomFieldsInItem, setCustomFieldsValues } from 'redux/slices/itemSlice';

import { CustomFieldFormValuesWithId } from 'ts/interfaces';
import { SetState } from 'ts/types';

import { useAppDispatch } from './useRedux';

const useCustomFieldsInCollection = (
  collectionId: string | undefined,
  setCustomFields?: SetState<CustomFieldFormValuesWithId[]>
) => {
  const [startFieldsIds, setStartFieldsIds] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const [
    getFields,
    {
      data: fieldsInCollection,
      isLoading: isLoadingFields,
      isSuccess: isSuccessGetFields,
    },
  ] = useLazyGetCustomFieldsByCollectionIdQuery();

  useEffect(() => {
    if (collectionId) {
      (async () => {
        await getFields(collectionId);
      })();
    }
  }, [collectionId]);

  useEffect(() => {
    if (fieldsInCollection && isSuccessGetFields) {
      const fields = fieldsInCollection.map((field) => ({
        id: field._id,
        type: field.type,
        label: field.label,
      }));
      if (setCustomFields) setCustomFields(fields);
      const ids = fieldsInCollection.map((field) => field._id);
      setStartFieldsIds(ids);
      dispatch(setCustomFieldsInItem(fieldsInCollection));
      const defaultFieldsValues = new Array(fieldsInCollection.length).fill('');
      dispatch(setCustomFieldsValues(defaultFieldsValues));
    }
  }, [fieldsInCollection]);

  return { fieldsInCollection, isLoadingFields, startFieldsIds };
};

export default useCustomFieldsInCollection;
