import React, { memo } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { GrFormClose } from 'react-icons/gr';
import { IoMdSend } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import { setOffcanvasShown, setSearchValue } from 'redux/slices/searchSlice';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import styles from './FilterTools.module.scss';

function SearchBar() {
  const { t } = useTranslation('translation', { keyPrefix: 'filter' });
  const searchValue = useAppSelector((state) => state.search.searchValue);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const searchItems = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setOffcanvasShown(false));
    navigate('/search');
  };

  return (
    <Form onSubmit={(event) => searchItems(event)}>
      <Form.Group className="mb-3 form-group d-flex pt-3">
        <button
          type="button"
          onClick={() => dispatch(setSearchValue(''))}
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
