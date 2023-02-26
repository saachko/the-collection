import React, { memo, useEffect, useState } from 'react';
import { Button, ButtonToolbar, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

import { useCreateItemMutation } from 'redux/api/itemApiSlice';
import { setItemCreated } from 'redux/slices/successNotificationSlice';

import DragAndDropFileUploader from 'components/DragAndDropFileUploader/DragAndDropFileUploader';
import Loader from 'components/Loader/Loader';
import Notification from 'components/Notification/Notification';

import { createImage } from 'utils/functions';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import useUpdateImage from 'hooks/useUpdateImage';

import { CustomFieldInItem, ItemFormValues, ItemRequestBody } from 'ts/interfaces';

import CustomFieldsForm from './CustomFieldsForm/CustomFieldsForm';
import styles from './ItemEditForm.module.scss';
import ValidationError from './ValidationError';

function ItemEditForm() {
  const { t } = useTranslation('translation', { keyPrefix: 'items' });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedCollection = useAppSelector(
    (state) => state.collection.selectedCollection
  );
  const { customFieldsInItem, customFieldsValues, selectedItem } = useAppSelector(
    (state) => state.item
  );
  const [isErrorShown, setErrorShown] = useState(false);

  const defaultFormValues: ItemFormValues = {
    itemName: selectedItem?.itemName || '',
    itemImage: selectedItem?.itemImage || '',
  };

  const {
    register,
    clearErrors,
    setFocus,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ItemFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    setFocus('itemName');
  }, []);

  const {
    image,
    imageUrl,
    changeImage,
    isDefaultImage,
    setDefaultImage,
    isImageLoading,
  } = useUpdateImage('itemImages');

  useEffect(() => {
    if (image && imageUrl) {
      setValue('itemImage', imageUrl);
    }
  }, [image, imageUrl]);

  useEffect(() => {
    if (isDefaultImage) {
      setValue('itemImage', createImage('marble', v4(), v4()));
    } else {
      setValue('itemImage', '');
    }
  }, [isDefaultImage]);

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

  const [
    createItem,
    {
      // DATA MAY BE NEEDED FOR TAGS CREATION
      // data: newItem,
      isLoading: isLoadingItemCreation,
      isSuccess: isSuccessItemCreation,
      isError: isErrorItemCreation,
    },
  ] = useCreateItemMutation();

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

  return (
    <>
      {isImageLoading && <Loader />}
      <NavLink to="" className="link mb-2" onClick={() => navigate(-1)}>
        {t('return')}
      </NavLink>
      <h2>{selectedItem ? `${t('update')}` : `${t('create')}`}</h2>
      <div className="d-flex flex-wrap justify-content-between gap-2 flex-md-row flex-column">
        <Form
          id="itemForm"
          aria-label="form"
          noValidate
          autoComplete="off"
          className={styles.itemFieldsContainer}
          onSubmit={handleSubmit(submitForm)}
        >
          <Form.Group className="mb-3 form-group" controlId="collectionFormTitle">
            <Form.Label>{t('itemName')}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t('itemNamePlaceholder')}
              {...register('itemName', {
                required: true,
                maxLength: 50,
                onChange: () => errors && clearErrors('itemName'),
              })}
            />
            {errors.itemName && <ValidationError errors={errors} />}
          </Form.Group>
          <Form.Group className="mb-1 form-group" controlId="collectionFormImage">
            <Form.Label>{t('itemImage')}</Form.Label>
            <DragAndDropFileUploader
              changeFile={changeImage}
              name="itemImage"
              fileName={image?.name}
              caption={image ? 'items.file' : 'items.noFile'}
              isDisabled={isDefaultImage}
            />
          </Form.Group>
          <Form.Check
            type="switch"
            id="defaultImage"
            label={t('defaultImage')}
            checked={isDefaultImage}
            onChange={() => setDefaultImage(!isDefaultImage)}
          />
          <p className={styles.note}>{t('imageNote')}</p>
        </Form>
        <CustomFieldsForm collectionId={selectedCollection?._id} />
      </div>
      <ButtonToolbar className="justify-content-center gap-5 mt-4 mb-3">
        <Button
          className="secondary-button"
          onClick={() => {
            navigate(-1);
          }}
        >
          {t('cancel')}
        </Button>
        <Button
          className="primary-button"
          type="submit"
          form="itemForm"
          // CHANGE DISABLED CONDITION isLoading = isLoadingCreation || isLoadingUpdate;
          disabled={isLoadingItemCreation}
        >
          {t('confirm')}
        </Button>
      </ButtonToolbar>
      <Notification
        message="items.error"
        closeNotification={() => setErrorShown(false)}
        isShown={isErrorShown}
        variant="danger"
      />
    </>
  );
}

export default memo(ItemEditForm);
