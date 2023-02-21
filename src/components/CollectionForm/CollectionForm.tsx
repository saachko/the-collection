import React, { memo, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ReactSelect from 'react-select';

import DragAndDropFileUploader from 'components/DragAndDropFileUploader/DragAndDropFileUploader';
import MarkdownTextarea from 'components/MarkdownTextarea/MarkdownTextarea';

import { collectionThemes, selectStyles } from 'utils/constants';

import { SelectOption } from 'ts/interfaces';

import styles from './CollectionForm.module.scss';

function CollectionForm() {
  const { t } = useTranslation('translation', { keyPrefix: 'collections' });
  const [image, setImage] = useState<File | null>(null);
  const [isDefaultImage, setDefaultImage] = useState(false);

  const collectionThemeOptions: SelectOption[] = collectionThemes.map((value) => ({
    value,
    label: `${t(value)}`,
  }));

  const changeImage = (file: File) => {
    setImage(file);
  };

  return (
    <div className={styles.container}>
      <Form.Group className="mb-3 form-group" controlId="collectionFormTitle">
        <Form.Label>{t('title')}</Form.Label>
        <Form.Control
          type="text"
          placeholder={t('titlePlaceholder')}
          // {...register('username', {
          //   required: true,
          //   minLength: 2,
          //   maxLength: 50,
          //   onChange: () => errors && clearErrors('username'),
          // })}
          // disabled={isUpdateUserLoading}
        />
        {/* {errors.username && <ValidationError errors={errors} field="username" />} */}
      </Form.Group>
      <Form.Group className="mb-3 form-group" controlId="collectionFormTheme">
        <Form.Label>{t('theme')}</Form.Label>
        {/* <Controller
            control={control}
            name="responsibleUser"
            render={({ field: { onChange, value } }) => ( */}
        <ReactSelect
          options={collectionThemeOptions}
          placeholder={t('themePlaceholder')}
          // onChange={(newValue) => onChange((newValue as SelectOptions).value)}
          styles={selectStyles}
          className="react-select-container"
          classNamePrefix="react-select"
        />
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
      <Form.Group className="mb-3 mt-3 form-group" controlId="collectionFormImage">
        <Form.Label>{t('description')}</Form.Label>
        <MarkdownTextarea />
      </Form.Group>
    </div>
  );
}

export default memo(CollectionForm);
