import React, { memo, useState } from 'react';
import Image from 'react-bootstrap/Image';
import { useTranslation } from 'react-i18next';

import ConfirmNotification from 'components/ConfirmNotification/ConfirmNotification';
import EditDropdown from 'components/EditDropdown/EditDropdown';
import Loader from 'components/Loader/Loader';

import useDeleteUser from 'hooks/useDeleteUser';

import { EditDropdownItem } from 'ts/interfaces';

interface UserInfoProps {
  avatar: string | undefined;
  username: string | undefined;
  roles: string[] | undefined;
}

function UserInfo({ avatar, username, roles }: UserInfoProps) {
  const [confirmLogOutNotification, setConfirmLogOutNotification] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'profilePage' });
  const { deleteUser, isDeleteUserLoading } = useDeleteUser();

  const editActions: EditDropdownItem[] = [
    { id: '1', title: `${t('userEdit')}`, action: () => console.log('edit') },
    {
      id: '2',
      title: `${t('userDelete')}`,
      action: () => setConfirmLogOutNotification(true),
    },
  ];

  return (
    <div className="d-flex gap-4 justify-content-between">
      <div className="d-flex gap-4">
        <div className="avatar position-relative">
          <div className="avatar loading-skeleton position-absolute" />
          <Image src={avatar} alt="avatar" className="avatar position-absolute" />
        </div>
        <div>
          <h1 className="mb-0">{username}</h1>
          <p className="mt-0">
            <em>{t(`${roles?.includes('admin') ? `admin` : `user`}`)}</em>
          </p>
        </div>
      </div>
      <EditDropdown dropdownItems={editActions} />
      <ConfirmNotification
        isShown={confirmLogOutNotification}
        setShown={setConfirmLogOutNotification}
        onConfirm={() => {
          deleteUser();
          setConfirmLogOutNotification(false);
        }}
        text={t('userDeleteConfirm')}
      />
      {isDeleteUserLoading && <Loader />}
    </div>
  );
}

export default memo(UserInfo);
