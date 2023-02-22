import MDEditor from '@uiw/react-md-editor';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Image, Placeholder } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import ConfirmNotification from 'components/ConfirmNotification/ConfirmNotification';
import EditDropdown from 'components/EditDropdown/EditDropdown';
import Loader from 'components/Loader/Loader';
import ErrorNotification from 'components/Notification/Notification';

import { formatDate } from 'utils/functions';

import useDeleteCollection from 'hooks/useDeleteCollection';
import { useAppSelector } from 'hooks/useRedux';

import { EditDropdownItem } from 'ts/interfaces';

import styles from './CollectionInfo.module.scss';

function CollectionInfo() {
  const [confirmDeleteNotification, setConfirmDeleteNotification] = useState(false);
  const [isDeleteErrorShown, setDeleteErrorShown] = useState(false);
  const { user, isAdmin } = useAppSelector((state) => state.user);
  const { t } = useTranslation('translation', { keyPrefix: 'collectionPage' });
  const selectedCollection = useAppSelector(
    (state) => state.collection.selectedCollection
  );

  const formatDateAndTime = () => {
    if (selectedCollection) {
      const formattedDate = formatDate(selectedCollection.createdAt);
      return `${formattedDate.slice(0, 10)} ${t('createdAt')} ${formattedDate.slice(12)}`;
    }
    return '';
  };

  const { deleteCollection, isDeleteCollectionLoading } = useDeleteCollection(
    setDeleteErrorShown,
    selectedCollection?._id
  );

  const editActions: EditDropdownItem[] = [
    {
      id: '1',
      title: `${t('collectionEdit')}`,
      action: () => console.log('aaa'),
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
          <h2>
            {!selectedCollection?.title ? (
              <Placeholder className="loading-skeleton d-flex" animation="glow">
                <Placeholder size="lg" />
              </Placeholder>
            ) : (
              `${selectedCollection?.title}`
            )}
          </h2>
          {(isAdmin || user?._id === selectedCollection?.ownerId) && (
            <EditDropdown dropdownItems={editActions} />
          )}
        </div>
        <p className={styles.createdInfo}>
          {t('createdBy')}
          <NavLink
            to={isAdmin ? `/users/${selectedCollection?.ownerId}` : ''}
            className={clsx(styles.author, {
              [styles.authorLink]: isAdmin,
            })}
          >
            <span>{selectedCollection?.ownerName} </span>
          </NavLink>
          <span>{formatDateAndTime()}</span>
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
