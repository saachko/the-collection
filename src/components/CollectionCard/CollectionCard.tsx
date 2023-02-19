import clsx from 'clsx';
import React from 'react';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { formatDate } from 'utils/functions';

import { Collection } from 'ts/interfaces';

import styles from './CollectionCard.module.scss';

interface CollectionCardProps {
  collection: Collection;
}

function CollectionCard({ collection }: CollectionCardProps) {
  const { t } = useTranslation('translation');

  const formatDescription = () => {
    if (collection.description.length > 40) {
      return `${collection.description.slice(0, 40)}...`;
    }
    return collection.description;
  };

  const formatDateAndTime = () => {
    const formattedDate = formatDate(collection.createdAt);
    return `${formattedDate.slice(0, 10)} ${t(
      'collections.createdAt'
    )} ${formattedDate.slice(12)}`;
  };

  return (
    <Card className={styles.card}>
      <div className={styles.skeleton}>
        <div className={clsx('loading-skeleton position-absolute', styles.skeleton)} />
        <Card.Img
          alt={`${collection.title}-image`}
          variant="top"
          className="position-absolute"
          src={collection.image}
        />
      </div>
      <Card.Body>
        <Card.Title className="mb-0">{collection.title}</Card.Title>
        <Card.Text className={styles.theme}>{collection.theme}</Card.Text>
        <Card.Text className="mb-1">{formatDescription()}</Card.Text>
        <Card.Text className={styles.quantity}>
          <em>
            {t('collections.itemsQuantity')}
            {collection.itemsQuantity}
          </em>
        </Card.Text>
      </Card.Body>
      <Card.Footer className={styles.cardFooter}>
        <p>
          {t('collections.createdBy')}
          <span className={styles.author}>{collection.ownerName}</span>
        </p>
        <p>{formatDateAndTime()}</p>
      </Card.Footer>
    </Card>
  );
}

export default CollectionCard;
