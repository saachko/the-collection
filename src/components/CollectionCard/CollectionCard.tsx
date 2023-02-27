import clsx from 'clsx';
import React, { memo } from 'react';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';

import { setSelectedUser } from 'redux/slices/adminSlice';
import { setSelectedCollection } from 'redux/slices/collectionSlice';
import { setCollectionsThemeFilter } from 'redux/slices/filterSlice';

import { formatDateAndTime } from 'utils/functions';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { Collection } from 'ts/interfaces';

import styles from './CollectionCard.module.scss';

interface CollectionCardProps {
  collection: Collection;
}

function CollectionCard({ collection }: CollectionCardProps) {
  const isAdmin = useAppSelector((state) => state.user.isAdmin);
  const { t } = useTranslation('translation');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const clickOnTheme = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    dispatch(setCollectionsThemeFilter(collection.theme));
  };

  return (
    <Card
      className={styles.card}
      onClick={() => {
        dispatch(setSelectedCollection(collection));
        navigate(`/collections/${collection._id}`);
      }}
    >
      <div className={styles.skeleton}>
        <div className={clsx('loading-skeleton position-absolute', styles.skeleton)} />
        <Card.Img
          alt={`${collection.title}-image`}
          variant="top"
          className="position-absolute"
          src={collection.image}
        />
      </div>
      <Card.Body className="d-flex flex-column justify-content-between align-items-start gap-3">
        <div>
          <Card.Title className="mb-0">{collection.title}</Card.Title>
          <Card.Link
            className={styles.theme}
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              clickOnTheme(event);
            }}
          >
            {t(`collections.${collection.theme}`)}
          </Card.Link>
        </div>
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
          <NavLink
            to={isAdmin ? `/users/${collection.ownerId}` : ''}
            className={clsx(styles.author, {
              [styles.authorLink]: isAdmin,
            })}
            onClick={(event) => {
              event.stopPropagation();
              dispatch(setSelectedUser(null));
            }}
          >
            <span>{collection.ownerName}</span>
          </NavLink>
        </p>
        <p>{formatDateAndTime(collection, t, 'collections.createdAt')}</p>
      </Card.Footer>
    </Card>
  );
}

export default memo(CollectionCard);
