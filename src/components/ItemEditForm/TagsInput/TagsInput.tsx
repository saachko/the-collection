import React, { memo } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import CreatableSelect from 'react-select/creatable';
import { v4 } from 'uuid';

import { setTagsFromInput } from 'redux/slices/tagSlice';

import { selectStyles } from 'utils/constants';

import useGetAllTags from 'hooks/useGetAllTags';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { SelectOption } from 'ts/interfaces';

function TagsInput() {
  const { t } = useTranslation('translation', { keyPrefix: 'items' });
  const { tagsOptions, isGetAllTagsLoading } = useGetAllTags();
  const tagsFromInput = useAppSelector((state) => state.tag.tagsFromInput);
  const dispatch = useAppDispatch();

  const addTag = (tagLabel: string) => {
    dispatch(setTagsFromInput([...tagsFromInput, { value: v4(), label: tagLabel }]));
  };

  return (
    <Form.Group className="mb-1 form-group mt-3">
      <Form.Label>{t('tags')}</Form.Label>
      <CreatableSelect
        isMulti
        options={tagsOptions}
        isDisabled={isGetAllTagsLoading}
        isLoading={isGetAllTagsLoading}
        placeholder={t('tagsPlaceholder')}
        onChange={(value) => dispatch(setTagsFromInput(value as SelectOption[]))}
        onCreateOption={(tagLabel) => addTag(tagLabel)}
        value={tagsFromInput}
        styles={selectStyles}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </Form.Group>
  );
}

export default memo(TagsInput);
