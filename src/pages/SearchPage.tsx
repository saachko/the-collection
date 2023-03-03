import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import EmptyContainer from 'components/EmptyContainer/EmptyContainer';
import SearchBar from 'components/FilterTools/SearchBar';
import ItemCardsContainer from 'components/ItemCardsContainer/ItemCardsContainer';

import { useAppSelector } from 'hooks/useRedux';

function SearchPage() {
  const { t } = useTranslation('translation', { keyPrefix: 'searchPage' });
  const foundInItems = useAppSelector((state) => state.search.foundInItems);
  const foundInCollections = useAppSelector((state) => state.search.foundInCollections);
  const foundInComments = useAppSelector((state) => state.search.foundInComments);

  return (
    <div className="content">
      <div className="d-flex justify-content-end">
        <SearchBar />
      </div>
      <div className="d-flex flex-column gap-4">
        {foundInItems.length > 0 && <ItemCardsContainer items={foundInItems} />}
        {foundInCollections.length > 0 && (
          <div>
            <h4>{t('foundInCollection')}</h4>
            <ItemCardsContainer items={foundInCollections} />
          </div>
        )}
        {foundInCollections.length > 0 && (
          <div>
            <h4>{t('foundInCollection')}</h4>
            <ItemCardsContainer items={foundInCollections} />
          </div>
        )}
        {foundInComments.length > 0 && (
          <div>
            <h4>{t('foundInComments')}</h4>
            <ItemCardsContainer items={foundInComments} />
          </div>
        )}
        {foundInItems.length === 0 &&
          foundInCollections.length === 0 &&
          foundInComments.length === 0 && (
            <EmptyContainer title={t('noResults')} text="" />
          )}
      </div>
    </div>
  );
}

export default memo(SearchPage);
