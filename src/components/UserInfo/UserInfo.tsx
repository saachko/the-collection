import clsx from 'clsx';
import React, { memo, useEffect, useState } from 'react';
import { Image, OverlayTrigger, Placeholder, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AiFillLock } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';

import { setSelectedUser } from 'redux/slices/adminSlice';

import ConfirmNotification from 'components/ConfirmNotification/ConfirmNotification';
import EditDropdown from 'components/EditDropdown/EditDropdown';
import Loader from 'components/Loader/Loader';
import ModalUserUpdate from 'components/ModalUserUpdate/ModalUserUpdate';
import ErrorNotification from 'components/Notification/Notification';

import useDeleteUser from 'hooks/useDeleteUser';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import useUpdateUserByAdmin from 'hooks/useUpdateUserByAdmin';

import { EditDropdownItem } from 'ts/interfaces';

import styles from './UserInfo.module.scss';

interface UserInfoProps {
  avatar: string | undefined;
  username: string | undefined;
  roles: string[] | undefined;
}

function UserInfo({ avatar, username, roles }: UserInfoProps) {
  const user = useAppSelector((state) => state.user.user);
  const selectedUser = useAppSelector((state) => state.admin.selectedUser);
  const [confirmDeleteNotification, setConfirmDeleteNotification] = useState(false);
  const [isUpdateUserModalShown, setUpdateUserModalShown] = useState(false);
  const [isUpdateErrorShown, setUpdateErrorShown] = useState(false);
  const [isDeleteErrorShown, setDeleteErrorShown] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'profilePage' });
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (location.pathname === '/profile') {
      dispatch(setSelectedUser(null));
    }
  }, [selectedUser]);

  const { deleteUser, isDeleteUserLoading } = useDeleteUser(
    setDeleteErrorShown,
    selectedUser || user
  );

  const editActions: EditDropdownItem[] = [
    { id: '1', title: `${t('userEdit')}`, action: () => setUpdateUserModalShown(true) },
    {
      id: '2',
      title: `${t('userDelete')}`,
      action: () => setConfirmDeleteNotification(true),
    },
  ];

  const { setEditActions, isUpdateUserLoading } = useUpdateUserByAdmin(
    selectedUser,
    editActions
  );

  return (
    <>
      <div className={clsx('d-flex gap-4 justify-content-between', styles.infoContainer)}>
        <div className="d-flex gap-4 flex-column flex-sm-row">
          <div className="avatar position-relative">
            <div className="avatar loading-skeleton position-absolute" />
            <Image src={avatar} className="avatar position-absolute" />
          </div>
          <div>
            <h1 className={styles.title}>
              {!username ? (
                <Placeholder className="loading-skeleton d-flex" animation="glow">
                  <Placeholder size="lg" />
                  Username
                </Placeholder>
              ) : (
                `${username}`
              )}
            </h1>
            <p className="mt-0 mb-0">
              <em className="me-2">
                {t(`${roles?.includes('admin') ? `admin` : `user`}`)}
              </em>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>{t('blocked')}</Tooltip>}
              >
                <span className={styles.blockedIcon}>
                  {location.pathname !== '/profile' && selectedUser?.isBlocked && (
                    <AiFillLock />
                  )}
                </span>
              </OverlayTrigger>
            </p>
          </div>
        </div>
        <EditDropdown dropdownItems={setEditActions()} />
        <ConfirmNotification
          isShown={confirmDeleteNotification}
          setShown={setConfirmDeleteNotification}
          onConfirm={() => {
            deleteUser();
            setConfirmDeleteNotification(false);
          }}
          text={t('userDeleteConfirm')}
        />
        <ModalUserUpdate
          isShown={isUpdateUserModalShown}
          setShown={setUpdateUserModalShown}
          setUpdateErrorShown={setUpdateErrorShown}
          user={selectedUser || user}
        />
        {(isDeleteUserLoading || isUpdateUserLoading) && <Loader />}
      </div>
      <ErrorNotification
        message="profilePage.userUpdateError"
        closeNotification={() => setUpdateErrorShown(false)}
        isShown={isUpdateErrorShown}
        variant="danger"
      />
      <ErrorNotification
        message="profilePage.adminDeleteError"
        closeNotification={() => setDeleteErrorShown(false)}
        isShown={isDeleteErrorShown}
        variant="danger"
      />
    </>
  );
}

export default memo(UserInfo);
