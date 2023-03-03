import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { setBiggestCollections } from 'redux/slices/collectionSlice';

import CollectionCardsContainer from 'components/CollectionCardsContainer/CollectionCardsContainer';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import styles from './CollectionsSection.module.scss';

function CollectionsSection() {
  const { t } = useTranslation('translation', { keyPrefix: 'home' });
  const allCollections = useAppSelector((state) => state.collection.collections);
  const biggestCollections = useAppSelector(
    (state) => state.collection.biggestCollections
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (allCollections) {
      const biggestCollectionsList = [...allCollections]
        .sort((a, b) => b.itemsQuantity - a.itemsQuantity)
        .slice(0, 4);
      dispatch(setBiggestCollections(biggestCollectionsList));
    }
  }, [allCollections]);

  return (
    <section className={styles.section}>
      {biggestCollections && biggestCollections?.length > 0 && (
        <>
          <h2>{t('biggestCollections')}</h2>
          <CollectionCardsContainer collections={biggestCollections} />
        </>
      )}
    </section>
  );
}

export default memo(CollectionsSection);
