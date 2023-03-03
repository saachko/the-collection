import clsx from 'clsx';
import React, { memo, useEffect, useState } from 'react';
import { Card, Placeholder } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { setSelectedUser } from 'redux/slices/adminSlice';
import { setSelectedCollection } from 'redux/slices/collectionSlice';
import { setSelectedItem } from 'redux/slices/itemSlice';

import ConfirmNotification from 'components/ConfirmNotification/ConfirmNotification';
import EditDropdown from 'components/EditDropdown/EditDropdown';
import Loader from 'components/Loader/Loader';
import ErrorNotification from 'components/Notification/Notification';

import { formatDateAndTime } from 'utils/functions';

import useDeleteItem from 'hooks/useDeleteItem';
import useLikeItem from 'hooks/useLikeItem';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import useWindowSize from 'hooks/useWindowSize';

import { EditDropdownItem, Item } from 'ts/interfaces';

import styles from './ItemCard.module.scss';

interface ItemCardProps {
  item: Item | null;
}

function ItemCard({ item }: ItemCardProps) {
  const [confirmDeleteNotification, setConfirmDeleteNotification] = useState(false);
  const [isDeleteErrorShown, setDeleteErrorShown] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'itemPage' });
  const { user, isAdmin, isLoggedIn } = useAppSelector((state) => state.user);
  const [imageVariant, setImageVariant] = useState('left');
  const windowSize = useWindowSize();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const { deleteItem, isDeleteItemLoading } = useDeleteItem(
    setDeleteErrorShown,
    item?._id
  );

  const { likeItem, removeLike } = useLikeItem(item);

  useEffect(() => {
    if (windowSize.width < 768) {
      setImageVariant('top');
    } else {
      setImageVariant('left');
    }
  }, [windowSize]);

  const editActions: EditDropdownItem[] = [
    {
      id: '1',
      title: `${t('itemEdit')}`,
      action: () => navigate(`/items/${item?._id}/edit`),
    },
    {
      id: '2',
      title: `${t('itemDelete')}`,
      action: () => setConfirmDeleteNotification(true),
    },
  ];

  return (
    <Card className={styles.card}>
      <div className={styles.skeleton}>
        <div className={clsx('loading-skeleton', styles.skeleton)} />
        <Card.Img
          alt={`${item?.itemName}-image`}
          variant={imageVariant}
          className={styles.image}
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
                  onClick={(event) => {
                    event.stopPropagation();
                    dispatch(setSelectedCollection(null));
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
              to={isAdmin && isLoggedIn ? `/users/${item?.ownerId}` : ''}
              className={clsx(styles.author, {
                [styles.authorLink]: isAdmin && isLoggedIn,
              })}
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setSelectedUser(null));
              }}
            >
              <span>{item?.ownerName}</span>
            </NavLink>
            <span> {formatDateAndTime(item, t, 'createdAt')}</span>
          </Card.Text>
        </div>
        <div
          className={clsx(styles.likes, {
            [styles.likesHover]: isLoggedIn && user,
          })}
        >
          {isLoggedIn && user && item?.likes.includes(user?._id) ? (
            <FaHeart onClick={(event) => removeLike(event)} />
          ) : (
            <FaRegHeart onClick={(event) => likeItem(event)} />
          )}
          {item?.likes.length}
        </div>
      </Card.Body>
      {((isAdmin && isLoggedIn) || user?._id === item?.ownerId) &&
        currentPath !== '/search' && (
          <div
            className={clsx(styles.dropdown, {
              [styles.hidden]: !currentPath.includes('/items'),
            })}
          >
            <EditDropdown dropdownItems={editActions} />
          </div>
        )}
      {isDeleteItemLoading && <Loader />}
      <ConfirmNotification
        isShown={confirmDeleteNotification}
        setShown={setConfirmDeleteNotification}
        onConfirm={() => {
          deleteItem();
          setConfirmDeleteNotification(false);
        }}
        text={t('itemDeleteConfirm')}
      />
      <ErrorNotification
        message="itemPage.error"
        closeNotification={() => setDeleteErrorShown(false)}
        isShown={isDeleteErrorShown}
        variant="danger"
      />
    </Card>
  );
}

export default memo(ItemCard);
