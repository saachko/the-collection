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
  collection: Collection | null
) => {
  const [
    updateCustomFieldById,
    { isLoading: isLoadingFieldUpdate, isError: isErrorFieldUpdate },
  ] = useUpdateCustomFieldByIdMutation();

  const [
    deleteCustomFieldById,
    { isLoading: isLoadingFieldDelete, isError: isErrorFieldDelete },
  ] = useDeleteCustomFieldByIdMutation();

  const [
    createCustomField,
    { isLoading: isLoadingFieldCreation, isError: isErrorFieldCreation },
  ] = useCreateCustomFieldMutation();

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

  const isLoadingCustomFieldUpdate =
    isLoadingFieldUpdate || isLoadingFieldDelete || isLoadingFieldCreation;

  const isErrorCustomField =
    isErrorFieldUpdate || isErrorFieldDelete || isErrorFieldCreation;

  return {
    deleteUnnecessaryFields,
    createNewCustomFields,
    updateFields,
    isLoadingCustomFieldUpdate,
    isErrorCustomField,
  };
};

export default useUpdateCustomFields;
