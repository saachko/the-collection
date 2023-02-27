import clsx from 'clsx';
import React, { memo } from 'react';
import { Card, Placeholder } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

import { setSelectedUser } from 'redux/slices/adminSlice';
import { setSelectedItem } from 'redux/slices/itemSlice';

import { formatDateAndTime } from 'utils/functions';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { Item } from 'ts/interfaces';

import styles from './ItemCard.module.scss';

interface ItemCardProps {
  item: Item | null;
}

function ItemCard({ item }: ItemCardProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'itemPage' });
  const { user, isAdmin } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <Card className={clsx('position-relative', styles.card)}>
      <div className={styles.skeleton}>
        <div className={clsx('loading-skeleton position-absolute', styles.skeleton)} />
        <Card.Img
          alt={`${item?.itemName}-image`}
          variant="left"
          className={clsx('position-absolute', styles.image)}
          src={item?.itemImage}
        />
      </div>
      <Card.Body className={styles.cardBody}>
        <div>
          <Card.Title className={styles.title}>
            {!item?.itemName ? (
              <Placeholder className="loading-skeleton d-flex mb-2" animation="glow">
                <Placeholder />
              </Placeholder>
            ) : (
              `${item?.itemName}`
            )}
          </Card.Title>
          <Card.Subtitle className={styles.subtitle}>
            {!item?.collectionName ? (
              <Placeholder className="loading-skeleton d-flex" animation="glow">
                <Placeholder />
              </Placeholder>
            ) : (
              <>
                {t('itemFrom')}
                <NavLink
                  to={`/collections/${item?.collectionId}`}
                  className={styles.collectionLink}
                  onClick={() => {
                    dispatch(setSelectedItem(null));
                  }}
                >
                  {item?.collectionName}
                </NavLink>
              </>
            )}
          </Card.Subtitle>
          <Card.Text>
            {t('createdBy')}
            <NavLink
              to={isAdmin ? `/users/${item?.ownerId}` : ''}
              className={clsx(styles.author, {
                [styles.authorLink]: isAdmin,
              })}
              onClick={() => {
                dispatch(setSelectedUser(null));
              }}
            >
              <span>{item?.ownerName}</span>
            </NavLink>
            <span> {formatDateAndTime(item, t, 'createdAt')}</span>
          </Card.Text>
        </div>
        <div className={styles.likes}>
          {user && item?.likes.includes(user?._id) ? <FaHeart /> : <FaRegHeart />}
          {item?.likes.length}
        </div>
      </Card.Body>
    </Card>
  );
}

export default memo(ItemCard);
