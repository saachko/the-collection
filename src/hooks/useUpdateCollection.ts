import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useUpdateCollectionByIdMutation } from 'redux/api/collectionApiSlice';
import {
  useCreateCustomFieldMutation,
  useDeleteCustomFieldByIdMutation,
  useUpdateCustomFieldByIdMutation,
} from 'redux/api/customFieldApiSlice';
import { setSelectedCollection } from 'redux/slices/collectionSlice';

import {
  Collection,
  CollectionFormValues,
  CustomFieldFormValuesWithId,
  CustomFieldRequestBody,
} from 'ts/interfaces';
import { SetState } from 'ts/types';

import useCustomFieldsInCollection from './useGetCustomFieldsInCollection';
import { useAppDispatch } from './useRedux';

const useUpdateCollection = (
  setUpdateErrorShown: SetState<boolean>,
  collection: Collection | null
) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [customFields, setCustomFields] = useState<CustomFieldFormValuesWithId[]>([]);
  const { fieldsInCollection, isLoadingFields } = useCustomFieldsInCollection(
    collection?._id,
    setCustomFields
  );

  const [
    updateCollectionById,
    {
      data: updatedCollection,
      isLoading: isLoadingCollectionUpdate,
      isSuccess: isSuccessCollectionUpdate,
      isError: isErrorCollectionUpdate,
    },
  ] = useUpdateCollectionByIdMutation();

  const [
    updateCustomFieldById,
    {
      isLoading: isLoadingFieldUpdate,
      isSuccess: isSuccessFieldUpdate,
      isError: isErrorFieldUpdate,
    },
  ] = useUpdateCustomFieldByIdMutation();

  const [
    deleteCustomFieldById,
    { isLoading: isLoadingFieldDelete, isError: isErrorFieldDelete },
  ] = useDeleteCustomFieldByIdMutation();

  const [
    createCustomField,
    { isLoading: isLoadingFieldCreation, isError: isErrorFieldCreation },
  ] = useCreateCustomFieldMutation();

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

  const validatedCustomFields = customFields.filter((field) => field.label && field.type);

  const deleteUnnecessaryFields = () => {
    const fieldsToDelete = fieldsInCollection?.filter((fieldInCollection) =>
      validatedCustomFields.every((field) => field.id !== fieldInCollection._id)
    );
    if (fieldsToDelete && fieldsToDelete?.length > 0) {
      fieldsToDelete?.map(async (deletedField) => {
        await deleteCustomFieldById(deletedField._id);
      });
    }
  };

  const createNewCustomFields = () => {
    const newFields = validatedCustomFields.filter((field) =>
      fieldsInCollection?.every((fieldInCollection) => fieldInCollection._id !== field.id)
    );
    if (newFields.length > 0 && collection) {
      newFields.map(async (newField) => {
        const field: CustomFieldRequestBody = {
          type: newField.type,
          label: newField.label,
          collectionId: collection?._id,
        };
        await createCustomField(field);
      });
    }
  };

  const updateFields = () => {
    const fieldsToUpdate = fieldsInCollection?.filter((fieldInCollection) =>
      validatedCustomFields?.some((field) => field.id === fieldInCollection._id)
    );
    const updatedFields = fieldsToUpdate?.map((field) => ({
      ...field,
      type: validatedCustomFields.find((f) => f.id === field._id)?.type || field.type,
      label: validatedCustomFields.find((f) => f.id === field._id)?.label || field.label,
    }));
    if (updatedFields && updatedFields.length > 0 && collection) {
      updatedFields.map(async (updatedField) => {
        await updateCustomFieldById({ fieldId: updatedField._id, body: updatedField });
      });
    }
  };

  useEffect(() => {
    if (updatedCollection && isSuccessCollectionUpdate) {
      deleteUnnecessaryFields();
      createNewCustomFields();
      updateFields();
    }
  }, [isSuccessCollectionUpdate]);

  useEffect(() => {
    if (isSuccessFieldUpdate && updatedCollection) {
      dispatch(setSelectedCollection(updatedCollection));
      navigate(-1);
    }
  }, [isSuccessFieldUpdate]);

  useEffect(() => {
    if (
      isErrorCollectionUpdate ||
      isErrorFieldUpdate ||
      isErrorFieldDelete ||
      isErrorFieldCreation
    ) {
      setUpdateErrorShown(true);
    }
  }, [isErrorCollectionUpdate, isErrorFieldUpdate]);

  const isLoadingUpdate =
    isLoadingFields ||
    isLoadingCollectionUpdate ||
    isLoadingFieldUpdate ||
    isLoadingFieldDelete ||
    isLoadingFieldCreation;

  return { customFields, setCustomFields, submitUpdate, isLoadingUpdate };
};

export default useUpdateCollection;
