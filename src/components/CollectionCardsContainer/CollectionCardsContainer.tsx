import React from 'react';

import CollectionCard from 'components/CollectionCard/CollectionCard';

import { Collection } from 'ts/interfaces';

import styles from './CollectionCardsContainer.module.scss';

interface CollectionCardsContainerProps {
  collections: Collection[] | null;
}

function CollectionCardsContainer({ collections }: CollectionCardsContainerProps) {
  return (
    <div className={styles.container}>
      {collections &&
        collections.map((collection) => (
          <CollectionCard key={collection._id} collection={collection} />
        ))}
    </div>
  );
}

export default CollectionCardsContainer;
