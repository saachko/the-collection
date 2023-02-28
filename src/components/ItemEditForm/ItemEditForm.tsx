import React, { memo, useEffect, useState } from 'react';
import { Button, ButtonToolbar, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

import DragAndDropFileUploader from 'components/DragAndDropFileUploader/DragAndDropFileUploader';
import Loader from 'components/Loader/Loader';
import Notification from 'components/Notification/Notification';

import { createImage } from 'utils/functions';

import useCreateItem from 'hooks/useCreateItem';
import useGetAllTags from 'hooks/useGetAllTags';
import { useAppSelector } from 'hooks/useRedux';
import useUpdateImage from 'hooks/useUpdateImage';

import { ItemFormValues } from 'ts/interfaces';

import CustomFieldsForm from './CustomFieldsForm/CustomFieldsForm';
import styles from './ItemEditForm.module.scss';
import TagsInput from './TagsInput/TagsInput';
import ValidationError from './ValidationError';

function ItemEditForm() {
  const { t } = useTranslation('translation', { keyPrefix: 'items' });
  const navigate = useNavigate();
  const selectedCollection = useAppSelector(
    (state) => state.collection.selectedCollection
  );
  const isItemCreated = useAppSelector(
    (state) => state.successNotification.isItemCreated
  );
  const selectedItem = useAppSelector((state) => state.item.selectedItem);
  const [isErrorShown, setErrorShown] = useState(false);
  const { isGetAllTagsLoading } = useGetAllTags();
  const { submitForm, isLoadingNewItem } = useCreateItem(setErrorShown);

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
  // CHANGE DISABLED CONDITION add || isLoadingUpdate ;
  const isLoading = isLoadingNewItem || isItemCreated || isGetAllTagsLoading;

  return (
    <>
      {isImageLoading && <Loader />}
      <NavLink to="" className="link mb-2" onClick={() => navigate(-1)}>
        {t('return')}
      </NavLink>
      <h2>{selectedItem ? `${t('update')}` : `${t('create')}`}</h2>
      <div className="d-flex flex-wrap justify-content-between gap-2 flex-md-row flex-column">
        <div className={styles.itemFieldsContainer}>
          <Form
            id="itemForm"
            aria-label="form"
            noValidate
            autoComplete="off"
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
              label={selectedItem ? t('newDefaultImage') : t('defaultImage')}
              checked={isDefaultImage}
              onChange={() => setDefaultImage(!isDefaultImage)}
            />
            {!selectedItem && <p className={styles.note}>{t('imageNote')}</p>}
          </Form>
          <TagsInput />
        </div>
        <CustomFieldsForm
          collectionId={selectedItem?.collectionId || selectedCollection?._id}
        />
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
          disabled={isLoading}
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
