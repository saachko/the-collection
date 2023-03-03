import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import ItemCardsContainer from 'components/ItemCardsContainer/ItemCardsContainer';

import { useAppSelector } from 'hooks/useRedux';

import styles from './ItemsSection.module.scss';

function ItemsSection() {
  const { t } = useTranslation('translation', { keyPrefix: 'home' });
  const lastAddedItems = useAppSelector((state) => state.item.lastAddedItems);

  return (
    <section className={styles.section}>
      {lastAddedItems && (
        <>
          <h2 className="m-0 align-self-start">{t('lastItems')}</h2>
          <ItemCardsContainer items={lastAddedItems} />
        </>
      )}
    </section>
  );
}

export default memo(ItemsSection);
