import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';

import { setOffcanvasShown } from 'redux/slices/searchSlice';

import SearchBar from 'components/FilterTools/SearchBar';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import styles from './Header.module.scss';

function SearchButton() {
  const offcanvasShown = useAppSelector((state) => state.search.offcanvasShown);
  const dispatch = useAppDispatch();

  return (
    <div>
      <button
        type="button"
        className={styles.searchButton}
        onClick={() => dispatch(setOffcanvasShown(true))}
      >
        <BsSearch />
      </button>
      <Offcanvas
        show={offcanvasShown}
        onHide={() => dispatch(setOffcanvasShown(false))}
        placement="top"
        className={styles.searchWrapper}
      >
        <Offcanvas.Header className="justify-content-end">
          <SearchBar />
        </Offcanvas.Header>
      </Offcanvas>
    </div>
  );
}

export default SearchButton;
