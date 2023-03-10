import MDEditor from '@uiw/react-md-editor';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Image, Placeholder } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';

import { setSelectedUser } from 'redux/slices/adminSlice';

import ConfirmNotification from 'components/ConfirmNotification/ConfirmNotification';
import EditDropdown from 'components/EditDropdown/EditDropdown';
import Loader from 'components/Loader/Loader';
import ErrorNotification from 'components/Notification/Notification';

import { formatDateAndTime } from 'utils/functions';

import useDeleteCollection from 'hooks/useDeleteCollection';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { EditDropdownItem } from 'ts/interfaces';

import styles from './CollectionInfo.module.scss';

function CollectionInfo() {
  const [confirmDeleteNotification, setConfirmDeleteNotification] = useState(false);
  const [isDeleteErrorShown, setDeleteErrorShown] = useState(false);
  const { user, isAdmin, isLoggedIn } = useAppSelector((state) => state.user);
  const { t } = useTranslation('translation', { keyPrefix: 'collectionPage' });
  const selectedCollection = useAppSelector(
    (state) => state.collection.selectedCollection
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { deleteCollection, isDeleteCollectionLoading } = useDeleteCollection(
    setDeleteErrorShown,
    selectedCollection?._id
  );

  const editActions: EditDropdownItem[] = [
    {
      id: '1',
      title: `${t('collectionEdit')}`,
      action: () => navigate(`/collections/${selectedCollection?._id}/edit`),
    },
    {
      id: '2',
      title: `${t('collectionDelete')}`,
      action: () => setConfirmDeleteNotification(true),
    },
  ];

  return (
    <div className={clsx('d-flex flex-column gap-3 flex-md-row', styles.container)}>
      <div className={clsx('image position-relative', styles.image)}>
        <div className="image loading-skeleton position-absolute" />
        <Image src={selectedCollection?.image} className="image position-absolute" />
      </div>
      <div className={styles.description}>
        <div className="d-flex align-items-center justify-content-between">
          <h2 className={styles.title}>
            {!selectedCollection?.title ? (
              <Placeholder className="loading-skeleton d-flex" animation="glow">
                <Placeholder size="lg" />
                Placeholder
              </Placeholder>
            ) : (
              `${selectedCollection?.title}`
            )}
          </h2>
          {((isAdmin && isLoggedIn) || user?._id === selectedCollection?.ownerId) && (
            <div className={styles.dropdown}>
              <EditDropdown dropdownItems={editActions} />
            </div>
          )}
        </div>
        <p className={styles.createdInfo}>
          {t('createdBy')}
          <NavLink
            to={isAdmin && isLoggedIn ? `/users/${selectedCollection?.ownerId}` : ''}
            className={clsx(styles.author, {
              [styles.authorLink]: isAdmin && isLoggedIn,
            })}
            onClick={() => dispatch(setSelectedUser(null))}
          >
            <span>{selectedCollection?.ownerName} </span>
          </NavLink>
          <span>{formatDateAndTime(selectedCollection, t, 'createdAt')}</span>
        </p>

        <MDEditor.Markdown source={selectedCollection?.description} />
      </div>
      {isDeleteCollectionLoading && <Loader />}
      <ConfirmNotification
        isShown={confirmDeleteNotification}
        setShown={setConfirmDeleteNotification}
        onConfirm={() => {
          deleteCollection();
          setConfirmDeleteNotification(false);
        }}
        text={t('collectionDeleteConfirm')}
      />
      <ErrorNotification
        message="collectionPage.error"
        closeNotification={() => setDeleteErrorShown(false)}
        isShown={isDeleteErrorShown}
        variant="danger"
      />
    </div>
  );
}

export default CollectionInfo;
