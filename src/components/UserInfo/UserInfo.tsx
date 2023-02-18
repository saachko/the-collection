import React, { memo, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useTranslation } from 'react-i18next';
import { AiFillLock } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';

import ConfirmNotification from 'components/ConfirmNotification/ConfirmNotification';
import EditDropdown from 'components/EditDropdown/EditDropdown';
import ErrorNotification from 'components/ErrorNotification/ErrorNotification';
import Loader from 'components/Loader/Loader';
import ModalUserUpdate from 'components/ModalUserUpdate/ModalUserUpdate';

import useDeleteUser from 'hooks/useDeleteUser';
import { useAppSelector } from 'hooks/useRedux';
import useUpdateUserByAdmin from 'hooks/useUpdateUserByAdmin';

import { EditDropdownItem } from 'ts/interfaces';

interface UserInfoProps {
  avatar: string | undefined;
  username: string | undefined;
  roles: string[] | undefined;
}

function UserInfo({ avatar, username, roles }: UserInfoProps) {
  const selectedUser = useAppSelector((state) => state.admin.selectedUser);
  const [confirmDeleteNotification, setConfirmDeleteNotification] = useState(false);
  const [isUpdateUserModalShown, setUpdateUserModalShown] = useState(false);
  const [isUpdateErrorShown, setUpdateErrorShown] = useState(false);
  const [isDeleteErrorShown, setDeleteErrorShown] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'profilePage' });
  const location = useLocation();
  const { deleteUser, isDeleteUserLoading } = useDeleteUser(setDeleteErrorShown);

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
      <div className="d-flex gap-4 justify-content-between">
        <div className="d-flex gap-4">
          <div className="avatar position-relative">
            <div className="avatar loading-skeleton position-absolute" />
            <Image src={avatar} alt="avatar" className="avatar position-absolute" />
          </div>
          <div>
            <h1 className="mb-0">{username}</h1>
            <p className="mt-0 mb-0">
              <em className="me-2">
                {t(`${roles?.includes('admin') ? `admin` : `user`}`)}
              </em>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>{t('blocked')}</Tooltip>}
              >
                <span style={{ color: 'var(--primary-color)' }}>
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
        />
        {isDeleteUserLoading || (isUpdateUserLoading && <Loader />)}
      </div>
      <ErrorNotification
        errorMessage="profilePage.userUpdateError"
        closeErrorNotification={() => setUpdateErrorShown(false)}
        isShown={isUpdateErrorShown}
      />
      <ErrorNotification
        errorMessage="profilePage.adminDeleteError"
        closeErrorNotification={() => setDeleteErrorShown(false)}
        isShown={isDeleteErrorShown}
      />
    </>
  );
}

export default memo(UserInfo);
