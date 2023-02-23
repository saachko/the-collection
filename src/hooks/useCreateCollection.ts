import { ActionCreatorWithPayload } from '@reduxjs/toolkit/dist/createAction';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { useCreateCollectionMutation } from 'redux/api/collectionApiSlice';
import { useCreateCustomFieldMutation } from 'redux/api/customFieldApiSlice';

import { createCollectionImage } from 'utils/functions';

import {
  CollectionFormValues,
  CollectionRequestBody,
  CustomFieldFormValuesWithId,
  CustomFieldRequestBody,
  User,
} from 'ts/interfaces';
import { SetState } from 'ts/types';

import { useAppDispatch } from './useRedux';

const useCreateCollection = (
  currentUser: User | null,
  setCreationErrorShown: SetState<boolean>,
  setCreationSuccessShown: ActionCreatorWithPayload<
    boolean,
    'successNotification/setCollectionCreated'
  >,
  customFields: CustomFieldFormValuesWithId[]
) => {
  const dispatch = useAppDispatch();

  const [
    createCollection,
    {
      data: newCollection,
      isLoading: isLoadingCollectionCreation,
      isSuccess: isSuccessCollectionCreation,
      isError: isErrorCollectionCreation,
    },
  ] = useCreateCollectionMutation();

  const [
    createCustomField,
    {
      isLoading: isLoadingFieldCreation,
      isSuccess: isSuccessFieldCreation,
      isError: isErrorFieldCreation,
    },
  ] = useCreateCustomFieldMutation();

  const isLoadingCreation = isLoadingCollectionCreation || isLoadingFieldCreation;

  const validateCustomFields = () =>
    customFields.filter((field) => field.label && field.type);

  const submitCreation: SubmitHandler<CollectionFormValues> = async ({
    ...formValues
  }) => {
    const newCollectionParams: CollectionRequestBody = {
      title: formValues.title,
      description: formValues.description || '*(No description provided)*',
      theme: formValues.theme || 'other',
      image:
        formValues.image || createCollectionImage(formValues.title, currentUser?._id),
      ownerId: currentUser?._id,
      ownerName: currentUser?.username,
    };
    await createCollection(newCollectionParams);
  };

  useEffect(() => {
    if (newCollection && isSuccessCollectionCreation) {
      const validatedCustomFields = validateCustomFields();
      const newFields: CustomFieldRequestBody[] = validatedCustomFields.map(
        (newField) => ({
          type: newField.type,
          label: newField.label,
          collectionId: newCollection._id,
        })
      );
      if (newFields.length > 0) {
        newFields.map(async (newField) => {
          await createCustomField(newField);
        });
      } else {
        dispatch(setCreationSuccessShown(true));
      }
    }
  }, [isSuccessCollectionCreation]);

  useEffect(() => {
    if (isSuccessFieldCreation) {
      dispatch(setCreationSuccessShown(true));
    }
  }, [isSuccessFieldCreation]);

  useEffect(() => {
    if (isErrorCollectionCreation || isErrorFieldCreation) {
      setCreationErrorShown(true);
    }
  }, [isErrorCollectionCreation, isErrorFieldCreation]);

  return {
    customFields,
    submitCreation,
    isLoadingCreation,
  };
};

export default useCreateCollection;
