import React from 'react';
import { useTranslation } from 'react-i18next';

import CollectionCard from 'components/CollectionCard/CollectionCard';
import EmptyContainer from 'components/EmptyContainer/EmptyContainer';

import { Collection } from 'ts/interfaces';

import styles from './CollectionCardsContainer.module.scss';

interface CollectionCardsContainerProps {
  collections: Collection[] | null;
}

function CollectionCardsContainer({ collections }: CollectionCardsContainerProps) {
  const { t } = useTranslation('translation');

  return (
    <>
      <div className={styles.container}>
        {collections &&
          collections.map((collection) => (
            <CollectionCard key={collection._id} collection={collection} />
          ))}
      </div>
      {collections?.length === 0 && (
        <EmptyContainer title={t('filter.noCollectionsResult')} text="" />
      )}
    </>
  );
}

export default CollectionCardsContainer;
