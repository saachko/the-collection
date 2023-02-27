import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { v4 } from 'uuid';

import { useCreateItemMutation } from 'redux/api/itemApiSlice';
import { setItemCreated } from 'redux/slices/successNotificationSlice';

import { createImage } from 'utils/functions';

import { CustomFieldInItem, ItemFormValues, ItemRequestBody } from 'ts/interfaces';
import { SetState } from 'ts/types';

import useCreateTag from './useCreateTag';
import { useAppDispatch, useAppSelector } from './useRedux';
import useUpdateTagWithNewItem from './useUpdateTagWithNewItem';

const useCreateItem = (setErrorShown: SetState<boolean>) => {
  const selectedCollection = useAppSelector(
    (state) => state.collection.selectedCollection
  );
  const { customFieldsInItem, customFieldsValues } = useAppSelector(
    (state) => state.item
  );
  const dispatch = useAppDispatch();

  const [
    createItem,
    {
      data: newItem,
      isLoading: isLoadingItemCreation,
      isSuccess: isSuccessItemCreation,
      isError: isErrorItemCreation,
    },
  ] = useCreateItemMutation();

  const { isLoadingTagCreation } = useCreateTag(newItem);
  const { isLoadingTagUpdate } = useUpdateTagWithNewItem(newItem);

  useEffect(() => {
    if (isSuccessItemCreation) {
      dispatch(setItemCreated(true));
    }
  }, [isSuccessItemCreation]);

  useEffect(() => {
    if (isErrorItemCreation) {
      setErrorShown(true);
    }
  }, [isErrorItemCreation]);

  const getItemCustomFields = () => {
    if (customFieldsInItem && customFieldsInItem.length > 0) {
      const itemCustomFields: CustomFieldInItem[] = customFieldsInItem.map(
        (field, index) => ({
          customFieldId: field._id,
          label: field.label,
          type: field.type,
          value: customFieldsValues[index],
        })
      );
      return itemCustomFields;
    }
    return [];
  };

  const submitForm: SubmitHandler<ItemFormValues> = async ({ ...formValues }) => {
    if (selectedCollection) {
      const newItemParams: ItemRequestBody = {
        collectionId: selectedCollection._id,
        collectionName: selectedCollection.title,
        collectionTheme: selectedCollection.theme,
        ownerId: selectedCollection.ownerId,
        ownerName: selectedCollection.ownerName,
        itemName: formValues.itemName,
        itemImage: formValues.itemImage || createImage('marble', v4(), v4()),
        customFields: getItemCustomFields(),
      };
      await createItem(newItemParams);
    }
  };

  const isLoadingNewItem =
    isLoadingItemCreation || isLoadingTagCreation || isLoadingTagUpdate;

  return { submitForm, isLoadingNewItem };
};

export default useCreateItem;
