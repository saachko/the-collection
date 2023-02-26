import React, { memo, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ReactSelect from 'react-select';
import { v4 } from 'uuid';

import DragAndDropFileUploader from 'components/DragAndDropFileUploader/DragAndDropFileUploader';
import Loader from 'components/Loader/Loader';
import MarkdownTextarea from 'components/MarkdownTextarea/MarkdownTextarea';

import { collectionThemes, selectStyles } from 'utils/constants';
import { createImage } from 'utils/functions';

import { useAppSelector } from 'hooks/useRedux';
import useUpdateImage from 'hooks/useUpdateImage';

import { CollectionFormValues, SelectOption } from 'ts/interfaces';

import styles from './CollectionForm.module.scss';
import ValidationError from './ValidationError';

interface CollectionFormProps {
  ownerId: string | undefined;
  submitForm: SubmitHandler<CollectionFormValues>;
}

function CollectionForm({ ownerId, submitForm }: CollectionFormProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'collections' });
  const selectedCollection = useAppSelector(
    (state) => state.collection.selectedCollection
  );

  const defaultFormValues: CollectionFormValues = {
    title: selectedCollection?.title || '',
    description: selectedCollection?.description || '',
    theme: selectedCollection?.theme || '',
    image: '',
  };

  const [description, setDescription] = useState(defaultFormValues.description);

  const {
    register,
    control,
    clearErrors,
    setFocus,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CollectionFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    setFocus('title');
  }, []);

  const collectionThemeOptions: SelectOption[] = collectionThemes.map((value) => ({
    value,
    label: `${t(value)}`,
  }));

  const getValueFromOption = (value: string) =>
    value ? collectionThemeOptions.find((option) => option.value === value) : '';

  const {
    image,
    imageUrl,
    changeImage,
    isDefaultImage,
    setDefaultImage,
    isImageLoading,
  } = useUpdateImage('collectionImages');

  useEffect(() => {
    if (image && imageUrl) {
      setValue('image', imageUrl);
    }
  }, [image, imageUrl]);

  useEffect(() => {
    if (isDefaultImage) {
      setValue('image', createImage('marble', v4(), ownerId));
    } else {
      setValue('image', '');
    }
  }, [isDefaultImage]);

  useEffect(() => {
    setValue('description', description);
  }, [description]);

  return (
    <div className={styles.container}>
      {isImageLoading && <Loader />}
      <Form
        id="collectionForm"
        aria-label="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(submitForm)}
      >
        <Form.Group className="mb-3 form-group" controlId="collectionFormTitle">
          <Form.Label>{t('title')}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('titlePlaceholder')}
            {...register('title', {
              required: true,
              maxLength: 50,
              onChange: () => errors && clearErrors('title'),
            })}
          />
          {errors.title && <ValidationError errors={errors} field="title" />}
        </Form.Group>
        <Form.Group className="mb-3 form-group" controlId="collectionFormTheme">
          <Form.Label>{t('theme')}</Form.Label>
          <Controller
            control={control}
            name="theme"
            render={({ field: { onChange, value } }) => (
              <ReactSelect
                options={collectionThemeOptions}
                placeholder={t('themePlaceholder')}
                value={getValueFromOption(value)}
                onChange={(newValue) => onChange((newValue as SelectOption).value)}
                styles={selectStyles}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            )}
          />
          <p className={styles.note}>{t('themeNote')}</p>
        </Form.Group>
        <Form.Group className="mb-1 form-group" controlId="collectionFormImage">
          <Form.Label>{t('image')}</Form.Label>
          <DragAndDropFileUploader
            changeFile={changeImage}
            name="image"
            fileName={image?.name}
            caption={image ? 'collections.file' : 'collections.noFile'}
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
        <Form.Group className="mb-3 mt-3 form-group" controlId="collectionFormImage">
          <Form.Label>{t('description')}</Form.Label>
          <MarkdownTextarea value={description} setValue={setDescription} />
        </Form.Group>
      </Form>
    </div>
  );
}

export default memo(CollectionForm);
