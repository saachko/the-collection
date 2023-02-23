import { useEffect } from 'react';

import { useLazyGetCustomFieldsByCollectionIdQuery } from 'redux/api/customFieldApiSlice';

import { CustomFieldFormValuesWithId } from 'ts/interfaces';
import { SetState } from 'ts/types';

const useCustomFieldsInCollection = (
  collectionId: string | undefined,
  setCustomFields: SetState<CustomFieldFormValuesWithId[]>
) => {
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
      setCustomFields(fields);
    }
  }, [fieldsInCollection]);

  return { fieldsInCollection, isLoadingFields };
};

export default useCustomFieldsInCollection;
