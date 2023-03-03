import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import CollectionCardsContainer from 'components/CollectionCardsContainer/CollectionCardsContainer';

import { useAppSelector } from 'hooks/useRedux';

import styles from './CollectionsSection.module.scss';

function CollectionsSection() {
  const { t } = useTranslation('translation', { keyPrefix: 'home' });
  const biggestCollections = useAppSelector(
    (state) => state.collection.biggestCollections
  );

  return (
    <section className={styles.section}>
      {biggestCollections && biggestCollections?.length > 0 && (
        <>
          <h3>{t('biggestCollections')}</h3>
          <CollectionCardsContainer collections={biggestCollections} />
        </>
      )}
    </section>
  );
}

export default memo(CollectionsSection);
