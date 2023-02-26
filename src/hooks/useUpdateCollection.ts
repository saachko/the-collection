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
import { useAppDispatch, useAppSelector } from './useRedux';
import useUpdateCustomFields from './useUpdateCustomFields';

const useUpdateCollection = (setUpdateErrorShown: SetState<boolean>) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedCollection = useAppSelector(
    (state) => state.collection.selectedCollection
  );
  const [customFields, setCustomFields] = useState<CustomFieldFormValuesWithId[]>([]);
  const { fieldsInCollection, isLoadingFields, startFieldsIds } =
    useCustomFieldsInCollection(selectedCollection?._id, setCustomFields);

  const {
    deleteUnnecessaryFields,
    createNewCustomFields,
    updateFields,
    isLoadingCustomFieldUpdate,
    isErrorCustomField,
  } = useUpdateCustomFields(fieldsInCollection, customFields, selectedCollection);

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
    if (selectedCollection) {
      const updatedCollectionBody: Collection = {
        ...selectedCollection,
        title: formValues.title,
        theme: formValues.theme || 'other',
        image: formValues.image || selectedCollection.image,
        description: formValues.description || '*(No description provided)*',
      };
      await updateCollectionById({
        collectionId: selectedCollection._id,
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

  return {
    customFields,
    setCustomFields,
    submitUpdate,
    isLoadingUpdate,
    startFieldsIds,
    selectedCollection,
  };
};

export default useUpdateCollection;
