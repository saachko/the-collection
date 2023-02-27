import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  useCreateCustomFieldMutation,
  useDeleteCustomFieldByIdMutation,
  useUpdateCustomFieldByIdMutation,
} from 'redux/api/customFieldApiSlice';

import {
  Collection,
  CustomField,
  CustomFieldFormValuesWithId,
  CustomFieldRequestBody,
} from 'ts/interfaces';

const useUpdateCustomFields = (
  fieldsInCollection: CustomField[] | undefined,
  customFields: CustomFieldFormValuesWithId[],
  collection: Collection | null,
  updatedCollection: Collection | undefined
) => {
  const [isLoadingCustomFieldUpdate, setLoadingCustomFieldUpdate] = useState(false);
  const navigate = useNavigate();
  const [updateCustomFieldById, { isError: isErrorFieldUpdate }] =
    useUpdateCustomFieldByIdMutation();

  const [deleteCustomFieldById, { isError: isErrorFieldDelete }] =
    useDeleteCustomFieldByIdMutation();

  const [createCustomField, { isError: isErrorFieldCreation }] =
    useCreateCustomFieldMutation();

  const validatedCustomFields = customFields.filter((field) => field.label && field.type);

  const deleteUnnecessaryFields = async () => {
    const fieldsToDelete = fieldsInCollection?.filter((fieldInCollection) =>
      validatedCustomFields.every((field) => field.id !== fieldInCollection._id)
    );
    if (fieldsToDelete && fieldsToDelete?.length > 0) {
      await Promise.all(
        fieldsToDelete?.map(async (deletedField) => {
          await deleteCustomFieldById(deletedField._id);
        })
      ).then(() => navigate(-1));
    } else {
      navigate(-1);
    }
    setLoadingCustomFieldUpdate(false);
  };

  const createNewCustomFields = async () => {
    const newFields = validatedCustomFields.filter((field) =>
      fieldsInCollection?.every((fieldInCollection) => fieldInCollection._id !== field.id)
    );
    if (newFields.length > 0 && collection) {
      await Promise.all(
        newFields.map(async (newField) => {
          const field: CustomFieldRequestBody = {
            type: newField.type,
            label: newField.label,
            collectionId: collection?._id,
          };
          await createCustomField(field);
        })
      ).then(() => deleteUnnecessaryFields());
    } else {
      await deleteUnnecessaryFields();
    }
  };

  const updateFields = async () => {
    const fieldsToUpdate = fieldsInCollection?.filter((fieldInCollection) =>
      validatedCustomFields?.some((field) => field.id === fieldInCollection._id)
    );
    const updatedFields = fieldsToUpdate?.map((field) => ({
      ...field,
      type: validatedCustomFields.find((f) => f.id === field._id)?.type || field.type,
      label: validatedCustomFields.find((f) => f.id === field._id)?.label || field.label,
    }));
    if (updatedFields && updatedFields.length > 0 && collection) {
      await Promise.all(
        updatedFields.map(async (updatedField) => {
          await updateCustomFieldById({ fieldId: updatedField._id, body: updatedField });
        })
      ).then(() => createNewCustomFields());
    } else {
      await createNewCustomFields();
    }
  };

  useEffect(() => {
    if (updatedCollection) {
      (async () => {
        setLoadingCustomFieldUpdate(true);
        await updateFields();
      })();
    }
  }, [updatedCollection]);

  // const isLoadingCustomFieldUpdate =
  //   isLoadingFieldUpdate || isLoadingFieldDelete || isLoadingFieldCreation;

  const isErrorCustomField =
    isErrorFieldUpdate || isErrorFieldDelete || isErrorFieldCreation;

  return {
    isLoadingCustomFieldUpdate,
    isErrorCustomField,
  };
};

export default useUpdateCustomFields;
