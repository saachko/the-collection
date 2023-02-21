import { useEffect, useState } from 'react';
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

const useCreateCollection = (currentUser: User | null) => {
  const [customFields, setCustomFields] = useState<CustomFieldFormValuesWithId[]>([]);

  const [
    createCollection,
    {
      data: newCollection,
      isLoading: isLoadingCollectionCreation,
      isSuccess: isSuccessCollectionCreation,
    },
  ] = useCreateCollectionMutation();

  const [
    createCustomField,
    { isLoading: isLoadingFieldCreation, isSuccess: isSuccessFieldCreation },
  ] = useCreateCustomFieldMutation();

  const isLoadingCreation = isLoadingCollectionCreation || isLoadingFieldCreation;

  const validateCustomFields = () =>
    customFields.filter((field) => field.label && field.type);

  const submitCreation: SubmitHandler<CollectionFormValues> = async ({
    ...formValues
  }) => {
    const newCollectionParams: CollectionRequestBody = {
      title: formValues.title,
      description: formValues.description || '**No description provided**',
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
      newFields.map(async (newField) => {
        await createCustomField(newField);
      });
    }
  }, [isSuccessCollectionCreation]);

  return {
    customFields,
    setCustomFields,
    submitCreation,
    isLoadingCreation,
    isSuccessFieldCreation,
  };
};

export default useCreateCollection;
