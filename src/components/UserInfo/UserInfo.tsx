import React, { memo, useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useTranslation } from 'react-i18next';
import { AiFillLock } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';

import { useUpdateUserByIdMutation } from 'redux/api/userApiSlice';
import { setSelectedUser } from 'redux/slices/adminSlice';

import ConfirmNotification from 'components/ConfirmNotification/ConfirmNotification';
import EditDropdown from 'components/EditDropdown/EditDropdown';
import ErrorNotification from 'components/ErrorNotification/ErrorNotification';
import Loader from 'components/Loader/Loader';
import ModalUserUpdate from 'components/ModalUserUpdate/ModalUserUpdate';

import useDeleteUser from 'hooks/useDeleteUser';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { EditDropdownItem } from 'ts/interfaces';

interface UserInfoProps {
  avatar: string | undefined;
  username: string | undefined;
  roles: string[] | undefined;
}

function UserInfo({ avatar, username, roles }: UserInfoProps) {
  const { user, isAdmin } = useAppSelector((state) => state.user);
  const { selectedUser } = useAppSelector((state) => state.admin);
  const [confirmLogOutNotification, setConfirmLogOutNotification] = useState(false);
  const [isUpdateUserModalShown, setUpdateUserModalShown] = useState(false);
  const [isUpdateErrorShown, setUpdateErrorShown] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'profilePage' });
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { deleteUser, isDeleteUserLoading } = useDeleteUser();

  const editActions: EditDropdownItem[] = [
    { id: '1', title: `${t('userEdit')}`, action: () => setUpdateUserModalShown(true) },
    {
      id: '2',
      title: `${t('userDelete')}`,
      action: () => setConfirmLogOutNotification(true),
    },
  ];

  const [updateUserById, { data: updatedUser, isLoading: isUpdateUserLoading }] =
    useUpdateUserByIdMutation();

  const blockOrUnblockUser = async () => {
    if (selectedUser) {
      const toBlock = !selectedUser.isBlocked;
      await updateUserById({
        id: selectedUser._id,
        body: { ...selectedUser, isBlocked: toBlock },
      });
    }
  };

  useEffect(() => {
    if (updatedUser) {
      dispatch(setSelectedUser(updatedUser));
    }
  }, [updatedUser]);

  const editActionsForAdmin: EditDropdownItem[] = [
    { id: '3', title: `${t('userAdmin')}`, action: () => console.log('aaaa') },
    {
      id: '4',
      title: `${
        selectedUser && selectedUser?.isBlocked
          ? `${t('userUnblock')}`
          : `${t('userBlock')}`
      }`,
      action: () => blockOrUnblockUser(),
    },
  ];

  const setEditActions = () => {
    if (
      isAdmin &&
      selectedUser &&
      selectedUser._id !== user?._id &&
      location.pathname !== '/profile'
    ) {
      return editActions.concat(editActionsForAdmin);
    }
    return editActions;
  };

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
          isShown={confirmLogOutNotification}
          setShown={setConfirmLogOutNotification}
          onConfirm={() => {
            deleteUser();
            setConfirmLogOutNotification(false);
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
    </>
  );
}

export default memo(UserInfo);
