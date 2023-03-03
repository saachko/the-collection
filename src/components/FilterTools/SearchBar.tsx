import React, { memo } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { GrFormClose } from 'react-icons/gr';
import { IoMdSend } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import {
  resetSearchResults,
  setFoundInCollections,
  setFoundInComments,
  setFoundInItems,
  setOffcanvasShown,
  setSearchValue,
} from 'redux/slices/searchSlice';

import { meiliSearchClient } from 'utils/constants';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import styles from './FilterTools.module.scss';

function SearchBar() {
  const { t } = useTranslation('translation', { keyPrefix: 'filter' });
  const searchValue = useAppSelector((state) => state.search.searchValue);
  const allItems = useAppSelector((state) => state.search.allItems);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const itemsIndex = meiliSearchClient.index('items');
  const collectionsIndex = meiliSearchClient.index('collections');
  const commentsIndex = meiliSearchClient.index('comments');

  const searchItems = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setOffcanvasShown(false));

    const searchInItems = await itemsIndex.search(searchValue, { limit: 1000 });
    const foundInItems = searchInItems.hits.map((hit) => hit.element);
    dispatch(setFoundInItems(foundInItems || []));

    const searchInCollections = await collectionsIndex.search(searchValue, {
      limit: 1000,
    });
    const foundCollections = searchInCollections.hits.map((hit) => hit.element);
    const filteredCollections = foundCollections.filter(
      (hit) => !foundInItems.some((item) => item.collectionId === hit._id)
    );
    const foundInCollections = allItems?.filter((item) =>
      filteredCollections.some((collection) => collection._id === item.collectionId)
    );
    dispatch(setFoundInCollections(foundInCollections || []));

    const searchInComments = await commentsIndex.search(searchValue, {
      limit: 1000,
    });
    const foundComments = searchInComments.hits.map((hit) => hit.element);
    const filteredComments = foundComments.filter(
      (hit) =>
        ![...foundInItems, ...(foundInCollections || [])].some(
          (item) => item._id === hit.itemId
        )
    );
    const foundInComments = allItems?.filter((item) =>
      filteredComments.some((comment) => comment.itemId === item._id)
    );
    dispatch(setFoundInComments(foundInComments || []));

    navigate('/search');
  };

  return (
    <Form onSubmit={(event) => searchItems(event)}>
      <Form.Group className="mb-3 form-group d-flex pt-3">
        <button
          type="button"
          onClick={() => dispatch(resetSearchResults())}
          className={styles.resetCollectionsFilter}
        >
          <GrFormClose />
        </button>
        <Form.Control
          type="text"
          placeholder={t('searchPlaceholder')}
          value={searchValue}
          onChange={({ target }) => dispatch(setSearchValue(target.value))}
        />
        <button type="submit" className={styles.searchButton} disabled={!searchValue}>
          <IoMdSend />
        </button>
      </Form.Group>
    </Form>
  );
}

export default memo(SearchBar);
