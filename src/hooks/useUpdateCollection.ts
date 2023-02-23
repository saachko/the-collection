import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useUpdateCollectionByIdMutation } from 'redux/api/collectionApiSlice';
import { setSelectedCollection } from 'redux/slices/collectionSlice';

import {
  Collection,
  CollectionFormValues,
  CustomFieldFormValuesWithId,
} from 'ts/interfaces';
import { SetState } from 'ts/types';

import useCustomFieldsInCollection from './useGetCustomFieldsInCollection';
import { useAppDispatch } from './useRedux';
import useUpdateCustomFields from './useUpdateCustomFields';

const useUpdateCollection = (
  setUpdateErrorShown: SetState<boolean>,
  collection: Collection | null
) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [customFields, setCustomFields] = useState<CustomFieldFormValuesWithId[]>([]);
  const { fieldsInCollection, isLoadingFields, startFieldsIds } =
    useCustomFieldsInCollection(collection?._id, setCustomFields);

  const {
    deleteUnnecessaryFields,
    createNewCustomFields,
    updateFields,
    isLoadingCustomFieldUpdate,
    isErrorCustomField,
  } = useUpdateCustomFields(fieldsInCollection, customFields, collection);

  const [
    updateCollectionById,
    {
      data: updatedCollection,
      isLoading: isLoadingCollectionUpdate,
      isSuccess: isSuccessCollectionUpdate,
      isError: isErrorCollectionUpdate,
    },
  ] = useUpdateCollectionByIdMutation();

  const submitUpdate: SubmitHandler<CollectionFormValues> = async ({ ...formValues }) => {
    if (collection) {
      const updatedCollectionBody: Collection = {
        ...collection,
        title: formValues.title || '*(No description provided)*',
        theme: formValues.theme || 'other',
        image: formValues.image || collection.image,
        description: formValues.description,
      };
      await updateCollectionById({
        collectionId: collection._id,
        body: updatedCollectionBody,
      });
    }
  };

  useEffect(() => {
    if (updatedCollection && isSuccessCollectionUpdate) {
      deleteUnnecessaryFields();
      createNewCustomFields();
      updateFields();
      dispatch(setSelectedCollection(updatedCollection));
      navigate(-1);
    }
  }, [isSuccessCollectionUpdate]);

  useEffect(() => {
    if (isErrorCollectionUpdate || isErrorCustomField) {
      setUpdateErrorShown(true);
    }
  }, [isErrorCollectionUpdate, isErrorCustomField]);

  const isLoadingUpdate =
    isLoadingFields || isLoadingCollectionUpdate || isLoadingCustomFieldUpdate;

  return { customFields, setCustomFields, submitUpdate, isLoadingUpdate, startFieldsIds };
};

export default useUpdateCollection;
